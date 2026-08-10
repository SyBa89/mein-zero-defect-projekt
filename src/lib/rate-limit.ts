import { Ratelimit, type Duration } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

let ratelimit: Ratelimit | null = null;

function getRatelimit(limit: number, window: string): Ratelimit | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  if (ratelimit) return ratelimit;
  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limit, window as Duration),
    prefix: 'ratelimit',
  });
  return ratelimit;
}

export async function checkRateLimit(
  request: NextRequest,
  options: { limit?: number; window?: Duration; identifier?: string } = {}
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const { limit = 5, window = '60 s', identifier } = options;
  const rl = getRatelimit(limit, window);
  if (!rl) {
    return { success: true, remaining: limit, reset: Date.now() + 60000 };
  }
  const ip =
    identifier ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous';
  const result = await rl.limit(ip);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}
