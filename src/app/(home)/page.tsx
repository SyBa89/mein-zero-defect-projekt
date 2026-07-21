import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';
import PackageCalculator from '@/components/PackageCalculator';
import CookieNotice from '@/components/CookieNotice';
import Image from 'next/image';
import Link from 'next/link';

// ✅ SEO Metadata - VOLLSTÄNDIG
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
    'Kiosk in der Nähe',
    'Paketshop in der Nähe',
    'Lotto Erftstadt',
  ],
  metadataBase: new URL('https://mein-zero-defect-projekt.vercel.app'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Kiosk Lollipop | Erftstadt-Liblar',
    description: 'Ihr Kiosk und Hermes Paketshop am Bürgerplatz. ★★★★★ 5,0 Sterne bei Google.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://mein-zero-defect-projekt.vercel.app',
    siteName: 'Kiosk Lollipop',
    images: [
      {
        url: '/images/fassade.png',
        width: 1200,
        height: 630,
        alt: 'Kiosk Lollipop Erftstadt-Liblar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiosk Lollipop | Erftstadt-Liblar',
    description: 'Ihr Kiosk und Hermes Paketshop am Bürgerplatz. ★★★★★ 5,0 Sterne bei Google.',
    images: ['/images/fassade.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ✅ Schema.org LocalBusiness - VOLLSTÄNDIG
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ConvenienceStore',
  '@id': 'https://mein-zero-defect-projekt.vercel.app/#store',
  name: 'Kiosk Lollipop',
  url: 'https://mein-zero-defect-projekt.vercel.app',
  logo: 'https://mein-zero-defect-projekt.vercel.app/images/logo.png',
  image: 'https://mein-zero-defect-projekt.vercel.app/images/fassade.png',
  description:
    'Ihr Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar. ★★★★★ 5,0 Sterne bei Google.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Theodor-Heuss-Straße 35',
    postalCode: '50374',
    addressLocality: 'Erftstadt',
    addressRegion: 'NRW',
    addressCountry: 'DE',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 50.806945, longitude: 6.823683 },
  telephone: '+4922359291160',
  priceRange: '€',
  openingHours: ['Mo-Fr 07:30-19:00', 'Sa 07:30-14:30'],
  sameAs: ['https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '60',
    reviewCount: '60',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-pink-200 selection:text-pink-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <Header />

      <main>
        <div className="sr-only">
          <a
            href="#main-content"
            className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-pink-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          >
            Zum Hauptinhalt springen
          </a>
        </div>

        {/* 🚀 HERO SECTION: MAXIMALE PERFEKTION - Optimiert für Lesbarkeit & Ästhetik */}
        <section
          id="main-content"
          className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden"
        >
          <Image
            src="/images/fassade.png"
            alt="Kiosk Lollipop Fassade am Bürgerplatz"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
          />

          {/* Schicht 1: Basis-Abdunkelung (nur 30%, damit das Foto dominant sichtbar bleibt) */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Schicht 2: Cinematic Vignette (Dunkel an den Rändern/Unten, Transparent in der Mitte) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_10%,rgba(0,0,0,0.7)_100%)]" />

          {/* Schicht 3: Subtiler Brand-Akzent (Nur unten für die Buttons) */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none drop-shadow-2xl">
              Willkommen bei <br />
              <span className="text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                Kiosk Lollipop
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-gray-100 mb-4 drop-shadow-xl font-light">
              Ihr Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar
            </p>

            <a
              href="tel:+4922359291160"
              className="inline-flex items-center justify-center gap-2 text-lg text-gray-100 hover:text-white transition-colors mb-10 drop-shadow-xl group"
            >
              <svg
                className="w-5 h-5 group-hover:text-pink-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="underline decoration-pink-400/50 underline-offset-4 group-hover:decoration-pink-400">
                02235 9291160
              </span>
            </a>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white/90 backdrop-blur-md hover:bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-pink-500/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
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
                <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/40 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
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
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-5 bg-gradient-to-r from-yellow-50 to-orange-50 px-10 py-6 rounded-3xl shadow-xl border border-yellow-200/50">
              <div className="flex text-yellow-400 drop-shadow-sm">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-10 h-10 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-left border-l border-yellow-300/50 pl-5">
                <p className="text-3xl font-black text-gray-900">5,0 Sterne</p>
                <p className="text-sm text-gray-700 font-medium">
                  Basierend auf über 60 echten Bewertungen
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Aktuelle Aktion Banner */}
        <section className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 py-5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white font-bold text-lg drop-shadow-md">
              🎉 Frische Brötchen, gekühlte Getränke & Ihr Hermes Paketshop direkt am Bürgerplatz!
              🎉
            </p>
          </div>
        </section>

        {/* Warum Kunden zu uns kommen */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                Warum Kunden zu uns kommen
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light">
                Mehr als nur ein Kiosk - wir sind Ihr Nachbar mit echtem Service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '📦',
                  title: 'Hermes Paketshop',
                  desc: 'Komplett-Service für Paketversand, Abholung und Retouren. Schnell und zuverlässig.',
                },
                {
                  icon: '🕒',
                  title: 'Lange Öffnungszeiten',
                  desc: 'Mo-Fr bis 19:00 Uhr, Sa bis 14:30 Uhr. Wir sind da, wenn Sie uns brauchen.',
                },
                {
                  icon: '📍',
                  title: 'Zentrale Lage',
                  desc: 'Direkt am Bürgerplatz in Liblar. Gut zu Fuß oder mit dem Auto erreichbar.',
                },
                {
                  icon: '🅿️',
                  title: 'Parkplätze vor der Tür',
                  desc: 'Kurze Haltezone direkt vor dem Laden und öffentliche Parkplätze in der Nähe.',
                },
                {
                  icon: '💳',
                  title: 'Moderne Zahlung',
                  desc: 'Bar, EC-Karte, Kontaktlos, Apple Pay und Google Pay. Sie zahlen, wie Sie wollen.',
                },
                {
                  icon: '👋',
                  title: 'Persönlicher Service',
                  desc: 'Seit 2020 für Liblar da. Wir kennen unsere Kunden und beraten persönlich.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/40 hover:shadow-2xl hover:-translate-y-2 hover:border-pink-300 transition-all duration-500 group"
                >
                  <div
                    className="text-5xl mb-5 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-gray-900 mb-10 text-center tracking-tight">
              Öffnungszeiten
            </h2>
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl border border-pink-100 overflow-hidden shadow-xl">
              <table className="w-full">
                <tbody className="divide-y divide-pink-100/50">
                  <tr className="hover:bg-pink-100/50 transition-colors">
                    <td className="px-8 py-6 text-left font-bold text-gray-900 text-lg">
                      Montag - Freitag
                    </td>
                    <td className="px-8 py-6 text-right text-pink-600 font-black text-xl">
                      07:30 - 19:00 Uhr
                    </td>
                  </tr>
                  <tr className="hover:bg-pink-100/50 transition-colors">
                    <td className="px-8 py-6 text-left font-bold text-gray-900 text-lg">Samstag</td>
                    <td className="px-8 py-6 text-right text-pink-600 font-black text-xl">
                      07:30 - 14:30 Uhr
                    </td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td className="px-8 py-6 text-left font-bold text-gray-900 text-lg">
                      Sonn- und Feiertags
                    </td>
                    <td className="px-8 py-6 text-right text-red-500 font-black text-xl">
                      Geschlossen
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Service & Zahlung */}
        <section className="py-16 bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                <div className="text-4xl mb-3" aria-hidden="true">
                  💳
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Zahlungsmethoden</h3>
                <p className="text-sm text-gray-700">
                  Bar · EC-Karte · Kontaktlos
                  <br />
                  Apple Pay · Google Pay
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3" aria-hidden="true">
                  🚗
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Parken</h3>
                <p className="text-sm text-gray-700">
                  Kurze Haltezone direkt vor dem Laden
                  <br />
                  Öffentliche Parkplätze am Bürgerplatz
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3" aria-hidden="true">
                  ♿
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Barrierefreiheit</h3>
                <p className="text-sm text-gray-700">
                  Stufenfreier Zugang
                  <br />
                  Rollstuhlgerecht
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Erweiterte Services */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-gray-900 mb-10 text-center tracking-tight">
              Weitere Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '💰', title: 'Geld abheben', sub: 'EC-Karte' },
                { icon: '🖨️', title: 'Druckservice', sub: 'Kopien & Ausdrucke' },
                { icon: '☕', title: 'Heiße Getränke', sub: 'Kaffee & Tee to go' },
                { icon: '🔌', title: 'Handy-Ladestation', sub: 'Smartphone aufladen' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-pink-50 transition-colors duration-300"
                >
                  <div className="text-3xl mb-2" aria-hidden="true">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{s.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hermes Paketshop */}
        <section className="py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/70 backdrop-blur-sm p-10 rounded-[2rem] border border-yellow-200/50 shadow-xl">
              <div className="text-6xl mb-5" aria-hidden="true"></div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                Hermes Paketshop
              </h2>
              <p className="text-lg text-gray-700 mb-8 font-light">
                Wir sind Ihr offizieller Hermes Paketshop in Erftstadt-Liblar!
              </p>

              <PackageCalculator />

              <details className="bg-white rounded-2xl p-6 mb-8 text-left shadow-sm border border-gray-100">
                <summary className="font-bold text-gray-900 cursor-pointer hover:text-pink-600 transition-colors text-lg">
                  📋 Alle Paketgrößen im Detail anzeigen
                </summary>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="border border-gray-200 rounded-xl p-4 text-center bg-gray-50">
                    <span className="block font-black text-pink-600 text-lg mb-1">S-Paket</span>
                    <span className="text-gray-700">Max. 31,5 × 23,5 × 3,5 cm</span>
                  </div>
                  <div className="border border-pink-200 rounded-xl p-4 text-center bg-pink-50">
                    <span className="block font-black text-pink-600 text-lg mb-1">M-Paket</span>
                    <span className="text-gray-700">Max. 50 × 30 × 10 cm</span>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4 text-center bg-gray-50">
                    <span className="block font-black text-pink-600 text-lg mb-1">L-Paket</span>
                    <span className="text-gray-700">Max. 120 × 60 × 60 cm</span>
                  </div>
                </div>
              </details>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {' '}
                    Pakete abholen & 📤 versenden
                  </h3>
                  <p className="text-sm text-gray-700">
                    Holen Sie Ihre Pakete bequem ab oder versenden Sie diese direkt bei uns.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">️ Retouren & 🏷️ Etiketten</h3>
                  <p className="text-sm text-gray-700">
                    Geben Sie Retouren einfach ab oder lassen Sie sich vor Ort ein Etikett
                    erstellen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heute besonders gefragt */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-lg border border-pink-100 p-8">
              <div className="flex items-center justify-center mb-6">
                <span className="text-3xl mr-3" aria-hidden="true">
                  🔥
                </span>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  Heute besonders gefragt
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '🥤', text: 'Gekühlte Getränke', bg: 'bg-pink-100/50' },
                  { icon: '', text: 'Eis & Snacks', bg: 'bg-yellow-100/50' },
                  { icon: '📰', text: 'Tageszeitungen', bg: 'bg-blue-100/50' },
                  { icon: '📦', text: 'Hermes Versand', bg: 'bg-green-100/50' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`text-center p-5 ${item.bg} rounded-2xl backdrop-blur-sm`}
                  >
                    <div className="text-3xl mb-2" aria-hidden="true">
                      {item.icon}
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 mt-6 font-medium">
                Aktualisiert täglich • Alles sofort verfügbar
              </p>
            </div>
          </div>
        </section>

        {/* Beliebte Marken */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">
              Beliebte Marken bei uns
            </h2>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                '🥤 Coca-Cola & Fanta',
                '🍫 Milka & Ritter Sport',
                '🚬 Marlboro & Camel',
                '🎫 Lotto 6aus49 & Eurojackpot',
                '📰 Express & Kölner Stadt-Anzeiger',
                '📱 Vodafone & Telekom',
              ].map((brand, i) => (
                <span
                  key={i}
                  className="px-5 py-3 bg-white text-pink-700 rounded-full font-bold shadow-sm border border-pink-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Produkte Section */}
        <section id="produkte" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-gray-900 mb-14 text-center tracking-tight">
              Unser Sortiment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🥤',
                  bg: 'bg-blue-100',
                  title: 'Über 100 Getränke',
                  desc: 'Kalte und warme Getränke, Softdrinks, Säfte, Wasser, Bier und mehr. Immer frisch und gekühlt!',
                  warn: '️ Alkoholische Getränke nur an Personen ab 18 Jahren',
                },
                {
                  icon: '🍫',
                  bg: 'bg-yellow-100',
                  title: 'Süße Versuchungen',
                  desc: 'Wie früher! Große Auswahl an Schokolade, Chips, Gummibärchen, Riegeln und allen beliebten Snacks.',
                },
                {
                  icon: '📰',
                  bg: 'bg-green-100',
                  title: 'Über 500 Zeitschriften',
                  desc: 'Tageszeitungen, Magazine, Illustrierte und Fachzeitschriften. Für jeden das Richtige!',
                },
                {
                  icon: '',
                  bg: 'bg-red-100',
                  title: 'Tabakwaren',
                  desc: 'Zigaretten, Zigarren, Tabak und Zubehör aller gängigen Marken. Alles vorrätig!',
                  warn: '⚠️ Nur an Personen ab 18 Jahren',
                },
                {
                  icon: '',
                  bg: 'bg-purple-100',
                  title: 'Lotterie & Glücksspiel',
                  desc: 'Lotto 6aus49, Eurojackpot, Rubbellose und weitere Lotterieprodukte.',
                  warn: '⚠️ Die Teilnahme ist erst ab 18 Jahren erlaubt. Glücksspiel kann süchtig machen.',
                },
                {
                  icon: '📱',
                  bg: 'bg-indigo-100',
                  title: 'Handy-Guthaben',
                  desc: 'Aufladung für alle Mobilfunkanbieter: Telekom, Vodafone, O2, Aldi Talk und viele mehr.',
                },
                {
                  icon: '',
                  bg: 'bg-teal-100',
                  title: 'Schreibwaren',
                  desc: 'Stifte, Hefte, Briefumschläge und alles für Schule, Büro und Zuhause.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5`}
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 mb-2 leading-relaxed">{item.desc}</p>
                  {item.warn && <p className="text-xs text-red-600 font-bold mt-3">{item.warn}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ />
        <Reviews />

        {/* Über uns */}
        <section id="ueber-uns" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-gray-900 mb-10 text-center tracking-tight">
              Über uns
            </h2>
            <div className="bg-white p-10 rounded-3xl border border-pink-100 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong className="text-gray-900">Kiosk Lollipop</strong> ist Ihr freundlicher
                Nachbarschaftskiosk und Hermes Paketshop am Bürgerplatz im Herzen von
                Erftstadt-Liblar. Wir befinden uns in der Theodor-Heuss-Straße 35, in der Nähe des
                Bahnhofs und weiterer lokaler Geschäfte.
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
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/fassade.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight drop-shadow-lg">
              Besuchen Sie uns!
            </h2>
            <p className="text-2xl text-pink-100 mb-4 font-light">
              Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar
            </p>
            <p className="text-lg text-gray-300 mb-10">Wir freuen uns auf Ihren Besuch!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                  <svg
                    className="w-6 h-6"
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
                <button className="bg-pink-600 hover:bg-pink-500 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-pink-500/40 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95">
                  Kontaktformular
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Rechtliche Hinweise */}
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
                    <strong>Jugendschutz:</strong> Tabakwaren und alkoholische Getränke werden nur
                    an Personen ab 18 Jahren abgegeben. Bitte halten Sie Ihren Ausweis bereit.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600 text-center font-medium">
              <p>Alle Preise inkl. gesetzlicher MwSt. | Irrtümer und Änderungen vorbehalten.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileActionBar />
      <CookieNotice />
    </div>
  );
}
