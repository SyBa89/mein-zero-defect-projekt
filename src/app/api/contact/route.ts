import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ✅ ZERO-DEFECT: Resend-Client initialisieren (API-Key aus .env.local)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // ✅ SECURITY: Honeypot-Feld prüfen (Spam-Abwehr)
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: false, error: 'Spam erkannt.' }, { status: 400 });
    }

    // ✅ VALIDIERUNG: Grundlegende Prüfungen (werden auch im Client gemacht, aber Sicherheitsschicht)
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Alle Felder müssen ausgefüllt sein.' },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name muss zwischen 2 und 100 Zeichen lang sein.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Die Nachricht muss zwischen 10 und 2000 Zeichen lang sein.' },
        { status: 400 }
      );
    }

    // ✅ E-MAIL VERSENDEN (mit Resend)
    const { data, error } = await resend.emails.send({
      from: 'Kiosk Lollipop <noreply@kiosk-lollipop.de>',
      to: ['lol111@live.de'],
      subject: `Neue Kontaktanfrage von ${name}`,
      replyTo: email,
      html: `
        <h2>Neue Nachricht über das Kontaktformular</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    });

    if (error) {
      console.error('[KONTAKT] Resend-Fehler:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
        },
        { status: 500 }
      );
    }

    console.warn('[KONTAKT] E-Mail erfolgreich gesendet:', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[KONTAKT] Server-Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Ein interner Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
