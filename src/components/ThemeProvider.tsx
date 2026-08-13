'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useConfig } from '@/contexts/ConfigContext';
import { COLOR_PALETTES, getThemeColor } from '@/lib/theme';
import { logger } from '@/lib/logger';

/**
 * ✅ ZERO-DEFECT: ThemeProvider mit useConfig() (Konsistenz!)
 *
 * Injiziert CSS Variables basierend auf config.brand.primaryColor.
 * Nutzt ausschließlich useEffect um Hydration-Mismatches zu vermeiden.
 * Keine Inline-Styles, die Server/Client-HTML divergieren lassen könnten.
 *
 * White-Label: Theme-Farbe kommt aus JSON-Config (kiosk.json/handwerk.json/arzt.json)
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const config = useConfig();
  const themeColor = getThemeColor(config.brand.primaryColor);
  const palette = COLOR_PALETTES[themeColor];

  useEffect(() => {
    try {
      // ✅ Setze Theme-Color Meta-Tag dynamisch
      const themeMetaTag = document.querySelector('meta[name="theme-color"]');
      if (themeMetaTag) {
        themeMetaTag.setAttribute('content', palette.meta.themeColor);
      }

      // ✅ Setze MS Tile Color für Windows
      const msTileMeta = document.querySelector('meta[name="msapplication-TileColor"]');
      if (msTileMeta) {
        msTileMeta.setAttribute('content', palette.meta.msTileColor);
      }

      // ✅ Setze CSS Variables für Theme-Farben (Light Mode)
      const root = document.documentElement;
      root.style.setProperty('--primary', palette.light.primary);
      root.style.setProperty('--secondary', palette.light.secondary);
      root.style.setProperty('--accent', palette.light.accent);
      root.style.setProperty('--ring', palette.light.ring);
      root.style.setProperty('--theme-color', palette.meta.themeColor);

      // ✅ Füge data-theme Attribut hinzu (für Analytics/Debugging)
      root.setAttribute('data-theme', themeColor);
    } catch (error) {
      // Silent fail - Theme ist optional, Seite funktioniert auch ohne
      logger.warn('ThemeProvider: Failed to apply theme', error);
    }
  }, [themeColor, palette]);

  return <>{children}</>;
}
