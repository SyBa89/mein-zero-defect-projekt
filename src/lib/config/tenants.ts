// src/lib/config/tenants.ts
// ✅ WHITE-LABEL: Zentrale Registrierung aller Mandanten
// ✅ ZERO-DEFECT: Typsichere Registry mit Type-Assertion

import type { TenantConfig, TenantId } from '@/types/config';
import { defaultTenantConfig } from './defaults';
import { medicalTenant } from './tenants/medical';
import { craftsmanTenant } from './tenants/craftsman';
import { kioskTenant } from './tenants/kiosk';

/**
 * Registry aller verfügbaren Tenant-Konfigurationen
 * Neue Mandanten werden HIER registriert – keine weiteren Code-Änderungen nötig
 */
export const tenantConfigs: Record<string, TenantConfig> = {
  default: defaultTenantConfig,
  medical: medicalTenant,
  craftsman: craftsmanTenant,
  kiosk: kioskTenant,
} as const;

/**
 * ✅ FIX: Type-Assertion für Object.keys() Rückgabetyp
 * Object.keys() gibt string[] zurück, aber wir brauchen TenantId[]
 */
export const availableTenantIds: TenantId[] = Object.keys(tenantConfigs) as TenantId[];