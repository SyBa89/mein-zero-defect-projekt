import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const ADMIN_PASSWORD = process.env.INTERN_PASSWORD || 'lollipop2024';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { date, amount } = body;
    if (!date || amount === undefined) {
      return NextResponse.json({ error: 'Date and amount required' }, { status: 400 });
    }
    await redis.set(`revenue-${date}`, amount);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save revenue' }, { status: 500 });
  }
}
