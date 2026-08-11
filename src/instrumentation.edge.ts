import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  // PRIVACY FIRST: Mask PII for Medical/Kiosk environments
  beforeSend(event) {
    if (event.request && event.request.headers) {
      delete event.request.headers['Authorization'];
      delete event.request.headers['Cookie'];
    }
    return event;
  }
});