import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

// ✅ LAZY FACTORY
function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[REDIS-HEALTH] Redis not configured');
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('[REDIS-HEALTH] Redis init error:', error);
    return null;
  }
}

export async function GET() {
  const redis = getRedisClient();

  if (!redis) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Redis not configured',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }

  try {
    const startTime = Date.now();
    const pong = await redis.ping();
    const latency = Date.now() - startTime;

    return NextResponse.json({
      status: 'ok',
      pong: pong,
      latency: `${latency}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[REDIS-HEALTH] Ping failed:', message);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Redis ping failed',
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
