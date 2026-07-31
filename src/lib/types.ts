export interface ClientConfig {
  url: string;
  brand: {
    name: string;
    slogan: string;
    legalName: string;
    primaryColor: 'pink' | 'blue' | 'green' | 'orange' | 'purple';
  };
  contact: {
    address: {
      street: string;
      zip: string;
      city: string;
      country: string;
    };
    phone: string;
    email: string;
    googlePlaceId: string;
    mapsUrl: string;
  };
  business: {
    type: 'kiosk' | 'restaurant' | 'retail' | 'service';
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
  sections: {
    showHermes: boolean;
    showProducts: boolean;
    showJackpot: boolean;
  };
  header: {
    logo?: string;
    showLogo: boolean;
  };
  hermes: {
    enabled: boolean;
    description: string;
  };
  products: {
    categories: Array<{
      icon: string;
      title: string;
      description: string;
      ageRestriction?: string;
    }>;
  };
}
