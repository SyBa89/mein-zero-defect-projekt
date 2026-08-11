// lib/tenant-resolver.ts
// Single Source of Truth for Tenant Resolution & Validation
import { TenantConfigSchema, type TenantConfig } from './schemas/tenant.schema';

// Mock Database (Wird in Phase 4b/5 durch Redis/Upstash oder Prisma ersetzt)
// Die Validierung gegen das Zod-Schema erfolgt DIREKT beim Laden.
// Korrupte Daten führen hier sofort zu einem Crash (Fail-Fast-Prinzip).
const TENANT_DATABASE: Record<string, TenantConfig> = {
  'kiosk-demo': TenantConfigSchema.parse({
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    slug: 'kiosk-demo',
    businessType: 'kiosk',
    branding: {
      primaryColor: '#ec4899', // Pink
      logoUrl: '/logos/kiosk.svg',
    },
    features: {
      hasInventory: true,
      hasAppointments: false,
      hasInvoicing: false,
    },
  }),
  'handwerk-demo': TenantConfigSchema.parse({
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    slug: 'handwerk-demo',
    businessType: 'handwerk',
    branding: {
      primaryColor: '#f59e0b', // Amber
      logoUrl: '/logos/handwerk.svg',
    },
    features: {
      hasInventory: false,
      hasAppointments: true,
      hasInvoicing: true,
    },
  }),
  'arzt-demo': TenantConfigSchema.parse({
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    slug: 'arzt-demo',
    businessType: 'arzt',
    branding: {
      primaryColor: '#3b82f6', // Blue
      logoUrl: '/logos/arzt.svg',
    },
    features: {
      hasInventory: false,
      hasAppointments: true,
      hasInvoicing: false,
    },
  }),
};

/**
 * Holt die validierte Konfiguration anhand des Slugs.
 */
export function getTenantBySlug(slug: string): TenantConfig {
  const config = TENANT_DATABASE[slug];
  if (!config) {
    throw new Error('[TenantResolver] Unknown tenant slug: ' + slug);
  }
  // Re-Validation für maximale Runtime-Safety
  return TenantConfigSchema.parse(config);
}

/**
 * Domain-Resolver für lokales Testing und Vercel Preview Deployments.
 */
export function getTenantByDomain(domain: string): TenantConfig {
  if (domain.includes('kiosk')) return getTenantBySlug('kiosk-demo');
  if (domain.includes('handwerk') || domain.includes('craft')) return getTenantBySlug('handwerk-demo');
  if (domain.includes('arzt') || domain.includes('medical')) return getTenantBySlug('arzt-demo');
  
  // Fallback für Localhost / Unbekannte Domains
  console.warn('[TenantResolver] Unknown domain "' + domain + '", falling back to kiosk-demo.');
  return getTenantBySlug('kiosk-demo');
}