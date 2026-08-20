'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useConfig, useConfigState } from '@/contexts/ConfigContext';

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// OpeningHoursSection â€” White-Label-fÃ¤hig, strukturierte Daten
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Architektur:
// - useConfig() statt legacy getSiteConfigClient()
// - Strukturierte Daten aus JSON (kein Regex-Parsing mehr!)
// - Dynamic address aus config.contact.address
// - Hydration-safe todayIndex (client-only via useEffect)
// - âœ… ZERO-DEFECT: ALLE Hooks VOR Early-Returns (Rules of Hooks!)

type ShopStatus = 'open' | 'closed-regular' | 'closed-emergency' | 'loading';

// â”€â”€â”€ Icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ClockIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function CalendarIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function AlertIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
}

function MapPinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

// â”€â”€â”€ Loading Skeleton â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LoadingSkeleton() {
  return (
    <section
      className="relative py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
      aria-busy="true"
      role="status"
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 radius-token-lg bg-gray-200 dark:bg-gray-700 mb-4 animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-3 animate-pulse" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse" />
        </div>
        <div className="glass-card radius-token-xl overflow-hidden shadow-token-xl p-6 md:p-8">
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-pulse" />
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between py-4 border-b border-gray-200/30 dark:border-gray-700/30 last:border-0"
            >
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Ã–ffnungszeiten werden geladen...</span>
    </section>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function OpeningHoursSection() {
  // âœ… ZERO-DEFECT: ALLE Hooks ZUERST (Rules of Hooks!)
  const config = useConfig();
  const { isLoading } = useConfigState();
  const [todayIndex, setTodayIndex] = useState<number>(-1);

  // âœ… Hydration-safe: todayIndex nur client-side setzen
  useEffect(() => {
    setTodayIndex(new Date().getDay());
  }, []);

  // âœ… ZERO-DEFECT: Daten extrahieren mit Safe Defaults (VOR Early-Returns)
  const openingHours = config.openingHours;
  const contact = config.contact;
  const showSection = openingHours?.showSection !== false;
  const items = openingHours?.items || [];
  const sectionTitle = openingHours?.sectionTitle || 'Ã–ffnungszeiten';
  const sectionSubtitle = openingHours?.sectionSubtitle || 'Wir freuen uns auf Ihren Besuch!';
  const tipMessage = openingHours?.tipMessage;
  const emergencyMessage = openingHours?.emergencyMessage;

  // âœ… JS getDay() (0=Sun) â†’ Schema-Index (0=Mon) konvertieren
  const schemaIndex = todayIndex === -1 ? -1 : todayIndex === 0 ? 6 : todayIndex - 1;
  const todayItem = schemaIndex >= 0 && schemaIndex < items.length ? items[schemaIndex] : null;

  // âœ… ZERO-DEFECT: useMemo VOR Early-Returns (Rules of Hooks!)
  const shopStatus: ShopStatus = useMemo(() => {
    if (!showSection) return 'loading';
  // P1 FIX: Timeout-Fallback nach 3 Sekunden
  const [showFallback, setShowFallback] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if ((isLoading || todayIndex === -1) && !showFallback) {
    return <LoadingSkeleton />;
  }

  // Fallback: Zeige zumindest die Adresse wenn Config nicht laedt
  if (showFallback && !contact?.openingHours) {
    return (
      <section className='py-20 px-4 bg-gray-50 dark:bg-gray-900'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-4'>öffnungszeiten</h2>
          <p className='text-gray-600 dark:text-gray-400'>
            {contact?.address?.street}, {contact?.address?.zip} {contact?.address?.city}
          </p>
          <button
            onClick={handleOpenInMaps}
            className='mt-4 px-6 py-3 bg-[var(--theme-primary)] text-white rounded-lg'
          >
            Route planen
          </button>
        </div>
      </section>
    );
  }
    if (emergencyMessage) return 'closed-emergency';
    if (todayItem?.isOpen) return 'open';
    return 'closed-regular';
  }, [showSection, isLoading, todayIndex, emergencyMessage, todayItem]);

  // âœ… Dynamic address aus config
  const addressString = `${contact.address.street}, ${contact.address.zip} ${contact.address.city}`;

  // âœ… ZERO-DEFECT: useCallback VOR Early-Returns (Rules of Hooks!)
  const handleOpenInMaps = useCallback(() => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [addressString]);

  // âœ… JETZT kommen die Early-Returns (NACH allen Hooks!)
  if (!showSection) {
    return null;
  }

  if (isLoading || todayIndex === -1) {
    return <LoadingSkeleton />;
  }

  return (
    <section
      className="relative py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
      aria-labelledby="opening-hours-heading"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-100/30 to-purple-100/30 dark:from-pink-950/20 dark:to-purple-950/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 radius-token-lg bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-token-lg shadow-pink-500/30 mb-4">
            <ClockIcon className="w-8 h-8" />
          </div>
          <h2
            id="opening-hours-heading"
            className="text-4xl md:text-5xl font-black text-[var(--color-text)] dark:text-gray-100 mb-3 tracking-tight"
          >
            {sectionTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        {/* Screen reader announcement */}
        <div aria-live="polite" className="sr-only">
          {shopStatus === 'open' && `Heute geÃ¶ffnet: ${todayItem?.hours}`}
          {shopStatus === 'closed-regular' && 'Heute geschlossen'}
          {shopStatus === 'closed-emergency' &&
            `Heute auÃŸerplanmÃ¤ÃŸig geschlossen: ${emergencyMessage || 'Betriebsurlaub'}`}
        </div>

        {/* Card */}
        <div className="glass-card radius-token-xl overflow-hidden shadow-token-xl">
          {/* Status banner */}
          {shopStatus === 'open' && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-b border-green-200/50 dark:border-green-700/50 px-8 py-5 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-token-lg shadow-green-500/50" />
                </span>
                <span className="text-green-800 dark:text-green-200 font-bold text-lg">
                  Heute geÃ¶ffnet:
                </span>
                <span className="text-green-700 dark:text-green-300 font-black text-xl">
                  {todayItem?.hours}
                </span>
              </div>
            </div>
          )}

          {shopStatus === 'closed-emergency' && (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-b border-red-200/50 dark:border-red-700/50 px-8 py-5 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <AlertIcon className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="text-red-800 dark:text-red-200 font-bold text-lg text-center">
                  ðŸš¨ Heute geschlossen â€“ {emergencyMessage || 'Betriebsurlaub'}
                </span>
              </div>
            </div>
          )}

          {shopStatus === 'closed-regular' && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border-b border-amber-200/50 dark:border-amber-700/50 px-8 py-5 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <CalendarIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <span className="text-amber-800 dark:text-amber-200 font-bold text-lg">
                  ðŸ“… Heute geschlossen â€“ morgen sind wir wieder fÃ¼r Sie da!
                </span>
              </div>
            </div>
          )}

          {/* Hours table */}
          <div className="backdrop-blur-sm p-4 sm:p-6 md:p-8">
            <table className="w-full" role="table" aria-label="WÃ¶chentliche Ã–ffnungszeiten">
              <caption className="sr-only">
                Ã–ffnungszeiten fÃ¼r jede Woche. Der heutige Tag ist hervorgehoben.
              </caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Wochentag</th>
                  <th scope="col">Ã–ffnungszeiten</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                {items.map((item, index) => {
                  const isToday = index === schemaIndex;
                  return (
                    <tr
                      key={item.day}
                      className={`group transition-all duration-300 ${
                        isToday
                          ? 'bg-gradient-to-r from-pink-50/80 to-purple-50/80 dark:from-pink-900/20 dark:to-purple-900/20 shadow-inner'
                          : 'hover:bg-white/40 dark:hover:bg-gray-800/40'
                      }`}
                    >
                      <td className="px-6 md:px-8 py-5 text-left">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-bold text-lg ${
                              isToday
                                ? 'text-pink-700 dark:text-pink-300'
                                : 'text-[var(--color-text)] dark:text-gray-100'
                            }`}
                          >
                            {item.day}
                          </span>
                          {isToday && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 px-3 py-1 rounded-full shadow-token-md shadow-pink-500/30">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-surface)] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-surface)]" />
                              </span>
                              HEUTE
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 md:px-8 py-5 text-right">
                        {item.isOpen ? (
                          <span
                            className={`font-black text-xl ${
                              isToday
                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
                                : 'text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            {item.hours}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-red-500 dark:text-red-400 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 dark:bg-red-500" />
                            {item.hours || 'Geschlossen'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer with address + map button */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border-t border-gray-200/50 dark:border-gray-700/50 px-6 md:px-8 py-5 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPinIcon className="w-5 h-5 text-[var(--theme-primary)] dark:text-[var(--theme-primary)] flex-shrink-0" />
                <span className="text-sm md:text-base font-medium">{addressString}</span>
              </div>
              <button
                onClick={handleOpenInMaps}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold text-sm radius-token-md shadow-token-md shadow-pink-500/30 hover:shadow-token-lg hover:shadow-pink-500/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                aria-label="Route in Google Maps Ã¶ffnen"
              >
                <MapPinIcon className="w-4 h-4" />
                Route planen
              </button>
            </div>
          </div>
        </div>

        {/* Tip message */}
        {tipMessage && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
            ðŸ’¡ <strong className="font-semibold">Tipp:</strong> {tipMessage}
          </p>
        )}
      </div>
    </section>
  );
}
