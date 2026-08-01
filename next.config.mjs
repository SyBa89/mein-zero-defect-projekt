/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // 🛡️ Security: Versteckt Next.js Version

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    // ❌ ENTFERNT: 'qualities' ist in Next.js 15 keine valide Config-Option mehr!
  },

  compress: true,

  // 🛡️ Verhindert Bundling-Fehler bei nativen/spezifischen Server-Modulen
  serverExternalPackages: ['@upstash/redis', 'jsonwebtoken', 'bcryptjs'],

  async redirects() {
    return [
      {
        source: '/admin-login',
        destination: '/admin',
        permanent: true,
      },
    ];
  },

  experimental: {
    staleTimes: {
      dynamic: 30,
    },
    // 🚀 Next.js 15 Performance Boost
     
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;