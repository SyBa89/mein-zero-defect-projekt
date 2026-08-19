// src/lib/theme-presets.ts
// ✅ ZERO-DEFECT: Premium Theme-Presets (Encoding-sicher, Font-Enum-konform)
import type { ThemeConfig } from '@/types/config';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  theme: Partial<ThemeConfig>;
  preview?: { primary: string; secondary: string; accent: string };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'kiosk-vibrant',
    name: 'Kiosk Vibrant',
    description: 'Lebendig & einladend - perfekt fuer Kiosk, Cafe, Retail',
    theme: { primaryColor: '#E91E63', secondaryColor: '#FFC107', accentColor: '#4CAF50', borderRadius: 'md', fontHeading: 'poppins', fontBody: 'inter' },
    preview: { primary: '#E91E63', secondary: '#FFC107', accent: '#4CAF50' },
  },
  {
    id: 'handwerk-professional',
    name: 'Handwerk Professional',
    description: 'Professionell & vertrauenswuerdig - ideal fuer Handwerk, Bau, SHK',
    theme: { primaryColor: '#1976D2', secondaryColor: '#FF9800', accentColor: '#607D8B', borderRadius: 'sm', fontHeading: 'montserrat', fontBody: 'roboto' },
    preview: { primary: '#1976D2', secondary: '#FF9800', accent: '#607D8B' },
  },
  {
    id: 'arzt-calm',
    name: 'Arzt Calm',
    description: 'Ruhig & professionell - perfekt fuer Arztpraxis, Therapie, Medizin',
    theme: { primaryColor: '#00897B', secondaryColor: '#26A69A', accentColor: '#5C6BC0', borderRadius: 'lg', fontHeading: 'lora', fontBody: 'source-sans' },
    preview: { primary: '#00897B', secondary: '#26A69A', accent: '#5C6BC0' },
  },
  {
    id: 'friseur-elegant',
    name: 'Friseur Elegant',
    description: 'Elegant & stilvoll - ideal fuer Friseur, Beauty, Salon',
    theme: { primaryColor: '#9C27B0', secondaryColor: '#E91E63', accentColor: '#FFC107', borderRadius: 'full', fontHeading: 'lora', fontBody: 'inter' },
    preview: { primary: '#9C27B0', secondary: '#E91E63', accent: '#FFC107' },
  },
  {
    id: 'restaurant-warm',
    name: 'Restaurant Warm',
    description: 'Warm & einladend - perfekt fuer Restaurant, Bistro, Cafe',
    theme: { primaryColor: '#D84315', secondaryColor: '#FF6F00', accentColor: '#8D6E63', borderRadius: 'md', fontHeading: 'lora', fontBody: 'inter' },
    preview: { primary: '#D84315', secondary: '#FF6F00', accent: '#8D6E63' },
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Clean & modern - universell einsetzbar, zeitlos',
    theme: { primaryColor: '#3B82F6', secondaryColor: '#6B7280', accentColor: '#FBBF24', borderRadius: 'sm', fontHeading: 'inter', fontBody: 'inter' },
    preview: { primary: '#3B82F6', secondary: '#6B7280', accent: '#FBBF24' },
  },
];

export function getPresetById(id: string): ThemePreset | undefined {
  return THEME_PRESETS.find(p => p.id === id);
}

export function getPresetOptions(): Array<{ value: string; label: string }> {
  return THEME_PRESETS.map(p => ({ value: p.id, label: `${p.name} - ${p.description}` }));
}

export function isValidTheme(theme: unknown): theme is Partial<ThemeConfig> {
  if (!theme || typeof theme !== 'object') return false;
  const t = theme as Record<string, unknown>;
  const hasColor = typeof t.primaryColor === 'string' || typeof t.secondaryColor === 'string' || typeof t.accentColor === 'string';
  const hasOther = typeof t.borderRadius === 'string' || typeof t.fontHeading === 'string' || typeof t.fontBody === 'string';
  return hasColor || hasOther;
}