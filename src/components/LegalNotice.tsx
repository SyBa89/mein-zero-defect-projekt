import Link from 'next/link';
import { CLIENT_CONFIG } from '@/lib/client.config';

export default function LegalNotice() {
  const { business } = CLIENT_CONFIG;

  // White-Label: Zeige Jugendschutz nur für Kiosks/Retail mit Alkohol/Tabak
  const showYouthProtection = business.type === 'kiosk' || business.type === 'retail';

  return (
    <section className="py-10 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {showYouthProtection && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-5 mb-6 rounded-r-xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-500 text-xl" aria-hidden="true">
                  ⚠️
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                  <strong>Jugendschutz:</strong> Tabakwaren und alkoholische Getränke werden nur an
                  Personen ab 18 Jahren abgegeben. Bitte halten Sie Ihren Ausweis bereit.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="text-xs text-gray-600 dark:text-gray-400 text-center font-medium space-y-1">
          <p>Alle Preise inkl. gesetzlicher MwSt. | Irrtümer und Änderungen vorbehalten.</p>
          <p>
            <Link href="/impressum" className="hover:text-pink-600 underline transition-colors">
              Impressum
            </Link>
            {' | '}
            <Link href="/datenschutz" className="hover:text-pink-600 underline transition-colors">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
