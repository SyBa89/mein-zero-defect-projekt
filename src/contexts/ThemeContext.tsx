'use client';
import { getFontFamily } from '@/lib/config-loader';

import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useConfig } from './ConfigContext';
import { getDesignSystem, DesignSystem } from '@/lib/design-systems';

interface ThemeContextType {
  theme: DesignSystem;
  businessType: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  const businessType = config.business.type;

  // ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã¢â‚¬Å“ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ HIERARCHICAL THEME: config.theme (3-Ebenen-Merge) + DesignSystem fÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¼r reiche Details
  const theme = useMemo(() => {
    const designSystem = getDesignSystem((config as { designSystemId?: string }).designSystemId || businessType);
    return {
      name: designSystem.name,
      colors: {
        primary: config.theme.primaryColor,
        secondary: config.theme.secondaryColor,
        accent: config.theme.accentColor,
        background: designSystem.colors.background,
        surface: designSystem.colors.surface,
        text: designSystem.colors.text,
        textSecondary: designSystem.colors.textSecondary,
        border: designSystem.colors.border,
      },
      typography: {
        heading: config.theme.fontHeading ? getFontFamily(config.theme.fontHeading) : designSystem.typography.heading,
        body: config.theme.fontBody ? getFontFamily(config.theme.fontBody) : designSystem.typography.body,
        mono: designSystem.typography.mono,
        headingWeights: designSystem.typography.headingWeights,
        bodyWeights: designSystem.typography.bodyWeights,
      },
      spacing: designSystem.spacing,
      shadows: designSystem.shadows,
      borderRadius: designSystem.borderRadius,
      animations: designSystem.animations,
      googleFontsUrl: designSystem.googleFontsUrl,
    } as DesignSystem;
  }, [config, businessType]);

  useEffect(() => {
    if (theme.googleFontsUrl) {
      const linkId = `theme-fonts-${businessType}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = theme.googleFontsUrl;
        document.head.appendChild(link);
      }
    }
  }, [theme, businessType]);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-grad-mid', theme.colors.secondary + '40');
    root.style.setProperty('--theme-grad-end', theme.colors.accent + '40');
    root.style.setProperty('--font-heading', theme.typography.heading);
    root.style.setProperty('--font-body', theme.typography.body);
    root.style.setProperty('--font-mono', theme.typography.mono);
    root.style.setProperty('--shadow-sm', theme.shadows.sm);
    root.style.setProperty('--shadow-md', theme.shadows.md);
    root.style.setProperty('--shadow-lg', theme.shadows.lg);
    root.style.setProperty('--shadow-xl', theme.shadows.xl);
    root.style.setProperty('--duration-fast', theme.animations.duration.fast);
    root.style.setProperty('--duration-normal', theme.animations.duration.normal);
    root.style.setProperty('--duration-slow', theme.animations.duration.slow);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, businessType }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
