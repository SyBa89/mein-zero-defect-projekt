// src/lib/config-loader.ts
// Ã¢Å“â€¦ ZERO-DEFECT: Hybrid-Loader fÃƒÂ¼r Server- (SSR/SSG) und Client-Kontext
// Ã¢Å“â€¦ WHITE-LABEL: Mandanten-spezifische Configs via ENV oder Default
// Ã¢Å“â€¦ SECURITY: Keine sensiblen Daten im Client-Bundle
// Ã¢Å“â€¦ LIVE-SAVE: unstable_noStore() verhindert Data-Cache fÃƒÂ¼r Echtzeit-Updates
// Ã¢Å“â€¦ HIERARCHICAL THEME: 3-Ebenen-Merge (Business-Type Ã¢â€ â€™ Tenant Ã¢â€ â€™ Runtime)

import type { TenantConfig, ThemeConfig } from '@/types/config';
import { unstable_noStore as noStore } from 'next/cache';
import { defaultTenantConfig } from './config/defaults';
import { tenantConfigs } from './config/tenants';
import { getConfigOverride } from './config-override';
import { getDesignSystem } from './design-systems';

/**
 * Server-seitige Config-AuflÃƒÂ¶sung (App Router, RSC)
 * Nutzt NEXT_PUBLIC_TENANT_ID oder fallback auf default
 */
export function getTenantConfig(tenantId?: string): TenantConfig {
  const resolvedId =
    tenantId ??
    process.env.NEXT_PUBLIC_TENANT_ID ??
    process.env.NEXT_PUBLIC_CLIENT_TYPE ??
    defaultTenantConfig.tenantId;

  const config = tenantConfigs[resolvedId] ?? defaultTenantConfig;

  // Ã¢Å“â€¦ ZERO-DEFECT: Runtime-Validierung gegen inkonsistente Daten
  validateConfig(config);

  return config;
}

/**
 * Client-seitige Config (Wrapper fÃƒÂ¼r KompatibilitÃƒÂ¤t)
 * FÃƒÂ¼r Pages, die noch den alten API-Namen nutzen
 */
export function getClientConfig(): TenantConfig {
  return getTenantConfig();
}

/**
 * Ã¢Å“â€¦ HIERARCHICAL THEME ENGINE
 * 3-Ebenen-Merge fÃƒÂ¼r maximale White-Label-SouverÃƒÂ¤nitÃƒÂ¤t:
 * 1. Business-Type Defaults (DesignSystem) Ã¢â‚¬â€ niedrigste PrioritÃƒÂ¤t
 * 2. Tenant Defaults (config.theme) Ã¢â‚¬â€ mittlere PrioritÃƒÂ¤t
 * 3. Runtime Overrides (Redis) Ã¢â‚¬â€ hÃƒÂ¶chste PrioritÃƒÂ¤t
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

  // Ebene 2: Tenant Defaults ÃƒÂ¼berschreiben (mittlere PrioritÃƒÂ¤t)
  if (tenantTheme) {
    if (tenantTheme.primaryColor) baseTheme.primaryColor = tenantTheme.primaryColor;
    if (tenantTheme.secondaryColor) baseTheme.secondaryColor = tenantTheme.secondaryColor;
    if (tenantTheme.accentColor) baseTheme.accentColor = tenantTheme.accentColor;
    if (tenantTheme.borderRadius) baseTheme.borderRadius = tenantTheme.borderRadius;
    if (tenantTheme.fontHeading) baseTheme.fontHeading = tenantTheme.fontHeading;
    if (tenantTheme.fontBody) baseTheme.fontBody = tenantTheme.fontBody;
  }

  // Ebene 3: Runtime Overrides ÃƒÂ¼berschreiben (hÃƒÂ¶chste PrioritÃƒÂ¤t)
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
 * Runtime-Validierung Ã¢â‚¬â€œ verhindert White-Screen bei fehlerhafter Config
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
      `[Zero-Defect Config] url muss eine gÃƒÂ¼ltige URL sein (aktuell: "${config.url}")`
    );
  }
}

/**
 * ZERO-DEFECT: Merged Static-Config + Redis-Override
 * Single Source of Truth fÃƒÂ¼r Server-Komponenten
 * 
 * Ã¢Å“â€¦ LIVE-SAVE: unstable_noStore() verhindert Data-Cache
 * Damit revalidatePath('/') + revalidateTag('config') sofort wirken
 */
export async function getEffectiveConfig() {
  noStore(); // Verhindert Next.js Data Cache fuer Live-Save-Szenarien

  const staticConfig = getClientConfig();
  const override = await getConfigOverride();

  // Ebene 1.5: Design-Sprache (Override) vor Business-Type
  const dsId = override?.designSystemId ?? staticConfig.business.type;

  if (!override) {
    return { ...staticConfig, designSystemId: dsId, theme: staticConfig.theme };
  }

  // HIERARCHICAL THEME: Ebene 1 = Design-Sprache
  const effectiveTheme = getEffectiveTheme(
    dsId,
    staticConfig.theme,
    override.theme
  );

  return {
    ...staticConfig,
    designSystemId: dsId,
    theme: effectiveTheme,
    openingHours: (override.openingHours as typeof staticConfig.openingHours) ?? staticConfig.openingHours,
    banners: { ...staticConfig.banners, ...(override.banners as Record<string, unknown> | undefined) },
    sections: (override.sections as typeof staticConfig.sections) ?? staticConfig.sections,
  };
}
