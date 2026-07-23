import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/admin', '/admin/(.*)'];
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some((path) => {
    if (path.endsWith('/(.*)')) {
      const base = path.replace('/(.*)', '');
      return pathname === base || pathname.startsWith(`${base}/`);
    }
    return pathname === path;
  });
  if (!isProtected) return NextResponse.next();
  const sessionCookie = request.cookies.get('admin-session');
  if (sessionCookie?.value === 'authenticated') return NextResponse.next();
  const loginUrl = new URL('/admin-login', request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};