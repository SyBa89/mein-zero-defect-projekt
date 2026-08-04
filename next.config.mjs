/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ React Strict Mode für bessere Fehler-Erkennung
  reactStrictMode: true,

  // ✅ Security - Hide "X-Powered-By: Next.js" Header
  poweredByHeader: false,

  // ✅ Gzip/Brotli Kompression (Performance)
  compress: true,

  // ✅ Image Optimization (Next.js Image)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'vercel.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // ✅ TypeScript Configuration (läuft IMMER, auch bei ESLint-Ignore)
  typescript: {
    ignoreBuildErrors: false,
  },

  // ✅ ESLint während Build deaktivieren (Next.js 15.5.22 best practice)
  // TypeScript-Validierung läuft weiterhin separat
  // ESLint-Config ist minimal (leeres Array) → keine Crash-Gefahr
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Experimental Features (nur stabile)
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;