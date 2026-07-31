import { ClientConfig } from './types';

export const CLIENT_CONFIG: ClientConfig = {
  url: 'https://mein-zero-defect-projekt.vercel.app',
  brand: {
    name: 'Kiosk Lollipop',
    slogan: 'Ihr Kiosk und Hermes Paketshop am Bürgerplatz',
    legalName: 'Kiosk Lollipop (Inhaber: Angaben werden ergänzt)',
    primaryColor: 'pink',
  },
  contact: {
    address: {
      street: 'Theodor-Heuss-Straße 35',
      zip: '50374',
      city: 'Erftstadt-Liblar',
      country: 'DE',
    },
    phone: '+4922359291160',
    email: 'info@kiosk-lollipop.de',
    googlePlaceId: 'ChIJeWG_xdsXv0cRInW4W6rog_0',
    mapsUrl: 'https://maps.google.com/?cid=123456789',
  },
  business: {
    type: 'kiosk',
    isSmallBusiness: true,
  },
  seo: {
    description: 'Kiosk Lollipop in Erftstadt-Liblar: Hermes Paketshop, Lotto, Getränke & Snacks.',
    keywords: ['Kiosk Erftstadt', 'Hermes Liblar', 'Lotto 50374'],
  },
  hero: {
    headline: 'Willkommen bei Kiosk Lollipop',
    subheadline: 'Ihr Kiosk und Hermes Paketshop am Bürgerplatz in Erftstadt-Liblar',
    primaryCta: { label: '02235 9291160', href: 'tel:+4922359291160' },
    secondaryCta: { label: 'Jetzt besuchen', href: '/kontakt' },
  },
  features: [
    {
      icon: '📦',
      title: 'Hermes Paketshop',
      description:
        'Komplett-Service für Paketversand, Abholung und Retouren. Schnell und zuverlässig.',
    },
    {
      icon: '🕒',
      title: 'Lange Öffnungszeiten',
      description: 'Mo-Fr bis 19:00 Uhr, Sa bis 14:30 Uhr. Wir sind da, wenn Sie uns brauchen.',
    },
    {
      icon: '📍',
      title: 'Zentrale Lage',
      description: 'Direkt am Bürgerplatz in Liblar. Gut zu Fuß oder mit dem Auto erreichbar.',
    },
    {
      icon: '🅿️',
      title: 'Parkplätze vor der Tür',
      description: 'Kurze Haltezone direkt vor dem Laden und öffentliche Parkplätze in der Nähe.',
    },
    {
      icon: '💳',
      title: 'Moderne Zahlung',
      description:
        'Bar, EC-Karte, Kontaktlos, Apple Pay und Google Pay. Sie zahlen, wie Sie wollen.',
    },
    {
      icon: '🤝',
      title: 'Persönlicher Service',
      description:
        'Seit 2020 für Liblar da. Wir kennen unsere Kunden und beraten mit Herz und Verstand.',
    },
  ],
};
