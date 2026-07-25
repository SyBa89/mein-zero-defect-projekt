import { MetadataRoute } from 'next';
import { KIOSK_CONFIG } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = KIOSK_CONFIG.url.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Admin-Bereich und interne APIs strikt für Crawler sperren
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
