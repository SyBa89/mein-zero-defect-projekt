import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

const redis = new Redis({
  url: env.KV_REST_API_URL,
  token: env.KV_REST_API_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  prefix: 'health-check',
});

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte warten Sie 60 Sekunden.' },
      { status: 429 }
    );
  }

  try {
    await redis.ping();
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: { redis: 'connected', api: 'operational' },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: 'degraded',
        timestamp: new Date().toISOString(),
        services: { redis: 'disconnected', api: 'operational' },
      },
      { status: 503 }
    );
  }
}
