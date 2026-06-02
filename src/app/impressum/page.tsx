import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-4">
            Dies ist eine Konzept-Präsentation. Die folgenden Angaben sind Platzhalter und dienen
            nur der Darstellung der Webseiten-Struktur.
          </p>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Angaben gemäß § 5 TMG:</strong>
              <br />
              Max Mustermann
              <br />
              Musterstraße 1<br />
              12345 Musterstadt
            </p>
            <p>
              <strong>Kontakt:</strong>
              <br />
              Telefon: +49 (0) 123 456789
              <br />
              E-Mail: info@musterfirma.de
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
