// =================================================================
// Industry-Specific Design Systems - Absolute Premium Quality
// =================================================================

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

// KIOSK - Vibrant & Approachable
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

// HANDWERK - Professional & Trustworthy
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

// ARZT - Calm & Professional
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

// BOUTIQUE ELEGANCE - Pastell, Serif, luftig
export const BOUTIQUE_ELEGANCE_DESIGN_SYSTEM: DesignSystem = {
  name: 'Boutique Elegance',
  colors: { primary: '#B76E79', secondary: '#D4A5A5', accent: '#8E7CC3', background: '#FFF8F6', surface: '#FFFFFF', text: '#4A3B3E', textSecondary: '#8A7A7D', border: '#EBDCDC' },
  typography: { heading: "'Lora', serif", body: "'Source Sans Pro', sans-serif", mono: "'Fira Code', monospace", headingWeights: [500, 600, 700], bodyWeights: [400, 600] },
  spacing: { unit: 8, scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128] },
  shadows: { sm: '0 1px 2px 0 rgba(183, 110, 121, 0.08)', md: '0 4px 10px -2px rgba(183, 110, 121, 0.12)', lg: '0 10px 24px -4px rgba(183, 110, 121, 0.16)', xl: '0 20px 40px -8px rgba(183, 110, 121, 0.2)' },
  borderRadius: { sm: '0.25rem', md: '0.75rem', lg: '1.25rem', xl: '2rem', full: '9999px' },
  animations: { duration: { fast: '200ms', normal: '400ms', slow: '700ms' }, easing: { default: 'cubic-bezier(0.4, 0, 0.2, 1)', in: 'cubic-bezier(0.4, 0, 1, 1)', out: 'cubic-bezier(0, 0, 0.2, 1)', inOut: 'cubic-bezier(0.4, 0, 0.2, 1)' } },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Source+Sans+Pro:wght@400;600&display=swap',
};

// URBAN BOLD - kontraststark, kantig, plakativ
export const URBAN_BOLD_DESIGN_SYSTEM: DesignSystem = {
  name: 'Urban Bold',
  colors: { primary: '#FF3D00', secondary: '#111417', accent: '#FFC400', background: '#FFFFFF', surface: '#F4F5F7', text: '#0B0D10', textSecondary: '#4A5158', border: '#D5D9DE' },
  typography: { heading: "'Montserrat', sans-serif", body: "'Roboto', sans-serif", mono: "'Roboto Mono', monospace", headingWeights: [700, 800, 900], bodyWeights: [400, 500, 700] },
  spacing: { unit: 8, scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128] },
  shadows: { sm: '0 2px 0 0 rgba(11, 13, 16, 0.9)', md: '0 4px 0 0 rgba(11, 13, 16, 0.85)', lg: '0 8px 0 0 rgba(11, 13, 16, 0.8)', xl: '0 12px 0 0 rgba(11, 13, 16, 0.75)' },
  borderRadius: { sm: '0rem', md: '0.125rem', lg: '0.25rem', xl: '0.5rem', full: '9999px' },
  animations: { duration: { fast: '120ms', normal: '250ms', slow: '400ms' }, easing: { default: 'cubic-bezier(0.4, 0, 0.2, 1)', in: 'cubic-bezier(0.4, 0, 1, 1)', out: 'cubic-bezier(0, 0, 0.2, 1)', inOut: 'cubic-bezier(0.4, 0, 0.2, 1)' } },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Roboto:wght@400;500;700&display=swap',
};

