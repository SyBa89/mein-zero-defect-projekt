// next.config.ts
// ✅ ZERO-DEFECT: Next.js 15 + TypeScript 5.x + Security Headers + Bundle Analyzer
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

// ✅ Bundle Analyzer: Nur aktiv wenn ANALYZE=true gesetzt ist
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // ✅ FIX: X-XSS-Protection ENTFERNT (deprecated, kann in alten Browsern XSS erleichtern)
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // ✅ FIX: konsistent mit middleware.ts (strict-origin-when-cross-origin)
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

// ✅ Export mit Bundle Analyzer Wrapper
export default bundleAnalyzer(nextConfig);