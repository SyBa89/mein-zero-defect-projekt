'use client';

import { useState, useEffect } from 'react';
import { useConfig } from '@/contexts/ConfigContext';
import Link from 'next/link';

interface Consent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export default function CookieBanner() {
  const config = useConfig();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!config.tracking?.enabled) return;
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setIsVisible(true);
  }, [config.tracking?.enabled]);

  if (!config.tracking?.enabled || !isVisible) return null;

  const saveConsent = (consent: Omit<Consent, 'timestamp'>) => {
    const fullConsent: Consent = {
      ...consent,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(fullConsent));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleRejectAll = () =>
    saveConsent({ necessary: true, analytics: false, marketing: false });
  const handleAcceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true });
  const handleSaveSettings = () => saveConsent(preferences);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-[9999] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {showSettings ? (
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Cookie-Einstellungen
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Wählen Sie selbst, welche Cookie-Kategorien Sie zulassen möchten. Sie können Ihre
              Entscheidung jederzeit widerrufen.
            </p>
            <div className="space-y-3 mb-4">
              <label className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-[var(--theme-radius)]">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="w-5 h-5 mt-0.5 accent-[var(--theme-primary)]"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Notwendige Cookies (immer aktiv)
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Für grundlegende Funktionen wie Session-Management erforderlich. Können nicht
                    deaktiviert werden.
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-[var(--theme-radius)] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-5 h-5 mt-0.5 accent-[var(--theme-primary)]"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Analyse-Cookies</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Helfen uns, die Website durch anonymisierte Nutzungsdaten zu verbessern (z.B.
                    Google Analytics).
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-[var(--theme-radius)] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-5 h-5 mt-0.5 accent-[var(--theme-primary)]"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Marketing-Cookies
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Für personalisierte Werbung und Social-Media-Integration (z.B. Facebook Pixel).
                  </div>
                </div>
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-[var(--theme-radius)] hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                ← Zurück
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 text-sm font-semibold text-white bg-[var(--theme-primary)] hover:brightness-110 rounded-[var(--theme-radius)]"
              >
                Auswahl speichern
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl" aria-hidden="true">
                🍪
              </span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Wir respektieren Ihre Privatsphäre
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie können selbst
                  entscheiden, welche Kategorien Sie zulassen.
                  <Link
                    href="/datenschutz"
                    className="ml-1 underline hover:text-[var(--theme-primary)]"
                  >
                    Mehr erfahren
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRejectAll}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-[var(--theme-radius)] hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-[var(--theme-radius)] hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Einstellungen
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--theme-primary)] hover:brightness-110 rounded-[var(--theme-radius)]"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
