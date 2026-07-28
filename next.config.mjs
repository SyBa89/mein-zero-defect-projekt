/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Strict Mode für bessere Error-Detection in Development
  reactStrictMode: true,

  // ✅ Image Optimization - maximale Performance (kompatibel mit 15.0.3+)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    unoptimized: false,
    // ✅ 'qualities' entfernt - nicht unterstützt in 15.0.3
  },

  // ✅ Compression für schnellere Ladezeiten
  compress: true,

  // ✅ Redirects für bessere UX
  async redirects() {
    return [
      {
        source: '/admin-login',
        destination: '/admin',
        permanent: true,
      },
    ];
  },

  // ✅ Experimental Features (nur stabile)
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },

  // ✅ TypeScript Configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ✅ ESLint Configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;