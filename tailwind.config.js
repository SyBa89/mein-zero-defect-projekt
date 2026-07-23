/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ✅ ZERO-DEFECT: Zentrale Farbpalette aus dem Projekt
      colors: {
        // Primärfarben (pink & purple)
        brand: {
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777', // Haupt-Pink
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
            950: '#500724',
          },
          purple: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed', // Haupt-Purple
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
            950: '#2e1065',
          },
        },
        // ✅ ZERO-DEFECT: Graustufen für konsistente Typografie
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },

      // ✅ ZERO-DEFECT: Schriftart-Config
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },

      // ✅ ZERO-DEFECT: Container für konsistente Max-Breiten
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },

      // ✅ ZERO-DEFECT: Eigene Breakpoints für feinere Kontrolle
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // ✅ ZERO-DEFECT: Eigene Box-Shadows (konsistent)
      boxShadow: {
        'brand-sm': '0 1px 2px 0 rgba(219, 39, 119, 0.05)',
        'brand': '0 1px 3px 0 rgba(219, 39, 119, 0.1), 0 1px 2px 0 rgba(219, 39, 119, 0.06)',
        'brand-md': '0 4px 6px -1px rgba(219, 39, 119, 0.1), 0 2px 4px -1px rgba(219, 39, 119, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(219, 39, 119, 0.1), 0 4px 6px -2px rgba(219, 39, 119, 0.05)',
        'brand-xl': '0 20px 25px -5px rgba(219, 39, 119, 0.1), 0 10px 10px -5px rgba(219, 39, 119, 0.04)',
        'brand-2xl': '0 25px 50px -12px rgba(219, 39, 119, 0.25)',
        'brand-glow': '0 0 20px rgba(219, 39, 119, 0.3)',
      },

      // ✅ ZERO-DEFECT: Keyframes für Animationen
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // ✅ ZERO-DEFECT: Animationen für einfache Wiederverwendung
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },

      // ✅ ZERO-DEFECT: Z-Index-Hierarchie für konsistente Stacking-Order
      zIndex: {
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
        'auto': 'auto',
        'modal': 60,
        'overlay': 70,
        'max': 999,
      },

      // ✅ ZERO-DEFECT: Spacing für konsistente Abstände (optional)
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },
    },
  },
  plugins: [
    // ✅ ZERO-DEFECT: Formulare besser stylen (optional)
    // require('@tailwindcss/forms'),
    
    // ✅ ZERO-DEFECT: Typografie für bessere Lesbarkeit (optional)
    // require('@tailwindcss/typography'),
  ],
};