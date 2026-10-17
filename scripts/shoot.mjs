// Drives the site in real Chrome and saves screenshots, for checking a build by eye.
//
//   node scripts/shoot.mjs <outDir> [url=http://127.0.0.1:4317/] [--mobile] [--only name,name]
//
// Each shot is defined below as { name, y (scroll position in viewport heights or a selector), pointer, click }.
// Console errors and failed requests are printed at the end; the exit code is 1 if there were any.

import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const outDir = args[0];
if (!outDir) { console.error('usage: node scripts/shoot.mjs <outDir> [url] [--mobile] [--only a,b]'); process.exit(1); }
const url = args.find((a) => /^https?:/.test(a)) || 'http://127.0.0.1:4317/';
const mobile = args.includes('--mobile');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;
mkdirSync(outDir, { recursive: true });

const viewport = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const browser = await chromium.launch({
  channel: 'chrome', headless: true,
  args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-webgl', '--autoplay-policy=no-user-gesture-required'],
});
const context = await browser.newContext({ viewport, deviceScaleFactor: mobile ? 2 : 1, hasTouch: mobile, isMobile: mobile });
const page = await context.newPage();
const problems = [];
page.on('console', (m) => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
page.on('requestfailed', (r) => problems.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));
page.on('response', (r) => { if (r.status() >= 400) problems.push(`http ${r.status()}: ${r.url()}`); });

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForSelector('#loader', { state: 'detached', timeout: 20000 }).catch(() => problems.push('loader never left'));
await page.waitForTimeout(2600);

const tag = mobile ? 'm' : 'd';
const W = viewport.width, H = viewport.height;
const shots = [
  { name: 'hero', y: 0, pointer: [W * 0.56, H * 0.34], settle: 900 },
  { name: 'hero-trail', y: 0, sweep: [[W * 0.42, H * 0.25], [W * 0.62, H * 0.7]], settle: 250 },
  { name: 'hero-engineer', y: 0, click: [W * 0.3, H * 0.55], pointer: [W * 0.57, H * 0.3], settle: 2300 },
  { name: 'hero-back', y: 0, click: [W * 0.3, H * 0.55], settle: 2300 },
  { name: 'hero-exit-1', y: 0.35, settle: 900 },
  { name: 'hero-exit-2', y: 0.7, settle: 900 },
  { name: 'hero-exit-3', y: 1.15, settle: 900 },
  { name: 'manifesto', y: '#manifesto', offset: 0.1, settle: 1200 },
  { name: 'craft-1', y: '#craft', offset: 0.35, settle: 1700 },
  { name: 'craft-2', y: '#craft', offset: 1.5, settle: 1900 },
  { name: 'craft-3', y: '#craft', offset: 2.55, settle: 1900 },
  { name: 'work-head', y: '#work', offset: 0, settle: 1500 },
  { name: 'work-1', y: '#work', offset: 0.75, settle: 1300 },
  { name: 'work-2', y: '#work', offset: 1.65, settle: 1300 },
  { name: 'work-3', y: '#work', offset: 2.5, settle: 1300 },
  { name: 'work-4', y: '#work', offset: 3.4, settle: 1300 },
  { name: 'stack', y: '#stack', offset: 0.1, settle: 1600 },
  { name: 'stack-2', y: '#stack', offset: 0.75, settle: 1300 },
  { name: 'about', y: '#about', offset: 0.05, settle: 2000 },
  { name: 'contact', y: '#contact', offset: 0.05, settle: 2000 },
];

for (const s of shots) {
  if (only && !only.includes(s.name)) continue;
  const top = await page.evaluate(({ y, offset, H }) => {
    if (typeof y === 'number') return y * H;
    const el = document.querySelector(y);
    return el.getBoundingClientRect().top + window.scrollY + (offset || 0) * H;
  }, { y: s.y, offset: s.offset, H });
  // scroll in steps, the way a person would, so scrubbed timelines pass through their ranges
  const from = await page.evaluate(() => window.scrollY);
  for (let i = 1; i <= 12; i++) { await page.evaluate((v) => window.scrollTo(0, v), from + ((top - from) * i) / 12); await page.waitForTimeout(45); }
  if (s.click) await page.mouse.click(...s.click);
  if (s.pointer) await page.mouse.move(...s.pointer, { steps: 14 });
  if (s.sweep) { await page.mouse.move(...s.sweep[0]); await page.mouse.move(...s.sweep[1], { steps: 26 }); }
  await page.waitForTimeout(s.settle ?? 800);
  const file = join(outDir, `${tag}-${s.name}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 82 });
  console.log(`shot ${file}`);
}

const info = await page.evaluate(() => {
  const c = document.querySelector('#gl');
  const gl = c.getContext('webgl2');
  return {
    noGl: document.documentElement.classList.contains('no-gl'),
    renderer: gl ? gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_RENDERER_WEBGL ?? gl.RENDERER) : 'no webgl2 context',
    docHeight: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
  };
});
console.log('page:', JSON.stringify(info));
console.log(problems.length ? `PROBLEMS (${problems.length}):\n  ${[...new Set(problems)].join('\n  ')}` : 'no console errors or failed requests');
await browser.close();
process.exit(problems.length ? 1 : 0);
