// tests/e2e/admin.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Panel', () => {
  test('should login and toggle emergency mode', async ({ page }) => {
    await page.goto('/admin');
    await page.fill('input[type="password"]', 'lollipop2024');
    await page.click('button[type="submit"]');
    await expect(page.locator('h1')).toContainText('Admin-Cockpit');
    
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.check();
    await page.click('button:has-text("Speichern")');
    await page.goto('/');
    await expect(page.locator('.bg-red-600')).toBeVisible();
  });
});