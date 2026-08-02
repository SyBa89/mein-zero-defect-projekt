/**
 * ✅ ZERO-DEFECT: Client-seitige Site-Config für Hydration-sichere Komponenten
 *
 * Nutzt die bestehende /api/config Route statt direktem Redis-Zugriff.
 */

export interface SiteConfig {
  openingHoursText: string;
  isClosed: boolean;
  emergencyMessage?: string;
  jackpot?: string;
  highlight?: string;
}

// Default fallback für SSR/Hydration
const DEFAULT_CONFIG: SiteConfig = {
  openingHoursText: 'Mo-Fr 07:30-19:00, Sa 07:30-14:30',
  isClosed: false,
};

// Einfacher In-Memory Cache (verhindert redundante API-Calls)
let cachedConfig: SiteConfig | null = null;
let cachePromise: Promise<SiteConfig> | null = null;

export async function getSiteConfigClient(): Promise<SiteConfig> {
  // Cache-Check
  if (cachedConfig) return cachedConfig;

  // Deduplicate: Nur einen Fetch parallel laufen lassen
  if (cachePromise) return cachePromise;

  cachePromise = (async () => {
    try {
      const response = await fetch('/api/config', {
        cache: 'force-cache',
        next: { revalidate: 60 }, // Revalidate alle 60 Sekunden
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      cachedConfig = { ...DEFAULT_CONFIG, ...data };
      return cachedConfig;
    } catch (error) {
      console.warn('getSiteConfigClient: Failed to fetch, using default', error);
      cachedConfig = DEFAULT_CONFIG;
      return cachedConfig;
    } finally {
      cachePromise = null;
    }
  })();

  return cachePromise;
}
