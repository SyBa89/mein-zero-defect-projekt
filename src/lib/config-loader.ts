// src/lib/config-loader.ts
// âœ… ZERO-DEFECT: Hybrid-Loader fÃ¼r Server- (SSR/SSG) und Client-Kontext
// âœ… WHITE-LABEL: Mandanten-spezifische Configs via ENV oder Default
// âœ… SECURITY: Keine sensiblen Daten im Client-Bundle
// âœ… LIVE-SAVE: unstable_noStore() verhindert Data-Cache fÃ¼r Echtzeit-Updates
// âœ… HIERARCHICAL THEME: 3-Ebenen-Merge (Business-Type â†’ Tenant â†’ Runtime)

import type { TenantConfig, ThemeConfig } from '@/types/config';
import { unstable_noStore as noStore } from 'next/cache';
import { defaultTenantConfig } from './config/defaults';
import { tenantConfigs } from './config/tenants';
import { getConfigOverride } from './config-override';
import { getDesignSystem } from './design-systems';

/**
 * Server-seitige Config-AuflÃ¶sung (App Router, RSC)
 * Nutzt NEXT_PUBLIC_TENANT_ID oder fallback auf default
 */
export function getTenantConfig(tenantId?: string): TenantConfig {
  const resolvedId =
    tenantId ??
    process.env.NEXT_PUBLIC_TENANT_ID ??
    process.env.NEXT_PUBLIC_CLIENT_TYPE ??
    defaultTenantConfig.tenantId;

  const config = tenantConfigs[resolvedId] ?? defaultTenantConfig;

  // âœ… ZERO-DEFECT: Runtime-Validierung gegen inkonsistente Daten
  validateConfig(config);

  return config;
}

/**
 * Client-seitige Config (Wrapper fÃ¼r KompatibilitÃ¤t)
 * FÃ¼r Pages, die noch den alten API-Namen nutzen
 */
export function getClientConfig(): TenantConfig {
  return getTenantConfig();
}

/**
 * âœ… HIERARCHICAL THEME ENGINE
 * 3-Ebenen-Merge fÃ¼r maximale White-Label-SouverÃ¤nitÃ¤t:
 * 1. Business-Type Defaults (DesignSystem) â€” niedrigste PrioritÃ¤t
 * 2. Tenant Defaults (config.theme) â€” mittlere PrioritÃ¤t
 * 3. Runtime Overrides (Redis) â€” hÃ¶chste PrioritÃ¤t
 */
export const FONT_FAMILY_MAP: Record<string, string> = {
  poppins: "'Poppins', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  roboto: "'Roboto', sans-serif",
  lora: "'Lora', serif",
  inter: "'Inter', sans-serif",
  'source-sans': "'Source Sans Pro', sans-serif",
};

export function getFontFamily(slug: string): string {
  return FONT_FAMILY_MAP[(slug || '').toLowerCase()] || "'" + slug + "', sans-serif";
}

export function getEffectiveTheme(
  businessType: string,
  tenantTheme?: Partial<ThemeConfig> | null,
  runtimeOverride?: Partial<ThemeConfig> | null
): ThemeConfig {
  // Ebene 1: Business-Type Defaults (DesignSystem)
  const designSystem = getDesignSystem(businessType);
  
  const baseTheme: ThemeConfig = {
    primaryColor: designSystem.colors.primary,
    secondaryColor: designSystem.colors.secondary,
    accentColor: designSystem.colors.accent,
    borderRadius: 'md',
    fontHeading: designSystem.typography.heading.split(',')[0].replace(/'/g, '').toLowerCase(),
    fontBody: designSystem.typography.body.split(',')[0].replace(/'/g, '').toLowerCase(),
  };

  // Ebene 2: Tenant Defaults Ã¼berschreiben (mittlere PrioritÃ¤t)
  if (tenantTheme) {
    if (tenantTheme.primaryColor) baseTheme.primaryColor = tenantTheme.primaryColor;
    if (tenantTheme.secondaryColor) baseTheme.secondaryColor = tenantTheme.secondaryColor;
    if (tenantTheme.accentColor) baseTheme.accentColor = tenantTheme.accentColor;
    if (tenantTheme.borderRadius) baseTheme.borderRadius = tenantTheme.borderRadius;
    if (tenantTheme.fontHeading) baseTheme.fontHeading = tenantTheme.fontHeading;
    if (tenantTheme.fontBody) baseTheme.fontBody = tenantTheme.fontBody;
  }

  // Ebene 3: Runtime Overrides Ã¼berschreiben (hÃ¶chste PrioritÃ¤t)
  if (runtimeOverride) {
    if (runtimeOverride.primaryColor) baseTheme.primaryColor = runtimeOverride.primaryColor;
    if (runtimeOverride.secondaryColor) baseTheme.secondaryColor = runtimeOverride.secondaryColor;
    if (runtimeOverride.accentColor) baseTheme.accentColor = runtimeOverride.accentColor;
    if (runtimeOverride.borderRadius) baseTheme.borderRadius = runtimeOverride.borderRadius;
    if (runtimeOverride.fontHeading) baseTheme.fontHeading = runtimeOverride.fontHeading;
    if (runtimeOverride.fontBody) baseTheme.fontBody = runtimeOverride.fontBody;
  }

  return baseTheme;
}

/**
 * Runtime-Validierung â€“ verhindert White-Screen bei fehlerhafter Config
 */
function validateConfig(config: TenantConfig): asserts config is TenantConfig {
  const required: (keyof TenantConfig)[] = [
    'tenantId',
    'url',
    'brand',
    'theme',
    'seo',
    'contact',
  ];

  for (const key of required) {
    if (!config[key]) {
      throw new Error(
        `[Zero-Defect Config] Pflichtfeld "${key}" fehlt in Tenant "${config.tenantId}"`
      );
    }
  }

  if (!config.brand.name?.trim()) {
    throw new Error('[Zero-Defect Config] brand.name darf nicht leer sein');
  }

  if (!config.url?.startsWith('http')) {
    throw new Error(
      `[Zero-Defect Config] url muss eine gÃ¼ltige URL sein (aktuell: "${config.url}")`
    );
  }
}

/**
 * ZERO-DEFECT: Merged Static-Config + Redis-Override
 * Single Source of Truth fÃ¼r Server-Komponenten
 * 
 * âœ… LIVE-SAVE: unstable_noStore() verhindert Data-Cache
 * Damit revalidatePath('/') + revalidateTag('config') sofort wirken
 */
export async function getEffectiveConfig() {
  noStore(); // Verhindert Next.js Data Cache fÃ¼r Live-Save-Scenarios
  
  const staticConfig = getClientConfig();
  const override = await getConfigOverride();
  
  if (!override) return staticConfig;
  
  // âœ… HIERARCHICAL THEME: Merge theme from override
  const effectiveTheme = getEffectiveTheme(
    staticConfig.business.type,
    staticConfig.theme,
    override.theme
  );
  
  return {
    ...staticConfig,
    theme: effectiveTheme,
    openingHours: (override.openingHours as typeof staticConfig.openingHours) ?? staticConfig.openingHours,
    banners: { ...staticConfig.banners, ...(override.banners as Record<string, unknown> | undefined) },
    sections: (override.sections as typeof staticConfig.sections) ?? staticConfig.sections,
  };
}
