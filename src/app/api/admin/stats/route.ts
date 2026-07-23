// src/app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = {
      visits: Math.floor(Math.random() * 50) + 10,
      contacts: Math.floor(Math.random() * 5),
      calls: Math.floor(Math.random() * 8),
      lastUpdate: new Date().toISOString(),
      isClosed: false,
    };
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}