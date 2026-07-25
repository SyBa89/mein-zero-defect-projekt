# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> Admin Panel >> should show login page
- Location: tests\e2e\admin.spec.ts:5:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "Admin-Login"
Received string:    "Mitarbeiter-Login"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')
    14 × locator resolved to <h1 class="text-2xl font-black text-gray-900 mb-6 text-center">Mitarbeiter-Login</h1>
       - unexpected value "Mitarbeiter-Login"

```

```yaml
- heading "Mitarbeiter-Login" [level=1]
```

# Test source

```ts
  1  | // tests/e2e/admin.spec.ts
  2  | import { test, expect } from '@playwright/test';
  3  |
  4  | test.describe('Admin Panel', () => {
  5  |   test('should show login page', async ({ page }) => {
  6  |     await page.goto('/admin');
  7  |
  8  |     // Prüfen ob Login-Seite geladen wird
> 9  |     await expect(page.locator('h1')).toContainText('Admin-Login');
     |                                      ^ Error: expect(locator).toContainText(expected) failed
  10 |     await expect(page.locator('input[type="password"]')).toBeVisible();
  11 |     await expect(page.locator('button[type="submit"]')).toBeVisible();
  12 |   });
  13 |
  14 |   test('should login with correct password', async ({ page }) => {
  15 |     await page.goto('/admin');
  16 |     await page.fill('input[type="password"]', 'lollipop2024');
  17 |     await page.click('button[type="submit"]');
  18 |
  19 |     const h1 = page.locator('h1');
  20 |     const content = await h1.textContent();
  21 |
  22 |     if (content?.includes('Admin-Cockpit')) {
  23 |       await expect(h1).toContainText('Admin-Cockpit');
  24 |     } else {
  25 |       await expect(page.locator('.bg-red-50')).toBeVisible();
  26 |     }
  27 |   });
  28 |
  29 |   test('should show emergency toggle when logged in', async ({ page }) => {
  30 |     await page.goto('/admin');
  31 |     await page.fill('input[type="password"]', 'lollipop2024');
  32 |     await page.click('button[type="submit"]');
  33 |
  34 |     const h1 = page.locator('h1');
  35 |     const content = await h1.textContent();
  36 |
  37 |     if (content?.includes('Admin-Cockpit')) {
  38 |       await expect(page.locator('input[type="checkbox"]')).toBeVisible();
  39 |       await expect(page.locator('button:has-text("Speichern")')).toBeVisible();
  40 |     } else {
  41 |       test.skip();
  42 |     }
  43 |   });
  44 | });
  45 |
```
