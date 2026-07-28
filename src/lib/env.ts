import { z } from 'zod';

// ✅ CI/Build-Time Detection
const isCI = process.env.CI === 'true';
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
const isBuildTime = isCI || isBuild;

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // ✅ Redis: Optional während Build, Pflicht zur Runtime
  KV_REST_API_URL: isBuildTime ? z.string().optional() : z.string().url().min(1),
  KV_REST_API_TOKEN: isBuildTime ? z.string().optional() : z.string().min(1),

  // ✅ Resend: Immer optional
  RESEND_API_KEY: z.string().min(1).optional(),

  // ✅ Admin Password: Default für Development
  ADMIN_PASSWORD: z.string().min(8).default('lollipop2024'),

  // ✅ JWT Secret: Optional während Build
  JWT_SECRET: isBuildTime ? z.string().optional() : z.string().min(32).optional(),
});

function getEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    // ✅ Während CI/Build nicht crashen
    if (isBuildTime) {
      console.warn('⚠️ Build-Time: Using permissive env validation');
      return parsed.data;
    }
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

export const env = getEnv();
