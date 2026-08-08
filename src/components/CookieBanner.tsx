'use client';

import { useState, useEffect } from 'react';
import { useConfig } from '@/contexts/ConfigContext';

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
    // Zero-Defect: Only show if tracking is explicitly enabled
    if (!config.tracking?.enabled) {
      return;
    }

    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, [config.tracking?.enabled]);

  // Early return: No tracking configured = no banner
  if (!config.tracking?.enabled) {
    return null;
  }

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleNecessaryOnly = () => {
    const necessaryOnly = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-[9999] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {showSettings ? (
          <>
            <h3 className="text-lg font-bold mb-4">Cookie-Einstellungen</h3>
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="w-5 h-5"
                />
                <div>
                  <div className="font-semibold">Notwendige Cookies</div>
                  <div className="text-sm text-gray-500">
                    Für grundlegende Funktionen erforderlich
                  </div>
                </div>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-5 h-5"
                />
                <div>
                  <div className="font-semibold">Analyse-Cookies</div>
                  <div className="text-sm text-gray-500">Helfen uns die Website zu verbessern</div>
                </div>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-5 h-5"
                />
                <div>
                  <div className="font-semibold">Marketing-Cookies</div>
                  <div className="text-sm text-gray-500">Für personalisierte Werbung</div>
                </div>
              </label>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Zurück
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Einstellungen speichern
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">🍪</span>
              <div>
                <h3 className="font-bold mb-1">Wir respektieren Ihre Privatsphäre</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie können selbst
                  entscheiden, welche Cookies Sie zulassen möchten.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleNecessaryOnly} className="px-4 py-2 border rounded-lg">
                Nur notwendige
              </button>
              <button onClick={() => setShowSettings(true)} className="px-4 py-2 border rounded-lg">
                Einstellungen
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Alle akzeptieren
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
