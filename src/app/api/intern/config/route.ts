import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ✅ ARCHITEKTUR: Sicherer Pfad. 'public' ist auf Vercel zur Laufzeit schreibgeschützt.
// Wir nutzen einen lokalen Datenordner, der in Production sicher abgefangen wird.
const CONFIG_FILE = path.join(process.cwd(), 'src', 'data', 'intern-config.json');

const FALLBACK_CONFIG = {
  openingHours: {
    mondayFriday: '07:30 - 19:00 Uhr',
    saturday: '07:30 - 14:30 Uhr',
    sunday: 'Geschlossen',
  },
  bannerText:
    '🎉 Frische Brötchen, gekühlte Getränke & Ihr Hermes Paketshop direkt am Bürgerplatz! 🎉',
  emergencyMode: false,
};

function readConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch {
    // Fallback bei Lesefehlern
  }
  return FALLBACK_CONFIG;
}

// GET: Konfiguration abrufen (funktioniert immer)
export async function GET() {
  try {
    const config = readConfig();
    return NextResponse.json(config);
  } catch {
    return NextResponse.json(
      { error: 'Konfiguration konnte nicht geladen werden.' },
      { status: 500 }
    );
  }
}

// POST: Konfiguration aktualisieren
export async function POST(req: Request) {
  // 🛡️ ZERO-DEFECT GUARDRAIL: Vercel und Serverless-Plattformen erlauben keine Laufzeit-Dateischreibvorgänge.
  // Wir verhindern einen hässlichen 500er-Crash und geben eine professionelle Rückmeldung.
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

  try {
    const body = await req.json();
    const currentConfig = readConfig();
    const updatedConfig = { ...currentConfig, ...body };

    // Sicherstellen, dass der Ordner lokal existiert
    const dir = path.dirname(CONFIG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2), 'utf-8');
    return NextResponse.json({ success: true, config: updatedConfig });
  } catch {
    return NextResponse.json(
      { error: 'Konfiguration konnte nicht gespeichert werden.' },
      { status: 500 }
    );
  }
}
