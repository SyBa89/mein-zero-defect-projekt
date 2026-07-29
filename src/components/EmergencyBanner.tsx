import { getSiteConfig } from '@/lib/site-config';

/**
 * Emergency Banner (Server Component)
 *
 * Zeigt Notfall-Nachrichten oder "Geschlossen"-Banner an.
 * Server Component für optimale Performance (kein Client-Fetch).
 */
export default async function EmergencyBanner() {
  const config = await getSiteConfig();

  // Fall 1: Notfall-Modus aktiv
  if (config.isClosed && config.emergencyMessage) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <svg
              className="w-6 h-6 flex-shrink-0 animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm md:text-base font-semibold text-center">
              🚨 {config.emergencyMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fall 2: Geschlossen (ohne Notfall-Nachricht)
  if (config.isClosed) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-medium">Heute geschlossen</p>
          </div>
        </div>
      </div>
    );
  }

  // Fall 3: Normal-Banner (optional, falls bannerText gesetzt)
  if (config.bannerText) {
    return (
      <div role="status" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
          <p className="text-sm md:text-base font-medium text-center">{config.bannerText}</p>
        </div>
      </div>
    );
  }

  // Fall 4: Kein Banner
  return null;
}
