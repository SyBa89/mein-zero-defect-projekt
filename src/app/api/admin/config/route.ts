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

export async function GET(request: NextRequest) {
  // ✅ JWT-Session-Check für GET
  const token = request.cookies.get('session')?.value;
  const sessionUser = token ? verifySessionToken(token) : null;

  if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const config = await redis.get<SiteConfig>('site-config');
    return NextResponse.json(config || DEFAULT_CONFIG);
  } catch (error) {
    console.error('[ADMIN CONFIG] Error fetching config:', error);
    return NextResponse.json(DEFAULT_CONFIG);
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte warten Sie 60 Sekunden.' },
      { status: 429 }
    );
  }

  // ✅ JWT-Session-Check für POST
  const token = request.cookies.get('session')?.value;
  const sessionUser = token ? verifySessionToken(token) : null;

  if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.jackpot && body.jackpot.length > 30) {
      return NextResponse.json(
        { error: 'Jackpot darf maximal 30 Zeichen haben.' },
        { status: 400 }
      );
    }
    if (body.highlight && body.highlight.length > 100) {
      return NextResponse.json(
        { error: 'Highlight darf maximal 100 Zeichen haben.' },
        { status: 400 }
      );
    }

    // ✅ XSS-Schutz
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
      message: 'Konfiguration erfolgreich gespeichert',
    });
  } catch (error) {
    console.error('[ADMIN CONFIG] Error saving config:', error);
    return NextResponse.json(
      { error: 'Konfiguration konnte nicht gespeichert werden' },
      { status: 500 }
    );
  }
}
