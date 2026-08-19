'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useConfig } from '@/contexts/ConfigContext';
import { THEME_PRESETS, getPresetById } from '@/lib/theme-presets';
import { DESIGN_LANGUAGE_OPTIONS } from '@/lib/design-systems';
import type { ThemeConfig } from '@/types/config';

// =================================================================
// KONSTANTEN (Enum-Werte aus Zod-Schema)
// =================================================================

const BORDER_RADIUS_OPTIONS = [
  { value: 'none', label: 'None (0px)' },
  { value: 'sm', label: 'Small (0.25rem)' },
  { value: 'md', label: 'Medium (0.5rem)' },
  { value: 'lg', label: 'Large (1rem)' },
  { value: 'full', label: 'Full (9999px)' },
] as const;

const FONT_HEADING_OPTIONS = [
  { value: 'poppins', label: 'Poppins' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'lora', label: 'Lora (Serif)' },
  { value: 'inter', label: 'Inter' },
  { value: 'source-sans', label: 'Source Sans' },
] as const;

const FONT_BODY_OPTIONS = [
  { value: 'inter', label: 'Inter' },
  { value: 'source-sans', label: 'Source Sans' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'lora', label: 'Lora (Serif)' },
] as const;

type ColorKey = 'primaryColor' | 'secondaryColor' | 'accentColor';
type Toast = { type: 'success' | 'error' | 'info'; message: string } | null;

