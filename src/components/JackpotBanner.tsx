import { getClientConfig } from '@/lib/config-loader';

export default async function JackpotBanner() {
  // ✅ ZERO-DEFECT: Server Component nutzt getClientConfig() (White-Label!)
  const config = getClientConfig();

  // ✅ Early-Return: Nur anzeigen wenn business-type es unterstützt
  if (config.banners?.showJackpot !== true) {
    return null;
  }

  const jackpotLabel = config.banners.jackpotLabel || 'Aktueller Jackpot';
  const highlightLabel = config.banners.highlightLabel || 'Heute im Angebot';

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300/30 dark:bg-yellow-600/20 rounded-full blur-2xl" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-300/30 dark:bg-[var(--theme-primary)]/20 rounded-full blur-2xl" />
      </div>

      <div className="relative glass-card border-x-0 border-t-0 rounded-none shadow-lg">
        <div className="max-w-6xl mx-auto py-4 px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                🎰
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  {jackpotLabel}
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Fragen Sie im Markt nach!
                </span>
              </div>
            </div>

            <span className="hidden sm:inline text-gray-400 dark:text-gray-400 text-2xl">•</span>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                {highlightLabel}
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Tagesaktuelle Angebote
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
