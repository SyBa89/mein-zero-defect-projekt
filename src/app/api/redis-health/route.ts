import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Redis credentials missing in environment variables',
          hasUrl: !!url,
          hasToken: !!token,
        },
        { status: 503 }
      );
    }

    const redis = new Redis({ url, token });
    const start = Date.now();
    await redis.ping();
    const latency = Date.now() - start;

    return NextResponse.json({
      status: 'ok',
      message: 'Redis connection successful',
      latency: `${latency}ms`,
      ping: 'PONG',
    });
  } catch (error: any) {
    console.error('[REDIS HEALTH] Error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
