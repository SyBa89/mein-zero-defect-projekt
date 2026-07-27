import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Nonce für CSP generieren
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const nonce = btoa(String.fromCharCode(...array));

  // Response mit Nonce-Header
  const response = NextResponse.next();
  response.headers.set('X-Nonce', nonce);

  // CSP-Header mit Nonce
  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.upstash.io https://*.resend.com;`
  );

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
