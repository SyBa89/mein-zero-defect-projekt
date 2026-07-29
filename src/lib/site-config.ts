import { unstable_cache } from 'next/cache';
import { Redis } from '@upstash/redis';

// ── Holiday Override Interface (muss VOR SiteConfig stehen) ──
export interface HolidayOverride {
  date: string; // ISO Format: "2026-12-25"
  name: string; // z.B. "Weihnachten"
  isClosed: boolean; // true = geschlossen, false = spezielle Öffnungszeiten
  hours?: string; // Optional: z.B. "10:00-14:00"
}

// ── SiteConfig Interface ──
export interface SiteConfig {
  isClosed: boolean;
  bannerText: string;
  emergencyMessage: string;
  name: string;
  phoneDisplay: string;
  phoneHref: string;
  address: string;
  mapsLink: string;
  facebook: string;
  openingHoursText: string;
  jackpot?: string;
  highlight?: string;
  updatedAt: string;
  holidays?: HolidayOverride[];
}

export const DEFAULT_CONFIG: SiteConfig = {
  isClosed: false,
  bannerText: '',
  emergencyMessage: '',
  name: 'Kiosk Lollipop',
  phoneDisplay: '02235 9291160',
  phoneHref: 'tel:+4922359291160',
  address: 'Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683',
  facebook: 'https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/',
  openingHoursText: 'Mo-Fr 07:30-19:00, Sa 07:30-14:30',
  jackpot: '',
  highlight: '',
  updatedAt: new Date().toISOString(),
  holidays: [],
};

// LAZY FACTORY: Redis wird erst zur Laufzeit erstellt (nicht beim Build)
function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[SITE-CONFIG] Redis not configured - using DEFAULT_CONFIG');
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('[SITE-CONFIG] Redis init error:', error);
    return null;
  }
}

export const getSiteConfig = unstable_cache(
  async (): Promise<SiteConfig> => {
    const redis = getRedisClient();

    if (!redis) {
      console.log('[SITE-CONFIG] Returning DEFAULT_CONFIG (Redis not available)');
      return DEFAULT_CONFIG;
    }

    try {
      const config = await redis.get<SiteConfig>('site-config');
      return config || DEFAULT_CONFIG;
    } catch (error) {
      console.error('[SITE-CONFIG] Error fetching config from Redis:', error);
      return DEFAULT_CONFIG;
    }
  },
  ['site-config'],
  { revalidate: 60, tags: ['config'] }
);

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: 'admin' | 'mitarbeiter' | 'redakteur';
  name: string;
  createdAt: string;
  lastLogin?: string;
}
