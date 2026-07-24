import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const ADMIN_PASSWORD = process.env.INTERN_PASSWORD || 'lollipop2024';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const items = (await redis.get<ChecklistItem[]>('admin-checklist')) || [];
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    let items = (await redis.get<ChecklistItem[]>('admin-checklist')) || [];

    if (body.action === 'add') {
      // ✅ VALIDIERUNG: Text darf nicht leer sein
      if (!body.text?.trim()) {
        return NextResponse.json({ error: 'Aufgabentext darf nicht leer sein.' }, { status: 400 });
      }
      if (body.text.length > 200) {
        return NextResponse.json(
          { error: 'Aufgabentext zu lang (max. 200 Zeichen).' },
          { status: 400 }
        );
      }

      const newItem: ChecklistItem = {
        id: `task-${Date.now()}`,
        text: body.text.trim(),
        done: false,
      };
      items.push(newItem);
      await redis.set('admin-checklist', items);
      return NextResponse.json({ success: true, item: newItem });
    }

    if (body.action === 'toggle') {
      items = items.map((item) => (item.id === body.id ? { ...item, done: !item.done } : item));
      await redis.set('admin-checklist', items);
      return NextResponse.json({ success: true });
    }

    if (body.action === 'delete') {
      items = items.filter((item) => item.id !== body.id);
      await redis.set('admin-checklist', items);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Failed to save checklist' }, { status: 500 });
  }
}
