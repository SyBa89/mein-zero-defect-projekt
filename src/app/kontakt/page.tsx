import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Kontakt | Kiosk Lollipop',
  description: 'Kontaktieren Sie den Kiosk Lollipop in Erftstadt-Liblar',
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Seiten-Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontaktieren Sie uns</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Haben Sie Fragen oder Anliegen? Schreiben Sie uns – wir melden uns schnellstmöglich bei
            Ihnen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kontakt-Infos (links) */}
          <div className="md:col-span-1 space-y-6">
            {/* Adresse */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Adresse</h3>
              <p className="text-sm text-gray-600">
                Theodor-Heuss-Straße 35
                <br />
                50374 Erftstadt-Liblar
              </p>
            </div>

            {/* Telefon */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-semibold text-gray-900 mb-2">Telefon</h3>
              <a
                href="tel:+4922359291160"
                className="text-sm text-pink-600 hover:text-pink-700 font-medium"
              >
                02235 9291160
              </a>
            </div>

            {/* Öffnungszeiten */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-3">🕒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Öffnungszeiten</h3>
              <p className="text-sm text-gray-600">
                Mo–Fr: 07:30 – 19:00 Uhr
                <br />
                Sa: 07:30 – 14:30 Uhr
                <br />
                So & Feiertage: geschlossen
              </p>
            </div>
          </div>

          {/* Kontaktformular (rechts) */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Schreiben Sie uns</h2>

              {/* Form.taxi Integration */}
              <form action="https://form.taxi/s/5j0vhx43" method="POST" className="space-y-6">
                {/* Name (Pflichtfeld) */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ihr Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="Name"
                    required
                    autoComplete="name"
                    placeholder="Max Mustermann"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* E-Mail (Pflichtfeld) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ihre E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    required
                    autoComplete="email"
                    placeholder="ihre@email.de"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Telefon (optional) */}
                <div>
                  <label
                    htmlFor="telefon"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Telefon <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="telefon"
                    name="Telefon"
                    autoComplete="tel"
                    placeholder="+49 123 456789"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Betreff (optional) */}
                <div>
                  <label
                    htmlFor="betreff"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Betreff
                  </label>
                  <input
                    type="text"
                    id="betreff"
                    name="Betreff"
                    placeholder="Worum geht es?"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Nachricht (Pflichtfeld) */}
                <div>
                  <label
                    htmlFor="nachricht"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Ihre Nachricht *
                  </label>
                  <textarea
                    id="nachricht"
                    name="Nachricht"
                    required
                    rows={6}
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-vertical"
                  />
                </div>

                {/* Honeypot (unsichtbarer Spamschutz) */}
                <input
                  type="text"
                  name="_honeypot"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Weiterleitung nach erfolgreichem Absenden */}
                <input
                  type="hidden"
                  name="_redirect"
                  value="https://mein-zero-defect-projekt.vercel.app/kontakt/danke"
                />

                {/* Datenschutz-Checkbox (Pflichtfeld) */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="datenschutz"
                    name="Datenschutz_akzeptiert"
                    required
                    className="mt-1 h-4 w-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500"
                  />
                  <label htmlFor="datenschutz" className="text-sm text-gray-600 leading-relaxed">
                    Ich habe die{' '}
                    <Link
                      href="/datenschutz"
                      className="text-pink-600 hover:text-pink-700 underline font-medium"
                    >
                      Datenschutzerklärung
                    </Link>{' '}
                    gelesen und stimme der Verarbeitung meiner Daten zu. *
                  </label>
                </div>

                {/* Absende-Button */}
                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Nachricht senden
                </button>

                {/* Pflichtfeld-Hinweis */}
                <p className="text-xs text-gray-500 text-center">* Pflichtfelder</p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
