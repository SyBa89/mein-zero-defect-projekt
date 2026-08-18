import type { ThemeConfig } from '@/types/config';
import { Redis } from '@upstash/redis';

export interface ConfigOverride {
  theme?: Partial<ThemeConfig> | null;
  openingHours?: unknown;
  banners?: unknown;
  sections?: unknown;
  emergencyMessage?: string;
  isClosed?: boolean;
  updatedAt?: string;
}

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try { return new Redis({ url, token }); } catch { return null; }
}

const tenantId = () =>
  process.env.NEXT_PUBLIC_TENANT_ID || process.env.NEXT_PUBLIC_CLIENT_TYPE || 'kiosk';
const key = () => `tenant:${tenantId()}:config-override`;

export async function getConfigOverride(): Promise<ConfigOverride | null> {
  const redis = getRedis(); if (!redis) return null;
  try { return await redis.get<ConfigOverride>(key()); } catch { return null; }
}

export async function setConfigOverride(o: ConfigOverride): Promise<boolean> {
  const redis = getRedis(); if (!redis) return false;
  try { await redis.set(key(), { ...o, updatedAt: new Date().toISOString() }); return true; }
  catch { return false; }
}