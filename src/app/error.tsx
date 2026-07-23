'use client';

import { useEffect, useCallback, useMemo, memo } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorBoundary({ error, reset }: ErrorProps) {
  // ✅ ZERO-DEFECT: Fehler loggen (in Produktion könnte hier Sentry stehen)
  useEffect(() => {
    // In einer Produktionsumgebung würde hier ein Error-Reporting-Service wie Sentry aufgerufen werden
    console.error('[ErrorBoundary] Application Error:', {
      name: error.name,
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  // ✅ ZERO-DEFECT: Memoized reset-Funktion für Performance
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  // ✅ ZERO-DEFECT: Fehlertitel und -text als Memo
  const errorDetails = useMemo(() => {
    const isKnownError = error.name !== 'Error' && error.name !== '';
    return {
      title: isKnownError ? error.name : 'Etwas ist schiefgelaufen',
      description: error.message || 'Wir konnten die Seite nicht laden. Bitte versuche es erneut.',
    };
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div
        className="text-center max-w-md w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="text-6xl mb-4" aria-hidden="true">
          ⚠️
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">
          {errorDetails.title}
        </h1>
        <p className="text-gray-600 mb-2 leading-relaxed" id="error-description">
          {errorDetails.description}
        </p>

        {/* ✅ ZERO-DEFECT: Error-Digest für Support (optional) */}
        {error.digest && (
          <p className="text-xs text-gray-400 mb-6 font-mono break-all bg-gray-50 p-2 rounded-lg" aria-hidden="true">
            Fehler-ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            aria-label="Seite erneut laden"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            aria-label="Zur Startseite navigieren"
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

        {/* ✅ ZERO-DEFECT: Hinweis für Benutzer (optional) */}
        <p className="text-xs text-gray-400 mt-6">
          Wenn das Problem weiterhin besteht, kontaktiere uns bitte direkt.
        </p>
      </div>
    </div>
  );
}

// ✅ ZERO-DEFECT: Memo für Performance
export default memo(ErrorBoundary);