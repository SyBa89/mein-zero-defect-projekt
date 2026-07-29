import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * PUBLIC CONFIG ENDPOINT
 *
 * Read-only endpoint für öffentliche Daten (Öffnungszeiten, Adresse, etc.)
 * KEINE Authentication erforderlich - für alle Besucher zugänglich
 *
 * Verwendet von: EmergencyBanner, OpeningHoursSection, HeroSection
 */

function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

const STATIC_CONFIG = {
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

export async function GET() {
  try {
    const redis = getRedisClient();
    if (redis) {
      try {
        const rawData = await redis.get('site-config');
        if (rawData) {
          const parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
          // Nur öffentliche Felder zurückgeben
          return NextResponse.json(
            {
              name: parsed.name || STATIC_CONFIG.name,
              phoneDisplay: parsed.phoneDisplay || STATIC_CONFIG.phoneDisplay,
              phoneHref: parsed.phoneHref || STATIC_CONFIG.phoneHref,
              address: parsed.address || STATIC_CONFIG.address,
              mapsLink: parsed.mapsLink || STATIC_CONFIG.mapsLink,
              facebook: parsed.facebook || STATIC_CONFIG.facebook,
              openingHoursText: parsed.openingHoursText || STATIC_CONFIG.openingHoursText,
              isClosed: parsed.isClosed || false,
              emergencyMessage: parsed.emergencyMessage || '',
              bannerText: parsed.bannerText || '',
              jackpot: parsed.jackpot || '',
              highlight: parsed.highlight || '',
              updatedAt: parsed.updatedAt || STATIC_CONFIG.updatedAt,
            },
            {
              headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }
      } catch {
        // Fallback to static
      }
    }

    return NextResponse.json(STATIC_CONFIG, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return NextResponse.json(STATIC_CONFIG);
  }
}
