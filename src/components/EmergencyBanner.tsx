import { getClientConfig } from '@/lib/config-loader';

export default async function EmergencyBanner() {
  // ✅ ZERO-DEFECT: Server Component nutzt getClientConfig() (White-Label!)
  const config = getClientConfig();
  const emergencyMessage = config.openingHours?.emergencyMessage;

  // Fall 1: Notfall-Modus aktiv (aus JSON-Config!)
  if (emergencyMessage) {
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
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm md:text-base font-semibold text-center">🚨 {emergencyMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  // Fall 2: Kein Notfall → Kein Banner
  return null;
}
