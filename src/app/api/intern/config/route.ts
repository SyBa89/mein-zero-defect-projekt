import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), 'public', 'intern-config.json');

// Standard-Konfiguration
const DEFAULT_CONFIG = {
  openingHours: {
    mondayFriday: '07:30 - 19:00 Uhr',
    saturday: '07:30 - 14:30 Uhr',
    sunday: 'Geschlossen',
  },
  bannerText:
    '🎉 Frische Brötchen, gekühlte Getränke & Ihr Hermes Paketshop direkt am Bürgerplatz! 🎉',
  emergencyMode: false,
};

// Hilfsfunktion zum Lesen der Konfiguration
function readConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch {
    // Datei existiert nicht oder ist korrupt
  }
  // Fallback: Standard-Konfiguration speichern
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
  return DEFAULT_CONFIG;
}

// GET: Konfiguration abrufen
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
  try {
    const body = await req.json();
    const currentConfig = readConfig();

    // Nur erlaubte Felder überschreiben
    const updatedConfig = {
      ...currentConfig,
      ...body,
    };

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2), 'utf-8');
    return NextResponse.json({ success: true, config: updatedConfig });
  } catch {
    return NextResponse.json(
      { error: 'Konfiguration konnte nicht gespeichert werden.' },
      { status: 500 }
    );
  }
}
