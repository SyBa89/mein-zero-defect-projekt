import { describe, it, expect } from 'vitest';
import { safeString, safeBoolean, safeNumber, getErrorMessage, isValidEmail } from '@/lib/utils';

describe('Utils Tests', () => {
  it('safeString should return string or empty', () => {
    expect(safeString('test')).toBe('test');
    expect(safeString(123)).toBe('123');
    expect(safeString(null)).toBe('');
    expect(safeString(undefined)).toBe('');
  });

  it('safeBoolean should return boolean or false', () => {
    expect(safeBoolean(true)).toBe(true);
    expect(safeBoolean(false)).toBe(false);
    expect(safeBoolean(null)).toBe(false);
    expect(safeBoolean('true')).toBe(false);
  });

  it('safeNumber should return number or 0', () => {
    expect(safeNumber(42)).toBe(42);
    expect(safeNumber('42')).toBe(42);
    expect(safeNumber(null)).toBe(0);
    expect(safeNumber(undefined)).toBe(0);
  });

  it('getErrorMessage should return string', () => {
    expect(getErrorMessage(new Error('test'))).toBe('test');
    expect(getErrorMessage('string error')).toBe('string error');
    expect(getErrorMessage(null)).toBe('Unbekannter Fehler');
  });

  it('isValidEmail should validate email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
  });
});
