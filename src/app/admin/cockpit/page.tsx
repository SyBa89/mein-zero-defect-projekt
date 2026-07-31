'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OnboardingGuide from './onboarding';

// Lokale Typedefinition (kein externer Import nötig)
interface SiteConfig {
  isClosed: boolean;
  emergencyMessage: string;
  openingHoursText: string;
  jackpot: string;
  highlight: string;
  updatedAt: string;
  bannerText?: string;
  name?: string;
  phoneDisplay?: string;
  phoneHref?: string;
  address?: string;
  facebook?: string;
  holidays?: any[];
}

// Default-Config verhindert null-Zugriffe beim Prerender
const defaultConfig: SiteConfig = {
  isClosed: false,
  emergencyMessage: '',
  openingHoursText: 'Mo-Fr 07:30-19:00, Sa 07:30-14:30',
  jackpot: '',
  highlight: '',
  updatedAt: '2026-01-01T00:00:00.000Z',
  bannerText: '',
  name: 'Kiosk Lollipop',
  phoneDisplay: '02235 9291160',
  phoneHref: 'tel:+4922359291160',
  address: 'Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar',
  facebook: 'https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/',
  holidays: [],
};

export const dynamic = 'force-dynamic';

export default function AdminCockpit() {
  const [user, setUser] = useState<any>(null);
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const loadConfig = useCallback(async () => {
    try {
      setDebugInfo('Lade Config...');
      const response = await fetch('/api/admin/config', { credentials: 'include' });
      setDebugInfo(`Config API Status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        setConfig((prev) => ({ ...(prev ?? defaultConfig), ...(data ?? {}) }));
        setDebugInfo('Config geladen!');
      } else {
        const errorData = await response.text();
        setDebugInfo(`Config Error: ${response.status} - ${errorData}`);
        setError(`Config-Fehler: ${response.status}`);
      }
    } catch {
      setDebugInfo('Config Fetch Error');
      setError('Config konnte nicht geladen werden');
    }
  }, []);

  const checkSession = useCallback(async () => {
    try {
      setDebugInfo('Prüfe Session...');
      const response = await fetch('/api/admin/users', {
        method: 'GET',
        credentials: 'include',
      });
      setDebugInfo(`Session API Status: ${response.status}`);

      if (response.ok) {
        setUser({
          id:
            typeof crypto !== 'undefined' && 'randomUUID' in crypto
              ? (crypto as any).randomUUID()
              : Date.now().toString(),
          name: 'Admin',
          role: 'admin',
        });
        await loadConfig();
      } else {
        setError('Nicht angemeldet');
        setTimeout(() => router.push('/admin'), 2000);
      }
    } catch {
      setDebugInfo('Session Error');
      setError('Session-Check fehlgeschlagen');
      setTimeout(() => router.push('/admin'), 2000);
    } finally {
      setIsLoading(false);
    }
  }, [router, loadConfig]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'logout' }),
      });
      router.push('/admin');
    } catch {
      router.push('/admin');
    }
  };

  const handleSave = async () => {
    if (!config) return;
    try {
      setIsSaving(true);
      const response = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(config),
      });
      const data = await response.json();
      if (data.success) {
        alert('✅ Konfiguration erfolgreich gespeichert!');
        if (data.config) {
          setConfig((prev) => ({ ...(prev ?? defaultConfig), ...(data.config || {}) }));
        }
      } else {
        alert('❌ Fehler: ' + data.error);
      }
    } catch {
      alert('❌ Verbindungsfehler!');
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ PURITY FIX: updatedAtDisplay VOR dem return berechnen
  const updatedAtDisplay = config?.updatedAt
    ? new Date(config.updatedAt).toLocaleString('de-DE')
    : '—';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Prüfe Anmeldung...</p>
          {debugInfo && (
            <div className="mt-4 p-3 bg-gray-100 rounded-xl text-xs font-mono text-gray-700">
              <strong>Debug:</strong> {debugInfo}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4 text-lg font-bold">{error}</p>
          {debugInfo && (
            <div className="mt-4 p-3 bg-gray-100 rounded-xl text-xs font-mono text-gray-700 text-left">
              <strong>Debug-Info:</strong>
              <pre className="mt-2 whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}
          <button
            onClick={() => router.push('/admin')}
            className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Zurück zum Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Admin Cockpit</h1>
              <p className="mt-1 text-sm text-gray-600">
                Willkommen, {user?.name} ({user?.role})
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Zur Website
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                🚪 Abmelden
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2 text-sm font-medium text-white rounded-lg ${
                  isSaving
                    ? 'bg-gray-400'
                    : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
                }`}
              >
                {isSaving ? 'Speichere...' : '💾 Speichern'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OnboardingGuide />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🚨 Notfall-Banner</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.isClosed}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...(prev ?? defaultConfig),
                      isClosed: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 text-pink-600 rounded"
                />
                <span className="font-medium text-gray-900">Kiosk als geschlossen markieren</span>
              </label>
              <textarea
                value={config.emergencyMessage}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...(prev ?? defaultConfig),
                    emergencyMessage: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Notfall-Nachricht"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🕒 Öffnungszeiten</h2>
            <textarea
              value={config.openingHoursText}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...(prev ?? defaultConfig),
                  openingHoursText: e.target.value,
                }))
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Mo-Fr 07:30-19:00"
            />
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl shadow-sm border border-yellow-200 dark:border-yellow-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🎰 Lotto Jackpot</h2>
            <input
              type="text"
              value={config.jackpot}
              onChange={(e) =>
                setConfig((prev) => ({ ...(prev ?? defaultConfig), jackpot: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="45.000.000"
              maxLength={30}
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-sm border border-blue-200 dark:border-blue-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">⭐ Tages-Highlight</h2>
            <input
              type="text"
              value={config.highlight}
              onChange={(e) =>
                setConfig((prev) => ({ ...(prev ?? defaultConfig), highlight: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="🎉 Heute: Lotto Jackpot!"
              maxLength={100}
            />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Letzte Aktualisierung: {updatedAtDisplay}
        </div>
      </div>
    </div>
  );
}

