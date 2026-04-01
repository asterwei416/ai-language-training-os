const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require('C:/Users/trist/AppData/Roaming/npm/node_modules/playwright');

const workspaceRoot = process.cwd();
const artifactDir = path.join(workspaceRoot, 'smoke-artifacts-20260401-followup');
fs.mkdirSync(artifactDir, { recursive: true });

const sourceUserDataDir = path.join(workspaceRoot, '.playwright-userdata', 'tcga-admin-session');
const dashboardUrl = 'https://admin-tcga.twjoin.app/admin/dashboard';
const menuLabels = [
  '會員管理',
  '消息管理',
  '課程/活動管理',
  '內容管理',
  '帳號管理',
  '協會管理',
  '出版管理',
  '到府課程管理',
  '評量管理',
  '系統設定',
];

const skipDirNames = new Set([
  'Cache',
  'Code Cache',
  'GPUCache',
  'DawnGraphiteCache',
  'DawnWebGPUCache',
  'ShaderCache',
  'GrShaderCache',
  'Crashpad',
  'Crash Reports',
  'blob_storage',
  'BrowserMetrics',
  'component_crx_cache',
  'extensions_crx_cache',
  'Safe Browsing',
  'segmentation_platform',
]);

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (skipDirNames.has(path.basename(src))) {
      return;
    }
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      copyRecursive(path.join(src, entry.name), path.join(dest, entry.name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    fs.copyFileSync(src, dest);
  } catch {
    // Ignore transient locked files.
  }
}

function buildTempUserData() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tcga-followup-'));
  copyRecursive(sourceUserDataDir, tempRoot);
  try {
    fs.rmSync(path.join(tempRoot, 'lockfile'), { force: true });
  } catch {
    // no-op
  }
  return tempRoot;
}

function truncate(text, max = 280) {
  if (!text) {
    return '';
  }
  const normalized = text.replace(/\s+/g, ' ').trim();
  return normalized.length <= max ? normalized : `${normalized.slice(0, max)}...`;
}

async function collectVisibleAdminLinks(page) {
  return page.evaluate(() => {
    const blocked = ['新增', '建立', 'create', 'new', 'add', 'delete', '刪除', '編輯'];
    return Array.from(document.querySelectorAll('a[href]'))
      .map((node) => {
        const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
        const href = node.href || '';
        const style = window.getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        const visible = style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
        return { text, href, visible };
      })
      .filter((item) => item.visible && item.href.startsWith('http'))
      .filter((item) => item.href.includes('/admin/'))
      .filter((item) => !item.href.includes('/login'))
      .filter((item) => !item.href.endsWith('/dashboard'))
      .filter((item) => !blocked.some((word) => item.text.toLowerCase().includes(word.toLowerCase()) || item.href.toLowerCase().includes(word.toLowerCase())));
  });
}

async function collectSidebarElements(page) {
  return page.evaluate(() => {
    const aside = document.querySelector('aside') || document.querySelector('[class*="sidebar"]') || document.body;
    return Array.from(aside.querySelectorAll('a, button, [role="button"], li, div, span'))
      .map((node) => {
        const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
        const href = node.href || node.getAttribute?.('href') || '';
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        const visible = style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
        return {
          tag: node.tagName.toLowerCase(),
          text,
          href,
          className: typeof node.className === 'string' ? node.className : '',
          visible,
        };
      })
      .filter((item) => item.visible && item.text)
      .slice(0, 80);
  });
}

