// ✅ ZERO-DEFECT: Tests für die 3-Ebenen-Hierarchical-Theme-Engine
import { describe, expect, it } from 'vitest';
import { getEffectiveTheme } from '@/lib/config-loader';
import {
  KIOSK_DESIGN_SYSTEM,
  HANDWERK_DESIGN_SYSTEM,
  ARZT_DESIGN_SYSTEM,
} from '@/lib/design-systems';

describe('getEffectiveTheme - 3-Ebenen-Hierarchie', () => {
  it('Ebene 1: liefert DesignSystem-Defaults ohne Overrides', () => {
    const theme = getEffectiveTheme('kiosk');
    expect(theme.primaryColor).toBe(KIOSK_DESIGN_SYSTEM.colors.primary);
    expect(theme.secondaryColor).toBe(KIOSK_DESIGN_SYSTEM.colors.secondary);
    expect(theme.accentColor).toBe(KIOSK_DESIGN_SYSTEM.colors.accent);
  });

  it('Ebene 1: Business-Type waehlt korrektes DesignSystem', () => {
    expect(getEffectiveTheme('handwerk').primaryColor).toBe(HANDWERK_DESIGN_SYSTEM.colors.primary);
    expect(getEffectiveTheme('arzt').primaryColor).toBe(ARZT_DESIGN_SYSTEM.colors.primary);
  });

  it('Ebene 1: unbekannter Business-Type faellt auf Kiosk zurueck', () => {
    expect(getEffectiveTheme('unbekannt').primaryColor).toBe(KIOSK_DESIGN_SYSTEM.colors.primary);
  });

  it('Ebene 2: Tenant-Theme ueberschreibt DesignSystem', () => {
    const theme = getEffectiveTheme('kiosk', { primaryColor: '#123456' });
    expect(theme.primaryColor).toBe('#123456');
    expect(theme.secondaryColor).toBe(KIOSK_DESIGN_SYSTEM.colors.secondary);
  });

  it('Ebene 3: Runtime-Override ueberschreibt Tenant + DesignSystem', () => {
    const theme = getEffectiveTheme('kiosk', { primaryColor: '#111111' }, { primaryColor: '#222222' });
    expect(theme.primaryColor).toBe('#222222');
  });

  it('Partial-Merge: nur angegebene Felder werden ueberschrieben', () => {
    const theme = getEffectiveTheme('kiosk', { primaryColor: '#123456' }, { borderRadius: 'lg' });
    expect(theme.primaryColor).toBe('#123456');
    expect(theme.borderRadius).toBe('lg');
  });

  it('null-Safety: null-Overrides fallen sauber zurueck', () => {
    const theme = getEffectiveTheme('kiosk', null, null);
    expect(theme.primaryColor).toBe(KIOSK_DESIGN_SYSTEM.colors.primary);
  });

  it('liefert immer vollstaendige ThemeConfig (keine undefined-Felder)', () => {
    const theme = getEffectiveTheme('arzt');
    expect(theme.primaryColor).toBeTruthy();
    expect(theme.secondaryColor).toBeTruthy();
    expect(theme.accentColor).toBeTruthy();
    expect(theme.borderRadius).toBeTruthy();
    expect(theme.fontHeading).toBeTruthy();
    expect(theme.fontBody).toBeTruthy();
  });
});