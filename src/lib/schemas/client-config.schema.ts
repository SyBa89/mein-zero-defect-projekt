import { z } from 'zod';

const BrandSchema = z.object({
  name: z.string().min(1),
  slogan: z.string().min(1),
  legalName: z.string().min(1),
  primaryColor: z.enum(['pink', 'blue', 'green', 'orange', 'purple']),
});

const AddressSchema = z.object({
  street: z.string().min(1),
  zip: z.string().min(1),
  city: z.string().min(1),
  country: z.string().length(2),
});

const ContactSchema = z.object({
  address: AddressSchema,
  phone: z.string().min(1),
  email: z.string().email(),
  googlePlaceId: z.string().nullish(),
  mapsUrl: z.string().url().nullish(),
});

const BusinessSchema = z.object({
  type: z.enum(['kiosk', 'restaurant', 'retail', 'service', 'handwerk', 'arzt']),
  isSmallBusiness: z.boolean(),
  vatId: z.string().nullish(),
});

const SeoSchema = z.object({
  description: z.string().min(10).max(160),
  keywords: z.array(z.string()).min(1),
});

const CtaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const HeroSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema,
  emoji: z.string().nullish(),
  imageAlt: z.string().nullish(),
  backgroundImage: z.string().nullish(),
});

const FeatureSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

// ✅ NEU: FeaturesSection Meta-Daten für business-spezifische Headlines
const FeaturesMetaSchema = z.object({
  sectionTitle: z.string().min(1),
  sectionSubtitle: z.string().min(1),
});

const ExtraServiceSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().min(1),
});

const SectionsSchema = z.object({
  showHermes: z.boolean(),
  showProducts: z.boolean(),
  showJackpot: z.boolean(),
});

const NavigationItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  isExternal: z.boolean().nullish(),
});

const HeaderSchema = z.object({
  logo: z.string().nullish(),
  showLogo: z.boolean(),
  navigation: z.array(NavigationItemSchema).nullish(),
  showAdminLink: z.boolean().nullish(),
  adminLabel: z.string().nullish(),
});

const HermesSchema = z.object({
  enabled: z.boolean(),
  description: z.string().min(1),
});

const ProductCategorySchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  ageRestriction: z.string().nullish(),
});

const ProductsSchema = z.object({
  categories: z.array(ProductCategorySchema).min(1),
});

const FaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const ReviewSchema = z.object({
  name: z.string().min(1),
  initial: z.string().length(1),
  date: z.string().min(1),
  text: z.string().min(1),
  gradient: z.string().min(1),
});

const OpeningHoursItemSchema = z.object({
  day: z.enum(['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']),
  hours: z.string(),
  isOpen: z.boolean(),
});

// ✅ NEU (Phase 4a.1): Holiday Override Schema für Feiertage/Urlaub
// Zero-Defect: Regex erzwingt ISO 8601 (YYYY-MM-DD) und verhindert Datenmüll
const HolidayOverrideSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  name: z.string().min(1),
  isClosed: z.boolean(),
  hours: z.string().optional(),
});

const OpeningHoursSchema = z.object({
  items: z.array(OpeningHoursItemSchema).length(7),
  showSection: z.boolean().optional(),
  emergencyMessage: z.string().nullish(),
  sectionTitle: z.string().nullish(),
  sectionSubtitle: z.string().nullish(),
  tipMessage: z.string().nullish(),
  // ✅ NEU (Phase 4a.1): Globale Schließung & Feiertags-Overrides
  isClosed: z.boolean().default(false),
  holidays: z.array(HolidayOverrideSchema).optional(),
});

const AboutSchema = z.object({
  showSection: z.boolean().optional(),
  sectionTitle: z.string().nullish(),
  introText: z.string().min(1),
  mainDescription: z.string().min(1),
});

const BannersSchema = z.object({
  showJackpot: z.boolean().optional(),
  jackpotLabel: z.string().nullish(),
  highlightLabel: z.string().nullish(),
  // ✅ NEU (Phase 4a.1): Allgemeine Banner & Notfall-Schalter
  bannerText: z.string().nullish(),
  showEmergency: z.boolean().default(true),
});

const SocialSchema = z.object({
  facebook: z.string().url().nullish(),
  instagram: z.string().url().nullish(),
  twitter: z.string().url().nullish(),
});

export const ClientConfigSchema = z.object({
  url: z.string().url(),
  brand: BrandSchema,
  contact: ContactSchema,
  business: BusinessSchema,
  seo: SeoSchema,
  hero: HeroSchema,
  features: z.array(FeatureSchema).min(1),
  featuresMeta: FeaturesMetaSchema.nullish(),
  extraServices: z.array(ExtraServiceSchema).min(1),
  sections: SectionsSchema,
  header: HeaderSchema,
  hermes: HermesSchema,
  products: ProductsSchema,
  faq: z.array(FaqSchema).min(1),
  brands: z.array(z.string()).nullish(),
  reviews: z.array(ReviewSchema).nullish(),
  tracking: z
    .object({
      enabled: z.boolean().default(false),
      googleAnalyticsId: z.string().optional(),
      facebookPixelId: z.string().optional(),
    })
    .optional(),
  openingHours: OpeningHoursSchema.nullish(),
  about: AboutSchema.nullish(),
  banners: BannersSchema.nullish(),
  social: SocialSchema.nullish(),
});

export type ClientConfig = z.infer<typeof ClientConfigSchema>;

export function validateClientConfig(data: unknown): ClientConfig {
  try {
    return ClientConfigSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('ClientConfig validation failed:');
      error.issues.forEach(function (issue: z.ZodIssue) {
        console.error('   ' + issue.path.join('.') + ': ' + issue.message);
      });
      throw new Error('Invalid ClientConfig: ' + error.issues.length + ' errors found.');
    }
    throw error;
  }
}
