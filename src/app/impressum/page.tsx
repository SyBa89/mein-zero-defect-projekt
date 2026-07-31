import { Metadata } from 'next';
import Link from 'next/link';
import { CLIENT_CONFIG } from '@/lib/client.config';

export const metadata: Metadata = {
  title: 'Impressum',
  description: `Impressum von ${CLIENT_CONFIG.brand.name}`,
};

export default function ImpressumPage() {
  const { brand, contact, business } = CLIENT_CONFIG;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Impressum</h1>

        {/* Angaben gemäß §5 TMG */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Angaben gemäß §5 TMG</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              <strong>{brand.name}</strong>
              <br />
              {brand.legalName}
              <br />
              {contact.address.street}
              <br />
              {contact.address.zip} {contact.address.city}
            </p>
          </div>
        </section>

        {/* Kontakt */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              Telefon:{' '}
              <a href={`tel:${contact.phone}`} className="text-pink-600 hover:underline">
                {contact.phone.replace('+49', '0').replace(/(\d{4})(\d{7})/, '$1 $2')}
              </a>
              <br />
              E-Mail:{' '}
              <a href={`mailto:${contact.email}`} className="text-pink-600 hover:underline">
                {contact.email}
              </a>
            </p>
          </div>
        </section>

        {/* Umsatzsteuer-ID */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Umsatzsteuer-ID</h2>
          <div className="prose prose-gray max-w-none">
            {business.isSmallBusiness ? (
              <p>Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).</p>
            ) : business.vatId ? (
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
                <br />
                {business.vatId}
              </p>
            ) : (
              <p>Angaben zur Umsatzsteuer-ID werden in Kürze ergänzt.</p>
            )}
          </div>
        </section>

        {/* Verantwortlich für den Inhalt */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Verantwortlich für den Inhalt nach §55 Abs. 2 RStV
          </h2>
          <div className="prose prose-gray max-w-none">
            <p>
              {brand.legalName}
              <br />
              {contact.address.street}
              <br />
              {contact.address.zip} {contact.address.city}
            </p>
          </div>
        </section>

        {/* Haftungsausschluss */}
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

        {/* Zurück-Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-pink-600 hover:underline font-semibold">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
