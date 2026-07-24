import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const ADMIN_PASSWORD = process.env.INTERN_PASSWORD || 'lollipop2024';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  category: string;
  note: string;
}

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const suppliers = (await redis.get<Supplier[]>('admin-suppliers')) || [];
    return NextResponse.json(suppliers);
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
    let suppliers = (await redis.get<Supplier[]>('admin-suppliers')) || [];

    if (body.action === 'add') {
      if (!body.name?.trim()) {
        return NextResponse.json({ error: 'Name ist Pflichtfeld.' }, { status: 400 });
      }
      const newSupplier: Supplier = {
        id: `supplier-${Date.now()}`,
        name: body.name.trim(),
        phone: body.phone?.trim() || '',
        category: body.category?.trim() || 'Sonstige',
        note: body.note?.trim() || '',
      };
      suppliers.push(newSupplier);
      await redis.set('admin-suppliers', suppliers);
      return NextResponse.json({ success: true, supplier: newSupplier });
    }

    if (body.action === 'delete') {
      suppliers = suppliers.filter((s) => s.id !== body.id);
      await redis.set('admin-suppliers', suppliers);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Failed to save suppliers' }, { status: 500 });
  }
}
