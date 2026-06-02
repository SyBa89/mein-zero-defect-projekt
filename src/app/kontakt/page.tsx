'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function KontaktPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000); // Reset nach 3 Sekunden
  };

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
                  <span className="block text-xs text-gray-500 mt-1">
                    (Haupteingang direkt am Leipziger Ring)
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

            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-3">Anfahrt</h3>
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://maps.google.com/maps?q=50.806945,6.823683&hl=de&z=19&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Kiosk Lollipop"
                ></iframe>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>💡 Profi-Navigationstipp:</strong> Damit Ihr Navi Sie nicht am Geschäft
                  vorbeiführt, nutzen Sie für die Anreise am besten direkt die Koordinaten oder die
                  Angabe "Leipziger Ring".
                </p>
              </div>
            </div>
          </div>

          {/* Kontaktformular */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Nachricht senden</h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="font-bold text-lg mb-1">Vielen Dank!</h3>
                <p className="text-sm">
                  Dies ist eine Demo. In der Live-Version würde Ihre Nachricht jetzt versendet
                  werden.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    required
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
                    required
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
                    required
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
                  Nachricht absenden
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Hinweis: Dies ist eine Demo ohne echtes Backend.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
