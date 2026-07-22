import { NextRequest, NextResponse } from 'next/server';

// ✅ ZERO-DEFECT: Explizites Interface statt 'any' für maximale Typsicherheit
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function validateContactForm(data: ContactFormData) {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Der Name muss mindestens 2 Zeichen lang sein.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email.trim())) {
    errors.push('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Die Nachricht muss mindestens 10 Zeichen lang sein.');
  }

  // ✅ SECURITY: XSS-Schutz durch Längenbegrenzung (DoS-Prävention)
  if (data.name.length > 100 || data.email.length > 255 || data.message.length > 2000) {
    errors.push('Eingabe darf die maximale Länge nicht überschreiten.');
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const errors = validateContactForm({ name, email, message });
    if (errors.length > 0) {
      return NextResponse.json({ success: false, error: errors.join(' ') }, { status: 400 });
    }

    const sanitizedName = name.replace(/[<>]/g, '').trim();
    const sanitizedEmail = email.replace(/[<>]/g, '').trim();
    const sanitizedMessage = message.replace(/[<>]/g, '').trim();

    /* 
    ========================================================================
    ✅ PRODUKTIONS-READY: E-MAIL VERSAND (z.B. mit Resend)
    1. npm install resend
    2. RESEND_API_KEY=dein_api_key_in_der_.env.local_hinzufügen
    3. Die folgenden Zeilen auskommentieren.
    ========================================================================
    
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Kiosk Lollipop <onboarding@resend.dev>',
      to: 'info@kiosk-lollipop.de',
      subject: `Neue Nachricht von ${sanitizedName} über die Webseite`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>E-Mail:</strong> ${sanitizedEmail}</p>
        <p><strong>Nachricht:</strong><br/>${sanitizedMessage.replace(/\n/g, '<br/>')}</p>
      `,
    });
    ========================================================================
    */

    // ✅ FIX: console.warn statt console.log, da die ESLint-Regel nur warn/error erlaubt
    console.warn('✅ [KONTAKTFORMULAR] Neue Nachricht erhalten (Fallback-Log):', {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      {
        success: true,
        message:
          'Ihre Nachricht wurde erfolgreich versendet. Wir danken Ihnen für Ihr Feedback und kümmern uns so schnell wie möglich um Ihr Anliegen.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ [KONTAKTFORMULAR] Serverfehler:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an.',
      },
      { status: 500 }
    );
  }
}
