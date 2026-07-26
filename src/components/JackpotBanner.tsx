import { getSiteConfig } from '@/lib/site-config';

export default async function JackpotBanner() {
  // getSiteConfig hat bereits internes Error-Handling (gibt DEFAULT_CONFIG zurück bei Fehler)
  const config = await getSiteConfig();

  if (!config?.jackpot && !config?.highlight) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-3 px-4 text-center shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        {config.jackpot && (
          <span className="text-2xl font-black animate-pulse">🎰 Jackpot: {config.jackpot} €</span>
        )}
        {config.jackpot && config.highlight && (
          <span className="hidden sm:inline text-white/60 text-xl">|</span>
        )}
        {config.highlight && <span className="text-lg font-semibold">{config.highlight}</span>}
      </div>
    </div>
  );
}
