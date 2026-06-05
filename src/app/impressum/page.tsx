import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Impressum | Kiosk Lollipop',
  description: 'Impressum und Anbieterkennzeichnung der Kiosk Lollipop Webseite',
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
          <header>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Impressum</h1>
            <p className="text-sm text-gray-500">Angaben gemäß § 5 TMG</p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Anbieterkennzeichnung</h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p>
                <strong>Kiosk Lollipop</strong>
              </p>
              <p>Theodor-Heuss-Straße 35</p>
              <p>50374 Erftstadt</p>
              <p>Deutschland</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontakt</h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p>Telefon: 02235 9291160</p>
              <p>E-Mail: info@kiosk-lollipop.de</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Umsatzsteuer-ID</h2>
            <p className="text-gray-700 leading-relaxed">
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
              <br />
              [Hier muss noch die echte USt-IdNr. vom Inhaber eingetragen werden]
            </p>
          </section>

          {/* Glücksspiel-Hinweis */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Glücksspiel</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Verantwortlich für Lotteriedienstleistungen:
              <br />
              Diana Winkler
              <br />
              Theodor-Heuss-Straße 35
              <br />
              50374 Erftstadt
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Konzession erteilt durch: Stadt Erftstadt - Ordnungsamt
              <br />
              Konzessionsnummer: [MUSS VON INHABERIN EINGEFÜGT WERDEN]
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
              <p className="text-sm text-red-800">
                <strong>Hinweis nach § 6 GlüStV 2021:</strong>
                <br />
                Teilnahme an Lotterien erst ab 18 Jahren.
                <br />
                Glücksspiel kann süchtig machen.
                <br />
                Hilfe und Informationen unter:{' '}
                <a
                  href="https://www.bzga.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  www.bzga.de
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Streitschlichtung</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline"
              >
                https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE
              </a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          {/* Platzhalter-Hinweis */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
            <p className="text-sm text-yellow-800">
              <strong>Hinweis:</strong> Dies ist ein Platzhalter-Impressum. Vor dem Livegang müssen
              die echten Daten (Name des Inhabers, USt-IdNr., Glücksspiel-Konzessionsnummer) ergänzt
              werden. Für absolute Rechtssicherheit empfehlen wir Dienste wie den{' '}
              <a
                href="https://www.it-recht-kanzlei.de"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                IT-Recht Kanzlei
              </a>{' '}
              oder den{' '}
              <a
                href="https://www.haendlerbund.de"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                Händlerbund
              </a>
              .
            </p>
          </div>

          {/* Zurück-Link */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
