import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

// ✅ Rate Limiting: Redis-Client initialisieren
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// ✅ Resend-Client
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate-Limiting-Konfiguration
const RATE_LIMIT = 5; // max. 5 Anfragen
const RATE_LIMIT_WINDOW = 60; // pro 60 Sekunden

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // ─── SECURITY: Honeypot ──────────────────────────────────────
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: false, error: 'Spam erkannt.' }, { status: 400 });
    }

    // ─── VALIDIERUNG ─────────────────────────────────────────────
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

    // ─── RATE LIMITING (IP-basiert) ─────────────────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const key = `rate-limit:contact:${ip}`;

    const current = await redis.get<number>(key);
    const count = current ?? 0;

    if (count >= RATE_LIMIT) {
      return NextResponse.json(
        { success: false, error: 'Zu viele Anfragen. Bitte warten Sie einen Moment.' },
        { status: 429 }
      );
    }

    // Zähler erhöhen und TTL setzen (falls neu)
    if (count === 0) {
      await redis.set(key, 1, { ex: RATE_LIMIT_WINDOW });
    } else {
      await redis.incr(key);
    }

    // ─── E-MAIL VERSENDEN ────────────────────────────────────────
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
      console.error('[ERROR]', error);
      return NextResponse.json(
        {
          success: false,
          error: 'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
        },
        { status: 500 }
      );
    }

    // ✅ Korrektur: console.warn statt console.log (ESLint-Regel no-console)
    console.warn('[KONTAKT] E-Mail erfolgreich gesendet:', data);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('[ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Ein interner Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
