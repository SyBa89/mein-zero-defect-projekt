// tests/unit/config-loader.test.ts
// ✅ ZERO-DEFECT: Unit-Tests für Config-Loader (White-Label)
// Isoliert via vi.mock - keine Abhängigkeit von echten JSON-Dateien
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock-Config für Tests (minimal aber vollständig)
const mockDefaultConfig = {
  tenantId: 'default',
  url: 'https://default.example.com',
  brand: { name: 'Default Brand' },
  theme: { primaryColor: '#000000' },
  seo: { title: 'Default', description: 'Default desc' },
  contact: { email: 'default@example.com' },
};

const mockTenantConfigs: Record<string, typeof mockDefaultConfig> = {
  kiosk: {
    ...mockDefaultConfig,
    tenantId: 'kiosk',
    url: 'https://kiosk.example.com',
    brand: { name: 'Kiosk Brand' },
  },
};

vi.mock('@/lib/config/defaults', () => ({
  defaultTenantConfig: mockDefaultConfig,
}));

vi.mock('@/lib/config/tenants', () => ({
  tenantConfigs: mockTenantConfigs,
}));

describe('config-loader: getTenantConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_TENANT_ID;
    delete process.env.NEXT_PUBLIC_CLIENT_TYPE;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('liefert default-Config wenn keine ENV gesetzt ist', async () => {
    const { getTenantConfig } = await import('@/lib/config-loader');
    const config = getTenantConfig();
    expect(config.tenantId).toBe('default');
  });

  it('löst spezifische tenantId via NEXT_PUBLIC_TENANT_ID', async () => {
    process.env.NEXT_PUBLIC_TENANT_ID = 'kiosk';
    const { getTenantConfig } = await import('@/lib/config-loader');
    const config = getTenantConfig();
    expect(config.tenantId).toBe('kiosk');
    expect(config.url).toBe('https://kiosk.example.com');
  });

  it('fällt auf NEXT_PUBLIC_CLIENT_TYPE zurück', async () => {
    process.env.NEXT_PUBLIC_CLIENT_TYPE = 'kiosk';
    const { getTenantConfig } = await import('@/lib/config-loader');
    const config = getTenantConfig();
    expect(config.tenantId).toBe('kiosk');
  });

  it('explizite tenantId überschreibt ENV', async () => {
    process.env.NEXT_PUBLIC_TENANT_ID = 'default';
    const { getTenantConfig } = await import('@/lib/config-loader');
    const config = getTenantConfig('kiosk');
    expect(config.tenantId).toBe('kiosk');
  });

  it('fällt auf Default zurück wenn Tenant-ID unbekannt ist', async () => {
    process.env.NEXT_PUBLIC_TENANT_ID = 'unbekannter-tenant';
    const { getTenantConfig } = await import('@/lib/config-loader');
    const config = getTenantConfig();
    expect(config.tenantId).toBe('default');
  });
});

describe('config-loader: getClientConfig', () => {
  it('ist ein Wrapper für getTenantConfig', async () => {
    const { getClientConfig, getTenantConfig } = await import('@/lib/config-loader');
    expect(getClientConfig()).toEqual(getTenantConfig());
  });
});

describe('config-loader: validateConfig (Runtime-Validierung)', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('wirft Error wenn Pflichtfeld fehlt', async () => {
    vi.doMock('@/lib/config/defaults', () => ({
      defaultTenantConfig: {
        tenantId: 'broken',
        url: 'https://broken.example.com',
        // brand FEHLT
        theme: {},
        seo: {},
        contact: {},
      } as unknown as typeof mockDefaultConfig,
    }));

    const { getTenantConfig } = await import('@/lib/config-loader');
    expect(() => getTenantConfig()).toThrow(/brand/);
  });

  it('wirft Error wenn brand.name leer ist', async () => {
    vi.doMock('@/lib/config/defaults', () => ({
      defaultTenantConfig: {
        ...mockDefaultConfig,
        brand: { name: '   ' },
      },
    }));

    const { getTenantConfig } = await import('@/lib/config-loader');
    expect(() => getTenantConfig()).toThrow(/brand\.name/);
  });

  it('wirft Error wenn url nicht mit http beginnt', async () => {
    vi.doMock('@/lib/config/defaults', () => ({
      defaultTenantConfig: {
        ...mockDefaultConfig,
        url: 'ftp://broken.example.com',
      },
    }));

    const { getTenantConfig } = await import('@/lib/config-loader');
    expect(() => getTenantConfig()).toThrow(/url muss eine g/);
  });
});