function chooseBestLink(links) {
  const patterns = [
    /list|列表|會員|消息|課程|活動|內容|帳號|評量|管理|news|member|course|content|account/i,
    /admin\//i,
  ];
  const unique = [];
  const seen = new Set();
  for (const link of links) {
    const key = `${link.text}::${link.href}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(link);
    }
  }
  for (const pattern of patterns) {
    const match = unique.find((link) => pattern.test(link.text) || pattern.test(link.href));
    if (match) {
      return match;
    }
  }
  return unique[0] || null;
}

async function detectManagementPage(page) {
  const url = page.url();
  const title = await page.title().catch(() => '');
  const bodyText = truncate(await page.locator('body').innerText().catch(() => ''));
  const ui = await page.evaluate(() => {
    const hasTable = !!document.querySelector('table, [role="table"], .table');
    const rowCount = document.querySelectorAll('tbody tr, table tr, [role="row"]').length;
    const listCount = document.querySelectorAll('ul li, ol li, [role="listitem"]').length;
    const inputCount = document.querySelectorAll('input, select, button').length;
    const text = (document.body?.innerText || '').replace(/\s+/g, ' ').trim();
    const errors = ['403', '404', '500', 'Error', '錯誤', 'Forbidden', 'Not Found'].filter((keyword) => text.includes(keyword));
    return { hasTable, rowCount, listCount, inputCount, errors };
  });
  return {
    url,
    title,
    bodyText,
    ui,
    valid: !/\/admin\/login/i.test(url) && ui.errors.length === 0 && (ui.hasTable || ui.rowCount >= 2 || ui.listCount >= 5 || ui.inputCount >= 3),
  };
}

async function openFirstManagementPage(page) {
  for (const label of menuLabels) {
    const item = page.locator('aside').getByText(label).first();
    if (await item.count().catch(() => 0) === 0) {
      continue;
    }

    const beforeUrl = page.url();
    await item.click({ timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2500);

    if (page.url() !== beforeUrl && !page.url().endsWith('/dashboard')) {
      return { label, href: page.url(), via: 'direct' };
    }

    const links = await collectVisibleAdminLinks(page);
    const target = chooseBestLink(links);
    if (target) {
      await page.goto(target.href, { waitUntil: 'domcontentloaded', timeout: 120000 });
      await page.waitForTimeout(4000);
      return { label, href: target.href, via: 'submenu', linkText: target.text };
    }
  }

  return null;
}

(async () => {
  if (!fs.existsSync(sourceUserDataDir)) {
    throw new Error(`Missing source user data dir: ${sourceUserDataDir}`);
  }

  const tempUserDataDir = buildTempUserData();
  const summary = {
    dashboardUrl,
    sourceUserDataDir,
    tempUserDataDir,
    dashboardScreenshot: path.join(artifactDir, 'admin-dashboard-followup.png'),
    managementScreenshot: path.join(artifactDir, 'admin-first-management-page.png'),
    target: null,
    managementPage: null,
    sidebarElements: [],
    consoleMessages: [],
    pageErrors: [],
    requestFailures: [],
  };

  const context = await chromium.launchPersistentContext(tempUserDataDir, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1440, height: 1024 },
    args: ['--profile-directory=Default'],
  });

  try {
    const page = context.pages()[0] || await context.newPage();

    page.on('console', (msg) => {
      if (summary.consoleMessages.length < 20) {
        summary.consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
      }
    });
    page.on('pageerror', (error) => {
      if (summary.pageErrors.length < 20) {
        summary.pageErrors.push(error.message);
      }
    });
    page.on('requestfailed', (request) => {
      if (summary.requestFailures.length < 20) {
        summary.requestFailures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText || 'unknown error'}`);
      }
    });

    await page.goto(dashboardUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(6000);
    summary.sidebarElements = await collectSidebarElements(page);
    await page.screenshot({ path: summary.dashboardScreenshot, fullPage: true });

    const target = await openFirstManagementPage(page);
    summary.target = target;

    if (target) {
      summary.managementPage = await detectManagementPage(page);
      await page.screenshot({ path: summary.managementScreenshot, fullPage: true });
    }

    const summaryPath = path.join(artifactDir, 'admin-first-management-page.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(JSON.stringify({ summaryPath, ...summary }, null, 2));
  } finally {
    await context.close().catch(() => {});
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});