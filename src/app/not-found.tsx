import Link from 'next/link';
import type { Metadata } from 'next';

// ✅ ZERO-DEFECT: Eigene Metadaten für die 404-Seite, damit der Browser-Tab korrekt betitelt ist
export const metadata: Metadata = {
  title: 'Seite nicht gefunden | Kiosk Lollipop',
  description: 'Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.',
  robots: {
    index: false, // 404-Seiten dürfen nicht indexiert werden
    follow: true,
  },
};

export default function NotFound() {
  return (
    // ✅ UX: Kein Header/Footer, um den Fokus auf die Lösung zu lenken und Ladezeit zu sparen
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        {/* Visuell ansprechender, aber klarer Fehler-Indikator */}
        <h1 className="text-9xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent select-none">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Seite nicht gefunden</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Diese Seite existiert nicht oder wurde verschoben. Keine Sorge, wir helfen Ihnen gerne
            weiter.
          </p>
        </div>

        {/* ✅ BUSINESS/CONVERSION: Primäre und sekundäre Handlungsaufforderung */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
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
            href="tel:+4922359291160"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 active:scale-95"
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
            02235 9291160
          </a>
        </div>

        <p className="text-sm text-gray-400 pt-4">
          Oder besuchen Sie uns direkt am Bürgerplatz in Erftstadt-Liblar.
        </p>
      </div>
    </main>
  );
}
