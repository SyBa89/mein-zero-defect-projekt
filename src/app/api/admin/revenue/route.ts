import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { verifySessionToken } from '@/lib/auth';

function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) { console.warn('[ADMIN-REVENUE] Redis not configured'); return null; }
  try { return new Redis({ url, token }); } catch { return null; }
}
function isAuthorized(request: NextRequest): boolean {
  const token = request.cookies.get('session')?.value;
  return !!token && verifySessionToken(token) !== null;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const redis = getRedisClient();
  if (!redis) return NextResponse.json({ error: 'Server nicht konfiguriert' }, { status: 500 });
  try {
    const body = await request.json();
    const { date, amount } = body;
    if (!date || amount === undefined) return NextResponse.json({ error: 'Date and amount required' }, { status: 400 });
    await redis.set(`revenue-${date}`, amount);
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed to save revenue' }, { status: 500 }); }
}