import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Passwort aus Umgebungsvariable lesen
    const correctPassword = process.env.INTERN_PASSWORD;

    // Sicherheits-Check: Falls kein Passwort konfiguriert ist
    if (!correctPassword) {
      console.error('INTERN_PASSWORD ist nicht konfiguriert!');
      return NextResponse.json(
        { success: false, error: 'Server-Konfigurationsfehler' },
        { status: 500 }
      );
    }

    // Passwort prüfen
    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Falsches Passwort.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth-Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
