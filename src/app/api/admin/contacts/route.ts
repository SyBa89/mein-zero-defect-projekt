import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

// ✅ LAZY FACTORY: Clients werden erst zur Laufzeit erstellt
function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn('[ADMIN-CONTACTS] Redis not configured');
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('[ADMIN-CONTACTS] Redis init error:', error);
    return null;
  }
}

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.warn('[ADMIN-CONTACTS] Resend not configured');
    return null;
  }

  try {
    return new Resend(key);
  } catch (error) {
    console.error('[ADMIN-CONTACTS] Resend init error:', error);
    return null;
  }
}

const isCI = process.env.CI === 'true';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'answered';
}

// ─── GET: Alle Kontakte laden (für Admin) ─────────────────────────────
export async function GET(_request: NextRequest) {
  try {
    const redis = getRedisClient();

    if (!redis) {
      console.warn('[ADMIN-CONTACTS] Redis not available');
      return NextResponse.json([]);
    }

    try {
      const contacts = await redis.get<Contact[]>('contacts');
      return NextResponse.json(contacts || []);
    } catch (redisError) {
      console.error('[ADMIN-CONTACTS] Redis read error:', redisError);
      return NextResponse.json({ error: 'Fehler beim Laden der Kontakte' }, { status: 500 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[ADMIN-CONTACTS] GET error:', message);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}

// ─── POST: Neuen Kontakt speichern ─────────────────────────────
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

    // ─── CI-SAFE ──────────────────────────────────────
    if (isCI) {
      console.log('[ADMIN-CONTACTS] CI mode - skipping save and email');
      return NextResponse.json({
        success: true,
        message: 'CI mode',
      });
    }

    // ─── REDIS ──────────────────────────────
    const redis = getRedisClient();

    if (!redis) {
      console.error('[ADMIN-CONTACTS] Redis not configured');
      return NextResponse.json(
        { success: false, error: 'Server-Konfigurationsfehler.' },
        { status: 500 }
      );
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: String(name),
      email: String(email),
      message: String(message),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    try {
      const existing = (await redis.get<Contact[]>('contacts')) || [];
      existing.unshift(newContact);
      const limited = existing.slice(0, 500);
      await redis.set('contacts', limited);
    } catch (redisError) {
      console.error('[ADMIN-CONTACTS] Redis write error:', redisError);
    }

    // ─── EMAIL ───────────
    const resend = getResendClient();

    if (resend) {
      try {
        const { error } = await resend.emails.send({
          from: 'Kiosk Lollipop <noreply@kiosk-lollipop.de>',
          to: ['lol111@live.de'],
          subject: `Neue Kontaktanfrage von ${name}`,
          replyTo: String(email),
          html: `
            <h2>Neue Nachricht</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Nachricht:</strong></p>
            <p>${String(message).replace(/\n/g, '<br>')}</p>
          `,
          text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
        });

        if (error) {
          console.error('[ADMIN-CONTACTS] Resend error:', error);
        }
      } catch (emailError) {
        console.error('[ADMIN-CONTACTS] Email error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Kontakt erfolgreich gespeichert',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[ADMIN-CONTACTS] POST error:', message);
    return NextResponse.json(
      { success: false, error: 'Ein interner Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}

// ─── DELETE ─────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('id');

    if (!contactId) {
      return NextResponse.json({ error: 'Kontakt-ID erforderlich' }, { status: 400 });
    }

    const redis = getRedisClient();

    if (!redis) {
      return NextResponse.json({ error: 'Server nicht konfiguriert' }, { status: 500 });
    }

    try {
      const contacts = (await redis.get<Contact[]>('contacts')) || [];
      const filtered = contacts.filter((c) => c.id !== contactId);
      await redis.set('contacts', filtered);

      return NextResponse.json({ success: true });
    } catch (redisError) {
      console.error('[ADMIN-CONTACTS] Redis delete error:', redisError);
      return NextResponse.json({ error: 'Fehler beim Löschen' }, { status: 500 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[ADMIN-CONTACTS] DELETE error:', message);
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 });
  }
}
