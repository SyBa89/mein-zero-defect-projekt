import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySessionToken } from '@/lib/auth';

/**
 * @fileoverview Admin Layout - Zentraler Auth-Guard
 * 
 * @description
 * Schützt alle /admin/* Routen durch Server-Side Session-Verification.
 * Nutzt das existierende JWT-System aus @/lib/auth.
 * 
 * @security
 * - Server-Side Verification (nicht manipulierbar)
 * - Nutzt HttpOnly Session-Cookie
 * - Redirect zu /admin bei fehlender/invalid Session
 * - Login-Page (/admin) ist ausgenommen
 * 
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts}
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;

  // Prüfe ob User authentifiziert ist
  const sessionUser = sessionToken ? verifySessionToken(sessionToken) : null;

  // Wenn nicht authentifiziert → Redirect zur Login-Page
  if (!sessionUser) {
    redirect('/admin');
  }

  // Authenticated → Render Children
  return <>{children}</>;
}