import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Rate-Limiting: max. 100 Anfragen pro Minute pro IP
const LIMIT = 100;
const WINDOW = 60; // Sekunden

export async function middleware(request: NextRequest) {
  // ─── IP aus Headern holen ──────────────────────────────────────
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous';

  const key = `rate-limit:middleware:${ip}`;

  // ─── Aktuellen Zähler abrufen ────────────────────────────────
  const current = await redis.get<number>(key);
  const count = current ?? 0;

  if (count >= LIMIT) {
    return new NextResponse(JSON.stringify({ error: 'Zu viele Anfragen. Bitte warten Sie.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ─── Zähler erhöhen ──────────────────────────────────────────
  if (count === 0) {
    await redis.set(key, 1, { ex: WINDOW });
  } else {
    await redis.incr(key);
  }

  // ─── Anfrage erlauben ────────────────────────────────────────
  return NextResponse.next();
}

// ─── Nur für API-Routen anwenden ────────────────────────────────
export const config = {
  matcher: '/api/:path*', // Nur API-Routen schützen
};
