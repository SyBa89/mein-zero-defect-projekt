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

/**
 * Synchronously get initial theme from localStorage
 * Runs DURING render to prevent flicker (WCAG 2.3.1)
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem('theme-preference');
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme;
    }
  } catch {}
  return 'system';
}

/**
 * Synchronously get resolved theme from DOM class (set by inline script)
 * Prevents the light→dark flash on first load
 */
function getInitialResolvedTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  if (document.documentElement.classList.contains('dark')) return 'dark';
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // LAZY INITIALIZATION - synchronous during first render (prevents flicker)
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(getInitialResolvedTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync theme changes to DOM
  useEffect(() => {
    if (!mounted) return;

    let resolved: 'light' | 'dark';
    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = theme;
    }

    if (resolved !== resolvedTheme) {
      setResolvedTheme(resolved);
    }
    document.documentElement.classList.toggle('dark', resolved === 'dark');

    try {
      localStorage.setItem('theme-preference', theme);
    } catch {}
    try {
      document.cookie = `admin-dark-mode=${resolved === 'dark'}; path=/; max-age=${60 * 60 * 24 * 365}`;
    } catch {}
  }, [theme, mounted]);

  // Listen to system preference changes (only when theme is 'system')
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const newResolved = mediaQuery.matches ? 'dark' : 'light';
      setResolvedTheme(newResolved);
      document.documentElement.classList.toggle('dark', newResolved === 'dark');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const toggleTheme = () => setThemeState(resolvedTheme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}
