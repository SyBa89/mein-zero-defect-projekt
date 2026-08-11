'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 🏛️ Phase 11.1 Sentry Integration
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center p-6">
      <h2 className="text-2xl font-bold text-theme-primary">Konfigurationsfehler</h2>
      <p className="text-text-secondary max-w-md">
        Die Mandanten-Konfiguration konnte nicht geladen werden. Unser Team wurde bereits automatisch via Sentry benachrichtigt.
      </p>
      <button
        className="bg-theme-primary text-white px-6 py-3 rounded-lg shadow-theme-md hover:opacity-90 transition"
        onClick={() => reset()}
      >
        Erneut versuchen
      </button>
    </div>
  );
}