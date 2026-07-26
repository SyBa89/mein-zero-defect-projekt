import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { revalidateTag, revalidatePath } from 'next/cache';
import { SiteConfig } from '@/lib/site-config';
import { env } from '@/lib/env';
import { verifySessionToken, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ─── Redis-Client mit Fehlerbehandlung ──────────────────────────────
let redis: Redis | null = null;
try {
  redis = new Redis({
    url: env.KV_REST_API_URL,
    token: env.KV_REST_API_TOKEN,
  });
} catch (error) {
  console.error('[CONFIG] Redis init error:', error);
}

const ratelimit = new Ratelimit({
  redis: redis as any,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'admin-config',
});

const DEFAULT_CONFIG: SiteConfig = {
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
};

// ─── Sichere Config-Validierung ──────────────────────────────────────
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
    name: safeString(data?.name) || DEFAULT_CONFIG.name,
    phoneDisplay: safeString(data?.phoneDisplay) || DEFAULT_CONFIG.phoneDisplay,
    phoneHref: safeString(data?.phoneHref) || DEFAULT_CONFIG.phoneHref,
    address: safeString(data?.address) || DEFAULT_CONFIG.address,
    mapsLink: safeString(data?.mapsLink) || DEFAULT_CONFIG.mapsLink,
    facebook: safeString(data?.facebook) || DEFAULT_CONFIG.facebook,
    openingHoursText: safeString(data?.openingHoursText) || DEFAULT_CONFIG.openingHoursText,
    jackpot: safeString(data?.jackpot),
    highlight: safeString(data?.highlight),
    updatedAt: safeString(data?.updatedAt) || DEFAULT_CONFIG.updatedAt,
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

    if (!redis) {
      console.warn('[CONFIG] Redis not available, returning default config');
      return NextResponse.json(DEFAULT_CONFIG);
    }

    const rawData = await redis.get('site-config');
    const config = validateConfig(rawData);
    return NextResponse.json(config);
  } catch (error) {
    console.error('[CONFIG GET] Error:', error);
    return NextResponse.json(DEFAULT_CONFIG);
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

    if (!redis) {
      return NextResponse.json({ error: 'Redis not available' }, { status: 503 });
    }

    const body = await request.json();

    const sanitized = {
      ...DEFAULT_CONFIG,
      isClosed: safeBoolean(body.isClosed),
      bannerText: safeString(body.bannerText),
      emergencyMessage: safeString(body.emergencyMessage),
      name: safeString(body.name) || DEFAULT_CONFIG.name,
      phoneDisplay: safeString(body.phoneDisplay) || DEFAULT_CONFIG.phoneDisplay,
      phoneHref: safeString(body.phoneHref) || DEFAULT_CONFIG.phoneHref,
      address: safeString(body.address) || DEFAULT_CONFIG.address,
      mapsLink: safeString(body.mapsLink) || DEFAULT_CONFIG.mapsLink,
      facebook: safeString(body.facebook) || DEFAULT_CONFIG.facebook,
      openingHoursText: safeString(body.openingHoursText) || DEFAULT_CONFIG.openingHoursText,
      jackpot: safeString(body.jackpot),
      highlight: safeString(body.highlight),
      updatedAt: new Date().toISOString(),
    };

    await redis.set('site-config', sanitized);
    revalidateTag('config');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      config: sanitized,
      message: 'Konfiguration gespeichert',
    });
  } catch (error) {
    console.error('[CONFIG POST] Error:', error);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}
