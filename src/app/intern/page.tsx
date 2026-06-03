'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CORRECT_PASSWORD = 'lollipop2024';

export default function InternPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Prüfe beim Laden der Seite, ob bereits eingeloggt
  useEffect(() => {
    const authStatus = sessionStorage.getItem('intern-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('intern-auth', 'true'); // Session speichern
      setError('');
    } else {
      setError('Falsches Passwort. Bitte wenden Sie sich an die Geschäftsleitung.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('intern-auth'); // Session löschen
    setPassword('');
  };

  // Lade-Anzeige während Session-Check
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* LOGIN ANSICHT */}
        {!isAuthenticated ? (
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
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
              >
                Anmelden
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                ← Zurück zur öffentlichen Webseite
              </Link>
            </div>
          </div>
        ) : (
          /* DASHBOARD ANSICHT (Nach erfolgreichem Login) */
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Internes Dashboard</h1>
                <p className="text-gray-600">Willkommen im Mitarbeiter-Bereich.</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium transition-colors text-sm"
              >
                Abmelden
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

            {/* Notfall Kontakte */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

            {/* Wichtige Hinweise */}
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
