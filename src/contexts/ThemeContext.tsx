'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load from localStorage
    try {
      const stored = localStorage.getItem('theme-preference') as Theme | null;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setThemeState(stored);
      }
    } catch {
      // localStorage not available
    }

    // System preference listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(systemTheme);
        document.documentElement.classList.toggle('dark', systemTheme === 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    if (!mounted) return;

    let resolved: 'light' | 'dark';

    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = theme;
    }

    setResolvedTheme(resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');

    try {
      localStorage.setItem('theme-preference', theme);
    } catch {
      // localStorage not available
    }

    // Sync with admin dark mode cookie
    try {
      document.cookie = `admin-dark-mode=${resolved === 'dark'}; path=/; max-age=${60 * 60 * 24 * 365}`;
    } catch {
      // Cookie setting failed
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * SAFE useTheme Hook
 *
 * Gibt einen Fallback zurück wenn ThemeProvider nicht verfügbar ist
 * (z.B. während Server-Side Rendering oder außerhalb des Providers)
 *
 * Das verhindert Build-Errors und macht die App robuster.
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  // Fallback wenn kein Provider vorhanden (SSR, outside provider)
  if (!context) {
    return {
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: () => {
        console.warn('useTheme: setTheme called outside ThemeProvider');
      },
      toggleTheme: () => {
        console.warn('useTheme: toggleTheme called outside ThemeProvider');
      },
    };
  }

  return context;
}
