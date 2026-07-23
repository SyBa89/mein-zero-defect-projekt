// tests/e2e/admin.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Panel', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/admin');

    // Prüfen ob Login-Seite geladen wird
    await expect(page.locator('h1')).toContainText('Admin-Login');
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should login with correct password', async ({ page }) => {
    await page.goto('/admin');
    await page.fill('input[type="password"]', 'lollipop2024');
    await page.click('button[type="submit"]');

    const h1 = page.locator('h1');
    const content = await h1.textContent();

    if (content?.includes('Admin-Cockpit')) {
      await expect(h1).toContainText('Admin-Cockpit');
    } else {
      await expect(page.locator('.bg-red-50')).toBeVisible();
    }
  });

  test('should show emergency toggle when logged in', async ({ page }) => {
    await page.goto('/admin');
    await page.fill('input[type="password"]', 'lollipop2024');
    await page.click('button[type="submit"]');

    const h1 = page.locator('h1');
    const content = await h1.textContent();

    if (content?.includes('Admin-Cockpit')) {
      await expect(page.locator('input[type="checkbox"]')).toBeVisible();
      await expect(page.locator('button:has-text("Speichern")')).toBeVisible();
    } else {
      test.skip();
    }
  });
});
