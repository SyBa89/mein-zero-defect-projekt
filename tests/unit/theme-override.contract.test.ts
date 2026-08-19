// ✅ ZERO-DEFECT: Contract-Tests für Theme-Overrides (Ebene 3)
import { describe, expect, it } from 'vitest';
import { OverrideSchema } from '@/lib/schemas/override.schema';

describe('OverrideSchema - Theme-Contract', () => {
  it('akzeptiert validen Theme-Override', () => {
    const res = OverrideSchema.safeParse({ theme: { primaryColor: '#ff0000', borderRadius: 'lg' } });
    expect(res.success).toBe(true);
  });

  it('lehnt invaliden HEX-Wert ab', () => {
    const res = OverrideSchema.safeParse({ theme: { primaryColor: 'red' } });
    expect(res.success).toBe(false);
  });

  it('lehnt invalides borderRadius-Enum ab', () => {
    const res = OverrideSchema.safeParse({ theme: { borderRadius: 'gigantic' } });
    expect(res.success).toBe(false);
  });

  it('theme ist optional (abwaertskompatibel)', () => {
    const res = OverrideSchema.safeParse({ isClosed: true });
    expect(res.success).toBe(true);
  });
});