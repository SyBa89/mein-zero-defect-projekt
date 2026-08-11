import { z } from 'zod';

// ZERO-DEFECT: Robuste Schemas statt fragiler Regex-Strings
export const EmailSchema = z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.').trim();
export const validateEmail = (email: string): boolean => EmailSchema.safeParse(email).success;

// E.164 Standard + lokale Formate. Entfernt Leerzeichen und Klammern vor der Prüfung.
export const PhoneSchema = z.string()
  .transform((val) => val.replace(/[\s\-().]/g, ''))
  .pipe(z.string().regex(/^\+?\d{10,15}$/, 'Bitte geben Sie eine gültige Telefonnummer ein.'));
export const validatePhone = (phone: string): boolean => PhoneSchema.safeParse(phone).success;

export const NameSchema = z.string().trim().min(2, 'Name ist zu kurz').max(100, 'Name ist zu lang');
export const validateName = (name: string): boolean => NameSchema.safeParse(name).success;

// Export für React Hook Form / Zod Resolver
export const Schemas = {
  email: EmailSchema,
  phone: PhoneSchema,
  name: NameSchema,
};