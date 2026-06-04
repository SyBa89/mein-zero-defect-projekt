import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Vielen Dank | Kiosk Lollipop',
  description: 'Ihre Nachricht wurde erfolgreich an den Kiosk Lollipop gesendet',
};

export default function DankePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200">
          {/* Erfolgs-Icon */}
          <div className="text-6xl mb-6">✅</div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vielen Dank für Ihre Nachricht!</h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen – in der Regel
            innerhalb von 24 Stunden.
          </p>

          {/* Info-Box */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-8 text-left">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Was passiert als Nächstes?</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Ihre Nachricht wurde an uns weitergeleitet</li>
              <li>Wir prüfen Ihr Anliegen und melden uns per E-Mail</li>
              <li>Bei dringenden Fragen erreichen Sie uns telefonisch</li>
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
            <a
              href="tel:+4922359291160"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-all"
            >
              📞 Jetzt anrufen
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
