'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ZERO-DEFECT: Kritische Fehler sofort an Sentry melden
    Sentry.captureException(error);
    console.error('[Global Error Boundary]', error);
  }, [error]);

  return (
    <html lang="de">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-lg w-full text-center bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ein unerwarteter Fehler ist aufgetreten</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Unser Technik-Team wurde bereits automatisch informiert. Bitte versuchen Sie es in einem Moment erneut.
            </p>
            <button
              onClick={reset}
              className="px-8 py-3 bg-[var(--theme-primary,#0055ff)] hover:opacity-90 text-white font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-primary,#0055ff)]"
            >
              Seite neu laden
            </button>
            {error.digest && (
              <p className="mt-8 text-xs text-gray-400 font-mono tracking-wider">
                Fehler-Referenz: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}