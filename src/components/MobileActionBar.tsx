'use client';

import { useConfig } from '@/contexts/ConfigContext';

export default function MobileActionBar() {
  const config = useConfig();
  const { contact } = config;

  // ✅ ZERO-DEFECT: Phone-Formatierung für aria-label
  const phoneFormatted = contact.phone.replace('+49', '0').replace(/(\d{4})(\d{7})/, '$1 $2');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40 md:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-3 gap-2">
        {/* Button 1: Anrufen */}
        <a
          href={`tel:${contact.phone}`}
          aria-label={`Jetzt anrufen: ${phoneFormatted}`}
          className="flex flex-col items-center justify-center gap-1 py-2 bg-[var(--theme-primary)] hover:brightness-110 text-white rounded-xl transition-colors"
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="text-xs font-semibold">📞 Anrufen</span>
        </a>

        {/* Button 2: Route */}
        <a
          href={contact.mapsUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Route in Google Maps öffnen"
          className="flex flex-col items-center justify-center gap-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-xs font-semibold">🗺️ Route</span>
        </a>

        {/* Button 3: Kontakt */}
        <a
          href="/kontakt"
          aria-label="Kontaktseite öffnen"
          className="flex flex-col items-center justify-center gap-1 py-2 bg-[var(--theme-accent)] hover:bg-purple-700 text-white rounded-xl transition-colors"
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-xs font-semibold">✉️ Kontakt</span>
        </a>
      </div>
    </div>
  );
}
