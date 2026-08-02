import { getSiteConfig } from '@/lib/site-config';

export default async function JackpotBanner() {
  // ✅ ZERO-DEFECT: getSiteConfig hat bereits internes Error-Handling (gibt DEFAULT_CONFIG zurück bei Fehler)
  const config = await getSiteConfig();

  if (!config?.jackpot && !config?.highlight) {
    return null;
  }

  return (
    <div className="relative overflow-hidden">
      {/* Dekorative Hintergrund-Blobs für Glassmorphismus-Tiefe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300/30 dark:bg-yellow-600/20 rounded-full blur-2xl" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-2xl" />
      </div>

      {/* ✅ ZERO-DEFECT: Glass-Card Banner */}
      <div className="relative glass-card border-x-0 border-t-0 rounded-none shadow-lg">
        <div className="max-w-6xl mx-auto py-4 px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            {config.jackpot && (
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  🎰
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Aktueller Jackpot
                  </span>
                  <span className="pulse-glow text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                    {config.jackpot} €
                  </span>
                </div>
              </div>
            )}

            {config.jackpot && config.highlight && (
              <span className="hidden sm:inline text-gray-400 dark:text-gray-500 text-2xl">•</span>
            )}

            {config.highlight && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Heute im Angebot
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {config.highlight}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
