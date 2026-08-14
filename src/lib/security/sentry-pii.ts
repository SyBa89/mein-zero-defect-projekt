// src/lib/security/sentry-pii.ts
// ✅ ZERO-DEFECT: Shared PII-Sanitization für Sentry (Server + Edge)
// ✅ DSGVO: Entfernt personenbezogene Daten VOR dem Upload an Sentry
// ✅ DRY: Eine Quelle für beide Runtimes (server.ts + edge.ts)
// ✅ TYPE-SAFE: Generikum erhält den konkreten Event-Typ
//    (ErrorEvent für beforeSend, TransactionEvent für beforeSendTransaction)

import * as Sentry from '@sentry/nextjs';

// Query-Parameter die Tokens/Credentials enthalten können
const SENSITIVE_QUERY_PARAMS = [
  'access_token',
  'api_key',
  'apikey',
  'token',
  'session_id',
  'sessionid',
  'auth',
  'password',
  'secret',
  'jwt',
];

// HTTP-Header die PII/Credentials enthalten
const SENSITIVE_HEADERS = [
  'authorization',
  'proxy-authorization',
  'cookie',
  'set-cookie',
  'x-forwarded-for',
  'x-real-ip',
  'x-client-ip',
];

/**
 * Entfernt PII aus einem Sentry-Event BEVOR es an Sentry gesendet wird.
 * Generisch: erhält ErrorEvent / TransactionEvent / Event exakt.
 * Defensive Implementierung - crasht nie bei ungewöhnlichen Events.
 */
export function sanitizePii<T extends Sentry.Event>(event: T): T {
  // 1. Request-Headers sanitizen
  if (event.request?.headers) {
    const headers = event.request.headers as Record<string, unknown>;
    for (const key of Object.keys(headers)) {
      if (SENSITIVE_HEADERS.includes(key.toLowerCase())) {
        delete headers[key];
      }
    }
  }

  // 2. Request-Cookies Objekt löschen
  if (event.request?.cookies) {
    delete event.request.cookies;
  }

  // 3. Query-Parameter sanitizen (URLs können Tokens in ?access_token=... haben)
  if (event.request?.url) {
    try {
      const url = new URL(event.request.url);
      for (const param of SENSITIVE_QUERY_PARAMS) {
        if (url.searchParams.has(param)) {
          url.searchParams.set(param, '[REDACTED]');
        }
      }
      event.request.url = url.toString();
    } catch {
      // Ungültige URL - ignorieren, nicht crashen
    }
  }

  // 4. Request-Data (POST-Body) ersetzen falls vorhanden
  if (event.request?.data) {
    event.request.data = '[REDACTED]';
  }

  // 5. User-Objekt sanitizen (Sentry extrahiert manchmal IP/E-Mail)
  if (event.user) {
    delete event.user.ip_address;
    delete event.user.username;
    delete event.user.email;
    // ID darf bleiben (keine PII, nötig für Debugging)
  }

  // 6. Breadcrumbs können PII enthalten
  if (event.breadcrumbs) {
    for (const crumb of event.breadcrumbs) {
      if (crumb.data) {
        delete (crumb.data as Record<string, unknown>).url;
        delete (crumb.data as Record<string, unknown>).Authorization;
      }
    }
  }

  return event;
}