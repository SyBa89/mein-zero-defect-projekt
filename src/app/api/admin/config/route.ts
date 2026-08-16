import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getClientConfig } from '@/lib/config-loader';
import { verifySessionToken, hasPermission } from '@/lib/auth';
import { getConfigOverride, setConfigOverride, ConfigOverride } from '@/lib/config-override';
// ZERO-DEFECT HARDENING: Schema-Validation vor Persistenz (Name vom Skript aufgelöst)
import { ClientConfigSchema } from '@/lib/schemas/client-config.schema';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ZERO-DEFECT HARDENING: nur erlaubte Felder; Single Source of Truth = Schema
const OverrideSchema = ClientConfigSchema.pick({ openingHours: true, banners: true }).partial();

function buildPublicConfig() {
  const config = getClientConfig();
  return {
    brand: config.brand, contact: config.contact, business: config.business,
    openingHours: config.openingHours, banners: config.banners, sections: config.sections,
  };
}

export async function GET() {
  try {
    const publicConfig = buildPublicConfig() as Record<string, unknown>;
    const override = await getConfigOverride();
    if (override?.openingHours) publicConfig.openingHours = override.openingHours;
    if (override?.banners) publicConfig.banners = override.banners;
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

export async function POST(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  const session = token ? verifySessionToken(token) : null;
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  if (!hasPermission(session.role, 'edit-config'))
    return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object')
    return NextResponse.json({ error: 'Ungültiger Body' }, { status: 400 });

  // ZERO-DEFECT HARDENING: Zod-Validation VOR Persistenz
  const parsed = OverrideSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: 'Ungültige Felder', count: parsed.error.issues.length },
      { status: 422 }
    );

  const override = parsed.data as ConfigOverride;
  const ok = await setConfigOverride(override);
  if (!ok)
    return NextResponse.json(
      { success: false, error: 'Redis nicht verfügbar – Live-Speichern deaktiviert.' },
      { status: 503 }
    );

  // ZERO-DEFECT HARDENING: Audit-Log ohne PII
  console.info('[AUDIT] config override saved', {
    role: session.role,
    at: new Date().toISOString(),
  });

  revalidatePath('/');
  revalidatePath('/kontakt');

  const publicConfig = buildPublicConfig() as Record<string, unknown>;
  if (override.openingHours) publicConfig.openingHours = override.openingHours;
  if (override.banners) publicConfig.banners = override.banners;
  return NextResponse.json({ success: true, config: publicConfig });
}