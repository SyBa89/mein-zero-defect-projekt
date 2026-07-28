import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

// ✅ LAZY FACTORY: Clients werden erst zur Laufzeit erstellt (nicht beim Build)
function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[CONTACT] Redis not configured - missing env vars');
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('[CONTACT] Redis init error:', error);
    return null;
  }
}

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.warn('[CONTACT] Resend not configured - missing RESEND_API_KEY');
    return null;
  }

  try {
    return new Resend(key);
  } catch (error) {
    console.error('[CONTACT] Resend init error:', error);
    return null;
  }
}

// ✅ CI-SAFE: Wenn CI=true, nutze Mock statt echter API-Calls
const isCI = process.env.CI === 'true';

// Rate-Limiting-Konfiguration
const RATE_LIMIT = 5; // max. 5 Anfragen
const RATE_LIMIT_WINDOW = 60; // pro 60 Sekunden

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // ─── SECURITY: Honeypot ──────────────────────────────────────
    if (honeypot && String(honeypot).length > 0) {
      return NextResponse.json({ success: false, error: 'Spam erkannt.' }, { status: 400 });
    }

    // ─── VALIDIERUNG ─────────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Alle Felder müssen ausgefüllt sein.' },
        { status: 400 }
      );
    }

    if (String(name).length < 2 || String(name).length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name muss zwischen 2 und 100 Zeichen lang sein.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(String(email))) {
      return NextResponse.json(
        { success: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    if (String(message).length < 10 || String(message).length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Die Nachricht muss zwischen 10 und 2000 Zeichen lang sein.' },
        { status: 400 }
      );
    }

    // ─── CI-SAFE: Im CI-Modus erfolgreich zurückgeben ohne echte API-Calls ──
    if (isCI) {
      console.log('[CONTACT] CI mode - skipping email send');
      return NextResponse.json({
        success: true,
        message: 'CI mode - email not sent',
      });
    }

    // ─── RATE LIMITING (IP-basiert) ─────────────────────────────
    const redis = getRedisClient();

    if (redis) {
      const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        'unknown';
      const key = `rate-limit:contact:${ip}`;

      try {
        const current = await redis.get<number>(key);
        const count = current ?? 0;

        if (count >= RATE_LIMIT) {
          return NextResponse.json(
            { success: false, error: 'Zu viele Anfragen. Bitte warten Sie einen Moment.' },
            { status: 429 }
          );
        }

        if (count === 0) {
          await redis.set(key, 1, { ex: RATE_LIMIT_WINDOW });
        } else {
          await redis.incr(key);
        }
      } catch (redisError) {
        console.error('[CONTACT] Redis rate-limit error:', redisError);
        // Redis-Fehler ignorieren - Rate-Limiting ist nice-to-have
      }
    }

    // ─── E-MAIL VERSENDEN ────────────────────────────────────────
    const resend = getResendClient();

    if (!resend) {
      console.error('[CONTACT] Resend API key missing');
      return NextResponse.json(
        {
          success: false,
          error:
            'E-Mail-Service nicht konfiguriert. Bitte kontaktieren Sie uns telefonisch unter 02235 9291160.',
        },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Kiosk Lollipop <noreply@kiosk-lollipop.de>',
      to: ['lol111@live.de'],
      subject: `Neue Kontaktanfrage von ${name}`,
      replyTo: String(email),
      html: `
        <h2>Neue Nachricht über das Kontaktformular</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
        <p><small>Empfangen: ${new Date().toLocaleString('de-DE')}</small></p>
      `,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    });

    if (error) {
      console.error('[CONTACT] Resend send error:', error);
      return NextResponse.json(
        {
          success: false,
          error:
            'E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.',
        },
        { status: 500 }
      );
    }

    console.log('[CONTACT] E-Mail erfolgreich gesendet:', data?.id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[CONTACT] Unexpected error:', message);
    return NextResponse.json(
      { success: false, error: 'Ein interner Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
