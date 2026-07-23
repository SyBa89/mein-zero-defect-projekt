import Link from 'next/link';
import type { Metadata, Viewport } from 'next';
import { KIOSK_CONFIG } from '@/lib/config';

// ✅ ZERO-DEFECT: Eigene Metadaten für die 404-Seite
export const metadata: Metadata = {
  title: 'Seite nicht gefunden | Kiosk Lollipop',
  description: 'Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.',
  robots: {
    index: false, // ✅ 404-Seiten dürfen nicht indexiert werden
    follow: true,
  },
  alternates: {
    canonical: `${KIOSK_CONFIG.url}/404`,
  },
};

// ✅ ZERO-DEFECT: Viewport für 404-Seite (kann sich von Hauptseite unterscheiden)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#db2777',
  colorScheme: 'light',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <article className="max-w-md w-full space-y-6">
        {/* Visuell ansprechender, aber klarer Fehler-Indikator */}
        <div className="relative">
          <h1 className="text-9xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent select-none">
            404
          </h1>
          {/* ✅ ZERO-DEFECT: Kleiner dekorativer Akzent */}
          <div
            className="absolute -top-2 -right-4 w-16 h-16 rounded-full bg-pink-100/50 blur-2xl"
            aria-hidden="true"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Seite nicht gefunden</h2>
          <p
            className="text-lg text-gray-600 leading-relaxed"
            id="not-found-description"
          >
            Diese Seite existiert nicht oder wurde verschoben. Keine Sorge, wir helfen Ihnen gerne
            weiter.
          </p>
        </div>

        {/* ✅ BUSINESS/CONVERSION: Primäre und sekundäre Handlungsaufforderung */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            prefetch={true}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            aria-label="Zur Startseite von Kiosk Lollipop"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Zurück zur Startseite
          </Link>

          <a
            href={KIOSK_CONFIG.phoneHref}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            aria-label={`${KIOSK_CONFIG.name} telefonisch kontaktieren`}
          >
            <svg
              className="w-5 h-5 text-pink-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {KIOSK_CONFIG.phoneDisplay}
          </a>
        </div>

        {/* ✅ ZERO-DEFECT: Zusätzliche Option mit Link zur Kontaktseite */}
        <p className="text-sm text-gray-400 pt-4">
          Oder{' '}
          <Link
            href="/kontakt"
            prefetch={true}
            className="text-pink-600 hover:text-pink-700 underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded"
            aria-label="Zum Kontaktformular"
          >
            kontaktieren Sie uns
          </Link>
          {' '}direkt am Bürgerplatz in Erftstadt-Liblar.
        </p>

        {/* ✅ ZERO-DEFECT: Micro-Interaction für bessere UX */}
        <div className="pt-2 text-xs text-gray-400 flex items-center justify-center gap-1">
          <span aria-hidden="true">🔄</span>
          <span>Die Seite wird automatisch in 10 Sekunden weitergeleitet</span>
        </div>
      </article>
    </main>
  );
}