import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const ADMIN_PASSWORD = process.env.INTERN_PASSWORD || 'lollipop2024';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export interface Contact {
  id: string;
  name: string;
  phone: string;
  note: string;
}

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const contacts = (await redis.get<Contact[]>('admin-contacts')) || [];
    return NextResponse.json(contacts);
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
    const contacts = (await redis.get<Contact[]>('admin-contacts')) || [];

    if (body.action === 'add') {
      // ✅ VALIDIERUNG: Name und Telefon müssen vorhanden sein
      if (!body.name?.trim() || !body.phone?.trim()) {
        return NextResponse.json(
          { error: 'Name und Telefon sind Pflichtfelder.' },
          { status: 400 }
        );
      }
      if (body.name.length > 100 || body.phone.length > 30) {
        return NextResponse.json({ error: 'Name oder Telefon zu lang.' }, { status: 400 });
      }

      const newContact: Contact = {
        id: `contact-${Date.now()}`,
        name: body.name.trim(),
        phone: body.phone.trim(),
        note: body.note?.trim() || '',
      };
      contacts.push(newContact);
      await redis.set('admin-contacts', contacts);
      return NextResponse.json({ success: true, contact: newContact });
    }

    if (body.action === 'delete') {
      const updated = contacts.filter((c) => c.id !== body.id);
      await redis.set('admin-contacts', updated);
      return NextResponse.json({ success: true });
    }

    if (body.action === 'update') {
      const updated = contacts.map((c) =>
        c.id === body.id ? { ...c, name: body.name, phone: body.phone, note: body.note } : c
      );
      await redis.set('admin-contacts', updated);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Failed to save contacts' }, { status: 500 });
  }
}
