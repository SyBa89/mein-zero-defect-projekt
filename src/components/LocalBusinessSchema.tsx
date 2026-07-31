'use client';

import { useEffect } from 'react';

/**
 * LocalBusiness JSON-LD Schema für Google
 * Hilft dem Kiosk, in lokalen Suchergebnissen ("Kiosk Erftstadt", 
 * "Hermes Paketshop Liblar") besser gefunden zu werden.
 * 
 * TODO: Ersetze latitude/longitude durch echte Koordinaten von 
 * Theodor-Heuss-Straße 35, 50374 Erftstadt (z.B. via Google Maps rechtsklick).
 */
export default function LocalBusinessSchema() {
  useEffect(() => {
    // Nur auf Client rendern, um Hydration-Mismatches zu vermeiden
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ConvenienceStore',
      name: 'Kiosk Lollipop',
      alternateName: 'Kiosk Lollipop Erftstadt-Liblar',
      description: 'Ihr lokaler Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar. Getränke, Snacks, Zeitschriften, Lotto, Tabakwaren und Paketversand.',
      image: 'https://mein-zero-defect-projekt.vercel.app/images/fassade.png',
      url: 'https://mein-zero-defect-projekt.vercel.app',
      telephone: '+4922359291160',
      email: 'info@kiosk-lollipop.de',
      priceRange: '€',
      paymentAccepted: ['Bar', 'EC-Karte', 'Kontaktlos', 'Apple Pay', 'Google Pay'],
      currenciesAccepted: 'EUR',
      openingHours: [
        'Mo-Fr 07:30-19:00',
        'Sa 07:30-14:30'
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Theodor-Heuss-Straße 35',
        addressLocality: 'Erftstadt-Liblar',
        postalCode: '50374',
        addressCountry: 'DE'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '50.804000',
        longitude: '6.793000'
      },
      sameAs: [
        // TODO: Hier echte Social-Media-Links eintragen, z.B.:
        // 'https://www.facebook.com/kiosklollipop',
        // 'https://www.instagram.com/kiosklollipop'
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Dienstleistungen',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Hermes Paketshop',
              description: 'Paketversand, -abholung und Retouren'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Lotto-Annahmestelle',
              description: 'Lotto 6aus49, Eurojackpot, Rubbellose'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Handy-Guthaben Aufladung',
              description: 'Aufladung für alle Mobilfunkanbieter'
            }
          }
        ]
      }
    });
    
    script.setAttribute('id', 'local-business-schema');
    document.head.appendChild(script);
    
    return () => {
      const existing = document.getElementById('local-business-schema');
      if (existing) existing.remove();
    };
  }, []);

  return null;
}
