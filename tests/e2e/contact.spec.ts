// tests/e2e/contact.spec.ts
// ✅ ZERO-DEFECT: E2E-Test für den kompletten Contact-Flow (v3 - Warmup)
// - v3-Fix: beforeAll-Warmup kompiliert die API-Route einmalig (Dev-Cold-Start)
//   Root-Cause des Flakys: 1. POST wartete >30s auf Dev-Compile
import { test, expect } from '@playwright/test';

test.describe('Contact Flow', () => {
  test.beforeAll(async ({ request }) => {
    // ✅ Warmup: erster GET triggert Dev-Compile von /api/admin/contacts.
    // 401 (Unauthorized) ist ERWARTET und egal - nur der Compile zählt.
    await request.get('/api/admin/contacts');
  });

  test.beforeEach(async ({ page }) => {
    // ✅ Navigiere zur Kontakt-Seite
    await page.goto('/kontakt');
    await expect(page).toHaveTitle(/Kontakt/);
  });

  test('sollte Kontakt-Formular erfolgreich absenden', async ({ page }) => {
    // ✅ Fülle Formular aus mit validen Daten
    await page.fill('input[name="name"]', 'Max Mustermann');
    await page.fill('input[name="email"]', 'max@example.com');
    await page.fill(
      'textarea[name="message"]',
      'Dies ist eine Test-Nachricht für den E2E-Test. Sie hat mehr als 10 Zeichen.'
    );

    // ✅ Honeypot-Feld bleibt leer (Anti-Spam)
    const honeypot = page.locator('input[name="honeypot"]');
    await expect(honeypot).toHaveValue('');

    // ✅ Submit
    await page.click('button[type="submit"]');

    // ✅ Route ist warm → 30s sind jetzt großzügig
    const successMessage = page.locator('text=Nachricht erfolgreich gesendet');
    await expect(successMessage).toBeVisible({ timeout: 30000 });
  });

  test('sollte Validierung bei leerem Namen anzeigen', async ({ page }) => {
    await page.fill('input[name="email"]', 'max@example.com');
    await page.fill('textarea[name="message"]', 'Dies ist eine Test-Nachricht für den E2E-Test.');

    await page.click('button[type="submit"]');

    const nameError = page.locator('text=Bitte geben Sie Ihren Namen ein');
    await expect(nameError).toBeVisible();
  });

  test('sollte Honeypot-Spam erkennen', async ({ page }) => {
    await page.fill('input[name="name"]', 'Spam Bot');
    await page.fill('input[name="email"]', 'bot@spam.com');
    await page.fill('textarea[name="message"]', 'Spam Nachricht für Test-Zwecke hier.');
    await page.fill('input[name="honeypot"]', 'https://spam.com');

    await page.click('button[type="submit"]');

    const spamError = page.locator('text=Spam erkannt');
    await expect(spamError).toBeVisible({ timeout: 30000 });
  });

  test('sollte auf Mobile funktionieren', async ({ page }) => {
    // ✅ Viewport EXPLIZIT auf Mobile setzen → gilt in BEIDEN Projects
    await page.setViewportSize({ width: 412, height: 915 });

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});