'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Global Error Boundary]', error);
  }, [error]);

  return (
    <html lang="de">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100 px-4">
          <div className="max-w-lg w-full text-center">
            <div className="text-6xl mb-4">🚨</div>
            <h1 className="text-3xl font-bold text-gray-900">Kritischer Fehler</h1>
            <p className="mt-4 text-gray-600">
              Die Anwendung konnte nicht geladen werden. Bitte versuchen Sie es erneut.
            </p>
            <button
              onClick={reset}
              className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
