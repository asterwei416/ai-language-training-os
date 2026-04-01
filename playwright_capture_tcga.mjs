import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1024 } });

  page.on('console', (msg) => {
    console.log(`[console:${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', (error) => {
    console.log(`[pageerror] ${error.message}`);
  });

  page.on('requestfailed', (request) => {
    console.log(`[requestfailed] ${request.method()} ${request.url()} ${request.failure()?.errorText ?? 'unknown error'}`);
  });

  try {
    const response = await page.goto('https://tcga.twjoin.app/', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });

    console.log(`status=${response?.status() ?? 'no-response'}`);
    await page.waitForTimeout(10000);

    const title = await page.title();
    const bodyTextLength = await page.locator('body').innerText().then((text) => text.length).catch(() => 0);
    const htmlLength = await page.content().then((html) => html.length).catch(() => 0);

    console.log(`title=${title}`);
    console.log(`bodyTextLength=${bodyTextLength}`);
    console.log(`htmlLength=${htmlLength}`);

    await page.screenshot({ path: 'tcga-twjoin-home-diagnostic.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();