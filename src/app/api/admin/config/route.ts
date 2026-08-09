import { NextResponse } from 'next/server';
import { getClientConfig } from '@/lib/config-loader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * PUBLIC CONFIG ENDPOINT (MIGRIERT AUF ZERO-DEFECT SYSTEM)
 *
 * Liefert die aktuelle, business-aware ClientConfig aus.
 * Keine hartcodierten Kiosk-Daten mehr. Single Source of Truth ist configs/{type}.json.
 */
export async function GET() {
  try {
    const config = getClientConfig();

    // Wir geben nur die für das Frontend relevanten, öffentlichen Teile zurück
    const publicConfig = {
      brand: config.brand,
      contact: config.contact,
      business: config.business,
      openingHours: config.openingHours,
      banners: config.banners,
      sections: config.sections,
    };

    return NextResponse.json(publicConfig, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[PUBLIC CONFIG] Error:', message);
    return NextResponse.json({ error: 'Config konnte nicht geladen werden' }, { status: 500 });
  }
}
