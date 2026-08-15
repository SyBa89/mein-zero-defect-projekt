import { NextResponse } from 'next/server';
import { getClientConfig } from '@/lib/config-loader';
import { getConfigOverride } from '@/lib/config-override';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * PUBLIC CONFIG ENDPOINT (Client-Side Live-Update)
 * Liefert static Config + Redis-Override (merged).
 */
export async function GET() {
  try {
    const staticConfig = getClientConfig();
    const override = await getConfigOverride();
    const merged = { ...staticConfig } as Record<string, unknown>;
    if (override?.openingHours) merged.openingHours = override.openingHours;
    if (override?.banners) merged.banners = { ...(staticConfig.banners as object), ...(override.banners as object) };
    return NextResponse.json(merged, {
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[PUBLIC CONFIG] Error:', message);
    return NextResponse.json({ error: 'Config konnte nicht geladen werden' }, { status: 500 });
  }
}