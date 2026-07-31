import { MetadataRoute } from 'next';
import { KIOSK_CONFIG } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  // DRY-Prinzip: Gleiche Quelle wie sitemap.ts (kein process.env mehr)
  const baseUrl = KIOSK_CONFIG.url.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Admin-Bereich und APIs strikt vor Crawlern schützen
      disallow: ['/admin', '/api', '/onboarding'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}