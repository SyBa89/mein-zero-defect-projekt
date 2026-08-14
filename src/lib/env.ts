import { z } from 'zod';

// ✅ CI/Build-Time Detection
const isCI = process.env.CI === 'true';
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
const isBuildTime = isCI || isBuild;

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // ✅ Redis: Optional während Build, Pflicht zur Runtime
  KV_REST_API_URL: z.string().url().optional(),
  KV_REST_API_TOKEN: z.string().optional(),

  // ✅ Resend: Immer optional
  RESEND_API_KEY: z.string().optional(),

  // ✅ FIX: ADMIN_PASSWORD optional im Schema (Runtime-Checks passieren in den Routen)
  ADMIN_PASSWORD: z.string().min(8).optional(),

  // ✅ JWT Secret: Optional während Build
  JWT_SECRET: z.string().optional(),
});

// ✅ Robustes Type-Safe Env-Objekt
interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  KV_REST_API_URL: string | undefined;
  KV_REST_API_TOKEN: string | undefined;
  RESEND_API_KEY: string | undefined;
  ADMIN_PASSWORD: string | undefined; // ✅ FIX: undefined erlaubt
  JWT_SECRET: string | undefined;
}

function getEnv(): EnvConfig {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);

    // ✅ Während CI/Build: Defaults zurückgeben (garantiert nicht undefined)
    if (isBuildTime) {
      console.warn('⚠️ Build-Time: Using default values for env variables');
      return {
        NODE_ENV: 'development',
        KV_REST_API_URL: undefined,
        KV_REST_API_TOKEN: undefined,
        RESEND_API_KEY: undefined,
        ADMIN_PASSWORD: undefined, // ✅ FIX: fehlte vorher (TS-2741)
        JWT_SECRET: undefined,
      };
    }

    // ✅ Production ohne gültige Env-Vars = Fehler
    throw new Error('Invalid environment variables');
  }

  // ✅ Garantiertes Type-Safe Objekt zurückgeben
  return {
    NODE_ENV: parsed.data.NODE_ENV,
    KV_REST_API_URL: parsed.data.KV_REST_API_URL,
    KV_REST_API_TOKEN: parsed.data.KV_REST_API_TOKEN,
    RESEND_API_KEY: parsed.data.RESEND_API_KEY,
    ADMIN_PASSWORD: parsed.data.ADMIN_PASSWORD,
    JWT_SECRET: parsed.data.JWT_SECRET,
  };
}

export const env: EnvConfig = getEnv();