import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import crypto from 'crypto';
import { revalidateTag } from 'next/cache';
import { SiteConfig } from '@/lib/site-config';

const ADMIN_PASSWORD = 'lollipop2024';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
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
  updatedAt: new Date().toISOString(),
};

export async function GET() {
  try {
    const config = await redis.get<SiteConfig>('site-config');
    return NextResponse.json(config || DEFAULT_CONFIG);
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json(DEFAULT_CONFIG);
  }
}

export async function POST(request: NextRequest) {
  // Rate Limiting VORÜBERGEHEND deaktiviert (damit du dich anmelden kannst)
  // const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  // const { success } = await ratelimit.limit(ip);
  // if (!success) {
  //   return NextResponse.json({ error: 'Zu viele Anfragen. Bitte warte eine Minute.' }, { status: 429 });
  // }

  try {
    const password = request.headers.get('x-admin-password') || '';
    const expectedBuffer = Buffer.from(ADMIN_PASSWORD);
    const providedBuffer = Buffer.from(password);

    if (
      expectedBuffer.length !== providedBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, providedBuffer)
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const newConfig: SiteConfig = {
      ...DEFAULT_CONFIG,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await redis.set('site-config', newConfig);
    revalidateTag('config');

    return NextResponse.json({
      success: true,
      config: newConfig,
      message: 'Konfiguration erfolgreich gespeichert',
    });
  } catch (error) {
    console.error('Error saving config:', error);
    return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
  }
}
