import { z } from 'zod';

// ZERO-DEFECT HARDENING v2: Whitelist-Schema im STRIP-Modus
// - Bekannte Felder: typ-validiert (Sicherheit)
// - Unbekannte Felder: sicher ignoriert, NICHT persistiert
// - nullable: leere/zurueckgesetzte Cockpit-Felder brechen nicht
export const OverrideSchema = z.object({
  openingHours: z.unknown().optional(),
  banners: z.unknown().optional(),
  sections: z.unknown().optional(),
  emergencyMessage: z.string().nullable().optional(),
  isClosed: z.boolean().nullable().optional(),
  updatedAt: z.string().optional(),
});

export type OverrideSchemaType = z.infer<typeof OverrideSchema>;