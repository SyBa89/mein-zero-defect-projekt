'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Typdefinition für die Konfiguration
interface InternConfig {
  openingHours: {
    mondayFriday: string;
    saturday: string;
    sunday: string;
  };
  bannerText: string;
  emergencyMode: boolean;
}

export default function InternPage() {
  // --- STATES ---
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Konfigurations-States
  const [config, setConfig] = useState<InternConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Ref für Session-Timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- SESSION-CHECK BEIM LADEN ---
  useEffect(() => {
    const authStatus = sessionStorage.getItem('intern-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadConfig();
      resetSessionTimer();
    }
    setIsLoading(false);
  }, []);

  // --- KONFIGURATION LADEN ---
  const loadConfig = async () => {
    try {
      const res = await fetch('/api/intern/config');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch {
      // Fehler beim Laden ignorieren, Standard bleibt
    }
  };

  // --- SESSION-TIMER ZURÜCKSETZEN ---
  const resetSessionTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => {
        handleLogout();
        alert(
          'Sie wurden aus Sicherheitsgründen nach 30 Minuten Inaktivität automatisch abgemeldet.'
        );
      },
      30 * 60 * 1000
    ); // 30 Minuten
  };

  // --- LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      const res = await fetch('/api/intern/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('intern-auth', 'true');
        await loadConfig();
        resetSessionTimer();
        setPassword('');
      } else {
        setError(data.error || 'Falsches Passwort.');
        setPassword('');
      }
    } catch {
      setError('Verbindungsfehler. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // --- LOGOUT ---
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('intern-auth');
    setPassword('');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // --- KONFIGURATION SPEICHERN ---
  const saveConfig = async (updates: Partial<InternConfig>) => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    try {
      const res = await fetch('/api/intern/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConfig(data.config);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(data.error || 'Speichern fehlgeschlagen.');
      }
    } catch {
      setSaveError('Verbindungsfehler. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSaving(false);
    }
  };

  // --- HANDLER FÜR ÄNDERUNGEN ---
  const handleOpeningHoursChange = (field: keyof InternConfig['openingHours'], value: string) => {
    if (!config) return;
    saveConfig({
      openingHours: { ...config.openingHours, [field]: value },
    });
  };

  const handleBannerChange = (value: string) => {
    saveConfig({ bannerText: value });
  };

  const handleEmergencyToggle = () => {
    if (!config) return;
    saveConfig({ emergencyMode: !config.emergencyMode });
  };

  // --- LOADING ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-gray-600">Lade Mitarbeiter-Bereich...</p>
        </div>
      </div>
    );
  }

  // --- LOGIN-ANSICHT ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200 mt-10">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔒</div>
              <h1 className="text-2xl font-bold text-gray-900">Mitarbeiter-Bereich</h1>
              <p className="text-sm text-gray-600 mt-2">
                Dieser Bereich ist nur für autorisiertes Personal des Kiosk Lollipop.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Passwort eingeben
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  disabled={isLoggingIn}
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoggingIn ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Wird angemeldet...
                  </>
                ) : (
                  'Anmelden'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                ← Zurück zur öffentlichen Webseite
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- DASHBOARD-ANSICHT (Nach erfolgreichem Login) ---
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        onMouseMove={resetSessionTimer}
        onKeyDown={resetSessionTimer}
        onClick={resetSessionTimer}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Internes Dashboard</h1>
            <p className="text-gray-600">
              Willkommen im Mitarbeiter-Bereich. •{' '}
              <span className="text-xs text-gray-400">Session läuft 30 Minuten</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium transition-colors text-sm"
          >
            Abmelden
          </button>
        </div>

        {/* Save-Status */}
        {(saveSuccess || saveError) && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              saveSuccess
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {saveSuccess ? '✅ Änderungen erfolgreich gespeichert!' : `❌ ${saveError}`}
          </div>
        )}

        {/* --- SCHNELL-ÄNDERUNGEN (Das Herzstück) --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚡</span> Schnell-Änderungen
          </h2>

          {config && (
            <div className="space-y-6">
              {/* 1. Öffnungszeiten anpassen */}
              <div className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🕒 Öffnungszeiten (Mo-Fr)
                </label>
                <input
                  type="text"
                  value={config.openingHours.mondayFriday}
                  onChange={(e) => handleOpeningHoursChange('mondayFriday', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  disabled={isSaving}
                />
                <label className="block text-sm font-medium text-gray-700 mt-3 mb-2">
                  🕒 Öffnungszeiten (Samstag)
                </label>
                <input
                  type="text"
                  value={config.openingHours.saturday}
                  onChange={(e) => handleOpeningHoursChange('saturday', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  disabled={isSaving}
                />
                <label className="block text-sm font-medium text-gray-700 mt-3 mb-2">
                  🕒 Öffnungszeiten (Sonntag)
                </label>
                <input
                  type="text"
                  value={config.openingHours.sunday}
                  onChange={(e) => handleOpeningHoursChange('sunday', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  disabled={isSaving}
                />
              </div>

              {/* 2. Aktions-Banner ändern */}
              <div className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📢 Aktions-Banner Text
                </label>
                <input
                  type="text"
                  value={config.bannerText}
                  onChange={(e) => handleBannerChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  disabled={isSaving}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Dieser Text wird oben auf der Startseite angezeigt.
                </p>
              </div>

              {/* 3. Notfall-Modus */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="font-medium text-gray-900">🚨 Notfall-Modus</span>
                  <p className="text-sm text-gray-500">
                    Schaltet die Webseite auf "Geschlossen" – z.B. bei Krankheit oder Urlaub.
                  </p>
                </div>
                <button
                  onClick={handleEmergencyToggle}
                  disabled={isSaving}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                    config.emergencyMode ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.emergencyMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Speichern-Button (global) */}
              <button
                onClick={() => loadConfig()}
                disabled={isSaving}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                {isSaving ? 'Speichert...' : 'Alle Änderungen speichern'}
              </button>
            </div>
          )}
        </div>

        {/* --- EXTERNE PORTALE (Unverändert) --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔗</span> Wichtige externe Portale
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://myhermes.de/partner"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <span className="text-2xl mr-3">📦</span>
              <div>
                <span className="block font-semibold text-gray-900">Hermes Partner Portal</span>
                <span className="text-xs text-gray-600">Sendungsverfolgung & Retouren</span>
              </div>
            </a>
            <a
              href="https://www.westlotto.de"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mr-3">🎫</span>
              <div>
                <span className="block font-semibold text-gray-900">Lotto Annahmesystem</span>
                <span className="text-xs text-gray-600">WestLotto Partner-Login</span>
              </div>
            </a>
          </div>
        </div>

        {/* --- NOTFALLKONTAKTE (Unverändert) --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📞</span> Notfall- & Lieferantenkontakte
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium text-gray-700">Getränke-Großhandel (Notfall)</span>
              <span className="text-pink-600 font-semibold">02235 / 123 456</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium text-gray-700">Bäckerei-Lieferant</span>
              <span className="text-pink-600 font-semibold">02235 / 654 321</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium text-gray-700">Schlüsseldienst / Sicherheit</span>
              <span className="text-pink-600 font-semibold">02235 / 987 654</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-gray-700">Geschäftsleitung (Inhaber)</span>
              <span className="text-pink-600 font-semibold">017x / 123 456 78</span>
            </li>
          </ul>
        </div>

        {/* --- INTERNE HINWEISE (Unverändert) --- */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-2 flex items-center">
            <span className="mr-2">💡</span> Wichtige interne Hinweise
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>
              Bei Hermes-Retouren ohne Label: Kunde anweisen, das Label in der Hermes-App zu
              erstellen.
            </li>
            <li>
              Kassensystem Neustart: Halten Sie den roten Knopf an der Seite für 10 Sekunden
              gedrückt.
            </li>
            <li>
              Bitte achten Sie darauf, dass der Kiosk am Samstag um 13:15 Uhr geschlossen wird, um
              pünktlich um 13:30 Uhr die Rollläden unten zu haben.
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
