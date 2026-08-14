import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { verifySessionToken } from '@/lib/auth';

function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) { console.warn('[ADMIN-NOTES] Redis not configured'); return null; }
  try { return new Redis({ url, token }); } catch { return null; }
}
function isAuthorized(request: NextRequest): boolean {
  const token = request.cookies.get('session')?.value;
  return !!token && verifySessionToken(token) !== null;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const redis = getRedisClient();
  if (!redis) return NextResponse.json({ error: 'Server nicht konfiguriert' }, { status: 500 });
  try {
    const notes = (await redis.get<string>('admin-notes')) || '';
    return NextResponse.json({ notes });
  } catch { return NextResponse.json({ notes: '' }); }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const redis = getRedisClient();
  if (!redis) return NextResponse.json({ error: 'Server nicht konfiguriert' }, { status: 500 });
  try {
    const body = await request.json();
    await redis.set('admin-notes', body.notes || '');
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed to save notes' }, { status: 500 }); }
}