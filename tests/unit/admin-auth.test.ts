// tests/unit/admin-auth.test.ts
// ✅ REGRESSION-TEST: Sichert den Session-JWT-Auth-Fix (Commit 952ab00)
// Verhindert, dass je wieder ein schwacher Cookie-String-Check eingebaut wird.
import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { createSessionToken } from '@/lib/auth';
import { GET as checklistGet } from '@/app/api/admin/checklist/route';
import { GET as notesGet } from '@/app/api/admin/notes/route';
import { GET as suppliersGet } from '@/app/api/admin/suppliers/route';

function makeRequest(cookie?: string): NextRequest {
  const headers: Record<string, string> = {};
  if (cookie) headers.cookie = cookie;
  return new NextRequest('http://localhost/api/admin/checklist', { headers });
}

const validToken = createSessionToken({
  id: '1',
  username: 'admin',
  role: 'admin',
  name: 'Test Admin',
});

describe('Admin-Auth Regression (Session-JWT)', () => {
  it('checklist: ohne Cookie → 401', async () => {
    const res = await checklistGet(makeRequest());
    expect(res.status).toBe(401);
  });

  it('checklist: manipulierter Token → 401', async () => {
    const res = await checklistGet(makeRequest('session=invalid.token.here'));
    expect(res.status).toBe(401);
  });

  it('checklist: gültiger Token → NICHT 401 (Auth bestanden)', async () => {
    const res = await checklistGet(makeRequest(`session=${validToken}`));
    // Ohne Redis-Konfiguration ist 500 korrekt – wichtig ist: NICHT 401
    expect(res.status).not.toBe(401);
  });

  it('notes: ohne Cookie → 401', async () => {
    const res = await notesGet(makeRequest());
    expect(res.status).toBe(401);
  });

  it('suppliers: ohne Cookie → 401', async () => {
    const res = await suppliersGet(makeRequest());
    expect(res.status).toBe(401);
  });
});