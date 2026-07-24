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
    const today = new Date().toISOString().split('T')[0];
    const revenue = (await redis.get<number>(`revenue-${today}`)) || 0;
    const contacts = (await redis.get<unknown[]>('admin-contacts')) || [];
    const checklist = (await redis.get<unknown[]>('admin-checklist')) || [];
    const openTasks = checklist.filter((item) => !item.done).length;

    return NextResponse.json({
      today,
      revenue,
      openTasks,
      totalContacts: contacts.length,
      lastWeekRevenue: await getLastWeekRevenue(),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 });
  }
}

async function getLastWeekRevenue() {
  try {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = `revenue-${date.toISOString().split('T')[0]}`;
      const value = (await redis.get<number>(key)) || 0;
      data.push(value);
    }
    return data;
  } catch {
    return [0, 0, 0, 0, 0, 0, 0];
  }
}
