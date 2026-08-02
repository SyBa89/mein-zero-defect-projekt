'use client';

import { useEffect } from 'react';
import { CLIENT_CONFIG } from '@/lib/client.config';
import { COLOR_PALETTES, getThemeColor } from '@/lib/theme';

/**
 * ✅ ZERO-DEFECT: ThemeProvider
 *
 * Injiziert CSS Variables basierend auf CLIENT_CONFIG.brand.primaryColor.
 * Nutzt useEffect um Hydration-Mismatches zu vermeiden.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeColor = getThemeColor(CLIENT_CONFIG.brand.primaryColor);
  const palette = COLOR_PALETTES[themeColor];

  useEffect(() => {
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

    // ✅ Setze CSS Variables für Theme-Farben
    document.documentElement.style.setProperty('--primary', palette.light.primary);
    document.documentElement.style.setProperty('--secondary', palette.light.secondary);
    document.documentElement.style.setProperty('--accent', palette.light.accent);
    document.documentElement.style.setProperty('--ring', palette.light.ring);
    document.documentElement.style.setProperty('--theme-color', palette.meta.themeColor);

    // ✅ Füge data-theme Attribut hinzu (für Analytics/Debugging)
    document.documentElement.setAttribute('data-theme', themeColor);
  }, [themeColor, palette]);

  return <>{children}</>;
}
