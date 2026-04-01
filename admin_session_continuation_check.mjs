import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { chromium } from 'playwright';

const workspaceRoot = process.cwd();
const artifactDir = path.join(workspaceRoot, 'smoke-artifacts-20260401-session-check');
fs.mkdirSync(artifactDir, { recursive: true });

const dashboardUrl = 'https://admin-tcga.twjoin.app/admin/dashboard';
const candidates = [
  {
    id: 'chrome-default',
    channel: 'chrome',
    browserName: 'Chrome',
    srcRoot: path.join(os.homedir(), 'AppData', 'Local', 'Google', 'Chrome', 'User Data'),
    profileDir: 'Default',
  },
  {
    id: 'edge-profile-1',
    channel: 'msedge',
    browserName: 'Edge',
    srcRoot: path.join(os.homedir(), 'AppData', 'Local', 'Microsoft', 'Edge', 'User Data'),
    profileDir: 'Profile 1',
  },
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
  'VideoDecodeStats',
  'OptimizationHints',
  'AutofillAiModelCache',
  'EdgeEDrop',
]);

const denyPathParts = [
  `${path.sep}Service Worker${path.sep}CacheStorage`,
  `${path.sep}Code Cache${path.sep}`,
  `${path.sep}Cache${path.sep}`,
  `${path.sep}GPUCache${path.sep}`,
  `${path.sep}blob_storage${path.sep}`,
];

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (skipDirNames.has(path.basename(src))) {
      return;
    }
    if (denyPathParts.some((part) => src.includes(part))) {
      return;
    }
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      copyRecursive(path.join(src, entry.name), path.join(dest, entry.name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function buildTempUserData(candidate) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), `tcga-${candidate.id}-`));
  const localState = path.join(candidate.srcRoot, 'Local State');
  const profileSrc = path.join(candidate.srcRoot, candidate.profileDir);
  if (fs.existsSync(localState)) {
    fs.copyFileSync(localState, path.join(tempRoot, 'Local State'));
  }
  copyRecursive(profileSrc, path.join(tempRoot, candidate.profileDir));
  return tempRoot;
}

function truncate(text, max = 280) {
  if (!text) {
    return '';
  }
  const normalized = text.replace(/\s+/g, ' ').trim();
  return normalized.length <= max ? normalized : `${normalized.slice(0, max)}...`;
}

async function collectNavLinks(page) {
  return page.evaluate(() => {
    const badWords = ['新增', '建立', 'create', 'new', 'add', 'delete', '刪除', '編輯'];
    const nodes = Array.from(document.querySelectorAll('a[href]'));
    return nodes
      .map((node) => {
        const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
        const href = node.href || '';
        const rect = node.getBoundingClientRect();
        const visible = rect.width > 0 && rect.height > 0;
        return { text, href, visible };
      })
      .filter((item) => item.visible && item.text && item.href && item.href.startsWith('http'))
      .filter((item) => item.href.includes('/admin/'))
      .filter((item) => !item.href.includes('/login'))
      .filter((item) => !item.href.endsWith('/dashboard'))
      .filter((item) => !badWords.some((word) => item.text.toLowerCase().includes(word.toLowerCase()) || item.href.toLowerCase().includes(word.toLowerCase())));
  });
}

