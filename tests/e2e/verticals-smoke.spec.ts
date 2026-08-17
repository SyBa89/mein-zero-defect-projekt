import { test, expect } from '@playwright/test';

const routes = ['/handwerker', '/arzt', '/friseur', '/restaurant'];

test.describe('Vertical smoke (non-mutating)', () => {
  for (const route of routes) {
    test(`${route} renders without runtime error`, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      const res = await page.goto(route);
      expect(res).toBeTruthy();
      expect(res!.status()).toBeLessThan(500);
      await expect(page.locator('body')).not.toHaveText(/Application error|Internal Server Error/i);
      expect(pageErrors).toEqual([]);
    });
  }
});