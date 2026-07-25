'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
    // TODO: Sentry.captureException(error) für zukünftiges Fehlermonitoring
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Etwas ist schiefgelaufen</h2>
        <p className="text-gray-600 mb-8">
          Entschuldigung, ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Seite neu laden
          </button>
          <Link
            href="/"
            className="bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
