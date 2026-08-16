import { test, expect } from '@playwright/test';

test.describe('Public Smoke (read-only)', () => {
  test('Startseite rendert Hero + Marke', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Kiosk Lollipop');
  });

  test('Kontaktseite rendert Formular', async ({ page }) => {
    await page.goto('/kontakt');
    await expect(page.getByRole('textbox').first()).toBeVisible();
  });

  test('Impressum rendert', async ({ page }) => {
    await page.goto('/impressum');
    await expect(page.locator('body')).toContainText('Angaben');
  });
});
