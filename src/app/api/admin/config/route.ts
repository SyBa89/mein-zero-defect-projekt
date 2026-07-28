import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { revalidateTag, revalidatePath } from 'next/cache';
import { SiteConfig } from '@/lib/site-config';
import { verifySessionToken, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ✅ LAZY FACTORY: Redis wird erst zur Laufzeit erstellt (nicht beim Build)
function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[CONFIG] Redis credentials missing – using static config');
    return null;
  }

  try {
    const redis = new Redis({ url, token });
    console.log('[CONFIG] Redis initialized successfully');
    return redis;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[CONFIG] Redis init error:', message);
    return null;
  }
}

const STATIC_CONFIG: SiteConfig = {
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
  jackpot: '', // ✅ LEER - Admin kann es im Cockpit setzen
  highlight: '', // ✅ LEER - Admin kann es im Cockpit setzen
  updatedAt: new Date().toISOString(),
};

function safeString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return '';
}

function safeBoolean(value: unknown): boolean {
  return typeof value === 'boolean' ? value : false;
}

function validateConfig(data: unknown): SiteConfig {
  const obj = data as Record<string, unknown> | null;
  return {
    isClosed: safeBoolean(obj?.isClosed),
    bannerText: safeString(obj?.bannerText),
    emergencyMessage: safeString(obj?.emergencyMessage),
    name: safeString(obj?.name) || STATIC_CONFIG.name,
    phoneDisplay: safeString(obj?.phoneDisplay) || STATIC_CONFIG.phoneDisplay,
    phoneHref: safeString(obj?.phoneHref) || STATIC_CONFIG.phoneHref,
    address: safeString(obj?.address) || STATIC_CONFIG.address,
    mapsLink: safeString(obj?.mapsLink) || STATIC_CONFIG.mapsLink,
    facebook: safeString(obj?.facebook) || STATIC_CONFIG.facebook,
    openingHoursText: safeString(obj?.openingHoursText) || STATIC_CONFIG.openingHoursText,
    jackpot: safeString(obj?.jackpot) || STATIC_CONFIG.jackpot,
    highlight: safeString(obj?.highlight) || STATIC_CONFIG.highlight,
    updatedAt: safeString(obj?.updatedAt) || STATIC_CONFIG.updatedAt,
  };
}

// ─── GET: Config laden ──────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value;
    const sessionUser = token ? verifySessionToken(token) : null;

    if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const redis = getRedisClient();

    // Versuche Redis – fallback auf static config
    if (redis) {
      try {
        const rawData = await redis.get('site-config');
        if (rawData) {
          const config = validateConfig(rawData);
          return NextResponse.json(config);
        }
      } catch (redisError: unknown) {
        const message = redisError instanceof Error ? redisError.message : 'Unknown Redis error';
        console.error('[CONFIG] Redis read error:', message);
      }
    }

    // Fallback: Statische Config
    console.log('[CONFIG] Returning static config (fallback)');
    return NextResponse.json(STATIC_CONFIG);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[CONFIG] GET error:', message);
    return NextResponse.json(STATIC_CONFIG);
  }
}

// ─── POST: Config speichern ─────────────────────────────────────────────
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

    const redis = getRedisClient();

    // Speichern in Redis (wenn verfügbar)
    if (redis) {
      try {
        await redis.set('site-config', sanitized);
        revalidateTag('config');
        revalidatePath('/');
        console.log('[CONFIG] Saved to Redis');
      } catch (redisError: unknown) {
        const message = redisError instanceof Error ? redisError.message : 'Unknown Redis error';
        console.error('[CONFIG] Redis write error:', message);
      }
    }

    return NextResponse.json({
      success: true,
      config: sanitized,
      message: redis ? 'Konfiguration gespeichert (Redis)' : 'Konfiguration gespeichert (statisch)',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[CONFIG] POST error:', message);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}
