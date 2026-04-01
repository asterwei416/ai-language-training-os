const { chromium } = require('C:/Users/trist/AppData/Roaming/npm/node_modules/playwright');

(async () => {
  const context = await chromium.launchPersistentContext('.playwright-userdata/tcga-admin-session', {
    channel: 'chrome',
    headless: true,
    viewport: { width: 1440, height: 1024 },
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://admin-tcga.twjoin.app/admin/dashboard', {
    waitUntil: 'networkidle',
    timeout: 120000,
  });

  const links = await page.$$eval(
    'aside a, nav a, .sidebar a, .menu a',
    (elements) => elements
      .map((element) => ({
        text: (element.textContent || '').trim().replace(/\s+/g, ' '),
        href: element.href || element.getAttribute('href') || '',
      }))
      .filter((item) => item.text || item.href)
  );

  console.log(JSON.stringify(links, null, 2));
  await context.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});