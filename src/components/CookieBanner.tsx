'use client';

import { useEffect, useState } from 'react';

type ConsentCategory = 'necessary' | 'analytics' | 'marketing';
type ConsentState = Record<ConsentCategory, boolean>;
const STORAGE_KEY = 'cookie-consent-v1';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setShowBanner(true);
    } else {
      try {
        const parsed = JSON.parse(stored) as ConsentState;
        setConsent(parsed);
        window.dispatchEvent(new CustomEvent('cookie-consent', { detail: parsed }));
      } catch {
        setShowBanner(true);
      }
    }
  }, []);

  const saveConsent = (newConsent: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    setShowBanner(false);
    setShowDetails(false);
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: newConsent }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t border-pink-200 shadow-2xl">
      <div className="max-w-6xl mx-auto">
        {!showDetails ? (
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🍪 Wir respektieren Ihre Privatsphäre
              </h3>
              <p className="text-sm text-gray-600">
                Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 shrink-0">
              <button
                onClick={() => saveConsent({ necessary: true, analytics: false, marketing: false })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm font-medium text-pink-600 bg-white border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors"
              >
                Einstellungen
              </button>
              <button
                onClick={() => saveConsent({ necessary: true, analytics: true, marketing: true })}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Cookie-Einstellungen</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Notwendige Cookies</span>
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    Immer aktiv
                  </span>
                </div>
                <input type="checkbox" checked disabled className="mt-1 w-5 h-5" />
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Analytics</span>
                  <p className="text-xs text-gray-600 mt-1">
                    Helfen uns zu verstehen, wie Besucher unsere Website nutzen.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                  className="mt-1 w-5 h-5 text-pink-600 cursor-pointer"
                />
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">Marketing</span>
                  <p className="text-xs text-gray-600 mt-1">Aktuell nicht aktiv.</p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                  className="mt-1 w-5 h-5 text-pink-600 cursor-pointer"
                />
              </div>
            </div>
            <button
              onClick={() => saveConsent(consent)}
              className="w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              Auswahl speichern
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
