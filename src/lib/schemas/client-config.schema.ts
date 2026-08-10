import { z } from 'zod';

// ═══════════════════════════════════════════════════════════════
// 🏛️ VERTICAL THEME ENGINE SCHEMA (Phase 6)
// Definiert Design-Tokens für echte White-Label-Souveränität.
// 100% abwärtskompatibel: Alle neuen Felder sind optional.
// ═══════════════════════════════════════════════════════════════
const ThemeSchema = z
  .object({
    primaryColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be valid HEX')
      .optional(),
    accentColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/, 'Must be valid HEX')
      .optional(),
    borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'full']).optional(),
    fontHeading: z
      .enum(['poppins', 'montserrat', 'roboto', 'lora', 'inter', 'source-sans'])
      .optional(),
    fontBody: z.enum(['inter', 'source-sans', 'roboto', 'lora']).optional(),
  })
  .optional();

// ═══════════════════════════════════════════════════════════════
// 🏛️ LAYOUT ORCHESTRATION SCHEMA
// Erlaubt dem Tenant, die Reihenfolge der Sektionen zu definieren.
// ═══════════════════════════════════════════════════════════════
const LayoutSchema = z.array(z.string()).optional();

const BrandSchema = z.object({
  name: z.string().min(1),
  slogan: z.string().min(1),
  legalName: z.string().min(1),
  // ✅ Legacy: Wird ignoriert, wenn theme.primaryColor gesetzt ist.
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
  type: z.enum(['kiosk', 'restaurant', 'retail', 'service', 'handwerk', 'arzt', 'friseur']),
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

// ✅ ERWEITERT: price & duration für Friseur-Services & Gastro-Speisen
const FeatureSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().nullish(),
  duration: z.string().nullish(),
});

const FeaturesMetaSchema = z.object({
  sectionTitle: z.string().min(1),
  sectionSubtitle: z.string().min(1),
});

const ExtraServiceSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().min(1),
});

// ✅ Legacy: Bleibt für Abwärtskompatibilität. layout-Array hat Vorrang.
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

// ✅ ERWEITERT: price für Speisekarten-Kategorien
const ProductCategorySchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().nullish(),
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
  layout: LayoutSchema, // ✅ NEU: Layout Orchestration
  theme: ThemeSchema, // ✅ NEU: Vertical Theme Engine
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
