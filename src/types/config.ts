// src/types/config.ts
// ✅ ZERO-DEFECT: Vollständiger Superset-Contract (Single Source of Truth)
// Deckt ALLE Properties ab, die Komponenten tatsächlich lesen.

export type TenantId = 'default' | 'medical' | 'craftsman' | 'kiosk' | (string & {});
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type BusinessType =
  | 'kiosk' | 'restaurant' | 'retail' | 'service'
  | 'handwerk' | 'arzt' | 'friseur';

export interface BrandConfig {
  name: string;
  slogan: string;
  legalName: string;
  primaryColor: string;
  logoUrl?: string | null;
}

export interface AddressConfig {
  street: string;
  zip: string;
  city: string;
  country: string;
}

export interface ContactConfig {
  address: AddressConfig;
  phone: string;
  email: string;
  mapsUrl?: string | null;
  googlePlaceId?: string | null;
}

export interface BusinessConfig {
  type: BusinessType;
  isSmallBusiness: boolean;
  vatId?: string | null;
}

export interface SeoConfig {
  description: string;
  keywords: string[];
  defaultTitle?: string;
  defaultDescription?: string;
  ogImage?: string | null;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: BorderRadius;
  fontHeading: string;
  fontBody: string;
  logoUrl?: string | null;
}

export interface CtaConfig { label: string; href: string; }

export interface HeroConfig {
  headline: string;
  subheadline: string;
  primaryCta: CtaConfig;
  secondaryCta: CtaConfig;
  emoji?: string | null;
  imageAlt?: string | null;
  backgroundImage?: string | null;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  price?: string | null;
  duration?: string | null;
}

export interface FeaturesMetaConfig { sectionTitle: string; sectionSubtitle: string; }
export interface ExtraServiceItem { icon: string; title: string; sub: string; }
export interface SectionsConfig { showHermes: boolean; showProducts: boolean; showJackpot: boolean; }
export interface NavigationItem { label: string; href: string; isExternal?: boolean | null; }

export interface HeaderConfig {
  logo?: string | null;
  showLogo: boolean;
  navigation?: NavigationItem[] | null;
  showAdminLink?: boolean | null;
  adminLabel?: string | null;
}

export interface HermesConfig { enabled: boolean; description: string; }
export interface ProductCategory { icon: string; title: string; description: string; price?: string | null; ageRestriction?: string | null; }
export interface ProductsConfig { categories: ProductCategory[]; }
export interface FaqItem { question: string; answer: string; }
export interface ReviewItem { name: string; initial: string; date: string; text: string; gradient: string; }

export interface OpeningHoursItem {
  day: 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag' | 'Samstag' | 'Sonntag';
  hours: string;
  isOpen: boolean;
}

export interface HolidayOverride { date: string; name: string; isClosed: boolean; hours?: string; }

export interface OpeningHoursConfig {
  items: OpeningHoursItem[];
  showSection?: boolean;
  emergencyMessage?: string | null;
  sectionTitle?: string | null;
  sectionSubtitle?: string | null;
  tipMessage?: string | null;
  isClosed?: boolean;
  holidays?: HolidayOverride[];
}

export interface AboutConfig { showSection?: boolean; sectionTitle?: string | null; introText: string; mainDescription: string; }
export interface BannersConfig { showJackpot?: boolean; jackpotLabel?: string | null; highlightLabel?: string | null; bannerText?: string | null; showEmergency?: boolean; }
export interface SocialConfig { facebook?: string | null; instagram?: string | null; twitter?: string | null; }

export interface TrackingConfig {
  enabled: boolean;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  sentryDsn?: string;
}

export interface UiFeatureFlags { showMobileActionBar?: boolean; showCookieBanner?: boolean; showDarkModeToggle?: boolean; }
export interface BusinessFeatureFlags { enableSentryReplay?: boolean; enablePatientLogin?: boolean; enableShoppingCart?: boolean; enableBookingSystem?: boolean; enableAnalytics?: boolean; }
export interface ServiceItem { id?: string; icon: string; title: string; description: string; price?: string | null; duration?: string | null; }

export interface TenantConfig {
  tenantId: TenantId;
  url: string;
  brand: BrandConfig;
  contact: ContactConfig;
  business: BusinessConfig;
  seo: SeoConfig;
  theme: ThemeConfig;
  hero: HeroConfig;
  features: FeatureItem[];
  featuresMeta?: FeaturesMetaConfig | null;
  extraServices: ExtraServiceItem[];
  sections: SectionsConfig;
  layout?: string[];
  header: HeaderConfig;
  hermes: HermesConfig;
  products: ProductsConfig;
  faq: FaqItem[];
  brands?: string[] | null;
  reviews?: ReviewItem[] | null;
  tracking?: TrackingConfig;
  openingHours?: OpeningHoursConfig | null;
  about?: AboutConfig | null;
  banners?: BannersConfig | null;
  social?: SocialConfig | null;
  uiFeatures?: UiFeatureFlags;
  businessFeatures?: BusinessFeatureFlags;
  services?: ServiceItem[];
}