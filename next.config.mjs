/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Erlaubt externe Bilder für die Demo (z.B. von Unsplash)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Aktiviert moderne Bildformate (WebP/AVIF) automatisch für maximale Performance
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;