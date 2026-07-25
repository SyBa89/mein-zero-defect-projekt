import { Redis } from '@upstash/redis';
import { unstable_cache } from 'next/cache';
import { KIOSK_CONFIG } from '@/lib/config';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// ✅ GOLDSTANDARD: Interface wird exportiert, um Duplikate zu vermeiden
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
  updatedAt: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  isClosed: false,
  bannerText: '',
  emergencyMessage: '',
  name: KIOSK_CONFIG.name,
  phoneDisplay: KIOSK_CONFIG.phoneDisplay,
  phoneHref: KIOSK_CONFIG.phoneHref,
  address: KIOSK_CONFIG.address,
  mapsLink: KIOSK_CONFIG.mapsLink,
  facebook: KIOSK_CONFIG.facebook,
  openingHoursText: 'Mo-Fr 07:30-19:00, Sa 07:30-14:30',
  updatedAt: new Date().toISOString(),
};

export const getSiteConfig = unstable_cache(
  async (): Promise<SiteConfig> => {
    try {
      const config = await redis.get<SiteConfig>('site-config');
      return config || DEFAULT_CONFIG;
    } catch (error) {
      console.error('Error fetching config from Redis:', error);
      return DEFAULT_CONFIG;
    }
  },
  ['site-config'],
  { revalidate: 60, tags: ['config'] }
);
