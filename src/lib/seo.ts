// src/lib/seo.ts

export interface AppConfig {
  url: string;
  brand: {
    name: string;
    slogan: string;
    logo?: string;
  };
  seo: {
    description: string;
    keywords: string[];
  };
  theme?: Record<string, any>;
  [key: string]: any;
}

/**
 * Generiert strukturierte Daten (Schema.org) für SEO.
 */
export function generateSchemaOrg(config: AppConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.brand.name,
    url: config.url,
    description: config.seo.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}