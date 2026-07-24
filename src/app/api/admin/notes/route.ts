import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const ADMIN_PASSWORD = process.env.INTERN_PASSWORD || 'lollipop2024';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const notes = (await redis.get<string>('admin-notes')) || '';
    return NextResponse.json({ notes });
  } catch {
    return NextResponse.json({ notes: '' });
  }
}

export async function POST(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    await redis.set('admin-notes', body.notes || '');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save notes' }, { status: 500 });
  }
}
