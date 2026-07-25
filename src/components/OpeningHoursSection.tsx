'use client';

import { useState, useEffect } from 'react';

interface OpeningHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

interface SiteConfig {
  isClosed: boolean;
  emergencyMessage?: string;
  openingHours: OpeningHours;
}

export default function OpeningHoursSection() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch('/api/admin/config');
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (error) {
        console.error('Error loading opening hours:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
    const interval = setInterval(loadConfig, 60000); // Alle 60 Sekunden aktualisieren
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-10"></div>
            <div className="bg-gray-100 rounded-3xl h-64"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!config) return null;

  const dayMap: { [key: string]: string } = {
    monday: 'Montag',
    tuesday: 'Dienstag',
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag',
  };

  // Heutigen Tag ermitteln
  const today = new Date().toLocaleDateString('de-DE', { weekday: 'long' }).toLowerCase();
  const todayHours = config.openingHours?.[today as keyof OpeningHours];
  const isTodayClosed = !todayHours?.open || !todayHours?.close || config.isClosed;

  const formatTime = (time: string) => {
    if (!time) return 'Geschlossen';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes} Uhr`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-gray-900 mb-10 text-center tracking-tight">
          Öffnungszeiten
        </h2>

        <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl border border-pink-100 overflow-hidden shadow-xl">
          {/* Heute-Status (nur wenn nicht geschlossen) */}
          {!config.isClosed && !isTodayClosed && (
            <div className="bg-green-50 border-b border-green-200 px-8 py-3 text-center">
              <span className="text-green-700 font-medium">
                ✅ Heute geöffnet: {formatTime(todayHours.open)} – {formatTime(todayHours.close)}
              </span>
            </div>
          )}
          {config.isClosed && (
            <div className="bg-red-50 border-b border-red-200 px-8 py-3 text-center">
              <span className="text-red-700 font-bold">
                🚨 Heute geschlossen – {config.emergencyMessage || 'Notfall-Modus aktiv'}
              </span>
            </div>
          )}
          {!config.isClosed && isTodayClosed && (
            <div className="bg-yellow-50 border-b border-yellow-200 px-8 py-3 text-center">
              <span className="text-yellow-700 font-medium">📅 Heute geschlossen</span>
            </div>
          )}

          <table className="w-full">
            <tbody className="divide-y divide-pink-100/50">
              {Object.entries(dayMap).map(([key, label]) => {
                const hours = config.openingHours?.[key as keyof OpeningHours];
                const isClosed = !hours?.open || !hours?.close;
                const isToday = key === today;

                return (
                  <tr
                    key={key}
                    className={`hover:bg-pink-100/50 transition-colors ${
                      isToday ? 'bg-pink-50/80' : ''
                    }`}
                  >
                    <td className="px-8 py-6 text-left font-bold text-gray-900 text-lg">
                      {label}
                      {isToday && (
                        <span className="ml-3 text-xs font-normal text-pink-600">(heute)</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right font-black text-xl">
                      {isClosed ? (
                        <span className="text-red-500">Geschlossen</span>
                      ) : (
                        <span className="text-pink-600">
                          {formatTime(hours.open)} – {formatTime(hours.close)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
