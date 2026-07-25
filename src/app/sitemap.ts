import { MetadataRoute } from 'next';
import { KIOSK_CONFIG } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  // Bereinigte Basis-URL aus der zentralen Konfiguration (kein trailing slash)
  const baseUrl = KIOSK_CONFIG.url.replace(/\/$/, '');

  // Statische Seiten des Projekts
  const staticPages = [
    '', // Startseite
    '/about',
    '/kontakt',
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : 0.8,
  }));
}
