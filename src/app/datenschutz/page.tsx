import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-4">
            Dies ist eine Konzept-Präsentation. Die folgenden Angaben sind Platzhalter und dienen
            nur der Darstellung der Webseiten-Struktur.
          </p>
          <div className="space-y-4 text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900">1. Datenschutz auf einen Blick</h2>
            <p>
              Hier würde die offizielle DSGVO-konforme Datenschutzerklärung stehen, die über die
              Erhebung und Verarbeitung von Daten informiert.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6">2. Hosting</h2>
            <p>
              Hier würde stehen, bei welchem Anbieter die Webseite gehostet wird und wie die Daten
              sicher übertragen werden.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
