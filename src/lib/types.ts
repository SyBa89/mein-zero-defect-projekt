/**
 * ZERO-DEFECT AGENCY FRAMEWORK
 * Dieses Interface definiert den "Vertrag", den jeder neue Kunde erfüllen muss.
 */
export type BusinessType = 'kiosk' | 'restaurant' | 'dentist' | 'lawyer' | 'retail' | 'handyman';

export interface ClientConfig {
  brand: {
    name: string;
    slogan: string;
    legalName: string;
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
    isSmallBusiness: boolean;
    vatId?: string;
  };
  seo: {
    description: string;
    keywords: string[];
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}
