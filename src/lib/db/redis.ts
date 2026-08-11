// src/lib/db/redis.ts
import { Redis } from '@upstash/redis';

let redisInstance: Redis | null = null;

export function getRedis(): Redis | null {
  if (redisInstance) return redisInstance;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[Redis] Missing KV_REST_API_URL or KV_REST_API_TOKEN. Running in offline mode.');
    return null;
  }

  redisInstance = new Redis({ url, token });
  return redisInstance;
}