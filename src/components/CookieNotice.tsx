'use client';

import { useState, useEffect } from 'react';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration-Schutz: localStorage darf erst gelesen werden, wenn die Komponente im Browser gemountet ist
  useEffect(() => {
    setIsMounted(true);
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Zustimmung speichern, damit der Banner beim nächsten Besuch nicht mehr erscheint
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  // Verhindert Hydration-Mismatch, indem nichts gerendert wird, bis der Client bereit ist
  if (!isMounted || !isVisible) return null;

  return (
    <div
      className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md text-gray-300 text-xs sm:text-sm py-3 px-4 sm:px-8 z-40 border-t border-gray-800 shadow-2xl transition-all duration-300"
      role="dialog"
      aria-labelledby="cookie-notice-title"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p id="cookie-notice-title" className="text-center sm:text-left leading-relaxed">
          <span className="font-semibold text-white">Datenschutz-Hinweis:</span> Diese Website
          verwendet ausschließlich technisch notwendige Cookies. Es findet{' '}
          <span className="text-pink-400 font-medium">kein Tracking</span> und keine Weitergabe von
          Daten an Dritte statt.
          <a
            href="/datenschutz"
            className="underline hover:text-pink-400 ml-1 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
          >
            Mehr erfahren
          </a>
          .
        </p>
        <button
          onClick={handleAccept}
          className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-pink-500/30 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Cookie-Hinweis schließen und zustimmen"
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
