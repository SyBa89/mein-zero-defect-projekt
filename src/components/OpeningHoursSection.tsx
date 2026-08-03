'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { getSiteConfigClient } from '@/lib/site-config-client';

interface ParsedHours {
  day: string;
  hours: string;
  isToday: boolean;
  isOpen: boolean;
}

interface OpeningHoursConfig {
  openingHoursText: string;
  isClosed: boolean;
  emergencyMessage?: string;
}

type ShopStatus = 'open' | 'closed-regular' | 'closed-emergency' | 'loading';

const DEFAULT_OPENING_HOURS = 'Mo-Fr 07:30-19:00, Sa 07:30-14:30';
const FALLBACK_TIMEOUT_MS = 3000;

const DAY_MAP: Record<string, number> = {
  Mo: 1,
  Di: 2,
  Mi: 3,
  Do: 4,
  Fr: 5,
  Sa: 6,
  So: 0,
};

const FULL_DAY_NAMES = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
];

function parseOpeningHours(text: string, todayIndex: number): ParsedHours[] {
  const result: ParsedHours[] = FULL_DAY_NAMES.map((day, index) => ({
    day,
    hours: 'Geschlossen',
    isToday: index === todayIndex,
    isOpen: false,
  }));

  if (!text) return result;

  const parts = text.split(',').map((p) => p.trim());
  parts.forEach((part) => {
    const match = part.match(
      /([A-Za-z]{2})(?:\s*-\s*([A-Za-z]{2}))?\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/
    );
    if (!match) return;

    const [, startDay, endDay, openTime, closeTime] = match;
    const hoursText = `${openTime} – ${closeTime} Uhr`;
    const startIndex = DAY_MAP[startDay];
    const endIndex = endDay ? DAY_MAP[endDay] : startIndex;

    if (startIndex === undefined || endIndex === undefined) return;

    if (startIndex <= endIndex) {
      for (let i = startIndex; i <= endIndex; i++) {
        result[i].hours = hoursText;
        result[i].isOpen = true;
      }
    } else {
      for (let i = startIndex; i < 7; i++) {
        result[i].hours = hoursText;
        result[i].isOpen = true;
      }
      for (let i = 0; i <= endIndex; i++) {
        result[i].hours = hoursText;
        result[i].isOpen = true;
      }
    }
  });

  return result;
}

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

