import { chromium, webkit } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
export function probe() {
    const width = document.documentElement.clientWidth;
    const out = { width, pageWidth: document.documentElement.scrollWidth, heading: document.querySelector('h1')?.innerText, controls: document.querySelectorAll('button, input, select').length, off: [], clipped: [], touch: [], inputs: [], tiny: [] };
    const describe = (el) => ({ tag: el.tagName, text: (el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ').slice(0, 75), cls: typeof el.className === 'string' ? el.className : '' });
    const scroller = (el) => {
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
            if (['auto', 'scroll'].includes(getComputedStyle(p).overflowX) && p.scrollWidth > p.clientWidth + 1)
                return true;
        }
        return false;
    };
    for (const el of document.querySelectorAll('body *')) {
        if (!(el instanceof HTMLElement) || el.closest('[inert], [aria-hidden="true"], .sr-only, [data-brand-splash]'))
            continue;
        const r = el.getBoundingClientRect(), s = getComputedStyle(el);
        if (!r.width || !r.height || s.visibility === 'hidden' || s.display === 'none')
            continue;
        const content = (el.textContent || '').trim();
        const decorative = s.pointerEvents === 'none' || el.tagName === 'CANVAS' || el.closest('[data-mock-preview]');
        if (!decorative && (content || el.matches('input,button,img,select')) && (r.left < -2 || r.right > width + 2) && !scroller(el))
            out.off.push({ ...describe(el), left: r.left, right: r.right });
        if (!decorative && !(el.title === content && el.closest('button')) && content && !el.children.length && ['hidden', 'clip'].includes(s.overflowX) && el.scrollWidth > el.clientWidth + 2 && !scroller(el))
            out.clipped.push(describe(el));
        if (width < 1024 && !decorative && el.matches('button,a[href],input:not([type=hidden]),select,textarea,[role=button]')) {
            const prose = el.matches('a') && el.closest('p,blockquote,label');
            const label = el.matches('input[type=checkbox],input[type=radio]') ? (el.closest('label') || (el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null)) : null;
            const box = label?.getBoundingClientRect() || r;
            const chip = /min-h-\[36px\]|min-h-9/.test(el.className) || el.getAttribute('role') === 'tab';
            if (!prose && (box.height < (chip ? 35.5 : 43.5) || (!content && box.width < 43.5)))
                out.touch.push({ ...describe(el), h: box.height, w: box.width });
            if (el.matches('input:not([type=checkbox]):not([type=radio]),select,textarea') && parseFloat(s.fontSize) < 16)
                out.inputs.push({ ...describe(el), font: s.fontSize });
        }
        if (width < 1024 && !decorative && !el.children.length && content.length > 1 && parseFloat(s.fontSize) < 11 && s.textTransform !== 'uppercase')
            out.tiny.push(describe(el));
    }
    return out;
}
export async function ready(page) {
    await page.waitForLoadState('load');
    await page.locator('main h1, main h2, h1').first().waitFor({ timeout: 90000 });
    // Wait for hydration before scrolling past sections whose observers mount on the client.
    await page.waitForFunction(() => {
        const heading = document.querySelector('main h1, h1, main h2');
        return heading && Object.keys(heading).some(key => key.startsWith('__reactFiber$'));
    });
}
export async function settle(page) {
    await ready(page);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * .85) {
            scrollTo({ top: y, behavior: 'instant' });
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(700);
}
async function run() {
    const engine = process.env.ENGINE || 'chromium';
    const widths = (process.env.WIDTHS || '320,390,430,812,1440').split(',').map(Number);
    const paths = fs.readdirSync('src/app', { recursive: true }).filter(p => p.endsWith('page.tsx')).flatMap(p => {
        const route = '/' + p.replaceAll('\\', '/').split('/').filter(s => !s.startsWith('(') && s !== 'page.tsx').join('/');
        return route.includes('[id]') ? [route.replace('[id]', 'prof-leo'), route.replace('[id]', 'prof-maya')] : [route];
    }).sort();
    const routes = process.env.ROUTES?.split(',') || paths;
    const browser = await (engine === 'webkit' ? webkit : chromium).launch(engine === 'webkit' ? {} : { channel: process.env.CHROME_CHANNEL || 'chrome' });
    const results = [];
    fs.mkdirSync('scratch/mobile-audit', { recursive: true });
    try {
        for (const width of widths) {
            const context = await browser.newContext({ viewport: { width, height: width === 812 ? 375 : width === 320 ? 640 : 900 }, isMobile: width < 1024, hasTouch: width < 1024, deviceScaleFactor: 1, reducedMotion: 'reduce' });
            await context.addInitScript(() => sessionStorage.setItem('fs-splash-shown', '1'));
            let page = await context.newPage();
            let errors = [];
            page.on('pageerror', e => errors.push(e.message));
            page.on('response', r => { if (r.status() >= 400 && /\.(js|css)(\?|$)/.test(r.url()))
                errors.push(`${r.status()} ${r.url()}`); });
            for (const route of routes) {
                // A fresh page avoids a previous route's development reload racing navigation.
                await page.close();
                page = await context.newPage();
                errors = [];
                page.on('pageerror', e => errors.push(e.message));
                page.on('response', r => { if (r.status() >= 400 && /\.(js|css)(\?|$)/.test(r.url())) errors.push(`${r.status()} ${r.url()}`); });
                const item = { engine, width, route };
                try {
                    const response = await page.goto((process.env.BASE_URL || 'http://localhost:3000') + route, { waitUntil: 'domcontentloaded', timeout: 120000 });
                    item.status = response.status();
                    await settle(page);
                    Object.assign(item, await page.evaluate(probe), { errors: [...errors] });
                    if (item.off.length || item.clipped.length || item.inputs.length)
                        await page.screenshot({ path: `scratch/mobile-audit/${engine}-${width}-${route.replaceAll('/', '_') || 'home'}.png`, fullPage: true });
                    console.log(engine, width, route, `off=${item.off.length} clip=${item.clipped.length} touch=${item.touch.length} inputs=${item.inputs.length} tiny=${item.tiny.length} errors=${errors.length}`);
                }
                catch (e) {
                    item.error = e.message;
                    console.log('ERROR', engine, width, route, e.message.slice(0, 120));
                }
                results.push(item);
                fs.writeFileSync(`scratch/mobile-audit/${engine}.json`, JSON.stringify(results, null, 2));
            }
            await context.close();
        }
    }
    finally {
        await browser.close();
    }
    const failures = results.filter(item => item.error || item.status !== 200 || item.errors?.length || item.pageWidth > item.width + 1 || item.off?.length || item.clipped?.length || item.touch?.length || item.inputs?.length || item.tiny?.length);
    console.log(`${results.length - failures.length}/${results.length} route checks passed`);
    if (failures.length)
        process.exitCode = 1;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href)
    await run();
