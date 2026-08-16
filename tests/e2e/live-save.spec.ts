import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

// Lese Passwort aus .env.local (kein Shell-Leak, kein Argument noetig)
function loadPassword(): string {
  try {
    const env = readFileSync(join(process.cwd(), '.env.local'), 'utf-8');
    const match = env.match(/^ADMIN_PASSWORD=(.*)$/m) || env.match(/^INTERN_PASSWORD=(.*)$/m);
    return match?.[1]?.trim() || '';
  } catch {
    return '';
  }
}

const mutate = process.env.E2E_MUTATE === 'true';
const adminPw = loadPassword();

test.describe('Live-Save Journey (mutating, self-restoring)', () => {
  test.skip(!mutate, 'Setze E2E_MUTATE=true, um die mutating Journey zu laufen.');
  test.skip(!adminPw, 'ADMIN_PASSWORD in .env.local nicht gefunden.');

  test('Admin loggt ein via UI -> speichert Config -> Hauptseite zeigt Live-Wert -> Restore', async ({ page }) => {
    // 1) UI-basierter Login (echter User-Journey)
    await page.goto('/admin');
    await page.getByLabel(/passwort/i).fill(adminPw);
    await page.getByRole('button', { name: /anmelden|login/i }).click();

    // 2) Warte auf Redirect ins Cockpit
    await expect(page).toHaveURL(/\/admin\/cockpit/, { timeout: 15000 });

    // 3) Baseline via API (selber Cookie-Context)
    const baseRes = await page.request.get('/api/config');
    expect(baseRes.ok()).toBeTruthy();
    const base = await baseRes.json();

    const ts = Date.now();
    const newLabel = (base?.banners?.jackpotLabel || 'Jackpot') + ` [E2E-${ts}]`;

    try {
      // 4) Mutieren via API (teilt Session-Cookie von page)
      const save = await page.request.post('/api/admin/config', {
        data: {
          banners: { ...base.banners, jackpotLabel: newLabel },
          openingHours: base.openingHours,
        },
      });
      expect(save.ok()).toBeTruthy();

      // 5) Hauptseite -> Live-Wert sichtbar (Cache via revalidatePath invalidiert)
      await page.goto('/');
      await expect(page.locator('body')).toContainText(`[E2E-${ts}]`, { timeout: 10000 });
    } finally {
      // 6) Restore: Ausgangszustand zurueckschreiben
      await page.request.post('/api/admin/config', {
        data: { banners: base.banners, openingHours: base.openingHours },
      });
    }
  });
});
