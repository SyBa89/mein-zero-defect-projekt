import { NextRequest, NextResponse } from 'next/server';

// ✅ ZERO-DEFECT: Explizites Interface mit Honeypot für maximale Typsicherheit und Spam-Prävention
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string; // Unsichtbares Feld für Anti-Spam-Bots
}

// ✅ SECURITY: Robuste HTML-Escaping-Funktion zur Verhinderung von XSS in E-Mail-Clients
function escapeHtml(unsafe: string): string {
  return unsafe.replace(/[&<>"']/g, (m) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return map[m];
  });
}

function validateContactForm(data: ContactFormData): string[] {
  const errors: string[] = [];

  // Name Validierung
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Der Name ist ungültig.');
  } else {
    const trimmedName = data.name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      errors.push('Der Name muss zwischen 2 und 100 Zeichen lang sein.');
    }
  }

  // E-Mail Validierung
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Die E-Mail-Adresse ist ungültig.');
  } else {
    const trimmedEmail = data.email.trim();
    if (!emailRegex.test(trimmedEmail)) {
      errors.push('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    } else if (trimmedEmail.length > 255) {
      errors.push('Die E-Mail-Adresse ist zu lang.');
    }
  }

  // Nachricht Validierung
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Die Nachricht ist ungültig.');
  } else {
    const trimmedMessage = data.message.trim();
    if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      errors.push('Die Nachricht muss zwischen 10 und 2000 Zeichen lang sein.');
    }
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    // ✅ ARCHITEKTUR: Abfangen von malformed JSON, um 500er Serverfehler zu vermeiden
    let body: unknown;
    try {
      body = await request.json();
    } catch (_parseError) {
      void _parseError; // Referenz für ESLint (void vermeidet no-unused-expressions)
      return NextResponse.json(
        { success: false, error: 'Ungültiges Datenformat. Bitte überprüfen Sie Ihre Eingabe.' },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = body as ContactFormData;

    // ✅ SECURITY: Honeypot Anti-Spam-Check.
    // Wenn ein Bot das unsichtbare Feld ausfüllt, geben wir einen gefälschten Erfolg zurück,
    // um den Bot zu täuschen, verarbeiten die Daten aber nicht weiter.
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const errors = validateContactForm({ name, email, message });
    if (errors.length > 0) {
      return NextResponse.json({ success: false, error: errors.join(' ') }, { status: 400 });
    }

    // ✅ SECURITY: Umfassende Bereinigung der Daten vor der Weiterverarbeitung
    const sanitizedName = escapeHtml(name.trim());
    const sanitizedEmail = escapeHtml(email.trim());
    const sanitizedMessage = escapeHtml(message.trim());

    /* 
    ========================================================================
    ✅ PRODUKTIONS-READY: E-MAIL VERSAND (z.B. mit Resend)
    1. npm install resend
    2. RESEND_API_KEY=dein_api_key_in_der_.env.local_hinzufügen
    3. Die folgenden Zeilen auskommentieren und den Fallback-Block entfernen.
    ========================================================================
    
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Kiosk Lollipop <onboarding@resend.dev>', // Ersetze mit deiner verifizierten Domain
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

    // ✅ FALLBACK: Simulierter Erfolg für Entwicklungsphase oder wenn E-Mail-Service noch nicht konfiguriert ist
    console.warn('✅ [KONTAKTFORMULAR] Neue Nachricht erhalten (Fallback-Log):', {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
    });

    // Simulierte Netzwerkverzögerung für realistische UX im Frontend (kann in Produktion entfernt werden)
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
    // ✅ SECURITY: Generische Fehlermeldung, um keine internen Serverdetails preiszugeben
    console.error('❌ [KONTAKTFORMULAR] Unerwarteter Serverfehler:', error);
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
