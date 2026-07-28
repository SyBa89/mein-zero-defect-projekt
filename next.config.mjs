/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Strict Mode für bessere Error-Detection in Development
  reactStrictMode: true,

  // ✅ Image Optimization - maximale Performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    qualities: [75, 80, 85, 90, 100],
  },

  // ✅ Compression für schnellere Ladezeiten
  compress: true,

  // ✅ Security Headers (Fallback für Middleware)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      // ✅ Lange Cache-Zeiten für statische Assets
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

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

  // ✅ Compiler Optimizations
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // ✅ Experimental Features für maximale Performance
  experimental: {
    optimizePackageImports: [
      '@vercel/analytics',
      '@vercel/speed-insights',
      '@headlessui/react',
      '@heroicons/react',
      'recharts',
    ],
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

  // ✅ Logging Configuration
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;