function luminance(hex: string): number {
  const m = hex.replace('#', '');
  if (m.length !== 6) return 0;
  const rgb = [0, 1, 2]
    .map((n) => parseInt(m.substr(n * 2, 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrastRatio(a: string, b: string): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const FONT_SLUG_MAP: Record<string, string> = {
  poppins: 'poppins', montserrat: 'montserrat', roboto: 'roboto',
  lora: 'lora', inter: 'inter', 'source-sans': 'source-sans',
  'source sans': 'source-sans', 'source sans pro': 'source-sans',
};

function normalizeThemePayload(t: ThemeConfig) {
  const slug = (f?: string) => (f ? (FONT_SLUG_MAP[f.toLowerCase()] ?? f.toLowerCase()) : undefined);
  return {
    primaryColor: t.primaryColor,
    secondaryColor: t.secondaryColor,
    accentColor: t.accentColor,
    borderRadius: t.borderRadius,
    fontHeading: slug(t.fontHeading),
    fontBody: slug(t.fontBody),
  };
}

// =================================================================
// KOMPONENTE: Premium StyleEditor
// =================================================================

export function StyleEditor() {
  const config = useConfig();
  const router = useRouter();
  const tenantTheme = config.theme;

  // -- State --
  const [draft, setDraft] = useState<ThemeConfig>(tenantTheme);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const initialDesignSystemId = ((config as { designSystemId?: string }).designSystemId) || '';
  const [designSystemId, setDesignSystemId] = useState<string>(initialDesignSystemId);
  const dsChanged = designSystemId !== initialDesignSystemId;

  // -- Toast-Auto-Dismiss --
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // -- Dirty-Detection --
  const hasChanges = useMemo(() => {
    const keys: (keyof ThemeConfig)[] = [
      'primaryColor', 'secondaryColor', 'accentColor',
      'borderRadius', 'fontHeading', 'fontBody',
    ];
    return keys.some(k => draft[k] !== tenantTheme[k]);
  }, [draft, tenantTheme]);

  // -- WCAG-Live-Check: Primary vs. weisser Text --
  const contrastWarning = useMemo(() => {
    const ratio = contrastRatio(draft.primaryColor || '#000000', '#FFFFFF');
    return ratio < 4.5
      ? `WCAG-Hinweis: Kontrast Primary/Weiss ${ratio.toFixed(2)}:1 - AA empfiehlt mind. 4.5:1.`
      : '';
  }, [draft.primaryColor]);


  // -- Sync: Draft nur aktualisieren wenn keine ungespeicherten Aenderungen (Hardening) --
  useEffect(() => {
    if (!hasChanges) setDraft(tenantTheme);
  }, [tenantTheme, hasChanges]);


  // -- Live-Preview: CSS-Variablen im DOM setzen --
  useEffect(() => {
    const root = document.documentElement;
    if (draft.primaryColor) { root.style.setProperty('--theme-primary', draft.primaryColor); root.style.setProperty('--color-primary', draft.primaryColor); }
    if (draft.secondaryColor) { root.style.setProperty('--theme-secondary', draft.secondaryColor); root.style.setProperty('--color-secondary', draft.secondaryColor); }
    if (draft.accentColor) { root.style.setProperty('--theme-accent', draft.accentColor); root.style.setProperty('--color-accent', draft.accentColor); }
    return () => {
      if (tenantTheme.primaryColor) { root.style.setProperty('--theme-primary', tenantTheme.primaryColor); root.style.setProperty('--color-primary', tenantTheme.primaryColor); }
      if (tenantTheme.secondaryColor) { root.style.setProperty('--theme-secondary', tenantTheme.secondaryColor); root.style.setProperty('--color-secondary', tenantTheme.secondaryColor); }
      if (tenantTheme.accentColor) { root.style.setProperty('--theme-accent', tenantTheme.accentColor); root.style.setProperty('--color-accent', tenantTheme.accentColor); }
    };
  }, [draft, tenantTheme]);

  // -- Handlers --
  const updateColor = useCallback((key: ColorKey, value: string) => {
    const hex = value.startsWith('#') ? value : `#${value}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setDraft(prev => ({ ...prev, [key]: hex }));
    }
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = getPresetById(presetId);
    if (preset) {
      setDraft(prev => ({ ...prev, ...preset.theme }));
      setToast({ type: 'info', message: `Preset ${preset.name} angewendet. Zum Uebernehmen speichern.` });
    }
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: normalizeThemePayload(draft), designSystemId: designSystemId || null }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        const detail = Array.isArray(data.issues) && data.issues.length ? ': ' + data.issues.join(', ') : '';
        throw new Error((data.error || 'Unbekannter Fehler') + detail);
      }
      setToast({ type: 'success', message: 'Theme gespeichert - wird sofort uebernommen.' });
      setSelectedPresetId('');
      router.refresh();
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Fehler' });
    } finally {
      setIsSaving(false);
    }
  }, [draft, designSystemId, router]);

  const handleReset = useCallback(async () => {
    if (!confirm('Theme auf Tenant-Defaults zuruecksetzen? Alle Runtime-Overrides werden geloescht.')) return;
    setIsResetting(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: {}, designSystemId: null }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Reset fehlgeschlagen');
      setToast({ type: 'success', message: 'Theme auf Defaults zurueckgesetzt' });
      setSelectedPresetId('');
      setDesignSystemId('');
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Fehler' });
    } finally {
      setIsResetting(false);
    }
  }, []);

  const revertDraft = useCallback(() => {
    setDraft(tenantTheme);
    setToast({ type: 'info', message: 'Aenderungen verworfen' });
  }, [tenantTheme]);

  // -- Render --
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            Premium Style Editor
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Runtime Theme Override (Ebene 3 der Hierarchie)
          </p>
        </div>
        <div className="flex gap-2">
          {(hasChanges || dsChanged) && (
            <button
              onClick={revertDraft}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Verwerfen
            </button>
          )}
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-50"
          >
            {isResetting ? '...' : 'Reset'}
          </button>
          <button
            onClick={handleSave}
            disabled={(!hasChanges && !dsChanged) || isSaving}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Speichern...' : 'Speichern'}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="alert"
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            toast.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
            toast.type === 'error' ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
            'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Design Language Selector */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 radius-token-md border border-blue-200 dark:border-blue-800">
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Design-Sprache (ganze Webseite)
        </label>
        <select
          value={designSystemId}
          onChange={(e) => setDesignSystemId(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {DESIGN_LANGUAGE_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          Bestimmt Farben, Typografie, Radien und Schatten der gesamten Seite.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Premium Preset waehlen
        </label>
        <div className="flex gap-2">
          <select
            value={selectedPresetId}
            onChange={(e) => setSelectedPresetId(e.target.value)}
            className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">-- Preset auswaehlen --</option>
            {THEME_PRESETS.map(p => (
              <option key={p.id} value={p.id}>{p.name} - {p.description}</option>
            ))}
          </select>
          <button
            onClick={() => applyPreset(selectedPresetId)}
            disabled={!selectedPresetId}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anwenden
          </button>
        </div>
      </div>

      {/* Color Picker */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Farben</h3>
        {contrastWarning && (
          <div className="mb-3 p-2 rounded-lg text-xs font-medium bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
            {contrastWarning}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['primaryColor', 'secondaryColor', 'accentColor'] as ColorKey[]).map(key => (
            <div key={key} className="space-y-2">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
                {key.replace('Color', '')}
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={draft[key] || '#000000'}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="w-12 h-10 p-0 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-transparent"
                  aria-label={`${key} Farbe`}
                />
                <input
                  type="text"
                  value={draft[key] || ''}
                  onChange={(e) => updateColor(key, e.target.value)}
                  placeholder="#000000"
                  pattern="^#[0-9A-Fa-f]{6}$"
                  className="flex-1 px-3 py-2 text-sm font-mono bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div
                className="h-8 rounded-lg border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: draft[key] || 'transparent' }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Typography + BorderRadius */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Border Radius
          </label>
          <select
            value={draft.borderRadius || 'md'}
            onChange={(e) => setDraft(p => ({ ...p, borderRadius: e.target.value as ThemeConfig['borderRadius'] }))}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            {BORDER_RADIUS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ueberschrift-Font
          </label>
          <select
            value={draft.fontHeading || 'inter'}
            onChange={(e) => setDraft(p => ({ ...p, fontHeading: e.target.value }))}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            {FONT_HEADING_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Fliess text-Font
          </label>
          <select
            value={draft.fontBody || 'inter'}
            onChange={(e) => setDraft(p => ({ ...p, fontBody: e.target.value }))}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            {FONT_BODY_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Info-Box - ESLint-konform: keine unescaped entities, keine Emojis */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-xs text-blue-900 dark:text-blue-200">
        <strong>Info:</strong>{' '}
        Aenderungen werden live als Preview angezeigt. Erst{' '}
        <code className="px-1 py-0.5 bg-white/50 dark:bg-black/30 rounded">Speichern</code>{' '}
        persistiert sie in Redis (Ebene 3).{' '}
        <code className="px-1 py-0.5 bg-white/50 dark:bg-black/30 rounded">Reset</code>{' '}
        loescht Runtime-Overrides und faellt auf Tenant-Defaults (Ebene 2) zurueck.
      </div>
    </div>
  );
}
