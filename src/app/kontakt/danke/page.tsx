import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import Link from 'next/link';

// ✅ ZERO-DEFECT: SEO-Metadaten für korrekte Indexierung und Browser-Tabs
export const metadata = {
  title: 'Vielen Dank | Kiosk Lollipop',
  description:
    'Ihre Nachricht wurde erfolgreich an den Kiosk Lollipop gesendet. Wir melden uns schnellstmöglich.',
};

export default function DankePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />

      {/* ✅ LAYOUT: flex-grow sorgt dafür, dass der Footer auch bei großen Bildschirmen immer unten bleibt */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl w-full bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
          {/* Erfolgs-Icon (Professionelles SVG statt Emoji für maximale Schärfe auf allen Displays) */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in-95 duration-500">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Vielen Dank für Ihre Nachricht!
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
            Wir haben Ihre Anfrage erfolgreich erhalten und werden uns schnellstmöglich bei Ihnen
            melden.
          </p>

          {/* Info-Box: Setzt klare, professionelle Erwartungen (ohne riskante 24h-Versprechen) */}
          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-pink-600 text-xl" aria-hidden="true">
                💡
              </span>
              Was passiert als Nächstes?
            </h3>
            <ul className="text-sm text-gray-700 space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="text-green-600 font-bold mt-0.5" aria-hidden="true">
                  ✓
                </span>
                <span>Ihre Nachricht wurde sicher an unser Team weitergeleitet.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-green-600 font-bold mt-0.5" aria-hidden="true">
                  ✓
                </span>
                <span>Wir prüfen Ihr Anliegen und antworten Ihnen zeitnah per E-Mail.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-green-600 font-bold mt-0.5" aria-hidden="true">
                  ✓
                </span>
                <span>Bei dringenden Fragen erreichen Sie uns auch direkt telefonisch.</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons: Klare primäre und sekundäre Handlungsaufforderung */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
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
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
              aria-label="Kiosk Lollipop jetzt anrufen"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              02235 9291160
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
}
