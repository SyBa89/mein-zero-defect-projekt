import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.INTERN_PASSWORD;

    if (!correctPassword) {
      console.error('🚨 ZERO-DEFECT ALERT: INTERN_PASSWORD ist nicht in .env.local definiert!');
      return NextResponse.json(
        { success: false, error: 'Server-Konfigurationsfehler' },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    }

    // ✅ SECURITY: Künstliche Verzögerung bei falschem Passwort, um Brute-Force-Angriffe zu erschweren
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ success: false, error: 'Falsches Passwort.' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Ungültige Anfrage.' }, { status: 400 });
  }
}
