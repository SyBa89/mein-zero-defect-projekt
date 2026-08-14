// playwright.config.ts
// ✅ ZERO-DEFECT: Playwright E2E Configuration (v2 - stabilisiert)
// - reuseExistingServer: false → Playwright startet EIGENEN Server mit CI=true
// - workers: 1 + fullyParallel: false → keine Dev-Kompilations-Konkurrenz
// - timeout: 90s → Puffer für Dev-Kompilierung
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'html',
  timeout: 90000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    env: {
      CI: 'true', // ✅ garantiert: keine echten Email-Sends
    },
    timeout: 120000,
  },
});