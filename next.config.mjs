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
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'vercel.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // ✅ 1 Jahr (statt 60s) für bessere Cache-Hit-Rate
  },

  // ✅ TypeScript Configuration (läuft IMMER, auch bei ESLint-Ignore)
  typescript: {
    ignoreBuildErrors: false,
  },

  // ✅ ESLint während Build deaktivieren (Next.js 15.5.22 best practice)
  // TypeScript-Validierung läuft weiterhin separat
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ KEINE experimental Features (staleTimes entfernt für Config-Switching-Kompatibilität)
  // Das bedeutet: Config-Änderungen sind SOFORT sichtbar (kein 30s Cache)
};

export default nextConfig;