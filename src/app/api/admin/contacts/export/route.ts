import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { verifySessionToken, hasPermission } from '@/lib/auth';

function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'answered';
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const sessionUser = verifySessionToken(token);
  if (!sessionUser || !hasPermission(sessionUser.role, 'view-users')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const redis = getRedisClient();
  if (!redis) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  try {
    const contacts = (await redis.get<Contact[]>('contacts')) || [];
    return new NextResponse(JSON.stringify(contacts, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition':
          'attachment; filename=contacts-backup-' +
          new Date().toISOString().split('T')[0] +
          '.json',
      },
    });
  } catch (error) {
    console.error('[EXPORT] Error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
