/**
 * ✅ ZERO-DEFECT: Client-seitige Site-Config
 *
 * Einfache, typsichere Implementierung ohne komplexe Caching-Logik.
 * Garantiert: Rückgabe ist IMMER SiteConfig (nie null).
 */

export interface SiteConfig {
  openingHoursText: string;
  isClosed: boolean;
  emergencyMessage?: string;
  jackpot?: string;
  highlight?: string;
}

// ✅ Fallback-Konfiguration (garantiert vollständig)
const DEFAULT_CONFIG: SiteConfig = {
  openingHoursText: 'Mo-Fr 07:30-19:00, Sa 07:30-14:30',
  isClosed: false,
  emergencyMessage: undefined,
  jackpot: undefined,
  highlight: undefined,
};

/**
 * ✅ ZERO-DEFECT: Lädt Site-Config clientseitig
 *
 * Gibt IMMER ein vollständiges SiteConfig-Objekt zurück.
 * Bei Fehler: Fallback auf DEFAULT_CONFIG.
 */
export async function getSiteConfigClient(): Promise<SiteConfig> {
  try {
    const response = await fetch('/api/config', {
      cache: 'force-cache',
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(`getSiteConfigClient: HTTP ${response.status}, using default`);
      return DEFAULT_CONFIG;
    }

    const data = await response.json();

    // ✅ Explizites Merge: Jeder Feld hat Fallback auf Default
    const result: SiteConfig = {
      openingHoursText:
        typeof data.openingHoursText === 'string'
          ? data.openingHoursText
          : DEFAULT_CONFIG.openingHoursText,
      isClosed: typeof data.isClosed === 'boolean' ? data.isClosed : DEFAULT_CONFIG.isClosed,
      emergencyMessage:
        typeof data.emergencyMessage === 'string' ? data.emergencyMessage : undefined,
      jackpot: typeof data.jackpot === 'string' ? data.jackpot : undefined,
      highlight: typeof data.highlight === 'string' ? data.highlight : undefined,
    };

    return result;
  } catch (error) {
    console.warn('getSiteConfigClient: Fetch failed, using default', error);
    return DEFAULT_CONFIG;
  }
}
