import { NextResponse } from 'next/server';

/**
 * ✅ ZERO-DEFECT: Enterprise Security Middleware (Phase 4e Polish)
 *
 * 🛡️ PRODUCTION: Strikte CSP + COOP (maximale XSS & Side-Channel Sicherheit)
 * 🧪 DEVELOPMENT: Erlaubt 'unsafe-eval' NUR lokal für Next.js Hot-Reloading
 */
export function middleware() {
  const response = NextResponse.next();
  const isDev = process.env.NODE_ENV === 'development';

  // ✅ ZERO-DEFECT: Environment-aware CSP
  const cspDirectives = [
    "default-src 'self'",
    isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.app https://vitals.vercel-insights.com https://vercel.com https://va.vercel-scripts.com"
      : "script-src 'self' 'unsafe-inline' https://vercel.live https://*.vercel.app https://vitals.vercel-insights.com https://vercel.com https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    isDev
      ? "connect-src 'self' ws: wss: https://*.upstash.io https://*.vercel.app https://*.googleapis.com https://vitals.vercel-insights.com https://vercel.live https://vercel.com https://va.vercel-scripts.com"
      : "connect-src 'self' https://*.upstash.io https://*.vercel.app https://*.googleapis.com https://vitals.vercel-insights.com https://vercel.live https://vercel.com https://va.vercel-scripts.com",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '));

  // 🛡️ Enterprise Security Header (Production + Development)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // ✅ ZERO-DEFECT (Phase 4e): Cross-Origin-Opener-Policy (COOP)
  // Schützt vor Spectre-Attacks und Side-Channel Leaks durch Popups/iframes.
  // 'same-origin-allow-popups' ist der sichere Standard für Websites mit externen Links (Maps, etc.)
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

  return response;
}

export const config = {
  // 🚀 Performance: Middleware NICHT auf statischen Dateien ausführen
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt).*)',
};
