import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Willkommen bei <br />
              <span className="text-yellow-300">Kiosk Lollipop</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-orange-50 mb-4">
              Ihr Kiosk und Hermes Paketshop in Erftstadt-Liblar
            </p>
            <p className="max-w-2xl mx-auto text-lg text-orange-100 mb-10">
              Theodor-Heuss-Straße 35, 50374 Erftstadt
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/kontakt">
                <button className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                  Jetzt besuchen
                </button>
              </Link>
              <Link href="/#produkte">
                <button className="bg-orange-600 hover:bg-orange-700 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
                  Unser Sortiment
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Aktuelle Aktion Banner */}
        <section className="bg-gradient-to-r from-yellow-400 to-orange-500 py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white font-bold text-lg">
              🎉 PLATZHALTER: Hier können Sie Ihre aktuellen Aktionen eintragen (z.B. "10% auf alle
              Getränke")! 🎉
            </p>
            <p className="text-white text-sm mt-1">
              Ändern Sie diesen Text jederzeit selbst, um auf neue Lieferungen oder Angebote
              hinzuweisen.
            </p>
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Öffnungszeiten</h2>
            <div className="bg-orange-50 p-8 rounded-xl border-2 border-orange-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Montag, Dienstag, Freitag</h3>
                  <p className="text-2xl text-orange-600 font-bold">07:30 - 19:00 Uhr</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mittwoch, Donnerstag</h3>
                  <p className="text-2xl text-orange-600 font-bold">14:00 - 19:00 Uhr</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Samstag</h3>
                  <p className="text-2xl text-orange-600 font-bold">07:30 - 13:30 Uhr</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sonntag</h3>
                  <p className="text-2xl text-red-600 font-bold">Geschlossen</p>
                </div>
              </div>
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
                  Kurze Haltezone vor dem Geschäft
                  <br />
                  Öffentliche Parkplätze in der Nähe
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
                <p className="text-xs text-gray-600 mt-1">EC-Karte & Kreditkarte</p>
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

        {/* Hermes Paketshop Highlight + Größen-Guide */}
        <section className="py-16 bg-yellow-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-yellow-100 p-8 rounded-xl border-2 border-yellow-300">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Hermes Paketshop</h2>
              <p className="text-lg text-gray-700 mb-6">
                Wir sind Ihr offizieller Hermes Paketshop in Erftstadt-Liblar!
              </p>

              <div className="bg-white rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-4 text-center">
                  📏 Hermes Paketgrößen im Überblick
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="border border-gray-200 rounded-lg p-4 text-center">
                    <span className="block font-bold text-orange-600 text-lg mb-1">S-Paket</span>
                    <span className="text-gray-600">bis 31,5 x 23,5 x 3,5 cm</span>
                    <span className="block text-gray-500 text-xs mt-1">
                      (z.B. Briefe, kleine Artikel)
                    </span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 text-center bg-orange-50">
                    <span className="block font-bold text-orange-600 text-lg mb-1">M-Paket</span>
                    <span className="text-gray-600">bis 50 x 30 x 10 cm</span>
                    <span className="block text-gray-500 text-xs mt-1">
                      (z.B. Schuhe, kleine Kartons)
                    </span>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 text-center">
                    <span className="block font-bold text-orange-600 text-lg mb-1">L-Paket</span>
                    <span className="text-gray-600">bis 120 x 60 x 60 cm</span>
                    <span className="block text-gray-500 text-xs mt-1">(z.B. große Kartons)</span>
                  </div>
                </div>
              </div>

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

        {/* Beliebte Marken */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Beliebte Marken bei uns</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                🥤 Coca-Cola
              </span>
              <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                🍫 Milka & Ritter Sport
              </span>
              <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                🚬 Marlboro & Camel
              </span>
              <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                🎫 Lotto 6aus49
              </span>
              <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                📰 Express & KStA
              </span>
              <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Getränke</h3>
                <p className="text-gray-600">
                  Kalte und warme Getränke, Softdrinks, Säfte, Wasser, Bier und mehr.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🍫</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Süßigkeiten & Snacks</h3>
                <p className="text-gray-600">
                  Schokolade, Chips, Gummibärchen, Riegel und alle beliebten Snacks.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">📰</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Zeitungen & Zeitschriften
                </h3>
                <p className="text-gray-600">
                  Tageszeitungen, Magazine, Illustrierte und Fachzeitschriften.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🚬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tabakwaren</h3>
                <p className="text-gray-600">
                  Zigaretten, Zigarren, Tabak und Zubehör aller gängigen Marken.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">🎫</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lotterie</h3>
                <p className="text-gray-600">
                  Lotto, Rubbellose, Eurojackpot und andere Lotterieprodukte.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Handy-Guthaben</h3>
                <p className="text-gray-600">
                  Aufladung für alle Mobilfunkanbieter und Prepaid-Karten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Häufige Fragen</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  📦 Kann ich meine Hermes-Pakete auch sonntags abholen?
                </h3>
                <p className="text-gray-600">
                  Nein, sonntags haben wir geschlossen. Sie können Ihre Pakete zu unseren regulären
                  Öffnungszeiten abholen. Die Lagerfrist beträgt in der Regel 7 Tage.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  💳 Welche Zahlungsmethoden akzeptiert ihr?
                </h3>
                <p className="text-gray-600">
                  Wir akzeptieren Barzahlung und EC-Karte (girocard). Kontaktlose Zahlungen mit
                  Karte oder Smartphone (Apple Pay, Google Pay) sind ebenfalls möglich.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">🚗 Gibt es Parkmöglichkeiten?</h3>
                <p className="text-gray-600">
                  Ja, direkt vor unserem Geschäft gibt es kurze Haltemöglichkeiten zum schnellen
                  Ein- und Ausladen. Für längere Aufenthalte nutzen Sie bitte die öffentlichen
                  Parkplätze in der Umgebung.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  ↩️ Kann ich Retouren bei euch abgeben?
                </h3>
                <p className="text-gray-600">
                  Ja, wir nehmen Hermes-Retouren während unserer Öffnungszeiten entgegen. Bitte
                  bringen Sie Ihr Retourenlabel mit oder lassen Sie es uns vor Ort erstellen.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  🚫 Bietet ihr einen Lieferservice an?
                </h3>
                <p className="text-gray-600">
                  Nein, wir bieten keinen Lieferservice an. Alle Produkte sind jedoch sofort vor Ort
                  verfügbar - ohne Wartezeit und ohne Mindestbestellwert.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Über uns Section mit Trust-Badge */}
        <section id="ueber-uns" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Über uns</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-orange-100 border-2 border-orange-300 rounded-full px-6 py-3">
                <span className="text-orange-800 font-bold text-lg">
                  🏆 Seit über 10 Jahren in Liblar
                </span>
              </div>
            </div>
            <div className="bg-orange-50 p-8 rounded-xl border border-orange-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Kiosk Lollipop</strong> ist Ihr freundlicher Nachbarschaftskiosk und Hermes
                Paketshop im Herzen von Erftstadt-Liblar. Wir befinden uns in der
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

        {/* CTA Section mit GPS-Koordinaten */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Besuchen Sie uns!</h2>
            <p className="text-xl text-orange-50 mb-4">
              Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar
            </p>
            <p className="text-lg text-orange-100 mb-8">Wir freuen uns auf Ihren Besuch!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center mx-auto">
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
                <button className="bg-orange-600 hover:bg-orange-700 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg">
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
