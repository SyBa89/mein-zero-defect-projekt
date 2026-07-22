/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ SECURITY: Entfernt den "X-Powered-By" Header
  poweredByHeader: false,

  images: {
    // Erlaubt externe Bilder für die Demo
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // ✅ PERFORMANCE: Aktiviert moderne Bildformate
    formats: ['image/avif', 'image/webp'],
  },

  // ✅ EXPERIMENTAL: Optimiert CSS für Production (reduziert Bundle-Größe)
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;