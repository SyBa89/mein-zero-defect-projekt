// tests/unit/validators.test.ts
import { describe, it, expect } from 'vitest';
import { validateEmail, validatePhone, validateName } from '@/lib/validators';

describe('Validators', () => {
  it('should validate email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });

  it('should validate phone correctly', () => {
    expect(validatePhone('+49 2235 9291160')).toBe(true);
    expect(validatePhone('02235 9291160')).toBe(true);
    expect(validatePhone('123')).toBe(false);
  });

  it('should validate name correctly', () => {
    expect(validateName('Max Mustermann')).toBe(true);
    expect(validateName('A')).toBe(false);
    expect(validateName(''.padStart(101, 'a'))).toBe(false);
  });
});