export default function OpeningHoursSection() {
  const [todayIndex, setTodayIndex] = useState<number>(-1);
  const [config, setConfig] = useState<OpeningHoursConfig | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setTodayIndex(new Date().getDay());

    const timeoutId = setTimeout(() => {
      setConfig(
        (prev) =>
          prev ?? {
            openingHoursText: DEFAULT_OPENING_HOURS,
            isClosed: false,
          }
      );
    }, FALLBACK_TIMEOUT_MS);

    getSiteConfigClient()
      .then((data) => {
        clearTimeout(timeoutId);
        setConfig({
          openingHoursText: data.openingHoursText || DEFAULT_OPENING_HOURS,
          isClosed: data.isClosed || false,
          emergencyMessage: data.emergencyMessage,
        });
      })
      .catch((err) => {
        console.warn('[OpeningHours] Fetch failed, using default:', err);
        clearTimeout(timeoutId);
        setConfig({
          openingHoursText: DEFAULT_OPENING_HOURS,
          isClosed: false,
        });
        setHasError(true);
      });

    return () => clearTimeout(timeoutId);
  }, []);

  const displayConfig = useMemo<OpeningHoursConfig>(
    () =>
      config ?? {
        openingHoursText: DEFAULT_OPENING_HOURS,
        isClosed: false,
      },
    [config]
  );

  const displayTodayIndex = todayIndex === -1 ? new Date().getDay() : todayIndex;

  const parsedHours = useMemo(
    () => parseOpeningHours(displayConfig.openingHoursText, displayTodayIndex),
    [displayConfig.openingHoursText, displayTodayIndex]
  );

  const todayInfo = useMemo(() => parsedHours.find((h) => h.isToday), [parsedHours]);

  const shopStatus: ShopStatus = useMemo(() => {
    if (!config) return 'loading';
    if (displayConfig.isClosed) return 'closed-emergency';
    if (todayInfo?.isOpen) return 'open';
    return 'closed-regular';
  }, [config, displayConfig.isClosed, todayInfo]);

  const handleAddToCalendar = useCallback(() => {
    const address = 'Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section
      className="relative py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
      aria-labelledby="opening-hours-heading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-100/30 to-purple-100/30 dark:from-pink-950/20 dark:to-purple-950/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 mb-4">
            <ClockIcon className="w-8 h-8" />
          </div>
          <h2
            id="opening-hours-heading"
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tight"
          >
            Öffnungszeiten
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Wir sind täglich für Sie da – besuchen Sie uns direkt am Bürgerplatz!
          </p>
        </div>

        <div aria-live="polite" className="sr-only">
          {shopStatus === 'open' && `Heute geöffnet: ${todayInfo?.hours}`}
          {shopStatus === 'closed-regular' && 'Heute geschlossen'}
          {shopStatus === 'closed-emergency' &&
            `Heute außerplanmäßig geschlossen: ${displayConfig.emergencyMessage || 'Betriebsurlaub'}`}
        </div>

        <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
          {shopStatus === 'open' && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-b border-green-200/50 dark:border-green-700/50 px-8 py-5 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
                </span>
                <span className="text-green-800 dark:text-green-200 font-bold text-lg">
                  Heute geöffnet:
                </span>
                <span className="text-green-700 dark:text-green-300 font-black text-xl">
                  {todayInfo?.hours}
                </span>
              </div>
            </div>
          )}

          {shopStatus === 'closed-emergency' && (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-b border-red-200/50 dark:border-red-700/50 px-8 py-5 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <AlertIcon className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="text-red-800 dark:text-red-200 font-bold text-lg text-center">
                  🚨 Heute geschlossen – {displayConfig.emergencyMessage || 'Betriebsurlaub'}
                </span>
              </div>
            </div>
          )}

          {shopStatus === 'closed-regular' && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border-b border-amber-200/50 dark:border-amber-700/50 px-8 py-5 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <CalendarIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <span className="text-amber-800 dark:text-amber-200 font-bold text-lg">
                  📅 Heute geschlossen – morgen sind wir wieder für Sie da!
                </span>
              </div>
            </div>
          )}

          {shopStatus === 'loading' && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b border-blue-200/50 dark:border-blue-700/50 px-8 py-5 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                <span className="text-blue-800 dark:text-blue-200 font-semibold text-lg">
                  Öffnungszeiten werden geladen...
                </span>
              </div>
            </div>
          )}

          <div className="backdrop-blur-sm p-4 sm:p-6 md:p-8">
            <table className="w-full" role="table" aria-label="Wöchentliche Öffnungszeiten">
              <caption className="sr-only">
                Öffnungszeiten für jede Woche. Der heutige Tag ist hervorgehoben.
              </caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Wochentag</th>
                  <th scope="col">Öffnungszeiten</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                {parsedHours.map((item) => (
                  <tr
                    key={item.day}
                    className={`group transition-all duration-300 ${
                      item.isToday
                        ? 'bg-gradient-to-r from-pink-50/80 to-purple-50/80 dark:from-pink-900/20 dark:to-purple-900/20 shadow-inner'
                        : 'hover:bg-white/40 dark:hover:bg-gray-800/40'
                    }`}
                  >
                    <td className="px-6 md:px-8 py-5 text-left">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-bold text-lg ${
                            item.isToday
                              ? 'text-pink-700 dark:text-pink-300'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          {item.day}
                        </span>
                        {item.isToday && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 px-3 py-1 rounded-full shadow-md shadow-pink-500/30">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
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
                            item.isToday
                              ? 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
                              : 'text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          {item.hours}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-red-500 dark:text-red-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 dark:bg-red-500"></span>
                          Geschlossen
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border-t border-gray-200/50 dark:border-gray-700/50 px-6 md:px-8 py-5 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPinIcon className="w-5 h-5 text-pink-600 dark:text-pink-400 flex-shrink-0" />
                <span className="text-sm md:text-base font-medium">
                  Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar
                </span>
              </div>
              <button
                onClick={handleAddToCalendar}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-pink-500/30 hover:shadow-lg hover:shadow-pink-500/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                aria-label="Route in Google Maps öffnen"
              >
                <MapPinIcon className="w-4 h-4" />
                Route planen
              </button>
            </div>
          </div>

          {hasError && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border-t border-amber-200 dark:border-amber-800 px-6 md:px-8 py-3 text-center">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                ⚠️ Aktuelle Öffnungszeiten konnten nicht geladen werden. Bitte telefonisch
                bestätigen.
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
          💡 <strong className="font-semibold">Tipp:</strong> An Sonn- und Feiertagen geschlossen.
          Bei Sonderöffnungszeiten informieren wir Sie über unser Notfall-Banner.
        </p>
      </div>
    </section>
  );
}
