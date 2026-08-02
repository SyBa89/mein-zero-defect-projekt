import { getSiteConfig } from '@/lib/site-config';

interface ParsedHours {
  day: string;
  hours: string;
  isToday: boolean;
  isOpen: boolean;
}

// ✅ ZERO-DEFECT: Parse "Mo-Fr 07:30-19:00, Sa 07:30-14:30" in strukturierte Daten
function parseOpeningHours(text: string): ParsedHours[] {
  const todayIndex = new Date().getDay(); // 0 = Sonntag, 1 = Montag, ..., 6 = Samstag

  const dayMap: Record<string, number> = {
    Mo: 1,
    Di: 2,
    Mi: 3,
    Do: 4,
    Fr: 5,
    Sa: 6,
    So: 0,
  };

  const fullDayNames = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ];

  // Default: alle Tage geschlossen
  const result: ParsedHours[] = fullDayNames.map((day, index) => ({
    day,
    hours: 'Geschlossen',
    isToday: index === todayIndex,
    isOpen: false,
  }));

  if (!text) return result;

  // Parse Format: "Mo-Fr 07:30-19:00, Sa 07:30-14:30"
  const parts = text.split(',').map((p) => p.trim());

  parts.forEach((part) => {
    // Regex: "Mo-Fr 07:30-19:00" oder "Sa 07:30-14:30"
    const match = part.match(
      /([A-Za-z]{2})(?:\s*-\s*([A-Za-z]{2}))?\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/
    );
    if (!match) return;

    const [, startDay, endDay, openTime, closeTime] = match;
    const hoursText = `${openTime} – ${closeTime} Uhr`;

    const startIndex = dayMap[startDay];
    const endIndex = endDay ? dayMap[endDay] : startIndex;

    if (startIndex === undefined || endIndex === undefined) return;

    // Alle Tage im Range setzen (mit Wrap-around für So-Mo)
    if (startIndex <= endIndex) {
      for (let i = startIndex; i <= endIndex; i++) {
        result[i].hours = hoursText;
        result[i].isOpen = true;
      }
    } else {
      // Wrap-around (z.B. Sa-Mo)
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

export default async function OpeningHoursSection() {
  const config = await getSiteConfig();
  const parsedHours = parseOpeningHours(config.openingHoursText);

  const todayInfo = parsedHours.find((h) => h.isToday);
  const isShopClosed = config.isClosed;

  return (
    <section
      className="relative py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
      aria-labelledby="opening-hours-heading"
    >
      {/* Dekorative Hintergrund-Blobs für Glassmorphismus-Effekt */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="opening-hours-heading"
          className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-10 text-center tracking-tight"
        >
          Öffnungszeiten
        </h2>

        {/* ✅ ZERO-DEFECT: Glassmorphismus-Hauptcard */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
          {/* ✅ Heute-Status: Geöffnet */}
          {!isShopClosed && todayInfo?.isOpen && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-b border-green-200/50 dark:border-green-700/50 px-8 py-4 text-center backdrop-blur-sm">
              <span className="text-green-700 dark:text-green-300 font-semibold text-lg inline-flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Heute geöffnet: {todayInfo.hours}
              </span>
            </div>
          )}

          {/* ✅ Heute-Status: Notfall-Modus aktiv */}
          {isShopClosed && (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-b border-red-200/50 dark:border-red-700/50 px-8 py-4 text-center backdrop-blur-sm">
              <span className="text-red-700 dark:text-red-300 font-bold text-lg inline-flex items-center gap-2">
                🚨 Heute geschlossen – {config.emergencyMessage || 'Betriebsurlaub'}
              </span>
            </div>
          )}

          {/* ✅ Heute-Status: Normal geschlossen (z.B. Sonntag) */}
          {!isShopClosed && todayInfo && !todayInfo.isOpen && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 border-b border-yellow-200/50 dark:border-yellow-700/50 px-8 py-4 text-center backdrop-blur-sm">
              <span className="text-yellow-700 dark:text-yellow-300 font-semibold text-lg inline-flex items-center gap-2">
                📅 Heute geschlossen
              </span>
            </div>
          )}

          {/* ✅ ZERO-DEFECT: Tabelle mit Glassmorphismus */}
          <div className="backdrop-blur-sm">
            <table className="w-full" role="table">
              <tbody className="divide-y divide-gray-200/30 dark:divide-gray-700/30">
                {parsedHours.map((item) => (
                  <tr
                    key={item.day}
                    className={`transition-all duration-300 hover:bg-white/40 dark:hover:bg-gray-800/40 ${
                      item.isToday
                        ? 'bg-gradient-to-r from-pink-50/80 to-purple-50/80 dark:from-pink-900/20 dark:to-purple-900/20 shadow-inner'
                        : ''
                    }`}
                  >
                    <td className="px-8 py-6 text-left font-bold text-gray-900 dark:text-gray-100 text-lg">
                      <div className="flex items-center gap-3">
                        {item.day}
                        {item.isToday && (
                          <span className="text-xs font-semibold text-pink-700 dark:text-pink-300 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/40 dark:to-purple-900/40 px-3 py-1 rounded-full border border-pink-200/50 dark:border-pink-700/50 shadow-sm">
                            heute
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-xl">
                      {item.isOpen ? (
                        <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          {item.hours}
                        </span>
                      ) : (
                        <span className="text-red-500 dark:text-red-400 font-semibold">
                          Geschlossen
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
