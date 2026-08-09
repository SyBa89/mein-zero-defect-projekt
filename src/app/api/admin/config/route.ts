import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { verifySessionToken, hasPermission } from '@/lib/auth';
import { validateClientConfig, type ClientConfig } from '@/lib/schemas/client-config.schema';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CONFIGS_DIR = path.join(process.cwd(), 'configs');

function getConfigPath(): string {
  const clientType = process.env.CLIENT_TYPE || 'kiosk';
  return path.join(CONFIGS_DIR, `${clientType}.json`);
}

function readConfig(): ClientConfig | null {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) return null;
  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    // Zero-Defect: Validierung beim Lesen
    return validateClientConfig(JSON.parse(raw));
  } catch (error) {
    console.error('[CONFIG] Read/Validate error:', error);
    return null;
  }
}

function writeConfig(config: ClientConfig): void {
  const configPath = getConfigPath();
  // Zero-Defect: Node.js 'utf-8' schreibt OHNE BOM.
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}

// ─── GET: Config laden ──────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value;
    const sessionUser = token ? verifySessionToken(token) : null;

    if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const config = readConfig();
    if (!config) {
      return NextResponse.json({ error: 'Config file not found or invalid' }, { status: 404 });
    }

    return NextResponse.json(config);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[CONFIG] GET error:', message);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}

// ─── POST: Config speichern ─────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value;
    const sessionUser = token ? verifySessionToken(token) : null;

    if (!sessionUser || !hasPermission(sessionUser.role, 'edit-config')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Zero-Defect: Zod validiert VOR dem Speichern. Kaputte Configs craschen hier, nicht auf der Website.
    const validatedConfig = validateClientConfig(body);

    writeConfig(validatedConfig);

    // Next.js Cache invalidieren, damit die Website die Änderungen sofort sieht
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      config: validatedConfig,
      message: 'Konfiguration erfolgreich in JSON gespeichert.',
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('Invalid ClientConfig')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[CONFIG] POST error:', message);
    return NextResponse.json({ error: 'Server-Fehler beim Speichern' }, { status: 500 });
  }
}
