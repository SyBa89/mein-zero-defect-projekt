import { test, expect } from '@playwright/test';

test.describe('Admin Panel & Health', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/admin');

    // Prüft exakt den Text, der aktuell in der UI steht
    await expect(page.locator('h1')).toContainText('Mitarbeiter-Login');
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should login with correct password', async ({ page }) => {
    await page.goto('/admin');

    const password = process.env.INTERN_PASSWORD || 'lollipop2024';
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');

    // Warte auf das Cockpit nach erfolgreichem Login
    await expect(page.locator('h1')).toContainText('Admin-Cockpit', { timeout: 10000 });
  });

  test('health check should return ok', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data.services.redis).toBe('connected');
  });
});
