import { ClientConfig } from './schemas/client-config.schema';

export interface SchemaOrgData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export function generateSchemaOrg(config: ClientConfig): SchemaOrgData {
  const { business, brand, contact, openingHours, reviews } = config;

  // Base Schema (alle Business-Types)
  const baseSchema: SchemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${config.url}/#business`,
    name: brand.name,
    description: brand.slogan,
    url: config.url,
    telephone: contact.phone,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      postalCode: contact.address.zip,
      addressCountry: contact.address.country,
    },
    image: `${config.url}/images/og-image.png`,
    priceRange: '€€',
  };

  // Öffnungszeiten hinzufügen
  if (openingHours?.items) {
    baseSchema.openingHoursSpecification = openingHours.items
      .filter((item) => item.isOpen)
      .map((item) => {
        const [open, close] = item.hours.split(' – ');
        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: item.day,
          opens: open?.replace(' Uhr', '') || '',
          closes: close?.replace(' Uhr', '') || '',
        };
      });
  }

  // Google Reviews hinzufügen
  if (reviews && reviews.length > 0) {
    baseSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: reviews.length.toString(),
    };
  }

  // Business-Type-spezifische Schema
  switch (business.type) {
    case 'kiosk':
      return {
        ...baseSchema,
        '@type': 'ConvenienceStore',
        additionalType: 'http://www.productontology.org/id/Kiosk',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Kiosk Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Hermes Paketshop',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Lotto & Toto',
              },
            },
          ],
        },
      };

    case 'handwerk':
      return {
        ...baseSchema,
        '@type': 'Plumber',
        additionalType: 'http://www.productontology.org/id/Plumber',
        areaServed: {
          '@type': 'City',
          name: contact.address.city,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Sanitär & Heizung Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: '24/7 Notdienst',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Badsanierung',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Heizungswartung',
              },
            },
          ],
        },
      };

    case 'arzt':
      return {
        ...baseSchema,
        '@type': 'MedicalClinic',
        additionalType: 'http://www.productontology.org/id/Medical_clinic',
        medicalSpecialty: 'GeneralPractice',
        availableService: [
          {
            '@type': 'MedicalProcedure',
            name: 'Hausärztliche Versorgung',
          },
          {
            '@type': 'MedicalProcedure',
            name: 'Vorsorgeuntersuchungen',
          },
          {
            '@type': 'MedicalProcedure',
            name: 'Schutzimpfungen',
          },
        ],
      };

    default:
      return baseSchema;
  }
}
