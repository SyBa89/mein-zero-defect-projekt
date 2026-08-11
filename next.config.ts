import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// ✅ ZERO-DEFECT: Sentry + Bundle Analyzer kombiniert
// Bundle-Analyzer nur bei ANALYZE=true (kein Production-Overhead)
export default withBundleAnalyzer(
  withSentryConfig(nextConfig, {
    org: process.env.SENTRY_ORG || 'your-org',
    project: process.env.SENTRY_PROJECT || 'your-project',
    silent: true,
    widenClientFileUpload: true,
    tunnelRoute: '/monitoring',
    sourcemaps: { disable: false },
    webpack: {
      autoInstrumentServerFunctions: true,
      autoInstrumentMiddleware: true,
      treeshake: { removeDebugLogging: true },
    },
  })
);