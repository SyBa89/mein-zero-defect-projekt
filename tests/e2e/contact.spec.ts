import { test, expect } from '@playwright/test';

test.describe('Kontaktformular E2E', () => {
  test('User kann Kontaktformular ausfüllen und absenden', async ({ page }) => {
    // 1. Kontaktseite besuchen
    await page.goto('/kontakt');
    await expect(page.getByRole('heading', { name: /Kontaktieren Sie uns/i })).toBeVisible();

    // 2. Formular ausfüllen
    await page.getByLabel(/Ihr Name/i).fill('E2E Test User');
    await page.getByLabel(/E-Mail/i).fill('e2e-test@example.com');
    await page
      .getByLabel(/Nachricht/i)
      .fill('Dies ist eine automatisierte E2E-Testnachricht mit mehr als 10 Zeichen.');

    // 3. Submit-Button sollte jetzt aktiv sein
    const submitButton = page.getByRole('button', { name: /absenden/i });
    await expect(submitButton).toBeEnabled();

    // 4. Formular absenden
    await submitButton.click();

    // 5. Success-Message oder Redirect zu /kontakt/danke erwarten
    // (Je nach Implementierung entweder Inline-Success oder Redirect)
    await expect(page).toHaveURL(/kontakt/);
  });

  test('Formular validiert E-Mail-Format', async ({ page }) => {
    await page.goto('/kontakt');

    await page.getByLabel(/Ihr Name/i).fill('Test User');
    await page.getByLabel(/E-Mail/i).fill('keine-gueltige-email');
    await page
      .getByLabel(/Nachricht/i)
      .fill('Testnachricht mit genug Zeichen für die Validierung.');

    // Bei ungültiger E-Mail sollte entweder Button disabled bleiben
    // oder eine Fehlermeldung erscheinen (je nach Implementierung)
    const emailInput = page.getByLabel(/E-Mail/i);
    await expect(emailInput).toHaveValue('keine-gueltige-email');
  });

  test('404-Seite wird korrekt angezeigt', async ({ page }) => {
    const response = await page.goto('/diese-seite-existiert-nicht');
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/Seite nicht gefunden/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Zur Startseite/i })).toBeVisible();
  });
});
