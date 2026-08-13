// tests/unit/validation.test.ts
// ZERO-DEFECT: Tests fuer Zod Validation Schemas
// Environment: node (default, keine Config-Aenderung noetig)
import { describe, it, expect } from 'vitest';
import {
  LoginSchema,
  ContactFormSchema,
  validateInput,
  safeValidate,
} from '@/lib/security/validation';

describe('LoginSchema', () => {
  it('akzeptiert validen Input', () => {
    const result = LoginSchema.safeParse({
      username: 'admin',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('lehnt Username < 3 Zeichen ab', () => {
    const result = LoginSchema.safeParse({ username: 'ab', password: 'password123' });
    expect(result.success).toBe(false);
  });

  it('lehnt Username > 50 Zeichen ab', () => {
    const result = LoginSchema.safeParse({ username: 'a'.repeat(51), password: 'password123' });
    expect(result.success).toBe(false);
  });

  it('lehnt Username mit Sonderzeichen ab', () => {
    const result = LoginSchema.safeParse({ username: 'user@name!', password: 'password123' });
    expect(result.success).toBe(false);
  });

  it('lehnt Password < 8 Zeichen ab', () => {
    const result = LoginSchema.safeParse({ username: 'admin', password: 'short' });
    expect(result.success).toBe(false);
  });

  it('lehnt Password > 100 Zeichen ab', () => {
    const result = LoginSchema.safeParse({ username: 'admin', password: 'a'.repeat(101) });
    expect(result.success).toBe(false);
  });
});

describe('ContactFormSchema', () => {
  const validInput = {
    name: 'Max Mustermann',
    email: 'max@example.com',
    message: 'Dies ist eine Test-Nachricht mit mehr als 10 Zeichen.',
  };

  it('akzeptiert validen Input', () => {
    const result = ContactFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('akzeptiert deutsche Umlaute im Namen', () => {
    const result = ContactFormSchema.safeParse({ ...validInput, name: 'Jürgen Müller' });
    expect(result.success).toBe(true);
  });

  it('lehnt Name < 2 Zeichen ab', () => {
    const result = ContactFormSchema.safeParse({ ...validInput, name: 'A' });
    expect(result.success).toBe(false);
  });

  it('lehnt Name mit Zahlen ab', () => {
    const result = ContactFormSchema.safeParse({ ...validInput, name: 'Max123' });
    expect(result.success).toBe(false);
  });

  it('lehnt ungueltige E-Mail ab', () => {
    const result = ContactFormSchema.safeParse({ ...validInput, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('lehnt Message < 10 Zeichen ab', () => {
    const result = ContactFormSchema.safeParse({ ...validInput, message: 'Kurz' });
    expect(result.success).toBe(false);
  });

  it('trimmt Message Whitespace', () => {
    const result = ContactFormSchema.safeParse({ ...validInput, message: '   Test Message hier   ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).toBe('Test Message hier');
    }
  });

  it('HONEYPOT: lehnt ausgefuelltes website-Feld ab (Spam)', () => {
    const result = ContactFormSchema.safeParse({ ...validInput, website: 'https://spam.com' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(messages).toContain('Spam erkannt');
    }
  });

  it('akzeptiert fehlendes website-Feld (optional)', () => {
    const result = ContactFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });
});

describe('validateInput', () => {
  it('gibt geparste Daten zurueck bei validem Input', () => {
    const data = { username: 'admin', password: 'password123' };
    const result = validateInput(LoginSchema, data);
    expect(result).toEqual(data);
  });

  it('wirft Error bei invalidem Input', () => {
    expect(() => {
      validateInput(LoginSchema, { username: 'a', password: 'x' });
    }).toThrow();
  });
});

describe('safeValidate', () => {
  it('gibt success + data zurueck bei validem Input', () => {
    const data = { username: 'admin', password: 'password123' };
    const result = safeValidate(LoginSchema, data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(data);
    }
  });

  it('gibt success=false + error zurueck bei invalidem Input', () => {
    const result = safeValidate(LoginSchema, { username: 'a', password: 'x' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain('username');
    }
  });
});