'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminCockpit() {
  const [user, setUser] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // ✅ Alle Funktionen VOR useEffect deklarieren
  const loadConfig = async () => {
    try {
      const response = await fetch('/api/admin/config', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (err) {
      console.error('Error loading config:', err);
    }
  };

  const checkSession = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setUser({ name: 'Admin', role: 'admin' });
        loadConfig();
      } else {
        setError('Nicht angemeldet');
        setTimeout(() => router.push('/admin'), 2000);
      }
    } catch (err) {
      setError('Session-Check fehlgeschlagen');
      setTimeout(() => router.push('/admin'), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'logout' }),
      });
      router.push('/admin');
    } catch (err) {
      router.push('/admin');
    }
  };

  const handleSave = async () => {
    if (!config) return;

    try {
      const response = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(config),
      });

      const data = await response.json();
      if (data.success) {
        alert('✅ Konfiguration erfolgreich gespeichert!');
      } else {
        alert('❌ Fehler: ' + data.error);
      }
    } catch (err) {
      alert('❌ Verbindungsfehler!');
    }
  };

  // ✅ useEffect NACH den Funktionen
  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Prüfe Anmeldung...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Leite weiter zum Login...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Lade Konfiguration...</p>
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
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:from-pink-700 hover:to-purple-700"
              >
                💾 Speichern
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🚨 Notfall-Banner</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.isClosed || false}
                  onChange={(e) => setConfig({ ...config, isClosed: e.target.checked })}
                  className="w-5 h-5 text-pink-600 rounded"
                />
                <span className="font-medium text-gray-900">Kiosk als geschlossen markieren</span>
              </label>
              <textarea
                value={config.emergencyMessage || ''}
                onChange={(e) => setConfig({ ...config, emergencyMessage: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Notfall-Nachricht"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🕒 Öffnungszeiten</h2>
            <textarea
              value={config.openingHoursText || ''}
              onChange={(e) => setConfig({ ...config, openingHoursText: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Mo-Fr 07:30-19:00"
            />
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl shadow-sm border border-yellow-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🎰 Lotto Jackpot</h2>
            <input
              type="text"
              value={config.jackpot || ''}
              onChange={(e) => setConfig({ ...config, jackpot: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="45.000.000"
              maxLength={30}
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">⭐ Tages-Highlight</h2>
            <input
              type="text"
              value={config.highlight || ''}
              onChange={(e) => setConfig({ ...config, highlight: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="🎉 Heute: Lotto Jackpot!"
              maxLength={100}
            />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Letzte Aktualisierung: {new Date(config.updatedAt).toLocaleString('de-DE')}
        </div>
      </div>
    </div>
  );
}
