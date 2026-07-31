import { MetadataRoute } from 'next';
import { CLIENT_CONFIG } from '@/lib/client.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = CLIENT_CONFIG.url.replace(/\/$/, '');

  const staticPages = ['', '/kontakt', '/about', '/impressum', '/datenschutz'];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === ''
        ? 'daily'
        : path.startsWith('/impressum') || path.startsWith('/datenschutz')
          ? 'monthly'
          : 'weekly',
    priority: path === '' ? 1.0 : path === '/kontakt' ? 0.9 : 0.8,
  }));
}
