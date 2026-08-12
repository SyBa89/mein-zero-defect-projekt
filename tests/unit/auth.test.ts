// tests/unit/auth.test.ts
// ✅ ZERO-DEFECT QA: Unit-Tests für die Security-kritische Auth-Schicht
import { describe, it, expect } from 'vitest';
import {
  createSessionToken,
  verifySessionToken,
  hasPermission,
  hashPassword,
  verifyPassword,
} from '@/lib/auth';

describe('auth: session tokens', () => {
  const user = { id: '1', username: 'admin', role: 'admin' as const, name: 'Hauptadministrator' };

  it('create + verify roundtrip returns same identity', () => {
    const token = createSessionToken(user);
    expect(typeof token).toBe('string');
    const session = verifySessionToken(token);
    expect(session).not.toBeNull();
    expect(session?.id).toBe(user.id);
    expect(session?.username).toBe(user.username);
    expect(session?.role).toBe(user.role);
  });

  it('verify rejects garbage tokens', () => {
    expect(verifySessionToken('not-a-jwt')).toBeNull();
    expect(verifySessionToken('')).toBeNull();
  });

  it('verify rejects tampered tokens', () => {
    const token = createSessionToken(user);
    const tampered = token.slice(0, -2) + (token.endsWith('aa') ? 'bb' : 'aa');
    expect(verifySessionToken(tampered)).toBeNull();
  });
});

describe('auth: role permissions', () => {
  it('admin has all permissions', () => {
    expect(hasPermission('admin', 'anything')).toBe(true);
  });

  it('mitarbeiter has scoped permissions', () => {
    expect(hasPermission('mitarbeiter', 'edit-config')).toBe(true);
    expect(hasPermission('mitarbeiter', 'view-users')).toBe(true);
    expect(hasPermission('mitarbeiter', 'unknown-action')).toBe(false);
  });

  it('redakteur has minimal permissions', () => {
    expect(hasPermission('redakteur', 'edit-jackpot')).toBe(true);
    expect(hasPermission('redakteur', 'view-users')).toBe(false);
  });

  it('unknown role has no permissions', () => {
    expect(hasPermission('ghost', 'edit-config')).toBe(false);
  });
});

describe('auth: password hashing', () => {
  it('hash + verify roundtrip', async () => {
    const hash = await hashPassword('S3cret!Pass');
    expect(hash).not.toBe('S3cret!Pass');
    await expect(verifyPassword('S3cret!Pass', hash)).resolves.toBe(true);
    await expect(verifyPassword('wrong', hash)).resolves.toBe(false);
  });
});