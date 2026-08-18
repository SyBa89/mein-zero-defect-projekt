import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getEffectiveConfig } from '@/lib/config-loader';
import { verifySessionToken, hasPermission } from '@/lib/auth';
import { setConfigOverride, ConfigOverride } from '@/lib/config-override';
import { OverrideSchema } from '@/lib/schemas/override.schema';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const effective = await getEffectiveConfig();
    const publicConfig = {
      brand: effective.brand,
      contact: effective.contact,
      business: effective.business,
      theme: effective.theme,
      openingHours: effective.openingHours,
      banners: effective.banners,
      sections: effective.sections,
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

export async function POST(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  const session = token ? verifySessionToken(token) : null;
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  if (!hasPermission(session.role, 'edit-config'))
    return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object')
    return NextResponse.json({ error: 'Ungültiger Body' }, { status: 400 });

  const parsed = OverrideSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      {
        error: 'Ungültige Felder',
        count: parsed.error.issues.length,
        issues: parsed.error.issues.map((i) => i.path.join('.') || '(root)'),
      },
      { status: 422 }
    );

  const d = parsed.data;
  const override: ConfigOverride = {
    ...(d.openingHours !== undefined ? { openingHours: d.openingHours } : {}),
    ...(d.banners !== undefined ? { banners: d.banners } : {}),
    ...(d.sections !== undefined ? { sections: d.sections } : {}),
    ...(typeof d.emergencyMessage === 'string' ? { emergencyMessage: d.emergencyMessage } : {}),
    ...(typeof d.isClosed === 'boolean' ? { isClosed: d.isClosed } : {}),
    ...(d.theme !== undefined ? { theme: d.theme } : {}),
  };

  const ok = await setConfigOverride(override);
  if (!ok)
    return NextResponse.json(
      { success: false, error: 'Redis nicht verfügbar – Live-Speichern deaktiviert.' },
      { status: 503 }
    );

  console.info('[AUDIT] config override saved', {
    role: session.role,
    at: new Date().toISOString(),
  });

  revalidatePath('/');
  revalidateTag('config');
  revalidatePath('/kontakt');

  const effective = await getEffectiveConfig();
  return NextResponse.json({ success: true, config: effective });
}