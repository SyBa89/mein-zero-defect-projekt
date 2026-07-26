import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ─── Minimal-Version: Nur JWT-Check + statische Config ──────────────
// Diese Version testet NUR:
// 1. JWT-Cookie wird korrekt gelesen
// 2. Session-Validierung funktioniert
// 3. Response wird korrekt zurückgegeben
// KEIN Redis, KEINE externen Dependencies

export async function GET(request: NextRequest) {
  try {
    console.log('[CONFIG MINIMAL] GET request received');

    const token = request.cookies.get('session')?.value;
    console.log('[CONFIG MINIMAL] Token:', token ? 'present' : 'missing');

    const sessionUser = token ? verifySessionToken(token) : null;
    console.log('[CONFIG MINIMAL] Session user:', sessionUser);

    if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
      console.log('[CONFIG MINIMAL] Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[CONFIG MINIMAL] Returning static config');

    // Statische Config (kein Redis!)
    return NextResponse.json({
      isClosed: false,
      bannerText: '',
      emergencyMessage: '',
      name: 'Kiosk Lollipop (Test)',
      phoneDisplay: '02235 9291160',
      phoneHref: 'tel:+4922359291160',
      address: 'Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar',
      mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683',
      facebook: 'https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/',
      openingHoursText: 'Mo-Fr 07:30-19:00, Sa 07:30-14:30',
      jackpot: '45.000.000',
      highlight: '🎉 Test-Highlight!',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[CONFIG MINIMAL] Error:', error);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // POST deaktiviert für Test
  return NextResponse.json({ error: 'Test-Modus: POST deaktiviert' }, { status: 503 });
}
