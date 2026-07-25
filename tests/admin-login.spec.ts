import { test, expect } from '@playwright/test';

test('Admin Login sollte funktionieren', async ({ page }) => {
  await page.goto('/admin');

  // Prüfe, ob das Login-Formular sichtbar ist
  await expect(page.locator('h1:has-text("Mitarbeiter-Login")')).toBeVisible();

  // Passwort eingeben und absenden
  await page.fill('input[type="password"]', process.env.INTERN_PASSWORD || 'lollipop2024');
  await page.click('button[type="submit"]');

  // Prüfe, ob das Admin-Cockpit erscheint
  await expect(page.locator('h1:has-text("Admin-Cockpit")')).toBeVisible({ timeout: 5000 });
});

test('Health Check sollte OK sein', async ({ page }) => {
  const response = await page.goto('/api/health');
  expect(response?.status()).toBe(200);

  const data = await response?.json();
  expect(data.status).toBe('ok');
});
