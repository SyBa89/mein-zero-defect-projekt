'use client';

import { useEffect } from 'react';
import { CLIENT_CONFIG } from '@/lib/client.config';
import { generateThemeStyles, getThemeColor } from '@/lib/theme';

/**
 * ✅ ZERO-DEFECT: ThemeProvider
 *
 * Injiziert die CSS Variables basierend auf CLIENT_CONFIG.brand.primaryColor
 * beim ersten Render. Verhindert Flash of Unstyled Content (FOUC).
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeColor = getThemeColor(CLIENT_CONFIG.brand.primaryColor);

  useEffect(() => {
    // ✅ Setze Theme-Color Meta-Tag dynamisch
    const themeMetaTag = document.querySelector('meta[name="theme-color"]');
    if (themeMetaTag) {
      const palette = require('@/lib/theme').COLOR_PALETTES[themeColor];
      themeMetaTag.setAttribute('content', palette.meta.themeColor);
    }

    // ✅ Setze MS Tile Color für Windows
    const msTileMeta = document.querySelector('meta[name="msapplication-TileColor"]');
    if (msTileMeta) {
      const palette = require('@/lib/theme').COLOR_PALETTES[themeColor];
      msTileMeta.setAttribute('content', palette.meta.msTileColor);
    }

    // ✅ Füge data-theme Attribut zum HTML-Element hinzu (für Analytics/Debugging)
    document.documentElement.setAttribute('data-theme', themeColor);
  }, [themeColor]);

  // ✅ Generiere Inline-Styles für sofortige Anwendung (kein FOUC)
  const themeStyles = generateThemeStyles(themeColor, false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      {children}
    </>
  );
}
