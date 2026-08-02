/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ ZERO-DEFECT: React Strict Mode für bessere Fehler-Erkennung
  reactStrictMode: true,
  
  // ✅ ZERO-DEFECT: Security - Hide "X-Powered-By: Next.js" Header
  poweredByHeader: false,
  
  // ✅ ZERO-DEFECT: Gzip/Brotli Kompression (Performance)
  compress: true,
  
  // ✅ ZERO-DEFECT: Image Optimization (Next.js Image)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'vercel.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // ✅ ZERO-DEFECT: Experimental Features
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  
  // ✅ ZERO-DEFECT: Security Headers (100/100 Lighthouse Best Practices)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            // ✅ ZERO-DEFECT FIX: interest-cohort entfernt (Chrome deprecated)
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // ✅ ZERO-DEFECT: Cache-Header für statische Assets (1 Jahr)
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|otf)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;