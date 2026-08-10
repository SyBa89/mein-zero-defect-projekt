'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Error Boundary]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-900">Etwas ist schiefgelaufen</h1>
        <p className="mt-4 text-gray-600">
          Ein unerwarteter Fehler ist aufgetreten. Unser Team wurde automatisch informiert.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-gray-400 font-mono">Error ID: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="mt-8 px-6 py-3 bg-[var(--theme-primary)] hover:brightness-110 text-white font-semibold rounded-[var(--theme-radius)] transition-all shadow-lg hover:shadow-xl"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
