import { unstable_cache } from 'next/cache';

export const CACHE_TAGS = {
  CONFIG: 'config',
  USERS: 'users',
  PRODUCTS: 'products',
  ANALYTICS: 'analytics',
} as const;

export const CACHE_REVALIDATE = {
  IMMEDIATE: 0,
  SHORT: 60, // 1 Minute
  MEDIUM: 300, // 5 Minuten
  LONG: 3600, // 1 Stunde
  VERY_LONG: 86400, // 24 Stunden
} as const;

export function createCachedFunction<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  tags: string[],
  revalidate: number = CACHE_REVALIDATE.MEDIUM
) {
  return unstable_cache(fn, tags, { revalidate });
}
