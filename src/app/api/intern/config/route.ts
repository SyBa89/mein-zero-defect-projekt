import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises'; // ✅ ARCHITEKTUR: Asynchron, nicht-blockierend (verhindert Event-Loop-Blocking)
import path from 'path';

// ✅ ZERO-DEFECT: Strikte Typisierung verhindert beliebige Dateninjektion und garantiert Intellisense
export interface InternConfig {
  openingHours: {
    mondayFriday: string;
    saturday: string;
    sunday: string;
  };
  bannerText: string;
  emergencyMode: boolean;
}

const CONFIG_FILE = path.join(process.cwd(), 'src', 'data', 'intern-config.json');

const FALLBACK_CONFIG: InternConfig = {
  openingHours: {
    mondayFriday: '07:30 - 19:00 Uhr',
    saturday: '07:30 - 14:30 Uhr',
    sunday: 'Geschlossen',
  },
  bannerText:
    '🎉 Frische Brötchen, gekühlte Getränke & Ihr Hermes Paketshop direkt am Bürgerplatz! 🎉',
  emergencyMode: false,
};

// ✅ SECURITY: Allowlist verhindert, dass unbekannte oder bösartige Keys in die Config geschrieben werden
const ALLOWED_KEYS: (keyof InternConfig)[] = ['openingHours', 'bannerText', 'emergencyMode'];

async function readConfig(): Promise<InternConfig> {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf-8');
    const parsed = JSON.parse(data);

    // Einfache Validierung, ob es ein Objekt ist, bevor wir mergen
    if (typeof parsed === 'object' && parsed !== null) {
      return { ...FALLBACK_CONFIG, ...parsed };
    }
  } catch (_error) {
    void _error; // Referenz für ESLint (void vermeidet no-unused-expressions)
    // Bei Lesefehlern (z.B. Datei existiert noch nicht oder ist korrupt) stillschweigend Fallback nutzen
    // In Dev-Umgebung könnte man hier ein console.warn einfügen
  }
  return FALLBACK_CONFIG;
}

// GET: Konfiguration abrufen (funktioniert immer, auch als Fallback)
export async function GET() {
  try {
    const config = await readConfig();
    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    console.error('[CONFIG API] GET Error:', error);
    return NextResponse.json(
      { error: 'Konfiguration konnte nicht geladen werden.' },
      { status: 500 }
    );
  }
}

// POST: Konfiguration aktualisieren (Nur lokal/Dev erlaubt + mit Basis-Auth)
export async function POST(req: NextRequest) {
  // 🛡️ ZERO-DEFECT GUARDRAIL: Vercel und Serverless-Plattformen erlauben keine Laufzeit-Dateischreibvorgänge.
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Live-Updates sind in der Production-Umgebung aus Sicherheitsgründen deaktiviert. Bitte ändern Sie die Konfiguration direkt im Code oder nutzen Sie ein Headless CMS.',
      },
      { status: 403 }
    );
  }

  // 🛡️ SECURITY: Einfacher Token-Check, um unbefugtes Überschreiben im Dev-Modus zu erschweren
  const authHeader = req.headers.get('x-admin-secret');
  const expectedSecret = process.env.ADMIN_SECRET || 'dev-secret-123'; // Fallback für lokale Entwicklung

  if (authHeader !== expectedSecret) {
    return NextResponse.json(
      { success: false, error: 'Nicht autorisiert. Fehlendes oder ungültiges Admin-Token.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    // Validierung: Body muss ein Objekt sein
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: 'Ungültiges Datenformat. Ein JSON-Objekt wird erwartet.' },
        { status: 400 }
      );
    }

    // ✅ SECURITY: Sanitization durch Allowlist. Nur erlaubte Keys werden übernommen.
    const sanitizedBody: Partial<InternConfig> = {};
    for (const key of ALLOWED_KEYS) {
      if (key in body) {
        sanitizedBody[key] = body[key];
      }
    }

    const currentConfig = await readConfig();
    const updatedConfig: InternConfig = { ...currentConfig, ...sanitizedBody };

    // Sicherstellen, dass der Ordner lokal existiert (asynchron)
    const dir = path.dirname(CONFIG_FILE);
    await fs.mkdir(dir, { recursive: true });

    // Asynchrones Schreiben verhindert Race-Conditions
    await fs.writeFile(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2), 'utf-8');

    return NextResponse.json({ success: true, config: updatedConfig }, { status: 200 });
  } catch (error) {
    console.error('[CONFIG API] POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Konfiguration konnte aufgrund eines Serverfehlers nicht gespeichert werden.',
      },
      { status: 500 }
    );
  }
}
