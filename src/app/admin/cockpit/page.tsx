'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminCockpit() {
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Prüfe ob User eingeloggt ist
    const isAuthenticated = sessionStorage.getItem('admin-authenticated');
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    // Lade Config
    fetch('/api/admin/config')
      .then((r) => r.json())
      .then((data) => {
        setConfig(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading config:', err);
        setIsLoading(false);
      });
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': sessionStorage.getItem('admin-password') || 'lollipop2024',
        },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Konfiguration erfolgreich gespeichert!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Fehler beim Speichern: ' + data.error);
      }
    } catch (err) {
      setMessage('❌ Verbindungsfehler!');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Konfiguration...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Fehler beim Laden der Konfiguration</p>
          <Link href="/admin" className="mt-4 inline-block text-pink-600 hover:underline">
            Zurück zum Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Admin Cockpit</h1>
              <p className="mt-1 text-sm text-gray-600">Kiosk Lollipop Verwaltung</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Zur Website
              </Link>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Speichern...' : '💾 Speichern'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.startsWith('✅')
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notfall-Banner */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🚨 Notfall-Banner</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.isClosed || false}
                    onChange={(e) => setConfig({ ...config, isClosed: e.target.checked })}
                    className="w-5 h-5 text-pink-600 rounded"
                  />
                  <span className="font-medium text-gray-900">Kiosk als geschlossen markieren</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notfall-Nachricht
                </label>
                <textarea
                  value={config.emergencyMessage || ''}
                  onChange={(e) => setConfig({ ...config, emergencyMessage: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="z.B. Wegen Krankheit heute geschlossen"
                />
              </div>
            </div>
          </div>

          {/* Öffnungszeiten */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🕒 Öffnungszeiten</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Öffnungszeiten (Text)
              </label>
              <textarea
                value={config.openingHoursText || ''}
                onChange={(e) => setConfig({ ...config, openingHoursText: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Mo-Fr 07:30-19:00, Sa 07:30-14:30"
              />
              <p className="mt-2 text-xs text-gray-500">
                Format: Mo-Fr 07:30-19:00, Sa 07:30-14:30
              </p>
            </div>
          </div>

          {/* Kontakt-Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📞 Kontakt-Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon (Anzeige)
                </label>
                <input
                  type="text"
                  value={config.phoneDisplay || ''}
                  onChange={(e) => setConfig({ ...config, phoneDisplay: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon (Link)
                </label>
                <input
                  type="text"
                  value={config.phoneHref || ''}
                  onChange={(e) => setConfig({ ...config, phoneHref: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="tel:+4922359291160"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🌐 Social Media</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
              <input
                type="url"
                value={config.facebook || ''}
                onChange={(e) => setConfig({ ...config, facebook: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Letzte Aktualisierung */}

        {/* ─── Lotto Jackpot ────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl shadow-sm border border-yellow-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🎰 Lotto Jackpot</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aktueller Jackpot (€)
            </label>
            <input
              type="text"
              value={config.jackpot || ''}
              onChange={(e) => setConfig({ ...config, jackpot: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="z.B. 45.000.000"
              maxLength={30}
            />
            <p className="mt-2 text-xs text-gray-500">
              {`Wird auf der Startseite als "🎰 Jackpot: 45.000.000 €" angezeigt`}
            </p>
          </div>
        </div>

        {/* ─── Tages-Highlight ────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⭐ Tages-Highlight</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Highlight-Text</label>
            <input
              type="text"
              value={config.highlight || ''}
              onChange={(e) => setConfig({ ...config, highlight: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="z.B. 🎉 Heute: Lotto Jackpot 45 Millionen!"
              maxLength={100}
            />
            <p className="mt-2 text-xs text-gray-500">
              Wird als Banner auf der Startseite angezeigt
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Letzte Aktualisierung: {new Date(config.updatedAt).toLocaleString('de-DE')}
        </div>
      </div>
    </div>
  );
}
