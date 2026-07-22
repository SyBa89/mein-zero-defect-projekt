'use client';

import { useState, useEffect } from 'react';

export default function CookieNotice() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [show, setShow] = useState(false); // Für sanfte Entrance-Animation

  // Hydration-Schutz: localStorage darf erst gelesen werden, wenn der Client bereit ist
  useEffect(() => {
    setIsMounted(true);
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      setIsVisible(true);
      // Kurze Verzögerung, damit die CSS-Transition greifen kann
      requestAnimationFrame(() => {
        setShow(true);
      });
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false); // Animation zum Ausblenden
    setTimeout(() => {
      setIsVisible(false);
    }, 300); // Warte auf das Ende der Transition (duration-300)
  };

  // Verhindert Hydration-Mismatch und rendert nichts, wenn nicht sichtbar
  if (!isMounted || !isVisible) return null;

  return (
    <div
      className={`fixed bottom-16 md:bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md text-gray-300 text-xs sm:text-sm py-4 px-4 sm:px-8 z-50 border-t border-gray-800 shadow-2xl transition-all duration-300 ease-out transform ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      role="dialog"
      aria-labelledby="cookie-notice-title"
      aria-describedby="cookie-notice-desc"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p id="cookie-notice-desc" className="text-center sm:text-left leading-relaxed">
          <span id="cookie-notice-title" className="font-semibold text-white sr-only">
            Datenschutz-Hinweis
          </span>
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
          className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-pink-500/30 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
          aria-label="Cookie-Hinweis schließen und Zustimmung erteilen"
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
