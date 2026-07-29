'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Theme wechseln (aktuell: ${theme === 'system' ? 'System (' + resolvedTheme + ')' : theme})`}
      title={`Theme: ${theme === 'system' ? 'System (' + resolvedTheme + ')' : theme}`}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95 group"
    >
      {/* Sun Icon (Light Mode) */}
      <svg
        className={`w-5 h-5 text-yellow-500 transition-all duration-500 ${
          resolvedTheme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90 absolute'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon Icon (Dark Mode) */}
      <svg
        className={`w-5 h-5 text-indigo-400 transition-all duration-500 ${
          resolvedTheme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90 absolute'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* System indicator (kleiner Punkt wenn System-Mode) */}
      {theme === 'system' && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      )}
    </button>
  );
}