function chooseManagementLink(links) {
  const preferredPatterns = [
    /list|列表|管理|使用者|會員|文章|課程|訂單|報名|活動|公告|news|course|order|user/i,
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
  for (const pattern of preferredPatterns) {
    const found = unique.find((link) => pattern.test(link.text) || pattern.test(link.href));
    if (found) {
      return found;
    }
  }
  return unique[0] || null;
}

async function detectDashboard(page) {
  const bodyText = truncate(await page.locator('body').innerText().catch(() => ''));
  const title = await page.title().catch(() => '');
  const url = page.url();
  const signals = await page.evaluate(() => {
    const text = (document.body?.innerText || '').replace(/\s+/g, ' ').trim();
    const selectors = [
      'aside',
      'nav',
      '[role="navigation"]',
      '[class*="sidebar"]',
      '[class*="menu"]',
      '[class*="card"]',
      'main',
    ];
    const hits = selectors.filter((selector) => document.querySelector(selector));
    const keywords = ['Dashboard', '儀表板', '管理', '統計', '會員', '課程', '訂單', '文章'];
    const keywordHits = keywords.filter((keyword) => text.includes(keyword));
    return { hits, keywordHits };
  });
  const isLoginPage = /\/admin\/login/i.test(url) || /帳號|密碼|驗證碼|登入/.test(bodyText);
  const looksLikeDashboard = !isLoginPage && (/\/admin\/dashboard/i.test(url) || signals.hits.length >= 3 || signals.keywordHits.length >= 2);
  return { url, title, bodyText, signals, isLoginPage, looksLikeDashboard };
}

async function detectManagementPage(page) {
  const url = page.url();
  const title = await page.title().catch(() => '');
  const bodyText = truncate(await page.locator('body').innerText().catch(() => ''));
  const ui = await page.evaluate(() => {
    const hasTable = !!document.querySelector('table, [role="table"], .table');
    const rowCount = document.querySelectorAll('tbody tr, [role="row"], table tr').length;
    const listCount = document.querySelectorAll('ul li, ol li, [role="listitem"]').length;
    const filterCount = document.querySelectorAll('input, select, button').length;
    const text = (document.body?.innerText || '').replace(/\s+/g, ' ').trim();
    const errorKeywords = ['403', '404', '500', 'Error', '錯誤', 'Forbidden', 'Not Found'];
    const errorHits = errorKeywords.filter((keyword) => text.includes(keyword));
    return { hasTable, rowCount, listCount, filterCount, errorHits };
  });
  const valid = !/\/admin\/login/i.test(url) && ui.errorHits.length === 0 && (ui.hasTable || ui.rowCount >= 2 || ui.listCount >= 5 || ui.filterCount >= 3);
  return { url, title, bodyText, ui, valid };
}

async function runCandidate(candidate) {
  const result = {
    candidate: candidate.id,
    browserName: candidate.browserName,
    profileDir: candidate.profileDir,
    dashboard: null,
    managementPage: null,
    consoleMessages: [],
    pageErrors: [],
    requestFailures: [],
    responseErrors: [],
    copiedProfile: null,
    error: null,
  };

  let tempUserDataDir;
  let context;
  try {
    tempUserDataDir = buildTempUserData(candidate);
    result.copiedProfile = tempUserDataDir;

    context = await chromium.launchPersistentContext(tempUserDataDir, {
      channel: candidate.channel,
      headless: true,
      viewport: { width: 1440, height: 1024 },
      args: [`--profile-directory=${candidate.profileDir}`],
    });

    const page = context.pages()[0] || await context.newPage();

    page.on('console', (msg) => {
      const text = `[${msg.type()}] ${msg.text()}`;
      if (result.consoleMessages.length < 20) {
        result.consoleMessages.push(text);
      }
    });
    page.on('pageerror', (error) => {
      if (result.pageErrors.length < 20) {
        result.pageErrors.push(error.message);
      }
    });
    page.on('requestfailed', (request) => {
      if (result.requestFailures.length < 20) {
        result.requestFailures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText || 'unknown error'}`);
      }
    });
    page.on('response', (response) => {
      const status = response.status();
      if (status >= 400 && result.responseErrors.length < 20) {
        result.responseErrors.push(`${status} ${response.request().method()} ${response.url()}`);
      }
    });

    await page.goto(dashboardUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(8000);

    result.dashboard = await detectDashboard(page);
    result.dashboard.screenshot = path.join(artifactDir, `${candidate.id}-dashboard.png`);
    await page.screenshot({ path: result.dashboard.screenshot, fullPage: true });

    if (!result.dashboard.looksLikeDashboard) {
      return result;
    }

    const links = await collectNavLinks(page);
    result.dashboard.navLinks = links.slice(0, 20);
    const target = chooseManagementLink(links);
    if (!target) {
      return result;
    }

    const pagePromise = page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => null);
    await page.goto(target.href, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await pagePromise;
    await page.waitForTimeout(6000);

    result.managementPage = await detectManagementPage(page);
    result.managementPage.label = target.text;
    result.managementPage.targetHref = target.href;
    result.managementPage.screenshot = path.join(artifactDir, `${candidate.id}-management-page.png`);
    await page.screenshot({ path: result.managementPage.screenshot, fullPage: true });

    return result;
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
    return result;
  } finally {
    if (context) {
      await context.close().catch(() => {});
    }
  }
}

const summary = {
  startedAt: new Date().toISOString(),
  dashboardUrl,
  candidates: [],
};

for (const candidate of candidates) {
  const outcome = await runCandidate(candidate);
  summary.candidates.push(outcome);
  if (outcome.dashboard?.looksLikeDashboard) {
    break;
  }
}

const success = summary.candidates.find((item) => item.dashboard?.looksLikeDashboard);
summary.selected = success?.candidate || null;
summary.finishedAt = new Date().toISOString();
summary.artifactDir = artifactDir;

const summaryPath = path.join(artifactDir, 'admin-session-continuation-result.json');
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ summaryPath, selected: summary.selected, artifactDir }, null, 2));
