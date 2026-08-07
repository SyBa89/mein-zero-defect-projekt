'use client';

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

  const theme = useMemo(() => getDesignSystem(businessType), [businessType]);

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
    root.style.setProperty('--font-heading', theme.typography.heading);
    root.style.setProperty('--font-body', theme.typography.body);
    root.style.setProperty('--font-mono', theme.typography.mono);
    root.style.setProperty('--shadow-sm', theme.shadows.sm);
    root.style.setProperty('--shadow-md', theme.shadows.md);
    root.style.setProperty('--shadow-lg', theme.shadows.lg);
    root.style.setProperty('--shadow-xl', theme.shadows.xl);
    root.style.setProperty('--radius-sm', theme.borderRadius.sm);
    root.style.setProperty('--radius-md', theme.borderRadius.md);
    root.style.setProperty('--radius-lg', theme.borderRadius.lg);
    root.style.setProperty('--radius-xl', theme.borderRadius.xl);
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
