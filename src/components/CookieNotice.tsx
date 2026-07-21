'use client';

import { useState } from 'react';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(true);

  // Wenn der Nutzer auf "Verstanden" geklickt hat, wird die Komponente nicht gerendert
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md text-gray-300 text-xs sm:text-sm py-3 px-4 sm:px-8 z-50 border-t border-gray-800 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-left leading-relaxed">
          <span className="font-semibold text-white">Datenschutz-Hinweis:</span> Diese Website
          verwendet ausschließlich technisch notwendige Cookies. Es findet{' '}
          <span className="text-pink-400 font-medium">kein Tracking</span> und keine Weitergabe von
          Daten an Dritte statt.
          <a href="/datenschutz" className="underline hover:text-pink-400 ml-1 transition-colors">
            Mehr erfahren
          </a>
          .
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-pink-500/30 whitespace-nowrap"
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
