import * as Sentry from '@sentry/nextjs';
import { sanitizePii } from '@/lib/security/sentry-pii';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,

  // ✅ DSGVO: Privacy-First PII-Masking (Server-Runtime)
  beforeSend(event) {
    return sanitizePii(event);
  },

  // ✅ Zusätzlich: beforeSendTransaction für Tracing-Daten
  beforeSendTransaction(event) {
    return sanitizePii(event);
  },
});