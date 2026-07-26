import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum – Kiosk Lollipop',
  description: 'Gesetzliche Pflichtangaben nach §5 TMG',
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Impressum</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Angaben gemäß §5 TMG</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              <strong>Kiosk Lollipop</strong>
              <br />
              Inhaber: [VORNAME NACHNAME]
              <br />
              Theodor-Heuss-Straße 35
              <br />
              50374 Erftstadt-Liblar
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              Telefon:{' '}
              <a href="tel:+4922359291160" className="text-pink-600 hover:underline">
                02235 9291160
              </a>
              <br />
              E-Mail: [E-MAIL-ADRESSE]
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Umsatzsteuer-ID</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
              <br />
              [UST-ID NUMMER]
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Verantwortlich für den Inhalt nach §55 Abs. 2 RStV
          </h2>
          <div className="prose prose-gray max-w-none">
            <p>
              [VORNAME NACHNAME]
              <br />
              Theodor-Heuss-Straße 35
              <br />
              50374 Erftstadt-Liblar
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftungsausschluss</h2>
          <div className="prose prose-gray max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß §7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-pink-600 hover:underline font-semibold">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
