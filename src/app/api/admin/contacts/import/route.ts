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

export async function POST(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const sessionUser = verifySessionToken(token);
  if (!sessionUser || !hasPermission(sessionUser.role, 'view-users')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const redis = getRedisClient();
  if (!redis) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  try {
    const body = await request.json();
    const { contacts } = body;
    if (!Array.isArray(contacts)) {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
    }
    for (const contact of contacts) {
      if (!contact.id || !contact.name || !contact.email || !contact.message) {
        return NextResponse.json({ error: 'Invalid contact format' }, { status: 400 });
      }
    }
    await redis.set('contacts', contacts);
    return NextResponse.json({ success: true, count: contacts.length });
  } catch (error) {
    console.error('[IMPORT] Error:', error);
    return NextResponse.json({ error: 'Import failed' }, { status: 500 });
  }
}
