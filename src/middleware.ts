import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // Nonce für CSP generieren (für zukünftige Verwendung)
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const nonce = btoa(String.fromCharCode(...array));

  const response = NextResponse.next();
  response.headers.set('X-Nonce', nonce);

  // ✅ CSP die FUNKTIONIERT - getestet und bewährt
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.app https://vitals.vercel-insights.com https://vercel.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.upstash.io https://*.vercel.app https://*.googleapis.com https://vitals.vercel-insights.com https://vercel.live https://vercel.com",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  // Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
