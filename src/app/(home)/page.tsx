import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';
import PackageCalculator from '@/components/PackageCalculator';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section mit Platzhalter-Bild */}
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop"
            alt="Kiosk Lollipop"
            fill
            className="object-cover"
            priority
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
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/kontakt">
                <button className="bg-white hover:bg-gray-100 text-pink-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Jetzt besuchen
                </button>
              </Link>
              <Link href="/#produkte">
                <button className="bg-pink-600 hover:bg-pink-700 text-white border-2 border-pink-400 px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Unser Sortiment
                </button>
              </Link>
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

        {/* Öffnungszeiten - TABELLE */}
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
                <div className="text-4xl mb-3">💳</div>
                <h3 className="font-semibold text-gray-900 mb-2">Zahlungsmethoden</h3>
                <p className="text-sm text-gray-600">
                  Bar · EC-Karte · Kontaktlos
                  <br />
                  Apple Pay · Google Pay
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-semibold text-gray-900 mb-2">Parken</h3>
                <p className="text-sm text-gray-600">
                  Kurze Haltezone direkt vor dem Laden
                  <br />
                  Öffentliche Parkplätze am Bürgerplatz
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">♿</div>
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
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold text-gray-900 text-sm">Geld abheben</h3>
                <p className="text-xs text-gray-600 mt-1">EC-Karte</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🖨️</div>
                <h3 className="font-semibold text-gray-900 text-sm">Druckservice</h3>
                <p className="text-xs text-gray-600 mt-1">Kopien & Ausdrucke</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔋</div>
                <h3 className="font-semibold text-gray-900 text-sm">Powerakkus</h3>
                <p className="text-xs text-gray-600 mt-1">Zum Ausleihen</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎁</div>
                <h3 className="font-semibold text-gray-900 text-sm">Geschenkkarten</h3>
                <p className="text-xs text-gray-600 mt-1">Verschiedene Anbieter</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hermes Paketshop Highlight + Rechner */}
        <section className="py-16 bg-yellow-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-yellow-100 p-8 rounded-xl border-2 border-yellow-300">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Hermes Paketshop</h2>
              <p className="text-lg text-gray-700 mb-6">
                Wir sind Ihr offizieller Hermes Paketshop in Erftstadt-Liblar!
              </p>

              {/* Interaktiver Paketgrößen-Rechner */}
              <PackageCalculator />

              {/* Statische Tabelle als Referenz (aufklappbar) */}
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
                    <span className="block text-gray-500 text-xs mt-1">
                      (z.B. Briefe, kleine Artikel)
                    </span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 text-center bg-pink-50">
                    <span className="block font-bold text-pink-600 text-lg mb-1">M-Paket</span>
                    <span className="text-gray-600">Max. 50 cm × 30 cm × 10 cm</span>
                    <span className="block text-gray-500 text-xs mt-1">
                      (Länge × Breite × Höhe)
                    </span>
                    <span className="block text-gray-500 text-xs mt-1">
                      (z.B. Schuhe, kleine Kartons)
                    </span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 text-center">
                    <span className="block font-bold text-pink-600 text-lg mb-1">L-Paket</span>
                    <span className="text-gray-600">Max. 120 cm × 60 cm × 60 cm</span>
                    <span className="block text-gray-500 text-xs mt-1">
                      (Länge × Breite × Höhe)
                    </span>
                    <span className="block text-gray-500 text-xs mt-1">(z.B. große Kartons)</span>
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

        {/* HEUTE BESONDERS GEFRAGT */}
        <section className="py-12 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md border-2 border-pink-200 p-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl mr-3">🔥</span>
                <h2 className="text-2xl font-bold text-gray-900">Heute besonders gefragt</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-3xl mb-2">🥤</div>
                  <p className="font-semibold text-gray-900 text-sm">Gekühlte Getränke</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl mb-2">🍦</div>
                  <p className="font-semibold text-gray-900 text-sm">Eis & Snacks</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl mb-2">📰</div>
                  <p className="font-semibold text-gray-900 text-sm">Tageszeitungen</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl mb-2">📦</div>
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

        {/* Produkte Section */}
        <section id="produkte" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Unser Sortiment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🥤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Über 100 Getränke</h3>
                <p className="text-gray-600">
                  Kalte und warme Getränke, Softdrinks, Säfte, Wasser, Bier und mehr. Immer frisch
                  und gekühlt!
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🍫</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Süße Versuchungen</h3>
                <p className="text-gray-600">
                  Wie früher! Große Auswahl an Schokolade, Chips, Gummibärchen, Riegeln und allen
                  beliebten Snacks.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">📰</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Über 500 Zeitschriften</h3>
                <p className="text-gray-600">
                  Tageszeitungen, Magazine, Illustrierte und Fachzeitschriften. Für jeden das
                  Richtige!
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🚬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tabakwaren</h3>
                <p className="text-gray-600">
                  Zigaretten, Zigarren, Tabak und Zubehör aller gängigen Marken. Alles vorrätig!
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🎫</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lotterie & Glücksspiel</h3>
                <p className="text-gray-600 mb-3">
                  Lotto 6aus49, Eurojackpot, Rubbellose und weitere Lotterieprodukte.
                </p>
                <p className="text-xs text-red-600 font-medium">
                  ⚠️ Die Teilnahme ist erst ab 18 Jahren erlaubt. Glücksspiel kann süchtig machen.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Handy-Guthaben</h3>
                <p className="text-gray-600">
                  Aufladung für alle Mobilfunkanbieter: Telekom, Vodafone, O2, Aldi Talk und viele
                  mehr.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Kundenbewertungen Section */}
        <Reviews />

        {/* Über uns Section */}
        <section id="ueber-uns" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Über uns</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-pink-100 border-2 border-pink-300 rounded-full px-6 py-3">
                <span className="text-pink-800 font-bold text-lg">
                  🏆 Seit über 10 Jahren in Liblar
                </span>
              </div>
            </div>
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
                  <span className="text-red-500 text-xl">⚠️</span>
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
