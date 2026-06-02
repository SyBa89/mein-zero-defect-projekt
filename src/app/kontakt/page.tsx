import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Kontakt & Anfahrt</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kontaktinformationen */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">So finden Sie uns</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <span className="text-orange-600 mr-3 text-xl">📍</span>
                <div>
                  <strong className="block text-gray-900">Adresse</strong>
                  <span>
                    Theodor-Heuss-Straße 35
                    <br />
                    50374 Erftstadt-Liblar
                  </span>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-orange-600 mr-3 text-xl">📞</span>
                <div>
                  <strong className="block text-gray-900">Telefon</strong>
                  <a href="tel:+4922359291160" className="hover:text-orange-600 transition-colors">
                    +49 2235 9291160
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-orange-600 mr-3 text-xl">📧</span>
                <div>
                  <strong className="block text-gray-900">E-Mail</strong>
                  <a
                    href="mailto:info@kiosk-lollipop.de"
                    className="hover:text-orange-600 transition-colors"
                  >
                    info@kiosk-lollipop.de
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-orange-600 mr-3 text-xl">🕐</span>
                <div>
                  <strong className="block text-gray-900">Öffnungszeiten</strong>
                  <div className="text-sm space-y-1 mt-1">
                    <p>Mo, Di, Fr: 07:30 - 19:00 Uhr</p>
                    <p>Mi, Do: 14:00 - 19:00 Uhr</p>
                    <p>Samstag: 07:30 - 13:30 Uhr</p>
                    <p>Sonntag: Geschlossen</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ECHTE Google Maps Einbettung */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-3">Anfahrt</h3>
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2517.8!2d6.8238405!3d50.8069582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf3d8f37955a6d%3A0xc6386e16f5216e3b!2sKiosk%20Lollipop!5e0!3m2!1sde!2sde!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kiosk Lollipop Standort"
                ></iframe>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                💡 Tipp: Klicken Sie auf die Karte für eine größere Ansicht.
              </p>
            </div>

            {/* Lage-Hinweis */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>📍 Lage:</strong> Wir befinden uns im Zentrum von Liblar, in der Nähe des
                Bahnhofs und weiterer lokaler Geschäfte. Gute Parkmöglichkeiten in der Umgebung.
              </p>
            </div>
          </div>

          {/* Kontaktformular */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Nachricht senden</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ihr Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="ihre@email.de"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ihre Nachricht..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
              >
                Nachricht senden
              </button>

              <p className="text-xs text-gray-500 text-center">
                Hinweis: Dies ist ein Demo-Formular ohne Backend-Funktionalität.
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
