'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Prüfe ob bereits eine Entscheidung getroffen wurde
    const consent = localStorage.getItem('cookie-consent');

    // Wenn bereits entschieden, nichts tun (Early Return)
    if (consent) return;

    // Verzögerung für bessere UX
    const timer = setTimeout(() => setShowBanner(true), 1000);

    // Cleanup-Funktion
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🍪</div>
            <div>
              <h2 className="text-white font-bold text-lg">Cookie-Einstellungen</h2>
              <p className="text-pink-100 text-sm">Wir respektieren Ihre Privatsphäre</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Wir verwenden Cookies und ähnliche Technologien, um Ihnen die bestmögliche Erfahrung auf
            unserer Website zu bieten. Einige Cookies sind für den Betrieb der Seite erforderlich,
            andere helfen uns, die Website zu verbessern und Ihnen personalisierte Inhalte
            anzuzeigen.
          </p>

          {/* Detail-Bereich (aufklappbar) */}
          {showDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Cookie-Kategorien</h3>

              <div className="space-y-3">
                {/* Notwendige Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">Notwendige Cookies</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        Immer aktiv
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Diese Cookies sind für den Betrieb der Website erforderlich und können nicht
                      deaktiviert werden. Sie speichern z.B. Ihre Cookie-Einstellungen.
                    </p>
                  </div>
                </div>

                {/* Funktionale Cookies */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">Funktionale Cookies</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Diese Cookies ermöglichen es uns, die Nutzung der Website zu analysieren und
                      zu verbessern. Sie werden nur mit Ihrer Einwilligung gesetzt.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  Detaillierte Informationen finden Sie in unserer{' '}
                  <Link
                    href="/datenschutz"
                    className="text-pink-600 hover:text-pink-700 underline font-medium"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAcceptAll}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
            >
              Alle akzeptieren
            </button>

            <button
              onClick={handleAcceptNecessary}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Nur notwendige
            </button>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 bg-white border-2 border-gray-300 hover:border-pink-400 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {showDetails ? 'Weniger anzeigen' : 'Mehr erfahren'}
            </button>
          </div>

          {/* Datenschutzerklärung Link */}
          <div className="mt-4 text-center">
            <Link
              href="/datenschutz"
              className="text-sm text-pink-600 hover:text-pink-700 font-medium underline"
            >
              Datenschutzerklärung
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
