import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';
import PackageCalculator from '@/components/PackageCalculator';
import Image from 'next/image';
import Link from 'next/link';

// ✅ SEO Metadata
export const metadata = {
  title: 'Kiosk Lollipop | Ihr Kiosk & Hermes Paketshop in Erftstadt-Liblar',
  description:
    'Kiosk Lollipop in Erftstadt-Liblar - Ihr Kiosk und Hermes Paketshop am Bürgerplatz. Mo-Fr 07:30-19:00, Sa 07:30-14:30. ★★★★★ 5,0 Sterne bei Google.',
  keywords: [
    'Kiosk Erftstadt',
    'Kiosk Liblar',
    'Hermes Paketshop Erftstadt',
    'Kiosk Lollipop',
    'Bürgerplatz Liblar',
    'Kiosk 50374',
    'Paketshop Erftstadt',
  ],
  openGraph: {
    title: 'Kiosk Lollipop | Erftstadt-Liblar',
    description: 'Ihr Kiosk und Hermes Paketshop am Bürgerplatz. ★★★★★ 5,0 Sterne bei Google.',
    type: 'website',
    locale: 'de_DE',
  },
};

// ✅ Schema.org LocalBusiness für Google-Ranking
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ConvenienceStore',
  name: 'Kiosk Lollipop',
  image: 'https://mein-zero-defect-projekt.vercel.app/images/fassade.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Theodor-Heuss-Straße 35',
    postalCode: '50374',
    addressLocality: 'Erftstadt',
    addressCountry: 'DE',
  },
  telephone: '+4922359291160',
  openingHours: ['Mo-Fr 07:30-19:00', 'Sa 07:30-14:30'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '60',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop"
            alt="Kiosk Lollipop Fassade"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-pink-900/70" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
              Willkommen bei <br />
              <span className="text-yellow-300">Kiosk Lollipop</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-100 mb-4 drop-shadow-md">
              Ihr Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar
            </p>
            <p className="max-w-2xl mx-auto text-lg text-gray-200 mb-10 drop-shadow-md">
              Theodor-Heuss-Straße 35, 50374 Erftstadt
            </p>

            {/* ✅ KORRIGIERTE BUTTONS: "Jetzt besuchen" → Google Maps, "Nachricht senden" → Kontakt */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white hover:bg-gray-100 text-pink-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Jetzt besuchen
                </button>
              </a>

              <Link href="/kontakt">
                <button className="bg-pink-600 hover:bg-pink-700 text-white border-2 border-pink-400 px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Nachricht senden
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Google Bewertungs-Badge */}
        <section className="py-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-lg border-2 border-yellow-300">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">5,0 Sterne bei Google</p>
                <p className="text-sm text-gray-600">
                  Basierend auf über 60 echten Kundenbewertungen
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Aktuelle Aktion Banner */}
        <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white font-bold text-lg">
              🎉 PLATZHALTER: Hier können Sie Ihre aktuellen Aktionen eintragen! 🎉
            </p>
            <p className="text-white text-sm mt-1">
              Ändern Sie diesen Text jederzeit selbst, um auf neue Lieferungen oder Angebote
              hinzuweisen.
            </p>
          </div>
        </section>

        {/* Warum Kunden zu uns kommen */}
        <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Warum Kunden zu uns kommen
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Mehr als nur ein Kiosk - wir sind Ihr Nachbar mit echtem Service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-pink-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3" aria-hidden="true">
                  📦
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hermes Paketshop</h3>
                <p className="text-gray-600 text-sm">
                  Komplett-Service für Paketversand, Abholung und Retouren. Schnell und zuverlässig.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-pink-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3" aria-hidden="true">
                  🕒
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lange Öffnungszeiten</h3>
                <p className="text-gray-600 text-sm">
                  Mo-Fr bis 19:00 Uhr, Sa bis 14:30 Uhr. Wir sind da, wenn Sie uns brauchen.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-pink-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3" aria-hidden="true">
                  📍
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Zentrale Lage</h3>
                <p className="text-gray-600 text-sm">
                  Direkt am Bürgerplatz in Liblar. Gut zu Fuß oder mit dem Auto erreichbar.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-pink-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3" aria-hidden="true">
                  🅿️
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Parkplätze vor der Tür</h3>
                <p className="text-gray-600 text-sm">
                  Kurze Haltezone direkt vor dem Laden und öffentliche Parkplätze in der Nähe.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-pink-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3" aria-hidden="true">
                  💳
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Moderne Zahlung</h3>
                <p className="text-gray-600 text-sm">
                  Bar, EC-Karte, Kontaktlos, Apple Pay und Google Pay. Sie zahlen, wie Sie wollen.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-pink-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3" aria-hidden="true">
                  👋
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Persönlicher Service</h3>
                <p className="text-gray-600 text-sm">
                  Seit über 10 Jahren für Liblar da. Wir kennen unsere Kunden und beraten
                  persönlich.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-pink-200">
                <span className="text-2xl" aria-hidden="true">
                  🏆
                </span>
                <span className="font-semibold text-gray-900">
                  Seit über 10 Jahren Ihr Kiosk in Liblar
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Öffnungszeiten</h2>
            <div className="bg-pink-50 rounded-xl border-2 border-pink-200 overflow-hidden shadow-sm">
              <table className="w-full">
                <tbody className="divide-y divide-pink-200">
                  <tr className="hover:bg-pink-100 transition-colors">
                    <td className="px-6 py-4 text-left font-semibold text-gray-900">
                      Montag - Freitag
                    </td>
                    <td className="px-6 py-4 text-right text-pink-600 font-bold text-lg">
                      07:30 - 19:00 Uhr
                    </td>
                  </tr>
                  <tr className="hover:bg-pink-100 transition-colors">
                    <td className="px-6 py-4 text-left font-semibold text-gray-900">Samstag</td>
                    <td className="px-6 py-4 text-right text-pink-600 font-bold text-lg">
                      07:30 - 14:30 Uhr
                    </td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-6 py-4 text-left font-semibold text-gray-900">
                      Sonn- und Feiertags
                    </td>
                    <td className="px-6 py-4 text-right text-red-600 font-bold text-lg">
                      Geschlossen
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Service & Zahlung */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-3" aria-hidden="true">
                  💳
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Zahlungsmethoden</h3>
                <p className="text-sm text-gray-600">
                  Bar · EC-Karte · Kontaktlos
                  <br />
                  Apple Pay · Google Pay
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3" aria-hidden="true">
                  🚗
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Parken</h3>
                <p className="text-sm text-gray-600">
                  Kurze Haltezone direkt vor dem Laden
                  <br />
                  Öffentliche Parkplätze am Bürgerplatz
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3" aria-hidden="true">
                  ♿
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Barrierefreiheit</h3>
                <p className="text-sm text-gray-600">
                  Stufenfreier Zugang
                  <br />
                  Rollstuhlgerecht
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Erweiterte Services */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Weitere Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2" aria-hidden="true">
                  💰
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Geld abheben</h3>
                <p className="text-xs text-gray-600 mt-1">EC-Karte</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2" aria-hidden="true">
                  🖨️
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Druckservice</h3>
                <p className="text-xs text-gray-600 mt-1">Kopien & Ausdrucke</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2" aria-hidden="true">
                  ☕
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Heiße Getränke</h3>
                <p className="text-xs text-gray-600 mt-1">Kaffee & Tee to go</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2" aria-hidden="true">
                  🔌
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Handy-Ladestation</h3>
                <p className="text-xs text-gray-600 mt-1">Smartphone aufladen</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hermes Paketshop */}
        <section className="py-16 bg-yellow-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-yellow-100 p-8 rounded-xl border-2 border-yellow-300">
              <div className="text-5xl mb-4" aria-hidden="true">
                📦
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Hermes Paketshop</h2>
              <p className="text-lg text-gray-700 mb-6">
                Wir sind Ihr offizieller Hermes Paketshop in Erftstadt-Liblar!
              </p>

              <PackageCalculator />

              <details className="bg-white rounded-lg p-4 mb-6 text-left">
                <summary className="font-semibold text-gray-900 cursor-pointer hover:text-pink-600 transition-colors">
                  📋 Alle Paketgrößen im Detail anzeigen
                </summary>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="border border-gray-200 rounded-lg p-4 text-center">
                    <span className="block font-bold text-pink-600 text-lg mb-1">S-Paket</span>
                    <span className="text-gray-600">Max. 31,5 cm × 23,5 cm × 3,5 cm</span>
                    <span className="block text-gray-500 text-xs mt-1">
                      (Länge × Breite × Höhe)
                    </span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 text-center bg-pink-50">
                    <span className="block font-bold text-pink-600 text-lg mb-1">M-Paket</span>
                    <span className="text-gray-600">Max. 50 cm × 30 cm × 10 cm</span>
                    <span className="block text-gray-500 text-xs mt-1">
                      (Länge × Breite × Höhe)
                    </span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 text-center">
                    <span className="block font-bold text-pink-600 text-lg mb-1">L-Paket</span>
                    <span className="text-gray-600">Max. 120 cm × 60 cm × 60 cm</span>
                    <span className="block text-gray-500 text-xs mt-1">
                      (Länge × Breite × Höhe)
                    </span>
                  </div>
                </div>
              </details>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    📮 Pakete abholen & 📤 versenden
                  </h3>
                  <p className="text-sm text-gray-600">
                    Holen Sie Ihre Pakete bequem ab oder versenden Sie diese direkt bei uns.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">↩️ Retouren & 🏷️ Etiketten</h3>
                  <p className="text-sm text-gray-600">
                    Geben Sie Retouren einfach ab oder lassen Sie sich vor Ort ein Etikett
                    erstellen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heute besonders gefragt - ALLE EMOJIS KORREKT */}
        <section className="py-12 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md border-2 border-pink-200 p-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl mr-3" aria-hidden="true">
                  🔥
                </span>
                <h2 className="text-2xl font-bold text-gray-900">Heute besonders gefragt</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-3xl mb-2" aria-hidden="true">
                    🥤
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">Gekühlte Getränke</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl mb-2" aria-hidden="true">
                    🍦
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">Eis & Snacks</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl mb-2" aria-hidden="true">
                    📰
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">Tageszeitungen</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl mb-2" aria-hidden="true">
                    📦
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">Hermes Versand</p>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Aktualisiert täglich • Alles sofort verfügbar
              </p>
            </div>
          </div>
        </section>

        {/* Beliebte Marken */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Beliebte Marken bei uns</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full font-medium">
                🥤 Coca-Cola & Fanta
              </span>
              <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full font-medium">
                🍫 Milka & Ritter Sport
              </span>
              <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full font-medium">
                🚬 Marlboro & Camel
              </span>
              <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full font-medium">
                🎫 Lotto 6aus49 & Eurojackpot
              </span>
              <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full font-medium">
                📰 Express & Kölner Stadt-Anzeiger
              </span>
              <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full font-medium">
                📱 Vodafone & Telekom
              </span>
            </div>
          </div>
        </section>

        {/* Produkte Section - ALLE EMOJIS KORREKT + JUGENDSCHUTZ */}
        <section id="produkte" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Unser Sortiment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    🥤
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Über 100 Getränke</h3>
                <p className="text-gray-600 mb-2">
                  Kalte und warme Getränke, Softdrinks, Säfte, Wasser, Bier und mehr. Immer frisch
                  und gekühlt!
                </p>
                <p className="text-xs text-red-600 font-medium">
                  ⚠️ Alkoholische Getränke nur an Personen ab 18 Jahren
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    🍫
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Süße Versuchungen</h3>
                <p className="text-gray-600">
                  Wie früher! Große Auswahl an Schokolade, Chips, Gummibärchen, Riegeln und allen
                  beliebten Snacks.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    📰
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Über 500 Zeitschriften</h3>
                <p className="text-gray-600">
                  Tageszeitungen, Magazine, Illustrierte und Fachzeitschriften. Für jeden das
                  Richtige!
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    🚬
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tabakwaren</h3>
                <p className="text-gray-600 mb-2">
                  Zigaretten, Zigarren, Tabak und Zubehör aller gängigen Marken. Alles vorrätig!
                </p>
                <p className="text-xs text-red-600 font-medium">⚠️ Nur an Personen ab 18 Jahren</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    🎫
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lotterie & Glücksspiel</h3>
                <p className="text-gray-600 mb-2">
                  Lotto 6aus49, Eurojackpot, Rubbellose und weitere Lotterieprodukte.
                </p>
                <p className="text-xs text-red-600 font-medium">
                  ⚠️ Die Teilnahme ist erst ab 18 Jahren erlaubt. Glücksspiel kann süchtig machen.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    📱
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Handy-Guthaben</h3>
                <p className="text-gray-600">
                  Aufladung für alle Mobilfunkanbieter: Telekom, Vodafone, O2, Aldi Talk und viele
                  mehr.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    📝
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Schreibwaren</h3>
                <p className="text-gray-600">
                  Stifte, Hefte, Briefumschläge und alles für Schule, Büro und Zuhause.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FAQ />
        <Reviews />

        {/* Über uns */}
        <section id="ueber-uns" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Über uns</h2>
            <div className="bg-pink-50 p-8 rounded-xl border border-pink-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Kiosk Lollipop</strong> ist Ihr freundlicher Nachbarschaftskiosk und Hermes
                Paketshop am Bürgerplatz im Herzen von Erftstadt-Liblar. Wir befinden uns in der
                Theodor-Heuss-Straße 35, in der Nähe des Bahnhofs und weiterer lokaler Geschäfte.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Ob Sie morgens Ihre Zeitung holen, mittags einen schnellen Snack brauchen, Pakete
                versenden oder abends noch Getränke für den Feierabend kaufen möchten - wir sind für
                Sie da.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Als offizieller Hermes Paketshop bieten wir Ihnen zusätzlich alle Dienstleistungen
                rund um Paketversand, -abholung und Retouren. Schnell, freundlich und zu fairen
                Preisen.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Besuchen Sie uns!</h2>
            <p className="text-xl text-pink-50 mb-4">
              Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar
            </p>
            <p className="text-lg text-pink-100 mb-8">Wir freuen uns auf Ihren Besuch!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white hover:bg-gray-100 text-pink-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center mx-auto">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Exakte Route planen
                </button>
              </a>
              <Link href="/kontakt">
                <button className="bg-pink-700 hover:bg-pink-800 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                  Kontaktformular
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Rechtliche Hinweise */}
        <section className="py-8 bg-gray-100 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-500 text-xl" aria-hidden="true">
                    ⚠️
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">
                    <strong>Jugendschutz:</strong> Tabakwaren und alkoholische Getränke werden nur
                    an Personen ab 18 Jahren abgegeben. Bitte halten Sie Ihren Ausweis bereit.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600 text-center">
              <p>Alle Preise inkl. gesetzlicher MwSt. | Irrtümer und Änderungen vorbehalten.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
