'use client';
import { useState, useEffect, useCallback } from 'react';
import { SiteConfig } from '@/lib/site-config';

// ✅ GOLDSTANDARD FIX: Hilfskomponenten MÜSSEN außerhalb der Hauptkomponente definiert werden
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
}: InputFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
    />
  </div>
);

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('admin-auth') === 'true';
    return false;
  });

  const [password, setPassword] = useState('');
  const [config, setConfig] = useState<SiteConfig>({
    isClosed: false,
    bannerText: '',
    emergencyMessage: '',
    name: 'Kiosk Lollipop',
    phoneDisplay: '02235 9291160',
    phoneHref: 'tel:+4922359291160',
    address: 'Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar',
    mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683',
    facebook: 'https://www.facebook.com/LollipopKiosk50374ErftstadtLiblarBuergerplatz/',
    openingHoursText: 'Mo-Fr 07:30-19:00, Sa 07:30-14:30',
    updatedAt: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      setConfig(data);
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Laden der Konfiguration' });
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadConfig();
  }, [isAuthenticated, loadConfig]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        localStorage.setItem('admin-auth', 'true');
        setIsAuthenticated(true);
        await loadConfig();
      } else {
        setMessage({ type: 'error', text: 'Falsches Passwort!' });
        setPassword('');
      }
    } catch {
      setMessage({ type: 'error', text: 'Verbindungsfehler zur API.' });
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: '✅ Änderungen erfolgreich gespeichert!' });
        await loadConfig();
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Speichern' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Fehler beim Speichern' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-black text-gray-900 mb-6 text-center">Mitarbeiter-Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Passwort
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Passwort eingeben"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Prüfe...' : 'Anmelden'}
            </button>
          </form>
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-gray-900">Admin-Cockpit</h1>
          <button
            onClick={() => {
              localStorage.removeItem('admin-auth');
              setIsAuthenticated(false);
            }}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Abmelden
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">🚨 Notfall-Modus</h2>
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={config.isClosed}
                onChange={(e) => setConfig({ ...config, isClosed: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="font-medium">
                {config.isClosed
                  ? '✅ Geschäft als "Geschlossen" markieren'
                  : '⭕ Geschäft als "Geöffnet" markieren'}
              </span>
            </label>
            {config.isClosed && (
              <div className="bg-white/10 rounded-lg p-4 mt-4">
                <label className="block text-sm font-medium mb-2">Grund für Schließung:</label>
                <textarea
                  value={config.emergencyMessage}
                  onChange={(e) => setConfig({ ...config, emergencyMessage: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-gray-900"
                  rows={2}
                  placeholder="z.B. Krankheitsbedingt geschlossen bis..."
                />
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-900">🏪 Stammdaten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Name des Kiosks"
                name="name"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
              />
              <InputField
                label="Telefon (Anzeige)"
                name="phoneDisplay"
                value={config.phoneDisplay}
                onChange={(e) => setConfig({ ...config, phoneDisplay: e.target.value })}
              />
              <InputField
                label="Telefon (Link)"
                name="phoneHref"
                value={config.phoneHref}
                onChange={(e) => setConfig({ ...config, phoneHref: e.target.value })}
              />
              <InputField
                label="Öffnungszeiten"
                name="openingHoursText"
                value={config.openingHoursText}
                onChange={(e) => setConfig({ ...config, openingHoursText: e.target.value })}
              />
              <div className="md:col-span-2">
                <InputField
                  label="Adresse"
                  name="address"
                  value={config.address}
                  onChange={(e) => setConfig({ ...config, address: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Google Maps Link"
                  name="mapsLink"
                  value={config.mapsLink}
                  onChange={(e) => setConfig({ ...config, mapsLink: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <InputField
                  label="Facebook Link"
                  name="facebook"
                  value={config.facebook}
                  onChange={(e) => setConfig({ ...config, facebook: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-900">📢 Aktions-Banner</h2>
            <InputField
              label="Banner-Text"
              name="bannerText"
              value={config.bannerText}
              onChange={(e) => setConfig({ ...config, bannerText: e.target.value })}
              placeholder="z.B. 🎉 Heute: Lotto Jackpot 45 Millionen!"
            />
          </div>
        </div>

        <button
          onClick={saveConfig}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {isLoading ? '💾 Speichere...' : '💾 Alle Änderungen speichern'}
        </button>
        {message && (
          <div
            className={`mt-4 p-4 rounded-xl text-center font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
          >
            {message.text}
          </div>
        )}
        {config.updatedAt && (
          <p className="text-xs text-gray-500 text-center mt-4">
            Zuletzt aktualisiert: {new Date(config.updatedAt).toLocaleString('de-DE')}
          </p>
        )}
      </div>
    </div>
  );
}
