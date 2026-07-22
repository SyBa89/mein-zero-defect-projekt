'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function InternPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('intern-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/intern/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('intern-auth', 'true');
      } else {
        setError(data.error || 'Falsches Passwort.');
        setPassword('');
      }
    } catch {
      setError('Ein Verbindungsfehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('intern-auth');
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🔒</div>
          <p className="text-gray-600 font-medium">Lade Mitarbeiter-Bereich...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-10">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔒</div>
              <h1 className="text-2xl font-black text-gray-900">Mitarbeiter-Bereich</h1>
              <p className="text-sm text-gray-600 mt-2">
                Dieser Bereich ist nur für autorisiertes Personal des Kiosk Lollipop.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1.5">
                  Passwort eingeben
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                />
              </div>
              {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl border border-red-200 font-medium flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Prüfe...
                  </>
                ) : (
                  'Anmelden'
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-pink-600 hover:text-pink-700 font-semibold transition-colors"
              >
                ← Zurück zur öffentlichen Webseite
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Internes Dashboard</h1>
                <p className="text-gray-600">Willkommen im Mitarbeiter-Bereich.</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl font-bold transition-colors text-sm"
              >
                Abmelden
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2 text-xl">🔗</span> Wichtige externe Portale
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://myhermes.de/partner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors group"
                >
                  <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                    📦
                  </span>
                  <div>
                    <span className="block font-bold text-gray-900">Hermes Partner Portal</span>
                    <span className="text-xs text-gray-600">Sendungsverfolgung & Retouren</span>
                  </div>
                </a>
                <a
                  href="https://www.westlotto.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group"
                >
                  <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                    🎫
                  </span>
                  <div>
                    <span className="block font-bold text-gray-900">Lotto Annahmesystem</span>
                    <span className="text-xs text-gray-600">WestLotto Partner-Login</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2 text-xl">📞</span> Notfall- & Lieferantenkontakte
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-medium text-gray-700">Getränke-Großhandel (Notfall)</span>
                  <span className="text-pink-600 font-bold">02235 / 123 456</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-medium text-gray-700">Bäckerei-Lieferant</span>
                  <span className="text-pink-600 font-bold">02235 / 654 321</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-medium text-gray-700">Schlüsseldienst / Sicherheit</span>
                  <span className="text-pink-600 font-bold">02235 / 987 654</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-700">Geschäftsleitung (Inhaber)</span>
                  <span className="text-pink-600 font-bold">017x / 123 456 78</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
                <span className="mr-2 text-xl">💡</span> Wichtige interne Hinweise
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
                  Bitte achten Sie darauf, dass der Kiosk am Samstag um 13:15 Uhr geschlossen wird,
                  um pünktlich um 13:30 Uhr die Rollläden unten zu haben.
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
