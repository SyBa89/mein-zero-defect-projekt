'use client';

import Link from 'next/link';

export default function MobileActionBar() {
  return (
    // z-50 stellt sicher, dass es über dem Cookie-Banner (z-40) liegt
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      role="navigation"
      aria-label="Mobile Schnellaktionen"
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-3 h-16">
          {/* 1. Direkt Anrufen (Höchste Conversion) */}
          <a
            href="tel:+4922359291160"
            className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-inset"
            aria-label="Kiosk Lollipop direkt anrufen"
          >
            <svg
              className="w-6 h-6"
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
            <span className="text-xs font-bold">Anrufen</span>
          </a>

          {/* 2. Route planen (Google Maps Deep Link) */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=50.806945,6.823683"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 active:scale-95 border-x border-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-inset"
            aria-label="Route zum Kiosk Lollipop mit Google Maps planen"
          >
            <svg
              className="w-6 h-6"
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
            <span className="text-xs font-bold">Route</span>
          </a>

          {/* 3. Kontaktformular */}
          <Link
            href="/kontakt"
            className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-inset"
            aria-label="Kontaktformular öffnen"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-bold">Kontakt</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
