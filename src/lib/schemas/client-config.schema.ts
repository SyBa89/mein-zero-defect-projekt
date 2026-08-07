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
});

const FeatureSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
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

// ✅ NEW: Opening Hours Schema (structured data, no parsing needed)
const OpeningHoursItemSchema = z.object({
  day: z.enum(['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']),
  hours: z.string(),
  isOpen: z.boolean(),
});

const OpeningHoursSchema = z.object({
  items: z.array(OpeningHoursItemSchema).length(7),
  showSection: z.boolean().optional(),
  emergencyMessage: z.string().nullish(),
  sectionTitle: z.string().nullish(),
  sectionSubtitle: z.string().nullish(),
  tipMessage: z.string().nullish(),
});

export const ClientConfigSchema = z.object({
  url: z.string().url(),
  brand: BrandSchema,
  contact: ContactSchema,
  business: BusinessSchema,
  seo: SeoSchema,
  hero: HeroSchema,
  features: z.array(FeatureSchema).min(1),
  extraServices: z.array(ExtraServiceSchema).min(1),
  sections: SectionsSchema,
  header: HeaderSchema,
  hermes: HermesSchema,
  products: ProductsSchema,
  faq: z.array(FaqSchema).min(1),
  brands: z.array(z.string()).nullish(),
  reviews: z.array(ReviewSchema).nullish(),
  openingHours: OpeningHoursSchema.nullish(),
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
