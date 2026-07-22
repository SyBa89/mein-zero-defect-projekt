import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// ✅ ZERO-DEFECT: Strikte Typisierung des Request-Bodies
interface AuthRequestBody {
  password?: string;
}

/**
 * ✅ SECURITY: Verhindert Timing-Attacken.
 * Vergleicht zwei Strings in konstanter Zeit, indem er sie zuerst hasht
 * und dann die Hashes mit timingSafeEqual vergleicht.
 */
function secureCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export async function POST(request: NextRequest) {
  try {
    // 1. Sicheres Parsen des JSON-Bodies (fängt malformed JSON ab)
    let body: AuthRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Ungültiges Anfrageformat.' },
        { status: 400 }
      );
    }

    const { password } = body;

    // 2. Validierung: Passwort muss ein nicht-leerer String sein
    if (typeof password !== 'string' || password.trim() === '') {
      // Generische Meldung verhindert Enumeration
      return NextResponse.json(
        { success: false, message: 'Ungültige Anmeldeinformationen.' },
        { status: 401 }
      );
    }

    // 3. Umgebungsvariable prüfen
    const correctPassword = process.env.INTERN_PASSWORD;
    if (!correctPassword) {
      // Kritischer Fehler, aber kein Passwort leaken
      console.error('[SECURITY] INTERN_PASSWORD ist in den Umgebungsvariablen nicht konfiguriert.');
      return NextResponse.json(
        { success: false, message: 'Server-Konfigurationsfehler.' },
        { status: 500 }
      );
    }

    // 4. Sicherer Vergleich (Timing-Attack-sicher)
    const isValid = secureCompare(password.trim(), correctPassword);

    if (isValid) {
      // ✅ ERFOLG: Klare, positive Bestätigung
      return NextResponse.json(
        { success: true, message: 'Anmeldung erfolgreich.' },
        { status: 200 }
      );
    } else {
      // ✅ FEHLER: Künstliche Verzögerung (300ms) zur Abwehr von Brute-Force-Angriffen
      await new Promise((resolve) => setTimeout(resolve, 300));

      return NextResponse.json(
        { success: false, message: 'Ungültige Anmeldeinformationen.' },
        { status: 401 }
      );
    }
  } catch (error) {
    // ✅ COMPLIANCE: Niemals das Passwort oder den rohen Body loggen!
    const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
    console.error('[AUTH API] Unerwarteter Serverfehler:', errorMessage);

    return NextResponse.json(
      { success: false, message: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
