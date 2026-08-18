// src/lib/theme-presets.ts
// ✅ ZERO-DEFECT: Premium Theme-Presets für White-Label
// ✅ TYPE-SAFE: Basierend auf ThemeConfig (flache Struktur)
// ✅ HIERARCHICAL: Presets überschreiben Tenant-Defaults (Ebene 2)

import type { ThemeConfig } from '@/types/config';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  theme: Partial<ThemeConfig>;
  preview?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// ═══════════════════════════════════════════════════════════════
// BUSINESS-TYPE PRESETS (basierend auf DesignSystem)
// ═══════════════════════════════════════════════════════════════

export const THEME_PRESETS: ThemePreset[] = [
  // 🍭 KIOSK — Vibrant & Approachable
  {
    id: 'kiosk-vibrant',
    name: 'Kiosk Vibrant',
    description: 'Lebendig & einladend — perfekt für Kiosk, Café, Retail',
    theme: {
      primaryColor: '#E91E63',    // Pink
      secondaryColor: '#FFC107',  // Amber
      accentColor: '#4CAF50',     // Green
      borderRadius: 'md',
      fontHeading: 'poppins',
      fontBody: 'inter',
    },
    preview: {
      primary: '#E91E63',
      secondary: '#FFC107',
      accent: '#4CAF50',
    },
  },

  // 🔧 HANDWERK — Professional & Trustworthy
  {
    id: 'handwerk-professional',
    name: 'Handwerk Professional',
    description: 'Professionell & vertrauenswürdig — ideal für Handwerk, Bau, SHK',
    theme: {
      primaryColor: '#1976D2',    // Blue
      secondaryColor: '#FF9800',  // Orange
      accentColor: '#607D8B',     // Blue Grey
      borderRadius: 'sm',
      fontHeading: 'montserrat',
      fontBody: 'roboto',
    },
    preview: {
      primary: '#1976D2',
      secondary: '#FF9800',
      accent: '#607D8B',
    },
  },

  // 🏥 ARZT — Calm & Professional
  {
    id: 'arzt-calm',
    name: 'Arzt Calm',
    description: 'Ruhig & professionell — perfekt für Arztpraxis, Therapie, Medizin',
    theme: {
      primaryColor: '#00897B',    // Teal
      secondaryColor: '#26A69A',  // Light Teal
      accentColor: '#5C6BC0',     // Indigo
      borderRadius: 'lg',
      fontHeading: 'lora',
      fontBody: 'source-sans',
    },
    preview: {
      primary: '#00897B',
      secondary: '#26A69A',
      accent: '#5C6BC0',
    },
  },

  // 💇 FRISEUR — Elegant & Stylish
  {
    id: 'friseur-elegant',
    name: 'Friseur Elegant',
    description: 'Elegant & stilvoll — ideal für Friseur, Beauty, Salon',
    theme: {
      primaryColor: '#9C27B0',    // Purple
      secondaryColor: '#E91E63',  // Pink
      accentColor: '#FFC107',     // Gold
      borderRadius: 'full',
      fontHeading: 'playfair',
      fontBody: 'inter',
    },
    preview: {
      primary: '#9C27B0',
      secondary: '#E91E63',
      accent: '#FFC107',
    },
  },

  // 🍽️ RESTAURANT — Warm & Inviting
  {
    id: 'restaurant-warm',
    name: 'Restaurant Warm',
    description: 'Warm & einladend — perfekt für Restaurant, Bistro, Café',
    theme: {
      primaryColor: '#D84315',    // Deep Orange
      secondaryColor: '#FF6F00',  // Amber
      accentColor: '#8D6E63',     // Brown
      borderRadius: 'md',
      fontHeading: 'merriweather',
      fontBody: 'inter',
    },
    preview: {
      primary: '#D84315',
      secondary: '#FF6F00',
      accent: '#8D6E63',
    },
  },

  // 🏢 MINIMAL — Clean & Modern
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Clean & modern — universell einsetzbar, zeitlos',
    theme: {
      primaryColor: '#3B82F6',    // Blue
      secondaryColor: '#6B7280',  // Gray
      accentColor: '#FBBF24',     // Gold
      borderRadius: 'sm',
      fontHeading: 'inter',
      fontBody: 'inter',
    },
    preview: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      accent: '#FBBF24',
    },
  },
];

/**
 * ✅ ZERO-DEFECT: Findet Preset by ID
 */
export function getPresetById(id: string): ThemePreset | undefined {
  return THEME_PRESETS.find(p => p.id === id);
}

/**
 * ✅ ZERO-DEFECT: Gibt alle Preset-Namen zurück (für UI-Dropdowns)
 */
export function getPresetOptions(): Array<{ value: string; label: string }> {
  return THEME_PRESETS.map(p => ({
    value: p.id,
    label: `${p.name} — ${p.description}`,
  }));
}

/**
 * ✅ ZERO-DEFECT: Validiert ob ein Theme-Objekt valide ist
 */
export function isValidTheme(theme: unknown): theme is Partial<ThemeConfig> {
  if (!theme || typeof theme !== 'object') return false;
  const t = theme as Record<string, unknown>;
  
  // Mindestens ein Feld muss gesetzt sein
  const hasColor = typeof t.primaryColor === 'string' || typeof t.secondaryColor === 'string' || typeof t.accentColor === 'string';
  const hasOther = typeof t.borderRadius === 'string' || typeof t.fontHeading === 'string' || typeof t.fontBody === 'string';
  
  return hasColor || hasOther;
}