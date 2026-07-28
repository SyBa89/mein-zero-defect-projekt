import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { env } from '@/lib/env';
import { User } from '@/lib/site-config';
import {
  hashPassword,
  verifyPassword,
  generateSecurePassword,
  createSessionToken,
  verifySessionToken,
  hasPermission,
} from '@/lib/auth';

// ✅ LAZY FACTORY: Redis und Ratelimit werden erst zur Laufzeit erstellt
function getRedisClient(): Redis | null {
  const url = env.KV_REST_API_URL;
  const token = env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[ADMIN-USERS] Redis not configured');
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('[ADMIN-USERS] Redis init error:', error);
    return null;
  }
}

function getRatelimit(redis: Redis): Ratelimit {
  return new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    prefix: 'admin-users',
  });
}

async function initializeDefaultAdmin(redis: Redis): Promise<User[]> {
  const existingUsers = await redis.get<User[]>('users');
  if (existingUsers && existingUsers.length > 0) {
    return existingUsers;
  }

  const defaultAdmin: User = {
    id: '1',
    username: 'admin',
    passwordHash: await hashPassword(env.ADMIN_PASSWORD),
    role: 'admin',
    name: 'Hauptadministrator',
    createdAt: new Date().toISOString(),
  };

  await redis.set('users', [defaultAdmin]);
  return [defaultAdmin];
}

async function getUsers(redis: Redis): Promise<User[]> {
  try {
    const users = await redis.get<User[]>('users');
    return users || (await initializeDefaultAdmin(redis));
  } catch {
    return await initializeDefaultAdmin(redis);
  }
}

async function saveUsers(redis: Redis, users: User[]): Promise<void> {
  await redis.set('users', users);
}

function getSessionUser(request: NextRequest): any {
  const token = request.cookies.get('session')?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  const redis = getRedisClient();
  if (!redis) {
    return NextResponse.json({ error: 'Server nicht konfiguriert' }, { status: 500 });
  }

  const sessionUser = getSessionUser(request);
  if (!sessionUser || !hasPermission(sessionUser.role, 'view-users')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await getUsers(redis);
    const safeUsers = users.map(({ passwordHash: _ph, ...rest }) => rest);
    return NextResponse.json(safeUsers);
  } catch (_error: unknown) {
    return NextResponse.json({ error: 'Fehler beim Laden' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const redis = getRedisClient();
  if (!redis) {
    return NextResponse.json({ error: 'Server nicht konfiguriert' }, { status: 500 });
  }

  const ratelimit = getRatelimit(redis);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Zu viele Anfragen' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { action } = body;

    // ─── LOGIN ─────────────────────────────────────────────────────
    if (action === 'login') {
      const { username, password } = body;
      const users = await getUsers(redis);
      const user = users.find((u) => u.username === username);

      if (!user || !(await verifyPassword(password, user.passwordHash))) {
        return NextResponse.json({ error: 'Ungültige Anmeldedaten' }, { status: 401 });
      }

      user.lastLogin = new Date().toISOString();
      await saveUsers(redis, users);

      const token = createSessionToken({
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
      });

      const response = NextResponse.json({
        success: true,
        user: { id: user.id, username: user.username, role: user.role, name: user.name },
      });

      response.cookies.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return response;
    }

    // ─── LOGOUT ────────────────────────────────────────────────────
    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: 'Erfolgreich abgemeldet' });
      response.cookies.delete('session');
      return response;
    }

    // ─── PASSWORT ÄNDERN ──────────────────────────────────────────
    if (action === 'change-password') {
      const sessionUser = getSessionUser(request);
      if (!sessionUser) {
        return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
      }

      const { oldPassword, newPassword } = body;
      if (!oldPassword || !newPassword || newPassword.length < 8) {
        return NextResponse.json(
          { error: 'Neues Passwort muss mindestens 8 Zeichen haben' },
          { status: 400 }
        );
      }

      const users = await getUsers(redis);
      const user = users.find((u) => u.id === sessionUser.id);

      if (!user || !(await verifyPassword(oldPassword, user.passwordHash))) {
        return NextResponse.json({ error: 'Altes Passwort ist falsch' }, { status: 401 });
      }

      user.passwordHash = await hashPassword(newPassword);
      await saveUsers(redis, users);

      return NextResponse.json({ success: true, message: 'Passwort erfolgreich geändert' });
    }

    // ─── BENUTZER ERSTELLEN ───────────────────────────────────────
    if (action === 'create') {
      const sessionUser = getSessionUser(request);
      if (!sessionUser || !hasPermission(sessionUser.role, 'all')) {
        return NextResponse.json(
          { error: 'Nur Admins können Benutzer erstellen' },
          { status: 403 }
        );
      }

      const { username, role, name } = body;
      if (!username || !role || !name) {
        return NextResponse.json({ error: 'Alle Felder erforderlich' }, { status: 400 });
      }

      const users = await getUsers(redis);
      if (users.some((u) => u.username === username)) {
        return NextResponse.json({ error: 'Benutzername bereits vergeben' }, { status: 400 });
      }

      const plainPassword = generateSecurePassword();
      const newUser: User = {
        id: Date.now().toString(),
        username,
        passwordHash: await hashPassword(plainPassword),
        role: role as 'admin' | 'mitarbeiter' | 'redakteur',
        name,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await saveUsers(redis, users);

      return NextResponse.json({
        success: true,
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
          name: newUser.name,
        },
        plainPassword,
        message: `Benutzer erstellt. Passwort: ${plainPassword} (bitte sicher notieren!)`,
      });
    }

    return NextResponse.json({ error: 'Unbekannte Aktion' }, { status: 400 });
  } catch (error: unknown) {
    console.error('[ADMIN-USERS] Error:', error);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}
