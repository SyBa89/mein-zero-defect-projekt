import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

// ✅ ZERO-DEFECT: Umfassende SEO-Metadaten für rechtliche Seiten
export const metadata: Metadata = {
  title: 'Impressum | Kiosk Lollipop',
  description:
    'Impressum und gesetzliche Anbieterkennzeichnung von Kiosk Lollipop in Erftstadt-Liblar gemäß § 5 TMG.',
  robots: {
    index: true, // Rechtliche Seiten müssen indexiert sein, um auffindbar zu sein
    follow: true,
  },
  openGraph: {
    title: 'Impressum | Kiosk Lollipop',
    description: 'Gesetzliche Anbieterkennzeichnung und Kontaktinformationen.',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-100">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 tracking-tight">
            Impressum
          </h1>

          {/* ✅ RECHT: Anbieterkennzeichnung gemäß § 5 TMG */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-gray-700 leading-relaxed space-y-1">
              <strong>Kiosk Lollipop</strong>
              <br />
              Theodor-Heuss-Straße 35
              <br />
              50374 Erftstadt
              <br />
              Deutschland
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Vertreten durch:</strong>
              <br />
              Diana Winkler
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Kontakt</h2>
            <p className="text-gray-700 leading-relaxed">
              Telefon:{' '}
              <a
                href="tel:+4922359291160"
                className="text-pink-600 hover:underline transition-colors"
              >
                02235 9291160
              </a>
              <br />
              E-Mail:{' '}
              <a
                href="mailto:info@kiosk-lollipop.de"
                className="text-pink-600 hover:underline transition-colors"
              >
                info@kiosk-lollipop.de
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Umsatzsteuer-ID</h2>
            <p className="text-gray-700 leading-relaxed">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              {/* ✅ UX: Platzhalter visuell als "To-Do" markiert, nicht als Fehler */}
              <span className="inline-block mt-2 px-3 py-1 bg-yellow-50 text-yellow-800 text-sm font-medium rounded border border-yellow-200">
                Wird im Rahmen des finalen Onboardings ergänzt.
              </span>
            </p>
          </section>

          {/* ✅ RECHT: Verantwortlicher für Inhalte gemäß § 55 Abs. 2 RStV */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Diana Winkler
              <br />
              Theodor-Heuss-Straße 35
              <br />
              50374 Erftstadt
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Glücksspiel & Lotterie</h2>
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
              <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-800 text-sm font-medium rounded border border-yellow-200">
                Wird im Rahmen des finalen Onboardings ergänzt.
              </span>
            </p>

            {/* ✅ RECHT/UX: Prominenter, barrierefreier Jugendschutz-Hinweis */}
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl mt-6">
              <p className="text-sm text-red-800 font-medium leading-relaxed">
                <strong>Hinweis nach § 6 GlüStV 2021:</strong>
                <br />
                • Teilnahme an Lotterien erst ab 18 Jahren.
                <br />
                • Glücksspiel kann süchtig machen.
                <br />• Hilfe und Informationen unter:{' '}
                <a
                  href="https://www.bzga.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-900 font-semibold transition-colors"
                  aria-label="Bundeszentrale für gesundheitliche Aufklärung (öffnet in neuem Tab)"
                >
                  www.bzga.de
                </a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Streitschlichtung</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline font-medium transition-colors break-all"
                aria-label="Plattform der Europäischen Kommission zur Online-Streitbeilegung (öffnet in neuem Tab)"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          {/* ✅ UX/KONSISTENZ: Einheitlicher "Zurück"-Link wie in der Datenschutzerklärung */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 transition-colors group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
