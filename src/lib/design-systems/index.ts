// ═══════════════════════════════════════════════════════════════
// Industry-Specific Design Systems — Absolute Premium Quality
// ═══════════════════════════════════════════════════════════════

export interface DesignSystem {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  typography: {
    heading: string;
    body: string;
    mono: string;
    headingWeights: number[];
    bodyWeights: number[];
  };
  spacing: { unit: number; scale: number[] };
  shadows: { sm: string; md: string; lg: string; xl: string };
  borderRadius: { sm: string; md: string; lg: string; xl: string; full: string };
  animations: {
    duration: { fast: string; normal: string; slow: string };
    easing: { default: string; in: string; out: string; inOut: string };
  };
  googleFontsUrl: string;
}

// 🍭 KIOSK — Vibrant & Approachable
export const KIOSK_DESIGN_SYSTEM: DesignSystem = {
  name: 'Kiosk',
  colors: {
    primary: '#E91E63',
    secondary: '#FFC107',
    accent: '#4CAF50',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#616161',
    border: '#E0E0E0',
  },
  typography: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Fira Code', monospace",
    headingWeights: [600, 700, 900],
    bodyWeights: [400, 500, 600],
  },
  spacing: { unit: 8, scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128] },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: { sm: '0.125rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
  animations: {
    duration: { fast: '150ms', normal: '300ms', slow: '500ms' },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  googleFontsUrl:
    'https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;900&family=Inter:wght@400;500;600&family=Fira+Code&display=swap',
};

// 🔧 HANDWERK — Professional & Trustworthy
export const HANDWERK_DESIGN_SYSTEM: DesignSystem = {
  name: 'Handwerk',
  colors: {
    primary: '#1976D2',
    secondary: '#FF9800',
    accent: '#607D8B',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#263238',
    textSecondary: '#546E7A',
    border: '#CFD8DC',
  },
  typography: {
    heading: "'Montserrat', sans-serif",
    body: "'Roboto', sans-serif",
    mono: "'Roboto Mono', monospace",
    headingWeights: [600, 700, 800],
    bodyWeights: [400, 500, 700],
  },
  spacing: { unit: 8, scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128] },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
  animations: {
    duration: { fast: '200ms', normal: '300ms', slow: '500ms' },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  googleFontsUrl:
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@400;500;700&family=Roboto+Mono&display=swap',
};

// 🏥 ARZT — Calm & Professional
export const ARZT_DESIGN_SYSTEM: DesignSystem = {
  name: 'Arzt',
  colors: {
    primary: '#00897B',
    secondary: '#26A69A',
    accent: '#5C6BC0',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#37474F',
    textSecondary: '#607D8B',
    border: '#B0BEC5',
  },
  typography: {
    heading: "'Lora', serif",
    body: "'Source Sans Pro', sans-serif",
    mono: "'Source Code Pro', monospace",
    headingWeights: [500, 600, 700],
    bodyWeights: [400, 600, 700],
  },
  spacing: { unit: 8, scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128] },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', full: '9999px' },
  animations: {
    duration: { fast: '200ms', normal: '400ms', slow: '600ms' },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  googleFontsUrl:
    'https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Source+Sans+Pro:wght@400;600;700&family=Source+Code+Pro&display=swap',
};

export function getDesignSystem(businessType: string): DesignSystem {
  switch (businessType) {
    case 'handwerk':
      return HANDWERK_DESIGN_SYSTEM;
    case 'arzt':
      return ARZT_DESIGN_SYSTEM;
    case 'kiosk':
    default:
      return KIOSK_DESIGN_SYSTEM;
  }
}

export const ALL_DESIGN_SYSTEMS = {
  kiosk: KIOSK_DESIGN_SYSTEM,
  handwerk: HANDWERK_DESIGN_SYSTEM,
  arzt: ARZT_DESIGN_SYSTEM,
};
