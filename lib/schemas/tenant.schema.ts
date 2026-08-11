// lib/schemas/tenant.schema.ts (Die Single Source of Truth)
import { z } from 'zod';

export const BusinessTypeSchema = z.enum(['kiosk', 'handwerk', 'arzt']);

export const TenantConfigSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(3),
  businessType: BusinessTypeSchema,
  branding: z.object({
    primaryColor: z.string(),
    logoUrl: z.string().url().optional(),
  }),
  features: z.object({
    hasInventory: z.boolean(), // Kiosk
    hasAppointments: z.boolean(), // Arzt / Handwerk
    hasInvoicing: z.boolean(), // Handwerk
  }),
});

export type TenantConfig = z.infer<typeof TenantConfigSchema>;