// src/lib/config-loader.ts
// ✅ ZERO-DEFECT: Hybrid-Loader für Server- (SSR/SSG) und Client-Kontext
// ✅ WHITE-LABEL: Mandanten-spezifische Configs via ENV oder Default
// ✅ SECURITY: Keine sensiblen Daten im Client-Bundle
// ✅ LIVE-SAVE: unstable_noStore() verhindert Data-Cache für Echtzeit-Updates

import type { TenantConfig } from '@/types/config';
import { unstable_noStore as noStore } from 'next/cache';
import { defaultTenantConfig } from './config/defaults';
import { tenantConfigs } from './config/tenants';
import { getConfigOverride } from './config-override';

/**
 * Server-seitige Config-Auflösung (App Router, RSC)
 * Nutzt NEXT_PUBLIC_TENANT_ID oder fallback auf default
 */
export function getTenantConfig(tenantId?: string): TenantConfig {
  const resolvedId =
    tenantId ??
    process.env.NEXT_PUBLIC_TENANT_ID ??
    process.env.NEXT_PUBLIC_CLIENT_TYPE ??
    defaultTenantConfig.tenantId;

  const config = tenantConfigs[resolvedId] ?? defaultTenantConfig;

  // ✅ ZERO-DEFECT: Runtime-Validierung gegen inkonsistente Daten
  validateConfig(config);

  return config;
}

/**
 * Client-seitige Config (Wrapper für Kompatibilität)
 * Für Pages, die noch den alten API-Namen nutzen
 */
export function getClientConfig(): TenantConfig {
  return getTenantConfig();
}

/**
 * Runtime-Validierung – verhindert White-Screen bei fehlerhafter Config
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
      `[Zero-Defect Config] url muss eine gültige URL sein (aktuell: "${config.url}")`
    );
  }
}

/**
 * ZERO-DEFECT: Merged Static-Config + Redis-Override
 * Single Source of Truth für Server-Komponenten
 * 
 * ✅ LIVE-SAVE: unstable_noStore() verhindert Data-Cache
 * Damit revalidatePath('/') + revalidateTag('config') sofort wirken
 */
export async function getEffectiveConfig() {
  noStore(); // Verhindert Next.js Data Cache für Live-Save-Scenarios
  
  const staticConfig = getClientConfig();
  const override = await getConfigOverride();
  if (!override) return staticConfig;
  return {
    ...staticConfig,
    openingHours: (override.openingHours as typeof staticConfig.openingHours) ?? staticConfig.openingHours,
    banners: { ...staticConfig.banners, ...(override.banners as Record<string, unknown> | undefined) },
    sections: (override.sections as typeof staticConfig.sections) ?? staticConfig.sections,
  };
}