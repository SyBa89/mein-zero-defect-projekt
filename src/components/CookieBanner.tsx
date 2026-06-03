'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <-- NEU: Um die aktuelle URL zu erkennen

export default function CookieBanner() {
  const pathname = usePathname(); // <-- NEU: Holt den aktuellen Pfad (z.B. "/datenschutz")
  const [isVisible, setIsVisible] = useState(false);

  // <-- NEUE LOGIK: Wenn wir auf der Datenschutz- oder Impressum-Seite sind, zeige den Banner NICHT an.
  if (pathname === '/datenschutz' || pathname === '/impressum') {
    return null;
  }

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm text-white p-4 z-[9999] shadow-2xl border-t-2 border-pink-500"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Text-Bereich */}
          <div className="flex-1">
            <h2 id="cookie-banner-title" className="text-lg font-bold mb-2 text-pink-400">
              🍪 Cookie-Einstellungen
            </h2>
            <p id="cookie-banner-description" className="text-sm text-gray-300 leading-relaxed">
              Diese Webseite verwendet Google Maps zur Darstellung des Standorts. Durch die Nutzung
              dieser Webseite stimmen Sie der Übertragung von Daten an Google zu. Weitere
              Informationen finden Sie in unserer{' '}
              <Link
                href="/datenschutz"
                className="text-pink-400 hover:text-pink-300 underline transition-colors font-medium cursor-pointer"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>

          {/* Button-Bereich */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto relative z-20">
            <Link
              href="/datenschutz"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors text-center border border-gray-700 cursor-pointer"
            >
              Mehr erfahren
            </Link>
            <button
              onClick={acceptCookies}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
              aria-label="Cookies akzeptieren und Banner schließen"
            >
              ✓ Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
