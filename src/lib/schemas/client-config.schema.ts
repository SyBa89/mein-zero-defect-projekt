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

// ─── Address Schema ─────────────────────────────────────────
const AddressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  zip: z.string().min(1, 'ZIP is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().length(2, 'Country must be ISO code (2 chars)'),
});

// ─── Contact Schema ─────────────────────────────────────────
const ContactSchema = z.object({
  address: AddressSchema,
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email format'),
  googlePlaceId: z.string().optional(),
  mapsUrl: z.string().url('Invalid maps URL').optional(),
});

// ─── Business Schema ────────────────────────────────────────
const BusinessSchema = z.object({
  type: z.enum(['kiosk', 'restaurant', 'retail', 'service', 'handwerk', 'arzt']),
  isSmallBusiness: z.boolean(),
  vatId: z.string().optional(),
});

// ─── SEO Schema ─────────────────────────────────────────────
const SeoSchema = z.object({
  description: z
    .string()
    .min(10, 'Description must be at least 10 chars')
    .max(160, 'Description max 160 chars'),
  keywords: z.array(z.string()).min(1, 'At least one keyword required'),
});

// ─── CTA Schema ─────────────────────────────────────────────
const CtaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

// ─── Hero Schema ────────────────────────────────────────────
const HeroSchema = z.object({
  headline: z.string().min(1, 'Headline is required'),
  subheadline: z.string().min(1, 'Subheadline is required'),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema,
});

// ─── Feature Schema ─────────────────────────────────────────
const FeatureSchema = z.object({
  icon: z.string().min(1, 'Icon is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

// ─── Extra Service Schema ───────────────────────────────────
const ExtraServiceSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().min(1),
});

// ─── Sections Schema ────────────────────────────────────────
const SectionsSchema = z.object({
  showHermes: z.boolean(),
  showProducts: z.boolean(),
  showJackpot: z.boolean(),
});

// ─── Header Schema ──────────────────────────────────────────
const HeaderSchema = z.object({
  logo: z.string().optional(),
  showLogo: z.boolean(),
});

// ─── Hermes Schema ──────────────────────────────────────────
const HermesSchema = z.object({
  enabled: z.boolean(),
  description: z.string().min(1),
});

// ─── Product Category Schema ────────────────────────────────
const ProductCategorySchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  ageRestriction: z.string().optional(),
});

// ─── Products Schema ────────────────────────────────────────
const ProductsSchema = z.object({
  categories: z.array(ProductCategorySchema).min(1, 'At least one category required'),
});

// ─── FAQ Schema ─────────────────────────────────────────────
const FaqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
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
  features: z.array(FeatureSchema).min(1, 'At least one feature required'),
  extraServices: z.array(ExtraServiceSchema).min(1, 'At least one extra service required'),
  sections: SectionsSchema,
  header: HeaderSchema,
  hermes: HermesSchema,
  products: ProductsSchema,
  faq: z.array(FaqSchema).min(1, 'At least one FAQ entry required'),
  brands: z.array(z.string()).optional(), // ✅ NEW: Optional brands array for White-Label
});

// Type inference from schema (voll type-safe!)
export type ClientConfig = z.infer<typeof ClientConfigSchema>;

// ═══════════════════════════════════════════════════════════════
// VALIDATION HELPER
// ═══════════════════════════════════════════════════════════════
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

      const errorMessage =
        'Invalid ClientConfig: ' + error.issues.length + ' errors found. See console for details.';
      throw new Error(errorMessage);
    }
    throw error;
  }
}
