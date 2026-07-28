import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '@/lib/env';
import { NextRequest } from 'next/server';

export interface UserSession {
  id: string;
  username: string;
  role: 'admin' | 'mitarbeiter' | 'redakteur';
  name: string;
}

// ✅ ÜBER-PLATIN: JWT_SECRET mit Fallback für Development
function getJwtSecret(): string {
  // 1. Explizite Umgebungsvariable hat höchste Priorität
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  // 2. Production ohne JWT_SECRET = kritischer Fehler
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      '❌ KRITISCH: JWT_SECRET fehlt in Production. ' +
        'Bitte in Vercel Dashboard → Environment Variables setzen.'
    );
  }

  // 3. Development: Fallback aus Admin-Passwort + Redis-Token
  const token = env.KV_REST_API_TOKEN || 'dev-fallback-token';
  return env.ADMIN_PASSWORD + '_' + token;
}

const JWT_SECRET = getJwtSecret();
const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSecurePassword(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function createSessionToken(user: UserSession): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
}

export function verifySessionToken(token: string): UserSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserSession;
  } catch {
    return null;
  }
}

export function hasPermission(userRole: string, requiredPermission: string): boolean {
  const permissions: Record<string, string[]> = {
    admin: ['all'],
    mitarbeiter: ['edit-config', 'view-users', 'edit-jackpot', 'edit-highlight'],
    redakteur: ['edit-jackpot', 'edit-highlight'],
  };

  const userPermissions = permissions[userRole] || [];
  return userPermissions.includes('all') || userPermissions.includes(requiredPermission);
}

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function validateCSRFToken(request: NextRequest): boolean {
  const tokenFromHeader = request.headers.get('x-csrf-token');
  const tokenFromCookie = request.cookies.get('csrf')?.value;
  return tokenFromHeader === tokenFromCookie && !!tokenFromHeader;
}
