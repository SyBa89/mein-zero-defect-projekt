/**
 * ✅ ZERO-DEFECT: Zentrale Farbpaletten für dynamisches Tenant-Theming
 *
 * Jede Farbe hat eine vollständige HSL-Palette für konsistente Nutzung
 * über Light Mode, Dark Mode, Hover-States und Accessibility.
 */

export type ThemeColor = 'pink' | 'blue' | 'green' | 'orange' | 'purple';

export interface ColorPalette {
  name: ThemeColor;
  displayName: string;
  light: {
    primary: string; // HSL-Werte (z.B. "330 81% 60%")
    secondary: string;
    accent: string;
    ring: string;
  };
  dark: {
    primary: string;
    secondary: string;
    accent: string;
    ring: string;
  };
  meta: {
    themeColor: string; // Für Browser-UI (#ec4899)
    msTileColor: string; // Für Windows Tiles
  };
}

export const COLOR_PALETTES: Record<ThemeColor, ColorPalette> = {
  pink: {
    name: 'pink',
    displayName: 'Pink (Kiosk Lollipop)',
    light: {
      primary: '330 81% 60%', // #ec4899
      secondary: '263 70% 58%', // #8b5cf6 (Lila)
      accent: '45 93% 47%', // #fbbf24 (Gold)
      ring: '330 81% 60%',
    },
    dark: {
      primary: '330 81% 60%',
      secondary: '263 70% 58%',
      accent: '45 93% 47%',
      ring: '330 81% 60%',
    },
    meta: {
      themeColor: '#ec4899',
      msTileColor: '#ec4899',
    },
  },
  blue: {
    name: 'blue',
    displayName: 'Blue (Professional)',
    light: {
      primary: '217 91% 60%', // #3b82f6
      secondary: '199 89% 48%', // #0ea5e9
      accent: '45 93% 47%',
      ring: '217 91% 60%',
    },
    dark: {
      primary: '217 91% 60%',
      secondary: '199 89% 48%',
      accent: '45 93% 47%',
      ring: '217 91% 60%',
    },
    meta: {
      themeColor: '#3b82f6',
      msTileColor: '#3b82f6',
    },
  },
  green: {
    name: 'green',
    displayName: 'Green (Eco/Nature)',
    light: {
      primary: '142 71% 45%', // #22c55e
      secondary: '160 84% 39%', // #10b981
      accent: '45 93% 47%',
      ring: '142 71% 45%',
    },
    dark: {
      primary: '142 71% 45%',
      secondary: '160 84% 39%',
      accent: '45 93% 47%',
      ring: '142 71% 45%',
    },
    meta: {
      themeColor: '#22c55e',
      msTileColor: '#22c55e',
    },
  },
  orange: {
    name: 'orange',
    displayName: 'Orange (Energetic)',
    light: {
      primary: '25 95% 53%', // #f97316
      secondary: '38 92% 50%', // #f59e0b
      accent: '45 93% 47%',
      ring: '25 95% 53%',
    },
    dark: {
      primary: '25 95% 53%',
      secondary: '38 92% 50%',
      accent: '45 93% 47%',
      ring: '25 95% 53%',
    },
    meta: {
      themeColor: '#f97316',
      msTileColor: '#f97316',
    },
  },
  purple: {
    name: 'purple',
    displayName: 'Purple (Premium)',
    light: {
      primary: '271 91% 65%', // #a855f7
      secondary: '292 84% 61%', // #d946ef
      accent: '45 93% 47%',
      ring: '271 91% 65%',
    },
    dark: {
      primary: '271 91% 65%',
      secondary: '292 84% 61%',
      accent: '45 93% 47%',
      ring: '271 91% 65%',
    },
    meta: {
      themeColor: '#a855f7',
      msTileColor: '#a855f7',
    },
  },
};

/**
 * ✅ ZERO-DEFECT: Generiert CSS-Inline-Styles für Theme-Injection
 */
export function generateThemeStyles(color: ThemeColor, isDark: boolean = false): string {
  const palette = COLOR_PALETTES[color] || COLOR_PALETTES.pink;
  const mode = isDark ? 'dark' : 'light';

  return `
    :root {
      --primary: ${palette[mode].primary};
      --secondary: ${palette[mode].secondary};
      --accent: ${palette[mode].accent};
      --ring: ${palette[mode].ring};
      --theme-color: ${palette.meta.themeColor};
    }
    .dark {
      --primary: ${palette.dark.primary};
      --secondary: ${palette.dark.secondary};
      --accent: ${palette.dark.accent};
      --ring: ${palette.dark.ring};
    }
  `
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * ✅ ZERO-DEFECT: Validiert eine Theme-Farbe
 */
export function isValidThemeColor(color: string): color is ThemeColor {
  return Object.keys(COLOR_PALETTES).includes(color);
}

/**
 * ✅ ZERO-DEFECT: Fallback auf Pink bei ungültiger Farbe
 */
export function getThemeColor(color: string | undefined): ThemeColor {
  if (color && isValidThemeColor(color)) {
    return color;
  }
  return 'pink';
}
