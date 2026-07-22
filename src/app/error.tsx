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
    // Log the error to an error reporting service in a real production app
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* ✅ A11y: role="alert" und aria-live sorgen dafür, dass Screenreader den Fehler sofort vorlesen */}
      <div
        className="text-center max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
        role="alert"
        aria-live="assertive"
      >
        <div className="text-6xl mb-4" aria-hidden="true">
          ⚠️
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
          Etwas ist schiefgelaufen
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Wir konnten die Seite nicht laden. Das kann vorübergehend sein. Bitte versuche es erneut
          oder kehre zur Startseite zurück.
        </p>

        {/* ✅ UX: Fallback-Option, falls reset() aufgrund eines persistenten Fehlers nicht funktioniert */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
