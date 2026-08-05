import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * ✅ ZERO-DEFECT: Enterprise Security Middleware
 *
 * 🛡️ PRODUCTION: Strikte CSP OHNE 'unsafe-eval' (maximale XSS-Sicherheit)
 * 🧪 DEVELOPMENT: Erlaubt 'unsafe-eval' NUR lokal – Next.js React Refresh
 *    benötigt eval für Hot-Reloading. Ohne diese Ausnahme stirbt der
 *    Client-Bootstrap im Dev-Modus (Uncaught EvalError) und die Seite
 *    verliert Hydration, Effects und Interaktivität.
 */
export function middleware(_req: NextRequest) {
  const response = NextResponse.next();
  const isDev = process.env.NODE_ENV === 'development';

  // ✅ ZERO-DEFECT: Environment-aware CSP (strikt in Prod, funktional in Dev)
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

  return response;
}

export const config = {
  // 🚀 Performance: Middleware NICHT auf statischen Dateien ausführen
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt).*)',
};
