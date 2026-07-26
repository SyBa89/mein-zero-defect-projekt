import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { revalidateTag, revalidatePath } from 'next/cache';
import { SiteConfig } from '@/lib/site-config';
import { env } from '@/lib/env';
import { verifySessionToken, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// â”€â”€â”€ Redis-Client mit Fehlerbehandlung â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let redis: Redis | null = null;
try {
  if (env.KV_REST_API_URL && env.KV_REST_API_TOKEN) {
    redis = new Redis({
      url: env.KV_REST_API_URL,
      token: env.KV_REST_API_TOKEN,
    });
    console.log('[CONFIG] Redis initialized successfully');
  } else {
    console.warn('[CONFIG] Redis credentials missing â€“ using static config');
  }
} catch (error) {
  console.error('[CONFIG] Redis init error:', error);
}

const STATIC_CONFIG: SiteConfig = {
  isClosed: false,
  bannerText: '',
  emergencyMessage: '',
  name: 'Kiosk Lollipop',
  phoneDisplay: '02235 9291160',
  phoneHref: 'tel:+4922359291160',
  address: 'Theodor-Heuss-StraÃŸe 35, 50374 Erftstadt-Liblar',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683',
  facebook: 'https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/',
  openingHoursText: 'Mo-Fr 07:30-19:00, Sa 07:30-14:30',
  jackpot: '45.000.000',
  highlight: 'ðŸŽ‰ Test-Highlight!',
  updatedAt: new Date().toISOString(),
};

function safeString(value: any): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return '';
}

function safeBoolean(value: any): boolean {
  return typeof value === 'boolean' ? value : false;
}

function validateConfig(data: any): SiteConfig {
  return {
    isClosed: safeBoolean(data?.isClosed),
    bannerText: safeString(data?.bannerText),
    emergencyMessage: safeString(data?.emergencyMessage),
    name: safeString(data?.name) || STATIC_CONFIG.name,
    phoneDisplay: safeString(data?.phoneDisplay) || STATIC_CONFIG.phoneDisplay,
    phoneHref: safeString(data?.phoneHref) || STATIC_CONFIG.phoneHref,
    address: safeString(data?.address) || STATIC_CONFIG.address,
    mapsLink: safeString(data?.mapsLink) || STATIC_CONFIG.mapsLink,
    facebook: safeString(data?.facebook) || STATIC_CONFIG.facebook,
    openingHoursText: safeString(data?.openingHoursText) || STATIC_CONFIG.openingHoursText,
    jackpot: safeString(data?.jackpot) || STATIC_CONFIG.jackpot,
    highlight: safeString(data?.highlight) || STATIC_CONFIG.highlight,
    updatedAt: safeString(data?.updatedAt) || STATIC_CONFIG.updatedAt,
  };
}

// â”€â”€â”€ GET: Config laden â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value;
    const sessionUser = token ? verifySessionToken(token) : null;

    if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Versuche Redis â€“ fallback auf static config
    if (redis) {
      try {
        const rawData = await redis.get('site-config');
        if (rawData) {
          const config = validateConfig(rawData);
          return NextResponse.json(config);
        }
      } catch (redisError) {
        console.error('[CONFIG] Redis read error:', redisError);
      }
    }

    // Fallback: Statische Config
    console.log('[CONFIG] Returning static config (fallback)');
    return NextResponse.json(STATIC_CONFIG);
  } catch (error) {
    console.error('[CONFIG] Error:', error);
    return NextResponse.json(STATIC_CONFIG);
  }
}

// â”€â”€â”€ POST: Config speichern â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value;
    const sessionUser = token ? verifySessionToken(token) : null;

    if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const sanitized = {
      ...STATIC_CONFIG,
      isClosed: safeBoolean(body.isClosed),
      bannerText: safeString(body.bannerText),
      emergencyMessage: safeString(body.emergencyMessage),
      name: safeString(body.name) || STATIC_CONFIG.name,
      phoneDisplay: safeString(body.phoneDisplay) || STATIC_CONFIG.phoneDisplay,
      phoneHref: safeString(body.phoneHref) || STATIC_CONFIG.phoneHref,
      address: safeString(body.address) || STATIC_CONFIG.address,
      mapsLink: safeString(body.mapsLink) || STATIC_CONFIG.mapsLink,
      facebook: safeString(body.facebook) || STATIC_CONFIG.facebook,
      openingHoursText: safeString(body.openingHoursText) || STATIC_CONFIG.openingHoursText,
      jackpot: safeString(body.jackpot) || STATIC_CONFIG.jackpot,
      highlight: safeString(body.highlight) || STATIC_CONFIG.highlight,
      updatedAt: new Date().toISOString(),
    };

    // Speichern in Redis (wenn verfÃ¼gbar)
    if (redis) {
      try {
        await redis.set('site-config', sanitized);
        revalidateTag('config');
        revalidatePath('/');
        console.log('[CONFIG] Saved to Redis');
      } catch (redisError) {
        console.error('[CONFIG] Redis write error:', redisError);
      }
    }

    return NextResponse.json({
      success: true,
      config: sanitized,
      message: redis ? 'Konfiguration gespeichert (Redis)' : 'Konfiguration gespeichert (statisch)',
    });
  } catch (error) {
    console.error('[CONFIG POST] Error:', error);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}
