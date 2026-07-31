import { ClientConfig } from './types';

/**
 * REFERENZ-IMPLEMENTIERUNG: Kiosk Lollipop
 * Wenn du einen neuen Kunden (z.B. Restaurant) erstellst, kopiere diese Datei
 * und passe die Werte an. Der Rest des Codes bleibt identisch.
 */
export const CLIENT_CONFIG: ClientConfig = {
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
};