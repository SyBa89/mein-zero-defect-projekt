// âŒ ENTFERNEN: 'use client';

import { getClientConfig } from '@/lib/config-loader';
const config = getClientConfig();

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ConvenienceStore',
    '@id': `${config.url}/#store`,
    name: config.brand.name,
    url: config.url,
    logo: `${config.url}/images/logo.png`,
    image: `${config.url}/images/fassade.webp`,
    description: config.seo.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.contact.address.street,
      postalCode: config.contact.address.zip,
      addressLocality: config.contact.address.city,
      addressRegion: 'NRW',
      addressCountry: config.contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.806945,
      longitude: 6.823683,
    },
    telephone: config.contact.phone,
    priceRange: 'â‚¬',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    openingHours: ['Mo,Tu,We,Th,Fr 07:30-19:00', 'Sa 07:30-14:30'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
