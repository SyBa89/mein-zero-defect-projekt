import { z } from 'zod';

// ZERO-DEFECT HARDENING v2: Whitelist-Schema im STRIP-Modus
// - Bekannte Felder: typ-validiert (Sicherheit)
// - Unbekannte Felder: sicher ignoriert, NICHT persistiert
// - nullable: leere/zurueckgesetzte Cockpit-Felder brechen nicht

const ThemeOverrideSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be valid HEX').optional(),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be valid HEX').optional(),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be valid HEX').optional(),
  borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'full']).optional(),
  fontHeading: z.enum(['poppins', 'montserrat', 'roboto', 'lora', 'inter', 'source-sans']).optional(),
  fontBody: z.enum(['inter', 'source-sans', 'roboto', 'lora']).optional(),
}).optional();

export const OverrideSchema = z.object({
  openingHours: z.unknown().optional(),
  banners: z.unknown().optional(),
  sections: z.unknown().optional(),
  emergencyMessage: z.string().nullable().optional(),
  isClosed: z.boolean().nullable().optional(),
  theme: ThemeOverrideSchema, // ✅ NEU: Runtime Theme Overrides (Ebene 3)
  updatedAt: z.string().optional(),
});

export type OverrideSchemaType = z.infer<typeof OverrideSchema>;