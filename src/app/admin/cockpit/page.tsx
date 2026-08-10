'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OnboardingGuide from './onboarding';
import type { ClientConfig } from '@/lib/schemas/client-config.schema';

export const dynamic = 'force-dynamic';

export default function AdminCockpit() {
  const [user, setUser] = useState<any>(null);
  const [config, setConfig] = useState<ClientConfig | null>(null);
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
        const data: ClientConfig = await response.json();
        setConfig(data);
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
          // Zero-Defect Fix: Explizites window.crypto für ESLint Browser-Env Compliance
          id:
            typeof window !== 'undefined' && window.crypto
              ? window.crypto.randomUUID()
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

      // Zero-Defect Fix: Explizites window.alert für ESLint Browser-Env Compliance
      if (data.success) {
        if (typeof window !== 'undefined')
          window.alert('✅ Konfiguration erfolgreich gespeichert!');
        setConfig(data.config);
      } else {
        if (typeof window !== 'undefined')
          window.alert('❌ Fehler: ' + (data.error || 'Unbekannt'));
      }
    } catch {
      if (typeof window !== 'undefined') window.alert('❌ Verbindungsfehler!');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper für tiefe State-Updates (Öffnungszeiten)
  const updateOpeningHoursItem = (
    index: number,
    field: 'hours' | 'isOpen',
    value: string | boolean
  ) => {
    setConfig((prev) => {
      if (!prev || !prev.openingHours) return prev;
      const newItems = [...prev.openingHours.items];
      newItems[index] = { ...newItems[index], [field]: value as any };
      return {
        ...prev,
        openingHours: { ...prev.openingHours, items: newItems },
      };
    });
  };

  const updatedAtDisplay = config?.hero?.headline ? new Date().toLocaleString('de-DE') : '—';

  if (isLoading || !config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--theme-primary)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Prüfe Anmeldung & lade Daten...</p>
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
          <button
            onClick={() => router.push('/admin')}
            className="mt-6 px-6 py-3 bg-[var(--theme-primary)] text-white rounded-lg hover:brightness-110"
          >
            Zurück zum Login
          </button>
        </div>
      </div>
    );
  }

  // Zero-Defect: Business-Awareness (Blocker ③)
  const isKiosk = config.business.type === 'kiosk';
  const businessName = config.brand.name || 'Betrieb';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Admin Cockpit</h1>
              <p className="mt-1 text-sm text-gray-600">
                Willkommen, {user?.name} ({user?.role}) |{' '}
                <span className="font-bold uppercase">{config.business.type}</span>
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
          {/* NOTFALL-BANNER */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🚨 Notfall-Banner</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.openingHours?.isClosed || false}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev!,
                      openingHours: { ...prev!.openingHours!, isClosed: e.target.checked },
                    }))
                  }
                  className="w-5 h-5 text-[var(--theme-primary)] rounded"
                />
                <span className="font-medium text-gray-900">
                  {businessName} als geschlossen markieren
                </span>
              </label>
              <textarea
                value={config.openingHours?.emergencyMessage || ''}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev!,
                    openingHours: { ...prev!.openingHours!, emergencyMessage: e.target.value },
                  }))
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Notfall-Nachricht (z.B. Betriebsferien)"
              />
            </div>
          </div>

          {/* ÖFFNUNGSZEITEN (Strukturiert nach Zod-Schema) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🕒 Öffnungszeiten</h2>
            <div className="space-y-2">
              {config.openingHours?.items.map((item, index) => (
                <div key={item.day} className="flex items-center gap-2">
                  <span className="w-20 text-sm font-medium text-gray-700">{item.day}</span>
                  <input
                    type="text"
                    value={item.hours}
                    onChange={(e) => updateOpeningHoursItem(index, 'hours', e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                    placeholder="z.B. 08:00-12:00"
                  />
                  <label className="flex items-center gap-1 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={item.isOpen}
                      onChange={(e) => updateOpeningHoursItem(index, 'isOpen', e.target.checked)}
                    />
                    Offen
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* KIOSK-SPEZIFISCHE FEATURES (Conditional Rendering) */}
          {isKiosk && (
            <>
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl shadow-sm border border-yellow-200 dark:border-yellow-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🎰 Lotto Jackpot</h2>
                <input
                  type="text"
                  value={config.banners?.jackpotLabel || ''}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev!,
                      banners: { ...prev!.banners!, jackpotLabel: e.target.value },
                    }))
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
                  value={config.banners?.highlightLabel || ''}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev!,
                      banners: { ...prev!.banners!, highlightLabel: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="🎉 Heute: Lotto Jackpot!"
                  maxLength={100}
                />
              </div>
            </>
          )}

          {!isKiosk && (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 flex items-center justify-center text-gray-500 text-sm">
              <p>ℹ️ Jackpot & Highlight Features sind nur für Kiosk-Betriebe verfügbar.</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Letzte Aktualisierung: {updatedAtDisplay}
        </div>
      </div>
    </div>
  );
}
