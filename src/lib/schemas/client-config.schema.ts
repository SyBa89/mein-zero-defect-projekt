import { z } from 'zod';

// ═══════════════════════════════════════════════════════════════
// ClientConfig Schema — Zod-Validierung für White-Label
// ═══════════════════════════════════════════════════════════════

// ─── Brand Schema ───────────────────────────────────────────
const BrandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  slogan: z.string().min(1, 'Brand slogan is required'),
  legalName: z.string().min(1, 'Legal name is required'),
  primaryColor: z.enum(['pink', 'blue', 'green', 'orange', 'purple']),
});

const AddressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  zip: z.string().min(1, 'ZIP is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().length(2, 'Country must be ISO code (2 chars)'),
});

const ContactSchema = z.object({
  address: AddressSchema,
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email format'),
  googlePlaceId: z.string().optional(),
  mapsUrl: z.string().url('Invalid maps URL').optional(),
});

const BusinessSchema = z.object({
  type: z.enum(['kiosk', 'restaurant', 'retail', 'service', 'handwerk', 'arzt']),
  isSmallBusiness: z.boolean(),
  vatId: z.string().optional(),
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

const HeaderSchema = z.object({
  logo: z.string().optional(),
  showLogo: z.boolean(),
});

const HermesSchema = z.object({
  enabled: z.boolean(),
  description: z.string().min(1),
});

const ProductCategorySchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  ageRestriction: z.string().optional(),
});

const ProductsSchema = z.object({
  categories: z.array(ProductCategorySchema).min(1),
});

const FaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

// ✅ NEW: Review Schema for White-Label customer testimonials
const ReviewSchema = z.object({
  name: z.string().min(1),
  initial: z.string().length(1),
  date: z.string().min(1),
  text: z.string().min(1),
  gradient: z.string().min(1),
});

// ═══════════════════════════════════════════════════════════════
// MAIN CLIENT CONFIG SCHEMA
// ═══════════════════════════════════════════════════════════════
export const ClientConfigSchema = z.object({
  url: z.string().url('Invalid URL'),
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
  brands: z.array(z.string()).optional(),
  reviews: z.array(ReviewSchema).optional(), // ✅ NEW: Customer testimonials
});

export type ClientConfig = z.infer<typeof ClientConfigSchema>;

export function validateClientConfig(data: unknown): ClientConfig {
  try {
    return ClientConfigSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('ClientConfig validation failed:');
      error.issues.forEach(function (issue: z.ZodIssue) {
        const pathStr = issue.path.join('.');
        console.error('   ' + pathStr + ': ' + issue.message);
      });
      const errorMessage = 'Invalid ClientConfig: ' + error.issues.length + ' errors found.';
      throw new Error(errorMessage);
    }
    throw error;
  }
}
