import { MetadataRoute } from 'next';
import { KIOSK_CONFIG } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  // Bereinigte Basis-URL aus der zentralen Konfiguration (kein trailing slash)
  const baseUrl = KIOSK_CONFIG.url.replace(/\/$/, '');

  // Alle öffentlichen Seiten des Projekts
  const staticPages = [
    '',             // Startseite (höchste Priorität)
    '/kontakt',     // Kontaktseite
    '/about',       // Über uns
    '/impressum',   // Wichtig für Google Trust-Signal
    '/datenschutz', // Wichtig für Google Trust-Signal
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    // Startseite täglich, Rest wöchentlich, Rechtliches monatlich
    changeFrequency: path === '' ? 'daily' : path.startsWith('/impressum') || path.startsWith('/datenschutz') ? 'monthly' : 'weekly',
    priority: path === '' ? 1.0 : path === '/kontakt' ? 0.9 : 0.8,
  }));
}