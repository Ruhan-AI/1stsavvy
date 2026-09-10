import { chromium, webkit } from '@playwright/test';
import fs from 'node:fs';
import { probe, ready } from './mobile-audit.mjs';
const engine = process.env.ENGINE || 'chromium';
const b = await (engine === 'webkit' ? webkit : chromium).launch(engine === 'webkit' ? {} : { channel: 'chrome' });
const results = [];
fs.mkdirSync('scratch/mobile-audit', { recursive: true });
const cases = [['/contacts', 'Add Contact'], ['/calendar', 'Add Event / Bill'], ['/goals', 'Create New Goal'], ['/goals', 'Add Progress'], ['/banking', 'Connect Bank (Plaid)'], ['/banking', 'Add Manual Asset'], ['/profiles', 'Add Family Member'], ['/dashboard', 'Assign Chore'], ['/profiles/prof-leo', 'Award Stars'], ['/profiles/prof-leo', 'Create Task'], ['/profiles/prof-leo', 'Delete or Anonymize Profile', 'Parent Controls & Privacy']];
try {
    for (const width of (process.env.WIDTHS || '320,390,812,1440').split(',').map(Number)) {
        const context = await b.newContext({ viewport: { width, height: width === 812 ? 375 : 640 }, hasTouch: width < 1024, isMobile: width < 1024, reducedMotion: 'reduce' });
        await context.addInitScript(() => sessionStorage.setItem('fs-splash-shown', '1'));
        let p = await context.newPage();
        let errors = [];
        p.on('pageerror', e => errors.push(e.message));
        for (const [route, trigger, tab] of cases) {
            if (process.env.CASES && !process.env.CASES.split(',').includes(trigger))
                continue;
            const r = { width, route, trigger };
            errors = [];
            try {
                await p.close();
                p = await context.newPage();
                p.on('pageerror', e => errors.push(e.message));
                await p.goto((process.env.BASE_URL || 'http://localhost:3000') + route, { timeout: 120000, waitUntil: 'domcontentloaded' });
                await ready(p);
                if (tab)
                    await p.getByRole('button', { name: tab }).click();
                await p.getByRole('button', { name: trigger }).first().click();
                const d = p.locator('[data-app-dialog]');
                await d.waitFor();
                await p.waitForTimeout(200);
                r.initial = await d.evaluate(e => ({ rect: e.getBoundingClientRect().toJSON(), scrollHeight: e.scrollHeight, clientHeight: e.clientHeight }));
                r.probe = await p.evaluate(probe);
                const input = d.locator('input:not([type=checkbox]):not([type=radio]),textarea').first();
                if (await input.count())
                    await input.focus();
                await p.setViewportSize({ width, height: width < 1024 ? 300 : 640 });
                await p.waitForTimeout(150);
                r.short = await d.evaluate(e => ({ rect: e.getBoundingClientRect().toJSON(), view: innerHeight }));
                await d.evaluate(e => { e.scrollTop = e.scrollHeight; });
                const cancel = d.getByRole('button', { name: /cancel|close dialog/i }).last();
                await cancel.click();
                await d.waitFor({ state: 'detached' });
                r.unlocked = await p.evaluate(() => getComputedStyle(document.body).overflow !== 'hidden' && !document.body.hasAttribute('data-scroll-locked'));
                await p.setViewportSize({ width, height: width === 812 ? 375 : 640 });
                r.errors = errors;
            }
            catch (e) {
                r.error = e.message.slice(0, 250);
                await p.screenshot({ path: 'scratch/mobile-audit/dialog-' + width + '-' + trigger.replaceAll(/[^a-z]/gi, '') + '.png' }).catch(() => { });
            }
            results.push(r);
            fs.writeFileSync('scratch/mobile-audit/dialogs-' + engine + '.json', JSON.stringify(results, null, 2));
            console.log(width, trigger, r.error || ('off=' + r.probe.off.length + ' touch=' + r.probe.touch.length + ' input=' + r.probe.inputs.length + ' unlock=' + r.unlocked));
        }
        await context.close();
    }
}
finally {
    await b.close();
}
const failures = results.filter(r => r.error || r.errors?.length || !r.unlocked || r.probe.off.length || r.probe.inputs.length || r.probe.touch.length || r.short.rect.y < -1 || r.short.rect.bottom > r.short.view + 1);
console.log(`${results.length - failures.length}/${results.length} dialog checks passed`);
if (failures.length)
    process.exitCode = 1;
