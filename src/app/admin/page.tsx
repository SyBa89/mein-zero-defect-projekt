'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type React from 'react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ✅ ROBUST: Explizite Berechnung
  const isFormValid = username.trim().length > 0 && password.length > 0;
  const isButtonDisabled = isLoading || !isFormValid;

  // 🐛 DEBUG: Zeigt State-Updates in Console
  console.log('🔍 Login State:', {
    username,
    passwordLength: password.length,
    isFormValid,
    isButtonDisabled,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Bitte füllen Sie alle Felder aus.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username: username.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/admin/cockpit');
      } else {
        setError(data.error || 'Falsche Anmeldedaten');
      }
    } catch (err) {
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
      console.error('[ADMIN LOGIN] Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Kiosk Lollipop Verwaltung</p>

          {/* 🐛 DEBUG INFO - Wird später entfernt */}
          <div className="mt-3 text-xs bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-left">
            <strong>Debug:</strong> Passwort-Länge: {password.length} | Button:{' '}
            {isButtonDisabled ? '🔒 Deaktiviert' : '✅ Aktiv'}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-bold text-gray-900 mb-2">
              Benutzername
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                console.log('✏️ Username changed:', e.target.value);
              }}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 outline-none transition-all"
              placeholder="admin"
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log('✏️ Password changed, length:', e.target.value.length);
              }}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 outline-none transition-all"
              placeholder="••••••••••••"
              disabled={isLoading}
              autoFocus
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg transform hover:-translate-y-0.5 active:scale-95 ${
              isButtonDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white hover:shadow-pink-500/30 cursor-pointer'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
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
                Anmeldung läuft...
              </span>
            ) : (
              'Anmelden'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-[var(--theme-primary)] transition-colors"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
