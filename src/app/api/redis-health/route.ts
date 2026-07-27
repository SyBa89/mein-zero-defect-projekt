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
  prefix: 'redis-health',
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
    const start = Date.now();
    await redis.ping();
    const latency = Date.now() - start;
    return NextResponse.json({
      status: 'ok',
      message: 'Redis connection successful',
      latency: `${latency}ms`,
      ping: 'PONG',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        status: 'error',
        message: message,
      },
      { status: 500 }
    );
  }
}
