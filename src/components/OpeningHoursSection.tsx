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
    <section className="py-20 bg-white" aria-labelledby="opening-hours-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="opening-hours-heading"
          className="text-4xl font-black text-gray-900 mb-10 text-center tracking-tight"
        >
          Öffnungszeiten
        </h2>

        <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl border border-pink-100 overflow-hidden shadow-xl">
          {/* ✅ Heute-Status: Geöffnet */}
          {!isShopClosed && todayInfo?.isOpen && (
            <div className="bg-green-50 border-b border-green-200 px-8 py-3 text-center">
              <span className="text-green-700 font-medium">
                ✅ Heute geöffnet: {todayInfo.hours}
              </span>
            </div>
          )}

          {/* ✅ Heute-Status: Notfall-Modus aktiv */}
          {isShopClosed && (
            <div className="bg-red-50 border-b border-red-200 px-8 py-3 text-center">
              <span className="text-red-700 font-bold">
                🚨 Heute geschlossen – {config.emergencyMessage || 'Betriebsurlaub'}
              </span>
            </div>
          )}

          {/* ✅ Heute-Status: Normal geschlossen (z.B. Sonntag) */}
          {!isShopClosed && todayInfo && !todayInfo.isOpen && (
            <div className="bg-yellow-50 border-b border-yellow-200 px-8 py-3 text-center">
              <span className="text-yellow-700 font-medium">📅 Heute geschlossen</span>
            </div>
          )}

          <table className="w-full" role="table">
            <tbody className="divide-y divide-pink-100/50">
              {parsedHours.map((item) => (
                <tr
                  key={item.day}
                  className={`hover:bg-pink-100/50 transition-colors ${
                    item.isToday ? 'bg-pink-50/80' : ''
                  }`}
                >
                  <td className="px-8 py-6 text-left font-bold text-gray-900 text-lg">
                    {item.day}
                    {item.isToday && (
                      <span className="ml-3 text-xs font-normal text-pink-600">(heute)</span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right font-black text-xl">
                    {item.isOpen ? (
                      <span className="text-pink-600">{item.hours}</span>
                    ) : (
                      <span className="text-red-500">Geschlossen</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
