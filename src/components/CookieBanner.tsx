'use client';

import { useState, useEffect, useRef } from 'react';
import { useConfig } from '@/contexts/ConfigContext';
import { useCookieConsent, ConsentPreferences } from '@/hooks/useCookieConsent';
import Link from 'next/link';

export default function CookieBanner() {
  const config = useConfig();
  const { isHydrated, hasConsented, acceptAll, rejectAll, updateConsent } = useCookieConsent();
  
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // ZERO-DEFECT: Safe Access & Hydration Check (verhindert SSR Mismatch & TS Errors)
  const trackingEnabled = config?.tracking?.enabled ?? false;
  const isVisible = isHydrated && trackingEnabled && !hasConsented;

  // A11y: Fokus Management (Screenreader & Keyboard-Nutzer)
  useEffect(() => {
    if (isVisible && !showSettings) {
      const timer = setTimeout(() => firstFocusableRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVisible, showSettings]);

  // A11y: Keyboard Navigation (Escape)
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSettings) setShowSettings(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, showSettings]);

  if (!isVisible) return null;

  const handleSaveSettings = () => {
    updateConsent(preferences);
    setShowSettings(false);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] z-[9999] p-4 md:p-6 animate-slide-up safe-bottom"
    >
      <div className="max-w-6xl mx-auto">
        {showSettings ? (
          <div className="animate-fade-in">
            <h3 id="cookie-title" className="text-lg font-bold text-gray-900 dark:text-white mb-4">Cookie-Einstellungen</h3>
            <p id="cookie-desc" className="text-sm text-gray-600 dark:text-gray-400 mb-4">WÃƒÂ¤hlen Sie selbst, welche Cookie-Kategorien Sie zulassen mÃƒÂ¶chten.</p>
            <div className="space-y-3 mb-6">
              {/* Notwendig */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg opacity-75 cursor-not-allowed">
                <input type="checkbox" checked disabled className="w-5 h-5 mt-0.5 accent-[var(--theme-primary,#0055ff)]" aria-label="Notwendige Cookies" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Notwendige Cookies (immer aktiv)</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">FÃƒÂ¼r grundlegende Funktionen und Sicherheit erforderlich.</div>
                </div>
              </div>
              {/* Analytics */}
              <label className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={preferences.analytics} 
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })} 
                  className="w-5 h-5 mt-0.5 accent-[var(--theme-primary,#0055ff)]" 
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Analyse-Cookies (z.B. Sentry)</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Helfen uns, Fehler zu finden und die App stabil zu halten.</div>
                </div>
              </label>
              {/* Marketing */}
              <label className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <input 
                  type="checkbox" 
                  checked={preferences.marketing} 
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })} 
                  className="w-5 h-5 mt-0.5 accent-[var(--theme-primary,#0055ff)]" 
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Marketing-Cookies</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">FÃƒÂ¼r personalisierte Inhalte und Werbung.</div>
                </div>
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setShowSettings(false)} 
                className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-[var(--theme-primary,#0055ff)] focus:outline-none"
              >
                Ã¢â€ Â ZurÃƒÂ¼ck
              </button>
              <button 
                onClick={handleSaveSettings} 
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--theme-primary,#0055ff)] hover:opacity-90 rounded-lg transition-all focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-primary,#0055ff)] focus:outline-none shadow-md"
              >
                Auswahl speichern
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-start gap-4 mb-5">
              <span className="text-3xl flex-shrink-0" aria-hidden="true">Ã°Å¸ÂÂª</span>
              <div className="flex-1">
                <h3 id="cookie-title" className="font-bold text-gray-900 dark:text-white mb-1 text-lg">Wir respektieren Ihre PrivatsphÃƒÂ¤re</h3>
                <p id="cookie-desc" className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere App fehlerfrei zu halten. 
                  <Link href="/datenschutz" className="ml-1 underline hover:text-[var(--theme-primary,#0055ff)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary,#0055ff)] rounded">DatenschutzerklÃƒÂ¤rung</Link>
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                ref={firstFocusableRef}
                onClick={rejectAll} 
                className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-[var(--theme-primary,#0055ff)] focus:outline-none"
              >
                Nur notwendige
              </button>
              <button 
                onClick={() => setShowSettings(true)} 
                className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-[var(--theme-primary,#0055ff)] focus:outline-none"
              >
                Einstellungen
              </button>
              <button 
                onClick={acceptAll} 
                className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-[var(--theme-primary,#0055ff)] hover:opacity-90 rounded-lg transition-all shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-primary,#0055ff)] focus:outline-none"
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