// NATURE CALM - Erdtoene, rund, ruhig
export const NATURE_CALM_DESIGN_SYSTEM: DesignSystem = {
  name: 'Nature Calm',
  colors: { primary: '#557C55', secondary: '#A6C48A', accent: '#8D6E63', background: '#F7F5F0', surface: '#FFFFFF', text: '#3E4A3D', textSecondary: '#6B7A69', border: '#DDE5D8' },
  typography: { heading: "'Lora', serif", body: "'Inter', sans-serif", mono: "'Fira Code', monospace", headingWeights: [500, 600, 700], bodyWeights: [400, 500] },
  spacing: { unit: 8, scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128] },
  shadows: { sm: '0 1px 3px 0 rgba(85, 124, 85, 0.1)', md: '0 4px 12px -2px rgba(85, 124, 85, 0.14)', lg: '0 10px 24px -4px rgba(85, 124, 85, 0.18)', xl: '0 20px 40px -8px rgba(85, 124, 85, 0.22)' },
  borderRadius: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2.5rem', full: '9999px' },
  animations: { duration: { fast: '250ms', normal: '450ms', slow: '800ms' }, easing: { default: 'cubic-bezier(0.4, 0, 0.2, 1)', in: 'cubic-bezier(0.4, 0, 1, 1)', out: 'cubic-bezier(0, 0, 0.2, 1)', inOut: 'cubic-bezier(0.4, 0, 0.2, 1)' } },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Inter:wght@400;500&display=swap',
};

// ROYAL NOIR - dunkles Premium (Gold auf Schwarz)
export const ROYAL_NOIR_DESIGN_SYSTEM: DesignSystem = {
  name: 'Royal Noir',
  colors: { primary: '#C9A227', secondary: '#8C2F39', accent: '#E8D9A0', background: '#0B0B0F', surface: '#15151C', text: '#F4EFE4', textSecondary: '#A79E8B', border: '#2A2A35' },
  typography: { heading: "'Lora', serif", body: "'Montserrat', sans-serif", mono: "'Fira Code', monospace", headingWeights: [500, 600, 700], bodyWeights: [400, 500, 600] },
  spacing: { unit: 8, scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128] },
  shadows: { sm: '0 1px 2px 0 rgba(0, 0, 0, 0.6)', md: '0 4px 8px -1px rgba(0, 0, 0, 0.6)', lg: '0 10px 20px -3px rgba(0, 0, 0, 0.7)', xl: '0 20px 35px -5px rgba(0, 0, 0, 0.8)' },
  borderRadius: { sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem', full: '9999px' },
  animations: { duration: { fast: '200ms', normal: '350ms', slow: '600ms' }, easing: { default: 'cubic-bezier(0.4, 0, 0.2, 1)', in: 'cubic-bezier(0.4, 0, 1, 1)', out: 'cubic-bezier(0, 0, 0.2, 1)', inOut: 'cubic-bezier(0.4, 0, 0.2, 1)' } },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Montserrat:wght@400;500;600&display=swap',
};

export const ALL_DESIGN_SYSTEMS: Record<string, DesignSystem> = {
  kiosk: KIOSK_DESIGN_SYSTEM,
  handwerk: HANDWERK_DESIGN_SYSTEM,
  arzt: ARZT_DESIGN_SYSTEM,
  'boutique-elegance': BOUTIQUE_ELEGANCE_DESIGN_SYSTEM,
  'urban-bold': URBAN_BOLD_DESIGN_SYSTEM,
  'nature-calm': NATURE_CALM_DESIGN_SYSTEM,
  'royal-noir': ROYAL_NOIR_DESIGN_SYSTEM,
};

export function getDesignSystem(id: string): DesignSystem {
  return ALL_DESIGN_SYSTEMS[id] ?? KIOSK_DESIGN_SYSTEM;
}

export const DESIGN_LANGUAGE_OPTIONS = [
  { value: '', label: 'Business-Standard (automatisch)' },
  { value: 'boutique-elegance', label: 'Boutique Elegance - Pastell, Serif, luftig' },
  { value: 'urban-bold', label: 'Urban Bold - kontraststark, kantig, plakativ' },
  { value: 'nature-calm', label: 'Nature Calm - Erdtoene, rund, ruhig' },
  { value: 'royal-noir', label: 'Royal Noir - dunkles Premium, Gold, Serif' },
];
