import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { revalidateTag, revalidatePath } from 'next/cache';
import { SiteConfig } from '@/lib/site-config';
import { env } from '@/lib/env';
import DOMPurify from 'isomorphic-dompurify';
import { verifySessionToken, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const redis = new Redis({
  url: env.KV_REST_API_URL,
  token: env.KV_REST_API_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
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

// ✅ Hilfsfunktion: Validiert und repariert Config-Daten
function validateConfig(data: any): SiteConfig {
  return {
    isClosed: typeof data?.isClosed === 'boolean' ? data.isClosed : DEFAULT_CONFIG.isClosed,
    bannerText: typeof data?.bannerText === 'string' ? data.bannerText : DEFAULT_CONFIG.bannerText,
    emergencyMessage:
      typeof data?.emergencyMessage === 'string'
        ? data.emergencyMessage
        : DEFAULT_CONFIG.emergencyMessage,
    name: typeof data?.name === 'string' ? data.name : DEFAULT_CONFIG.name,
    phoneDisplay:
      typeof data?.phoneDisplay === 'string' ? data.phoneDisplay : DEFAULT_CONFIG.phoneDisplay,
    phoneHref: typeof data?.phoneHref === 'string' ? data.phoneHref : DEFAULT_CONFIG.phoneHref,
    address: typeof data?.address === 'string' ? data.address : DEFAULT_CONFIG.address,
    mapsLink: typeof data?.mapsLink === 'string' ? data.mapsLink : DEFAULT_CONFIG.mapsLink,
    facebook: typeof data?.facebook === 'string' ? data.facebook : DEFAULT_CONFIG.facebook,
    openingHoursText:
      typeof data?.openingHoursText === 'string'
        ? data.openingHoursText
        : DEFAULT_CONFIG.openingHoursText,
    jackpot: typeof data?.jackpot === 'string' ? data.jackpot : DEFAULT_CONFIG.jackpot,
    highlight: typeof data?.highlight === 'string' ? data.highlight : DEFAULT_CONFIG.highlight,
    updatedAt: typeof data?.updatedAt === 'string' ? data.updatedAt : DEFAULT_CONFIG.updatedAt,
  };
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  const sessionUser = token ? verifySessionToken(token) : null;

  if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rawData = await redis.get('site-config');
    const config = validateConfig(rawData);
    return NextResponse.json(config);
  } catch (error) {
    console.error('[ADMIN CONFIG] Error:', error);
    return NextResponse.json(DEFAULT_CONFIG);
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: 'Zu viele Anfragen' }, { status: 429 });
  }

  const token = request.cookies.get('session')?.value;
  const sessionUser = token ? verifySessionToken(token) : null;

  if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.jackpot && body.jackpot.length > 30) {
      return NextResponse.json({ error: 'Jackpot zu lang' }, { status: 400 });
    }
    if (body.highlight && body.highlight.length > 100) {
      return NextResponse.json({ error: 'Highlight zu lang' }, { status: 400 });
    }

    const sanitized = {
      ...DEFAULT_CONFIG,
      ...body,
      highlight: body.highlight ? DOMPurify.sanitize(body.highlight) : '',
      emergencyMessage: body.emergencyMessage ? DOMPurify.sanitize(body.emergencyMessage) : '',
      bannerText: body.bannerText ? DOMPurify.sanitize(body.bannerText) : '',
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
    console.error('[ADMIN CONFIG] Error:', error);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}
