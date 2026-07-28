/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    unoptimized: false,
    qualities: [75, 80, 85, 90, 100],
  },

  compress: true,

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
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;