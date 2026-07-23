// src/lib/api/rate-limit.ts
import { kv } from '@upstash/redis';

export async function checkRateLimit(ip: string, action: string, maxAttempts: number = 5, window: number = 60) {
  const key = `rate-limit:${action}:${ip}`;
  const attempts = await kv.get<number>(key) || 0;
  
  if (attempts >= maxAttempts) {
    return { success: false, error: 'Zu viele Versuche. Bitte warte 60 Sekunden.' };
  }
  
  await kv.set(key, attempts + 1, { ex: window });
  return { success: true };
}