import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { validateClientConfig } from '@/lib/schemas/client-config.schema';
import { CLIENT_CONFIG as FALLBACK_CONFIG } from '@/lib/client.config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ═══════════════════════════════════════════════════════════════
// WHITE-LABEL CLIENT CONFIG ENDPOINT
// ═══════════════════════════════════════════════════════════════
// Liefert die komplette ClientConfig basierend auf CLIENT_TYPE ENV
// Verwendet von: ConfigProvider für alle Client Components
//
// Strategie:
// 1. Lade configs/{CLIENT_TYPE}.json
// 2. Validiere mit Zod
// 3. Fallback auf client.config.ts

const CONFIGS_DIR = path.join(process.cwd(), 'configs');

export async function GET() {
  try {
    const clientType = process.env.CLIENT_TYPE || 'kiosk';
    const configPath = path.join(CONFIGS_DIR, clientType + '.json');

    if (fs.existsSync(configPath)) {
      try {
        const rawConfig = fs.readFileSync(configPath, 'utf-8');
        const parsedConfig = JSON.parse(rawConfig);
        const validated = validateClientConfig(parsedConfig);

        return NextResponse.json(validated, {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error('/api/client-config: Validation failed, using fallback:', errorMessage);
      }
    }

    // Fallback to client.config.ts
    return NextResponse.json(FALLBACK_CONFIG, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('/api/client-config: Unexpected error:', errorMessage);
    return NextResponse.json(FALLBACK_CONFIG);
  }
}
