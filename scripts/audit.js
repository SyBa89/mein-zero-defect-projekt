// scripts/audit.js
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';
import fs from 'fs';

const URL = process.env.AUDIT_URL || 'https://mein-zero-defect-projekt.vercel.app';

async function runAudit() {
  console.log(`🔍 Starte Lighthouse-Audit für ${URL}...`);
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });
  
  const { lhr } = await lighthouse(page.url(), {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  
  const results = {
    url: URL,
    timestamp: new Date().toISOString(),
    scores: {
      performance: lhr.categories.performance.score * 100,
      accessibility: lhr.categories.accessibility.score * 100,
      'best-practices': lhr.categories['best-practices'].score * 100,
      seo: lhr.categories.seo.score * 100,
    },
  };
  
  fs.writeFileSync('lighthouse-report.json', JSON.stringify(results, null, 2));
  console.log('📊 Ergebnisse:');
  console.log(`  Performance: ${results.scores.performance}%`);
  console.log(`  Accessibility: ${results.scores.accessibility}%`);
  console.log(`  Best Practices: ${results.scores['best-practices']}%`);
  console.log(`  SEO: ${results.scores.seo}%`);
  console.log('✅ Bericht gespeichert: lighthouse-report.json');
  await browser.close();
}

runAudit().catch(console.error);