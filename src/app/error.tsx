'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { getTenantConfig } from '@/lib/config-loader';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const config = getTenantConfig();
  
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center gap-4 text-center p-6"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="text-2xl font-bold text-theme-primary">
        Konfigurationsfehler
      </h2>
      <p className="text-text-secondary max-w-md">
        Die Mandanten-Konfiguration konnte nicht geladen werden.
      </p>
      <p className="text-text-secondary max-w-md">
        Kontaktieren Sie {config.brand.name} direkt:{' '}
        <a 
          href={`tel:${config.contact.phone}`} 
          className="text-theme-primary font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-theme-primary"
        >
          {config.contact.phoneDisplay || config.contact.phone}
        </a>
      </p>
      {error.digest && (
        <p className="text-xs text-gray-400 font-mono tracking-wider">
          Fehler-Referenz: {error.digest}
        </p>
      )}
      <button
        className="bg-theme-primary text-white px-6 py-3 rounded-lg shadow-theme-md hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary"
        onClick={() => reset()}
      >
        Erneut versuchen
      </button>
    </div>
  );
}