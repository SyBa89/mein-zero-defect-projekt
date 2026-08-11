// next.config.ts
// ✅ ZERO-DEFECT: Next.js 15 + Sentry v10 (keine deprecated warnings)
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  eslint: {
    // ✅ Linting läuft separat via `npm run lint` + CI-Quality-Gate,
    //    nicht blockierend im Production-Build (Next.js Best Practice).
    ignoreDuringBuilds: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || 'your-org',
  project: process.env.SENTRY_PROJECT || 'your-project',
  silent: true,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  sourcemaps: { disable: false },
  // ✅ Sentry v10: korrekte, nicht-deprecatede Pfade
  webpack: {
    autoInstrumentServerFunctions: true,
    autoInstrumentMiddleware: true,
    treeshake: { removeDebugLogging: true },
  },
});