// next.config.ts
// ✅ ZERO-DEFECT: Next.js 15 + TypeScript 5.x (stabile Basis)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint läuft separat im CI
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript-Fehler blockieren Build
  },
};

export default nextConfig;