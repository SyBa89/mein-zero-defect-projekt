import { describe, it, expect } from 'vitest';
import { ClientConfigSchema } from '@/lib/schemas/client-config.schema';

describe('ClientConfigSchema - Phase 4a.1 Holiday Validation', () => {
  const getBaseConfig = () => ({
    url: 'https://test.de',
    brand: { name: 'Test', slogan: 'Test', legalName: 'Test', primaryColor: 'pink' as const },
    contact: {
      address: { street: 'Str', zip: '12345', city: 'Stadt', country: 'DE' },
      phone: '123',
      email: 'test@test.de',
    },
    business: { type: 'kiosk' as const, isSmallBusiness: true },
    seo: { description: 'Test description min 10 chars', keywords: ['test'] },
    hero: {
      headline: 'H',
      subheadline: 'S',
      primaryCta: { label: 'L', href: '/' },
      secondaryCta: { label: 'L', href: '/' },
    },
    features: [{ icon: 'i', title: 't', description: 'd' }],
    extraServices: [{ icon: 'i', title: 't', sub: 's' }],
    sections: { showHermes: false, showProducts: false, showJackpot: false },
    header: { showLogo: false },
    hermes: { enabled: false, description: 'd' },
    products: { categories: [{ icon: 'i', title: 't', description: 'd' }] },
    faq: [{ question: 'q', answer: 'a' }],
    openingHours: {
      items: [
        { day: 'Montag' as const, hours: '08-12', isOpen: true },
        { day: 'Dienstag' as const, hours: '08-12', isOpen: true },
        { day: 'Mittwoch' as const, hours: '08-12', isOpen: true },
        { day: 'Donnerstag' as const, hours: '08-12', isOpen: true },
        { day: 'Freitag' as const, hours: '08-12', isOpen: true },
        { day: 'Samstag' as const, hours: '08-12', isOpen: true },
        { day: 'Sonntag' as const, hours: '08-12', isOpen: true },
      ],
    },
  });

  it('akzeptiert valide ISO 8601 Daten (YYYY-MM-DD)', () => {
    const config = {
      ...getBaseConfig(),
      openingHours: {
        ...getBaseConfig().openingHours,
        holidays: [{ date: '2026-12-25', name: 'Weihnachten', isClosed: true }],
      },
    };
    const result = ClientConfigSchema.safeParse(config);
    expect(result.success).toBe(true);
  });

  it('blockiert deutsche Datumsformate (DD.MM.YYYY)', () => {
    const config = {
      ...getBaseConfig(),
      openingHours: {
        ...getBaseConfig().openingHours,
        holidays: [{ date: '25.12.2026', name: 'Weihnachten', isClosed: true }],
      },
    };
    const result = ClientConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });

  it('blockiert leere Datums-Strings', () => {
    const config = {
      ...getBaseConfig(),
      openingHours: {
        ...getBaseConfig().openingHours,
        holidays: [{ date: '', name: 'Weihnachten', isClosed: true }],
      },
    };
    const result = ClientConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });
});
