'use client';

import { CLIENT_CONFIG } from '@/lib/client.config';

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ConvenienceStore',
    '@id': `${CLIENT_CONFIG.url}/#store`,
    name: CLIENT_CONFIG.brand.name,
    url: CLIENT_CONFIG.url,
    logo: `${CLIENT_CONFIG.url}/images/logo.png`,
    image: `${CLIENT_CONFIG.url}/images/fassade.png`,
    description: CLIENT_CONFIG.seo.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLIENT_CONFIG.contact.address.street,
      postalCode: CLIENT_CONFIG.contact.address.zip,
      addressLocality: CLIENT_CONFIG.contact.address.city,
      addressRegion: 'NRW',
      addressCountry: CLIENT_CONFIG.contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.806945,
      longitude: 6.823683,
    },
    telephone: CLIENT_CONFIG.contact.phone,
    priceRange: '€',
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
