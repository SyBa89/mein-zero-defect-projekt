// tests/unit/rate-limit.test.ts
// ✅ ZERO-DEFECT: Unit-Tests für Rate-Limiting-Schicht
// Isoliert via vi.mock - keine echten Redis-Calls
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

// ✅ Typen für typsicheren Zugriff auf die Mock-Instanzen
type MockLimit = (...args: unknown[]) => Promise<unknown>;
type MockRatelimitInstance = { limit: MockLimit };

// ✅ Mock-Fabrik: function (statt Arrow), damit `new Redis()` / `new Ratelimit()` funktionieren
vi.mock('@upstash/ratelimit', () => {
  const limitMock = vi.fn().mockResolvedValue({
    success: true,
    remaining: 4,
    reset: 1700000000000,
  });
  const RatelimitMock = vi.fn(function (this: unknown) {
    // ⚠️ function (NICHT Arrow) → kann als Konstruktor mit `new` aufgerufen werden
    return { limit: limitMock };
  });
  (RatelimitMock as unknown as { slidingWindow: unknown }).slidingWindow = vi.fn(() => ({
    __slidingWindow: true,
  }));
  return { Ratelimit: RatelimitMock };
});

vi.mock('@upstash/redis', () => {
  // ⚠️ function-Konstruktor → `new Redis({url, token})` funktioniert
  const RedisMock = vi.fn(function (this: unknown) {
    return {};
  });
  return { Redis: RedisMock };
});

describe('rate-limit: checkRateLimit', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  function makeRequest(headers: Record<string, string> = {}): NextRequest {
    return { headers: new Headers(headers) } as unknown as NextRequest;
  }

  async function loadWithMocks() {
    const { checkRateLimit } = await import('@/lib/rate-limit');
    const mod = await import('@upstash/ratelimit');
    const Ratelimit = mod.Ratelimit as unknown as {
      new (config: unknown): MockRatelimitInstance;
      slidingWindow: (...args: unknown[]) => unknown;
      mock: { results: Array<{ value: MockRatelimitInstance }> };
    };
    return { checkRateLimit, Ratelimit };
  }

  it('gibt Fallback zurück wenn KV-ENV-Variablen fehlen', async () => {
    const { checkRateLimit } = await loadWithMocks();
    const result = await checkRateLimit(makeRequest());
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(5);
    expect(result.reset).toBeGreaterThan(Date.now());
  });

  it('nutzt custom identifier wenn gesetzt', async () => {
    process.env.KV_REST_API_URL = 'https://redis.example.com';
    process.env.KV_REST_API_TOKEN = 'test-token';

    const { checkRateLimit, Ratelimit } = await loadWithMocks();
    await checkRateLimit(makeRequest(), { identifier: 'user-42' });

    const instance = Ratelimit.mock.results[0].value;
    expect(instance.limit).toHaveBeenCalledWith('user-42');
  });

  it('extrahiert IP aus x-forwarded-for (erste IP)', async () => {
    process.env.KV_REST_API_URL = 'https://redis.example.com';
    process.env.KV_REST_API_TOKEN = 'test-token';

    const { checkRateLimit, Ratelimit } = await loadWithMocks();
    await checkRateLimit(makeRequest({ 'x-forwarded-for': '1.2.3.4, 5.6.7.8, 9.10.11.12' }));

    const instance = Ratelimit.mock.results[0].value;
    expect(instance.limit).toHaveBeenCalledWith('1.2.3.4');
  });

  it('fällt auf x-real-ip zurück wenn x-forwarded-for fehlt', async () => {
    process.env.KV_REST_API_URL = 'https://redis.example.com';
    process.env.KV_REST_API_TOKEN = 'test-token';

    const { checkRateLimit, Ratelimit } = await loadWithMocks();
    await checkRateLimit(makeRequest({ 'x-real-ip': '192.168.1.1' }));

    const instance = Ratelimit.mock.results[0].value;
    expect(instance.limit).toHaveBeenCalledWith('192.168.1.1');
  });

  it('fällt auf anonymous zurück wenn alle IP-Header fehlen', async () => {
    process.env.KV_REST_API_URL = 'https://redis.example.com';
    process.env.KV_REST_API_TOKEN = 'test-token';

    const { checkRateLimit, Ratelimit } = await loadWithMocks();
    await checkRateLimit(makeRequest({}));

    const instance = Ratelimit.mock.results[0].value;
    expect(instance.limit).toHaveBeenCalledWith('anonymous');
  });

  it('erstellt Ratelimit mit slidingWindow + prefix', async () => {
    process.env.KV_REST_API_URL = 'https://redis.example.com';
    process.env.KV_REST_API_TOKEN = 'test-token';

    const { checkRateLimit, Ratelimit } = await loadWithMocks();
    await checkRateLimit(makeRequest(), { limit: 10, window: '15 m' });

    expect(Ratelimit).toHaveBeenCalledWith(
      expect.objectContaining({ prefix: 'ratelimit', limiter: expect.anything() })
    );
  });
});