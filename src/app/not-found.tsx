import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200">
          {/* 404 Icon */}
          <div className="text-8xl mb-6">🔍</div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Seite nicht gefunden</h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Die gesuchte Seite existiert leider nicht oder wurde verschoben. Keine Sorge – wir
            helfen Ihnen gerne weiter!
          </p>

          {/* Vorschläge */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-8 text-left">
            <p className="text-sm font-semibold text-gray-900 mb-3">Vielleicht suchen Sie:</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <Link href="/" className="text-pink-600 hover:text-pink-700 underline">
                  → Startseite
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-pink-600 hover:text-pink-700 underline">
                  → Kontaktformular
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-pink-600 hover:text-pink-700 underline">
                  → Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-pink-600 hover:text-pink-700 underline">
                  → Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              ← Zur Startseite
            </Link>
            <Link
              href="/kontakt"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
