/**
 * ZERO-DEFECT AGENCY FRAMEWORK
 * Dieses Interface definiert den "Vertrag", den jeder neue Kunde erfüllen muss.
 * Wenn du einen neuen Kunden onboardest, müssen alle diese Felder ausgefüllt werden.
 */
export type BusinessType = 'kiosk' | 'restaurant' | 'dentist' | 'lawyer' | 'retail' | 'handyman';

export interface ClientConfig {
  brand: {
    name: string;
    slogan: string;
    legalName: string; // Für das Impressum
    primaryColor: 'pink' | 'blue' | 'green' | 'orange' | 'purple' | 'red';
  };
  contact: {
    address: { street: string; zip: string; city: string; country: string };
    phone: string;
    email: string;
    googlePlaceId: string;
    mapsUrl: string;
  };
  business: {
    type: BusinessType;
    isSmallBusiness: boolean; // Triggert §19 UStG Hinweis im Impressum
    vatId?: string;
  };
  seo: {
    description: string;
    keywords: string[];
  };
}