import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function DatenschutzPage() {
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

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
            <strong>Hinweis:</strong> Dies ist eine Konzept-Präsentation. Die folgenden Angaben sind
            Platzhalter und dienen nur der Darstellung der Webseiten-Struktur.
          </p>
          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                1. Datenschutz auf einen Blick
              </h2>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                2. Datenerfassung auf dieser Website
              </h2>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                3. Hosting und Google Maps
              </h2>
              <p>
                Diese Seite nutzt eine Einbettung von Google Maps. Dabei können Daten an Google
                übertragen werden. In der finalen Version wird hier ein datenschutzkonformer Hinweis
                mit Cookie-Banner implementiert.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
