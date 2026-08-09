import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { verifySessionToken, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ✅ LAZY FACTORY: Redis wird erst zur Laufzeit erstellt
function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('[STATS] Redis init error:', error);
    return null;
  }
}

interface Contact {
  id: string;
  status: 'new' | 'read' | 'answered';
}

export async function GET(request: NextRequest) {
  try {
    // 🔒 ZERO-DEFECT SECURITY: Auth-Check (war vorher komplett offen!)
    const token = request.cookies.get('session')?.value;
    const sessionUser = token ? verifySessionToken(token) : null;

    if (!sessionUser || !hasPermission(sessionUser.role, 'view-dashboard')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const redis = getRedisClient();

    let totalContacts = 0;
    let unreadContacts = 0;
    let systemStatus: 'healthy' | 'degraded' | 'offline' = 'offline';

    if (redis) {
      try {
        const contacts = (await redis.get<Contact[]>('contacts')) || [];
        totalContacts = contacts.length;
        unreadContacts = contacts.filter((c) => c.status === 'new').length;
        systemStatus = 'healthy';
      } catch (redisError) {
        console.error('[STATS] Redis read error:', redisError);
        systemStatus = 'degraded';
      }
    } else {
      systemStatus = 'offline';
    }

    // ✅ ECHTE DATEN statt Math.random()
    return NextResponse.json({
      totalContacts,
      unreadContacts,
      systemStatus,
      lastUpdate: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[STATS] GET error:', message);
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}
