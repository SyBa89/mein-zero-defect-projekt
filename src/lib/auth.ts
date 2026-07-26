import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '@/lib/env';
import { NextRequest } from 'next/server';

export interface UserSession {
  id: string;
  username: string;
  role: 'admin' | 'mitarbeiter' | 'redakteur';
  name: string;
}

const JWT_SECRET = process.env.JWT_SECRET || env.ADMIN_PASSWORD + '_' + env.KV_REST_API_TOKEN;
const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSecurePassword(): string {
  const crypto = require('crypto');
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
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
}

export function validateCSRFToken(request: NextRequest): boolean {
  const tokenFromHeader = request.headers.get('x-csrf-token');
  const tokenFromCookie = request.cookies.get('csrf')?.value;
  return tokenFromHeader === tokenFromCookie && !!tokenFromHeader;
}
