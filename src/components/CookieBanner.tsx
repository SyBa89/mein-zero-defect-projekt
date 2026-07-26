'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Prüfe sowohl Cookie als auch localStorage
    const cookieConsent = document.cookie
      .split(';')
      .find((row) => row.trim().startsWith('cookie-consent='));
    const localStorageConsent = localStorage.getItem('cookie-consent');

    if (!cookieConsent && !localStorageConsent) {
      setIsVisible(true);
    }
  }, []);

  const setConsent = (value: string) => {
    // Setze Cookie (365 Tage)
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `cookie-consent=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    // Setze localStorage als Backup
    localStorage.setItem('cookie-consent', value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-500 shadow-2xl z-50 p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu
            bieten. Weitere Informationen finden Sie in unserer{' '}
            <Link href="/datenschutz" className="text-pink-600 hover:underline font-semibold">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setConsent('rejected')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Ablehnen
          </button>
          <button
            onClick={() => setConsent('accepted')}
            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:from-pink-700 hover:to-purple-700"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
