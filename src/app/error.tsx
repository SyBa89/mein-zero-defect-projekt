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
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Etwas ist schiefgelaufen</h2>
        <p className="text-gray-600 mb-6">
          Wir konnten die Seite nicht laden. Bitte versuche es erneut.
        </p>
        <button
          onClick={() => reset()}
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-pink-500/30 transition-all hover:-translate-y-1"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
