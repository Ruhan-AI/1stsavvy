# Mobile responsive verification

Verified on 7 September 2026 against the local Next.js application.

## Changes

- Eleven app forms and household search now share a scrollable dialog. It stays inside the visible viewport, accommodates a phone keyboard and bottom safe area, and handles focus, Escape and scroll unlocking.
- Search has a visible close button on phones. Sidebar links and profile controls have larger touch areas; changing to desktop width closes the mobile drawer and releases scrolling.
- Child-profile tabs scroll within their row. Profile cards, PIN controls and form spacing fit narrow screens.
- Touch-device fields keep readable text after rotation instead of dropping below 16 px.
- Calendar days open the selected day's details, making full event titles accessible by touch.
- Reduced-motion visitors see static marketing content without waiting for entrance animations. Preference changes are observed after hydration.

## Results

| Coverage | Result |
| --- | --- |
| All 37 routes in Chrome at 320, 390, 430, 812 and 1440 px | 185/185 passed |
| Shared app shell and child profile at 768, 1024 and 1280 px | 6/6 passed |
| All 37 routes in Playwright WebKit at 390 px | 37/37 passed |
| Eleven dialogs: Chrome at 320/812/1440 and WebKit at 320/812 | 55/55 passed |
| All 12 interactive demo pages: Chrome at 320/768/1024/1440, WebKit at 320/812 | 72/72 page/width combinations passed |
| Search, drawer, profile tabs, rotation and calendar details at 320/390/812 | Passed in both engines |
| Loader with normal, blocked-autoplay and reduced-motion settings | Dismissed and released scrolling in both engines |
| TypeScript and unit tests | TypeScript clean; 17 tests passed, including two dialog tests |

The checks cover horizontal overflow, inaccessible clipping, touch targets, form text, popup bounds on 300 px high viewports, close/cancel behavior, sidebar reopening, video quality selection, referral dialogs and video/demo switching. Final browser runs had no page errors. Calendar ellipsis is intentional: tapping the date opens the complete event text. Tables and tab strips retain deliberate internal horizontal scrolling.

Tests used browser viewport/touch emulation on Windows, including the WebKit rendering engine. These are not physical iPhone/Android tests; native on-screen keyboard behavior was represented by viewport resizing and a visual-viewport unit test. No production performance or device FPS claim is made by this audit.

## Repeat the checks

Run a local preview, then use these scripts from the repository root:

```powershell
$env:BASE_URL = 'http://localhost:3000'
node scripts/mobile-audit.mjs
node scripts/mobile-dialog-audit.mjs
node scripts/mobile-navigation-audit.mjs
```

Set `ENGINE=webkit` to use an installed Playwright WebKit browser. `WIDTHS` and `ROUTES` narrow the route audit; `WIDTHS` and `CASES` narrow the dialog audit. Reports and screenshots are written under the ignored `scratch/mobile-audit/` directory. Use a stable preview while testing: development reloads during edits can interrupt navigation.
