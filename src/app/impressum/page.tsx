import Link from 'next/link';

export const metadata = {
  title: 'Impressum | Kiosk Lollipop',
  description: 'Impressum und Anbieterkennzeichnung von Kiosk Lollipop in Erftstadt-Liblar.',
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 tracking-tight">
          Impressum
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Anbieterkennzeichnung</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Kiosk Lollipop</strong>
            <br />
            Theodor-Heuss-Straße 35
            <br />
            50374 Erftstadt
            <br />
            Deutschland
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Kontakt</h2>
          <p className="text-gray-700 leading-relaxed">
            Telefon: 02235 9291160
            <br />
            E-Mail: info@kiosk-lollipop.de
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Umsatzsteuer-ID</h2>
          <p className="text-gray-700 leading-relaxed">
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
            <br />
            <span className="text-gray-500 italic">
              Wird im Rahmen des finalen Onboardings ergänzt.
            </span>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Glücksspiel</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Verantwortlich für Lotteriedienstleistungen:
            <br />
            Diana Winkler
            <br />
            Theodor-Heuss-Straße 35, 50374 Erftstadt
            <br />
            Konzession erteilt durch: Stadt Erftstadt - Ordnungsamt
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Konzessionsnummer:{' '}
            <span className="text-gray-500 italic">
              Wird im Rahmen des finalen Onboardings ergänzt.
            </span>
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
            <p className="text-sm text-red-800 font-medium">
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
                className="underline hover:text-red-900"
              >
                www.bzga.de
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Streitschlichtung</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="text-gray-700 leading-relaxed">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
