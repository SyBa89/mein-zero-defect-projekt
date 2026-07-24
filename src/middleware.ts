import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function middleware(request: NextRequest) {
  const ip = request.ip || 'anonymous';
  const key = `rate-limit:${ip}`;
  const limit = 100; // Anfragen pro Minute
  const window = 60; // Sekunden

  try {
    const current = (await redis.get<number>(key)) || 0;
    if (current >= limit) {
      return new NextResponse('Zu viele Anfragen. Bitte warte eine Minute.', { status: 429 });
    }
    await redis.incr(key);
    await redis.expire(key, window);
    return NextResponse.next();
  } catch {
    // Bei Redis-Fehler: Anfrage trotzdem erlauben (Fail-open)
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/api/:path*',
};
