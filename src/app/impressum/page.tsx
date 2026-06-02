import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-6 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
            <strong>Hinweis:</strong> Dies ist eine Konzept-Präsentation. Die folgenden Angaben sind
            Platzhalter und dienen nur der Darstellung der Webseiten-Struktur.
          </p>
          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h2>
              <p>
                Max Mustermann
                <br />
                Musterstraße 1<br />
                50374 Erftstadt
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Kontakt</h2>
              <p>
                Telefon: +49 (0) 2235 123456
                <br />
                E-Mail: info@kiosk-lollipop-demo.de
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                <br />
                DE 123 456 789
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
