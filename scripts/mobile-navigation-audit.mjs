import { chromium, webkit } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { probe, ready } from './mobile-audit.mjs';
const base = process.env.BASE_URL || 'http://localhost:3000';
fs.mkdirSync('scratch/mobile-audit', { recursive: true });
const engine = process.env.ENGINE || 'chromium';
const b = await (engine === 'webkit' ? webkit : chromium).launch(engine === 'webkit' ? {} : { channel: 'chrome' });
const results = [], errors = [];
try {
    for (const width of [320, 390, 812]) {
        const c = await b.newContext({ viewport: { width, height: width === 812 ? 375 : 720 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
        await c.addInitScript(() => sessionStorage.setItem('fs-splash-shown', '1'));
        const p = await c.newPage();
        p.on('pageerror', e => errors.push(e.message));
        await p.goto(base + '/dashboard', { waitUntil: 'domcontentloaded' });
        await ready(p);
        await p.getByRole('button', { name: 'Search household', exact: true }).tap();
        const dialog = p.getByRole('dialog', { name: 'Search household', exact: true });
        await dialog.waitFor();
        await dialog.locator('input').fill('Mortgage');
        await p.setViewportSize({ width, height: 300 });
        await p.waitForTimeout(150);
        assert.equal((await p.evaluate(probe)).off.length, 0);
        await dialog.getByRole('button', { name: 'Close search' }).tap();
        assert.equal(await p.evaluate(() => document.body.hasAttribute('data-scroll-locked')), false);
        await p.setViewportSize({ width, height: width === 812 ? 375 : 720 });
        await p.getByRole('button', { name: 'Open sidebar menu' }).tap();
        await p.getByRole('dialog', { name: 'Navigation menu' }).getByRole('button', { name: 'SWITCH' }).tap();
        const switcher = await p.evaluate(probe);
        assert.equal(switcher.touch.length, 0);
        await p.getByRole('button', { name: 'Close sidebar', exact: true }).tap();
        assert.equal(await p.evaluate(() => document.body.style.overflow), '');
        await p.getByRole('button', { name: 'Open sidebar menu' }).tap();
        await p.setViewportSize({ width: 1280, height: 800 });
        await p.waitForTimeout(300);
        assert.equal(await p.evaluate(() => document.body.style.overflow), '');
        await p.setViewportSize({ width, height: 720 });
        assert.equal(await p.getByRole('dialog', { name: 'Navigation menu' }).count(), 0);
        await p.goto(base + '/profiles/prof-leo', { waitUntil: 'domcontentloaded' });
        await ready(p);
        for (const name of ['Tasks & Chores', 'Goals & Rewards', 'Star Ledger Audit', 'Parent Controls & Privacy']) {
            await p.getByRole('button', { name }).tap();
            const result = await p.evaluate(probe);
            results.push({ width, tab: name, off: result.off, touch: result.touch, inputs: result.inputs });
        }
        await p.goto(base + '/calendar', { waitUntil: 'domcontentloaded' });
        await ready(p);
        await p.getByRole('button', { name: 'View events for 2026-08-21', exact: true }).tap();
        await p.getByRole('heading', { name: 'Friday, August 21, 2026' }).waitFor();
        assert.ok(await p.getByText('Dinner: Homemade Turkey Tacos & Guacamole', { exact: true }).isVisible());
        results.push({ width, navigation: 'search, drawer, rotation, calendar passed' });
        await c.close();
    }
}
finally {
    await b.close();
    fs.writeFileSync('scratch/mobile-audit/navigation-' + engine + '.json', JSON.stringify({ results, errors }, null, 2));
    console.log(JSON.stringify({ results, errors }));
}
if (errors.length || results.some(r => r.off?.length || r.touch?.length || r.inputs?.length))
    process.exitCode = 1;
