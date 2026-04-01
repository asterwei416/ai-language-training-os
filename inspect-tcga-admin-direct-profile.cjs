const { chromium } = require('C:/Users/trist/AppData/Roaming/npm/node_modules/playwright');

(async () => {
  const context = await chromium.launchPersistentContext('.playwright-userdata/tcga-admin-session', {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1440, height: 1024 },
    args: ['--profile-directory=Default'],
  });

  try {
    const page = context.pages()[0] || await context.newPage();
    await page.goto('https://admin-tcga.twjoin.app/admin/dashboard', {
      waitUntil: 'domcontentloaded',
      timeout: 120000,
    });
    await page.waitForTimeout(5000);

    const data = await page.evaluate(() => {
      const sidebar = document.querySelector('aside') || document.body;
      const menuElements = Array.from(sidebar.querySelectorAll('a, button, [role="button"], li, div, span'))
        .map((node) => ({
          tag: node.tagName.toLowerCase(),
          text: (node.textContent || '').replace(/\s+/g, ' ').trim(),
          href: node.href || node.getAttribute?.('href') || '',
          className: typeof node.className === 'string' ? node.className : '',
        }))
        .filter((item) => item.text)
        .slice(0, 100);

      const links = Array.from(document.querySelectorAll('a[href]'))
        .map((node) => ({
          text: (node.textContent || '').replace(/\s+/g, ' ').trim(),
          href: node.href || '',
        }))
        .filter((item) => item.href.includes('/admin/'));

      return {
        url: location.href,
        title: document.title,
        bodyText: (document.body?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 400),
        menuElements,
        links,
      };
    });

    console.log(JSON.stringify(data, null, 2));
  } finally {
    await context.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});