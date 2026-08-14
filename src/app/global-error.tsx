'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect, useState } from 'react';
import { getTenantConfig } from '@/lib/config-loader';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const config = getTenantConfig();
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    Sentry.captureException(error);
    console.error('[Global Error Boundary]', error);
    
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [error]);

  return (
    <html lang="de">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div 
          className="min-h-screen flex items-center justify-center px-4 py-12"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-lg w-full text-center bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Ein unerwarteter Fehler ist aufgetreten
            </h1>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Unser Technik-Team wurde bereits automatisch informiert.
            </p>
            {!isOnline && (
              <p className="text-amber-600 mb-4 font-semibold" role="status">
                ⚠️ Sie sind offline. Bitte prüfen Sie Ihre Internetverbindung.
              </p>
            )}
            <p className="text-gray-600 mb-8 leading-relaxed">
              Kontaktieren Sie {config.brand.name}:{' '}
              <a 
                href={`tel:${config.contact.phone}`} 
                className="text-blue-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {config.contact.phoneDisplay || config.contact.phone}
              </a>
            </p>
            <button
              onClick={reset}
              disabled={!isOnline}
              className="px-8 py-3 bg-theme-primary hover:opacity-90 text-white font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOnline ? 'Seite neu laden' : 'Offline - Verbindung prüfen'}
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