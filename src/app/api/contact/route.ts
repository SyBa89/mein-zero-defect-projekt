import { ContactFormSchema, safeValidate } from '@/lib/security/validation';
import { getTenantConfig } from '@/lib/config-loader';
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

// ✅ FIX (SECURITY): HTML-Escaping verhindert Stored-XSS in Admin-Postfach
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ✅ FIX (WHITE-LABEL): E-Mail-Ziele aus Tenant-Config statt hardcodiert
function getMailTargets(): { from: string; to: string } {
  let brandName = 'Kontakt';
  let contactEmail = 'info@kiosk-lollipop.de';
  try {
    const config = getTenantConfig();
    brandName = config.brand.name;
    contactEmail = config.contact.email;
  } catch {
    // Fallback bleibt bestehen (Default-Tenant)
  }
  return {
    from: process.env.RESEND_FROM || `${brandName} <noreply@kiosk-lollipop.de>`,
    to: process.env.CONTACT_EMAIL || contactEmail,
  };
}

// ✅ CI-SAFE: Wenn CI=true, nutze Mock statt echter API-Calls
const isCI = process.env.CI === 'true';

// Rate-Limiting-Konfiguration
const RATE_LIMIT = 5; // max. 5 Anfragen
const RATE_LIMIT_WINDOW = 60; // pro 60 Sekunden

export async function POST(request: NextRequest) {
  // ✅ ZERO-DEFECT: Parse JSON Body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiges JSON' }, { status: 400 });
  }

  // ✅ HONEYPOT ANTI-SPAM
  const { honeypot } = body as { honeypot?: string };
  if (honeypot && String(honeypot).length > 0) {
    return NextResponse.json({ success: false, error: 'Spam erkannt.' }, { status: 400 });
  }

  // ✅ ZOD VALIDATION (Single Source of Truth)
  const validation = safeValidate(ContactFormSchema, body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    // ✅ Type-safe Destructuring aus validierten Daten
    const { name, email, message } = validation.data;

    // ✅ CI Mode - Skip Email Send in Test-Umgebung
    if (isCI) {
      console.log('[CONTACT] CI mode - skipping email send');
      return NextResponse.json({
        success: true,
        message: 'CI mode - email not sent',
      });
    }

    // ✅ RATE LIMITING (IP-basiert, Redis Sliding Window)
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

    // ✅ E-MAIL VERSENDEN (Resend API)
    const resend = getResendClient();

    if (!resend) {
      console.error('[CONTACT] Resend API key missing');
      return NextResponse.json(
        {
          success: false,
          error:
            'E-Mail-Service nicht konfiguriert. Bitte kontaktieren Sie uns telefonisch.',
        },
        { status: 500 }
      );
    }

    // ✅ FIX: White-Label Targets + HTML-Escaping
    const { from, to } = getMailTargets();
    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, '<br>');

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Neue Kontaktanfrage von ${name}`,
      replyTo: String(email),
      html: `
        <h2>Neue Nachricht über das Kontaktformular</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>E-Mail:</strong> ${safeEmail}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${safeMessage}</p>
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