// ZERO-DEFECT: Contract-Tests fuer Design-Sprachen (Ebene 1.5)
import { describe, expect, it } from 'vitest';
import { OverrideSchema } from '@/lib/schemas/override.schema';
import { getDesignSystem, ALL_DESIGN_SYSTEMS, DESIGN_LANGUAGE_OPTIONS } from '@/lib/design-systems';

describe('Design-Sprachen (Ebene 1.5)', () => {
  it('alle Optionen liefern vollstaendiges DesignSystem', () => {
    for (const opt of DESIGN_LANGUAGE_OPTIONS) {
      if (!opt.value) continue;
      const ds = getDesignSystem(opt.value);
      expect(ds.colors.primary).toBeTruthy();
      expect(ds.typography.heading).toBeTruthy();
      expect(ds.shadows.md).toBeTruthy();
      expect(ds.borderRadius.lg).toBeTruthy();
      expect(ds.googleFontsUrl).toContain('fonts.googleapis.com');
    }
  });

  it('unbekannte id faellt auf Kiosk zurueck', () => {
    expect(getDesignSystem('unbekannt').name).toBe('Kiosk');
  });

  it('ALL_DESIGN_SYSTEMS enthaelt 6 Eintraege', () => {
    expect(Object.keys(ALL_DESIGN_SYSTEMS).length).toBe(6);
  });

  it('OverrideSchema akzeptiert valide designSystemId', () => {
    expect(OverrideSchema.safeParse({ designSystemId: 'urban-bold' }).success).toBe(true);
  });

  it('OverrideSchema lehnt invaliden Wert ab', () => {
    expect(OverrideSchema.safeParse({ designSystemId: 'nope' }).success).toBe(false);
  });

  it('designSystemId null erlaubt (Reset)', () => {
    expect(OverrideSchema.safeParse({ designSystemId: null }).success).toBe(true);
  });
});