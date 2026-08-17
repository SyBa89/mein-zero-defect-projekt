import { describe, expect, it } from 'vitest';
import { OverrideSchema } from '@/lib/schemas/override.schema';

const cockpitPayload = {
  openingHours: { items: [{ day: 'Montag', open: '07:30', close: '19:00' }] },
  banners: { jackpotLabel: 'Aktueller Jackpot', showJackpot: true },
  emergencyMessage: null,
  isClosed: false,
  updatedAt: '2026-08-17T00:00:00.000Z',
  unknownExtraKey: 'must-be-stripped',
};

describe('OverrideSchema Contract (Cockpit <-> API)', () => {
  it('akzeptiert realistischen Cockpit-Payload (422-Regression-Schutz)', () => {
    expect(OverrideSchema.safeParse(cockpitPayload).success).toBe(true);
  });

  it('stript unbekannte Keys (Persistenz-Sicherheit)', () => {
    const parsed = OverrideSchema.safeParse(cockpitPayload);
    if (!parsed.success) throw new Error('schema rejected payload');
    expect(parsed.data).not.toHaveProperty('unknownExtraKey');
  });

  it('lehnt falsche Typen bekannter Felder ab', () => {
    expect(OverrideSchema.safeParse({ isClosed: 'not-a-boolean' }).success).toBe(false);
  });

  it('akzeptiert minimalen E2E-Shape', () => {
    expect(
      OverrideSchema.safeParse({ banners: { jackpotLabel: 'X' }, openingHours: {} }).success
    ).toBe(true);
  });
});