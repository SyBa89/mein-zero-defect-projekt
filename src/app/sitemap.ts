import { MetadataRoute } from 'next';
import { getClientConfig } from '@/lib/config-loader';
const config = getClientConfig();

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.url.replace(/\/$/, '');

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
