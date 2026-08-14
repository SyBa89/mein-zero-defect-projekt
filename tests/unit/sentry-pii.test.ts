// tests/unit/sentry-pii.test.ts
// ✅ ZERO-DEFECT: Tests für PII-Sanitization
// Stellt sicher dass KEINE personenbezogenen Daten an Sentry gesendet werden
import { describe, it, expect } from 'vitest';
import { sanitizePii } from '@/lib/security/sentry-pii';
import type { Event } from '@sentry/nextjs';

function makeEvent(overrides: Partial<Event> = {}): Event {
  return {
    event_id: 'test-event-id',
    timestamp: Date.now(),
    platform: 'node',
    ...overrides,
  };
}

describe('sentry-pii: sanitizePii', () => {
  describe('Request-Headers', () => {
    it('entfernt Authorization-Header', () => {
      const event = makeEvent({
        request: {
          headers: {
            Authorization: 'Bearer secret-token-xyz',
            'Content-Type': 'application/json',
          },
        },
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.request?.headers?.Authorization).toBeUndefined();
      expect(sanitized.request?.headers?.['Content-Type']).toBe('application/json');
    });

    it('entfernt Cookie-Header', () => {
      const event = makeEvent({
        request: {
          headers: { Cookie: 'session=abc123; user=john' },
        },
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.request?.headers?.Cookie).toBeUndefined();
    });

    it('entfernt IP-Adress-Header (x-forwarded-for)', () => {
      const event = makeEvent({
        request: {
          headers: {
            'x-forwarded-for': '192.168.1.100, 10.0.0.1',
            'x-real-ip': '192.168.1.100',
            'User-Agent': 'Mozilla/5.0',
          },
        },
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.request?.headers?.['x-forwarded-for']).toBeUndefined();
      expect(sanitized.request?.headers?.['x-real-ip']).toBeUndefined();
      expect(sanitized.request?.headers?.['User-Agent']).toBe('Mozilla/5.0');
    });

    it('entfernt Proxy-Authorization', () => {
      const event = makeEvent({
        request: {
          headers: { 'proxy-authorization': 'Basic abc123' },
        },
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.request?.headers?.['proxy-authorization']).toBeUndefined();
    });
  });

  describe('Request-Cookies', () => {
    it('löscht cookies-Objekt komplett', () => {
      const event = makeEvent({
        request: {
          cookies: { session: 'abc', user: 'john' },
        },
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.request?.cookies).toBeUndefined();
    });
  });

  describe('Request-URL Query-Params', () => {
    it('ersetzt access_token in URL', () => {
      const event = makeEvent({
        request: { url: 'https://example.com/api?access_token=secret123&other=value' },
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.request?.url).toContain('access_token=%5BREDACTED%5D');
      expect(sanitized.request?.url).toContain('other=value');
      expect(sanitized.request?.url).not.toContain('secret123');
    });

    it('ersetzt mehrere Tokens in URL', () => {
      const event = makeEvent({
        request: {
          url: 'https://example.com/api?api_key=key123&session_id=sess456&foo=bar',
        },
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.request?.url).not.toContain('key123');
      expect(sanitized.request?.url).not.toContain('sess456');
      expect(sanitized.request?.url).toContain('foo=bar');
    });

    it('behandelt ungültige URL gracefully (kein Crash)', () => {
      const event = makeEvent({ request: { url: 'not-a-valid-url' } });
      expect(() => sanitizePii(event)).not.toThrow();
    });
  });

  describe('Request-Data (POST-Body)', () => {
    it('ersetzt request.data mit [REDACTED]', () => {
      const event = makeEvent({
        request: {
          data: { username: 'admin', password: 'secret123' },
        },
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.request?.data).toBe('[REDACTED]');
    });
  });

  describe('User-Objekt', () => {
    it('entfernt ip_address, username, email aus user', () => {
      const event = makeEvent({
        user: {
          id: 'user-123',
          ip_address: '192.168.1.1',
          username: 'john.doe',
          email: 'john@example.com',
        },
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.user?.ip_address).toBeUndefined();
      expect(sanitized.user?.username).toBeUndefined();
      expect(sanitized.user?.email).toBeUndefined();
      expect(sanitized.user?.id).toBe('user-123'); // ID bleibt
    });
  });

  describe('Breadcrumbs', () => {
    it('entfernt URLs aus Breadcrumb-Daten', () => {
      const event = makeEvent({
        breadcrumbs: [
          {
            category: 'fetch',
            data: { url: 'https://api.example.com/secret', method: 'GET' },
          },
        ],
      });
      const sanitized = sanitizePii(event);
      expect(sanitized.breadcrumbs?.[0]?.data?.url).toBeUndefined();
      expect(sanitized.breadcrumbs?.[0]?.data?.method).toBe('GET');
    });
  });

  describe('Edge Cases', () => {
    it('crasht nicht bei leerem Event', () => {
      const event = makeEvent({});
      expect(() => sanitizePii(event)).not.toThrow();
    });

    it('crasht nicht bei fehlendem request', () => {
      const event = makeEvent({ request: undefined });
      expect(() => sanitizePii(event)).not.toThrow();
    });

    it('crasht nicht bei request ohne headers', () => {
      const event = makeEvent({ request: {} });
      expect(() => sanitizePii(event)).not.toThrow();
    });
  });
});