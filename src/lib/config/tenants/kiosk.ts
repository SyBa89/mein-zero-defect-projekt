// src/lib/config/tenants/kiosk.ts
// ✅ ZERO-DEFECT: Single Source of Truth = configs/kiosk.json
// ✅ WHITE-LABEL: JSON wird zur Build-Time gebündelt (kein fs, client-sicher)
// ✅ FALLBACK: defaults.ts garantiert Vollständigkeit aller Pflichtfelder
import type { TenantConfig } from '@/types/config';
import { defaultTenantConfig } from '../defaults';
import kioskJson from '../../../../configs/kiosk.json';

/**
 * Kiosk-Tenant (Kiosk Lollipop, Erftstadt-Liblar)
 *
 * @whiteLabel
 * Datenquelle ist ausschließlich configs/kiosk.json.
 * Änderungen an Marken-Daten NUR in der JSON-Datei vornehmen.
 */
export const kioskTenant: TenantConfig = {
  ...defaultTenantConfig,
  ...(kioskJson as unknown as Partial<TenantConfig>),
  tenantId: 'kiosk',
} as TenantConfig;