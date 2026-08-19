import { NextResponse } from 'next/server';
import { getEffectiveConfig } from '@/lib/config-loader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * PUBLIC CONFIG ENDPOINT (Client-Side Live-Update)
 * Liefert static Config + Redis-Override (merged).
 */
export async function GET() {
  try {
    // ZERO-DEFECT: Konsistenz mit layout.tsx SSR
    // getEffectiveConfig() liefert: staticConfig + override (theme/openingHours/banners/sections)
    const config = await getEffectiveConfig();
    
    return NextResponse.json(config, {
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[PUBLIC CONFIG] Error:', message);
    return NextResponse.json({ error: 'Config konnte nicht geladen werden' }, { status: 500 });
  }
}
