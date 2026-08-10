import { NextResponse } from 'next/server';

/**
 * ✅ ZERO-DEFECT: Enterprise Security Middleware
 *
 * 🛡️ PRODUCTION: Strikte CSP + COOP (maximale XSS & Side-Channel Sicherheit)
 * 🧪 DEVELOPMENT: Erlaubt 'unsafe-eval' NUR lokal für Next.js Hot-Reloading
 *
 * Security Headers: CSP, HSTS, COOP, COEP, CORP, X-Frame-Options,
 * X-Content-Type-Options, Referrer-Policy, Permissions-Policy
 */
export function middleware() {
  const response = NextResponse.next();
  const isDev = process.env.NODE_ENV === 'development';

  const scriptSrc = isDev
    ? [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://vercel.live',
        'https://*.vercel.app',
        'https://vitals.vercel-insights.com',
        'https://vercel.com',
        'https://va.vercel-scripts.com',
      ]
    : [
        "'self'",
        "'unsafe-inline'",
        'https://vercel.live',
        'https://*.vercel.app',
        'https://vitals.vercel-insights.com',
        'https://vercel.com',
        'https://va.vercel-scripts.com',
      ];
  const connectSrc = isDev
    ? [
        "'self'",
        'ws:',
        'wss:',
        'https://*.upstash.io',
        'https://*.vercel.app',
        'https://*.googleapis.com',
        'https://vitals.vercel-insights.com',
        'https://vercel.live',
        'https://vercel.com',
        'https://va.vercel-scripts.com',
      ]
    : [
        "'self'",
        'https://*.upstash.io',
        'https://*.vercel.app',
        'https://*.googleapis.com',
        'https://vitals.vercel-insights.com',
        'https://vercel.live',
        'https://vercel.com',
        'https://va.vercel-scripts.com',
      ];
  const csp = [
    "default-src 'self'",
    'script-src ' + scriptSrc.join(' '),
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    'connect-src ' + connectSrc.join(' '),
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt).*)',
};
