// src/lib/api/csrf.ts
import { randomBytes } from 'crypto';

export function _generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

export function verifyCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken;
}
