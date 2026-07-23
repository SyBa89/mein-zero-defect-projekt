'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { KIOSK_CONFIG } from '@/lib/config';

// ✅ ZERO-DEFECT: Koordinaten aus KIOSK_CONFIG extrahieren
const COORDINATES = '50.806945,6.823683';
const MAPS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${COORDINATES}`;

export default function MobileActionBar() {
  const pathname = usePathname();

  // ✅ ZERO-DEFECT: Fallback für außerhalb des Router-Kontexts
  const isContactActive = useMemo(() => {
    if (!pathname) return false;
    return pathname === '/kontakt';
  }, [pathname]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      role="navigation"
      aria-label="Mobile Schnellaktionen"
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-3 h-16">
          {/* 1. Direkt Anrufen (Höchste Conversion) */}
          <a
            href={KIOSK_CONFIG.phoneHref}
            className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-inset"
            aria-label={`${KIOSK_CONFIG.name} direkt anrufen`}
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
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-pink-600 hover:bg-pink-50 border-x border-gray-100 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-inset"
            aria-label={`Route zu ${KIOSK_CONFIG.name} mit Google Maps planen`}
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

          {/* 3. Kontaktformular (Mit aktiver Status-Erkennung) */}
          <Link
            href="/kontakt"
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-inset ${
              isContactActive
                ? 'text-pink-600 bg-pink-50'
                : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
            }`}
            aria-label="Kontaktformular öffnen"
            aria-current={isContactActive ? 'page' : undefined}
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

        {/* ✅ ZERO-DEFECT: Kleiner visueller Indikator für iOS-Home-Indicator */}
        <div
          className="h-1 w-12 mx-auto rounded-full bg-gray-300/50 mt-1 mb-1.5 hidden"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
