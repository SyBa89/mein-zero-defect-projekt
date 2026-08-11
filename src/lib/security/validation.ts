// src/lib/security/validation.ts
// ZERO-DEFECT: Zod Input-Validation fuer alle API-Inputs (Injection-Schutz)
import { z } from 'zod';

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username: min. 3 Zeichen')
    .max(50, 'Username: max. 50 Zeichen')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username: nur Buchstaben, Zahlen, - und _'),
  password: z.string().min(8, 'Passwort: min. 8 Zeichen').max(100, 'Passwort: max. 100 Zeichen'),
});

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name: min. 2 Zeichen')
    .max(100, 'Name: max. 100 Zeichen')
    .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, 'Name: ungueltige Zeichen'),
  email: z.string().email('Ungueltige E-Mail-Adresse'),
  message: z.string().min(10, 'Nachricht: min. 10 Zeichen').max(2000, 'Nachricht: max. 2000 Zeichen').trim(),
  website: z
    .string()
    .optional()
    .refine(function (val) { return !val; }, { message: 'Spam erkannt' }),
});

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const msg = result.error.issues
    .map(function (e: { path: PropertyKey[]; message: string }) { return e.path.join('.') + ': ' + e.message; })
    .join(', ');
  return { success: false, error: msg };
}

export type LoginInput = z.infer<typeof LoginSchema>;
export type ContactFormInput = z.infer<typeof ContactFormSchema>;