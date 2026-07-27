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

const redis = new Redis({
  url: env.KV_REST_API_URL,
  token: env.KV_REST_API_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'admin-users',
});

async function initializeDefaultAdmin(): Promise<User[]> {
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

async function getUsers(): Promise<User[]> {
  try {
    const users = await redis.get<User[]>('users');
    return users || (await initializeDefaultAdmin());
  } catch {
    return await initializeDefaultAdmin();
  }
}

async function saveUsers(users: User[]): Promise<void> {
  await redis.set('users', users);
}

function getSessionUser(request: NextRequest): any {
  const token = request.cookies.get('session')?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  const sessionUser = getSessionUser(request);
  if (!sessionUser || !hasPermission(sessionUser.role, 'view-users')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await getUsers();
    const safeUsers = users.map(({ passwordHash, ...rest }) => rest);
    return NextResponse.json(safeUsers);
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Fehler beim Laden' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
      const users = await getUsers();
      const user = users.find((u) => u.username === username);

      if (!user || !(await verifyPassword(password, user.passwordHash))) {
        return NextResponse.json({ error: 'Ungültige Anmeldedaten' }, { status: 401 });
      }

      user.lastLogin = new Date().toISOString();
      await saveUsers(users);

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

      const users = await getUsers();
      const user = users.find((u) => u.id === sessionUser.id);

      if (!user || !(await verifyPassword(oldPassword, user.passwordHash))) {
        return NextResponse.json({ error: 'Altes Passwort ist falsch' }, { status: 401 });
      }

      user.passwordHash = await hashPassword(newPassword);
      await saveUsers(users);

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

      const users = await getUsers();
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
      await saveUsers(users);

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
    console.error('[ERROR]', error);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}
