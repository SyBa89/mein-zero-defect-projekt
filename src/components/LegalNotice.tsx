import Link from 'next/link';

export default function LegalNotice() {
  return (
    <section className="py-10 bg-gray-100 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-6 rounded-r-xl">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-500 text-xl" aria-hidden="true">
                ⚠️
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800 font-medium">
                <strong>Jugendschutz:</strong> Tabakwaren und alkoholische Getränke werden nur an
                Personen ab 18 Jahren abgegeben. Bitte halten Sie Ihren Ausweis bereit.
              </p>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-600 text-center font-medium space-y-1">
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
