import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

// ✅ LAZY FACTORY
function getRedisClient(): Redis | null {
  const url = env.KV_REST_API_URL;
  const token = env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[HEALTH] Redis not configured');
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('[HEALTH] Redis init error:', error);
    return null;
  }
}

function getRatelimit(redis: Redis): Ratelimit {
  return new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    prefix: 'health-check',
  });
}

export async function GET(request: Request) {
  const redis = getRedisClient();

  if (!redis) {
    return NextResponse.json(
      {
        status: 'degraded',
        timestamp: new Date().toISOString(),
        services: { redis: 'not-configured', api: 'operational' },
      },
      { status: 503 }
    );
  }

  const ratelimit = getRatelimit(redis);
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
  } catch (_error: unknown) {
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
