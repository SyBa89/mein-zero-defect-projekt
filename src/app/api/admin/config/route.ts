import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import crypto from 'crypto';

// ✅ GOLDSTANDARD: Secrets gehören ausschließlich in Umgebungsvariablen, nicht in Config-Dateien!
const ADMIN_PASSWORD = process.env.INTERN_PASSWORD || 'lollipop2024';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// ✅ GOLDSTANDARD: Rate Limiting (max. 5 Versuche pro Minute pro IP)
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
});

export interface SiteConfig {
  isClosed: boolean;
  bannerText: string;
  emergencyMessage: string;
  updatedAt: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  isClosed: false,
  bannerText: '',
  emergencyMessage: '',
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
  try {
    // ✅ GOLDSTANDARD: IP ermitteln für Rate Limiting
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';

    // Rate Limit prüfen
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warte eine Minute.' },
        { status: 429 }
      );
    }

    const password = request.headers.get('x-admin-password') || '';

    // ✅ ZERO-DEFECT: Sicherer Längen-Check vor timingSafeEqual
    const expectedBuffer = Buffer.from(ADMIN_PASSWORD);
    const providedBuffer = Buffer.from(password);

    if (expectedBuffer.length !== providedBuffer.length) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!crypto.timingSafeEqual(expectedBuffer, providedBuffer)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const newConfig: SiteConfig = {
      ...DEFAULT_CONFIG,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await redis.set('site-config', newConfig);

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
