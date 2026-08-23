# First Savvy — Responsive Design System

The single source of truth for breakpoints, containers, type scale, spacing, touch
targets, and adaptive layout patterns. **Every page and component must follow this
document exactly** so the product reads as one system on phones, tablets, and desktops.

Derived from a measured audit of all 35 routes at 320 / 375 / 414 / 768 / 1024 / 1440 px
(`.responsive-audit.mjs`).

---

## 1. Breakpoints

Tailwind defaults. No custom breakpoints.

| Token | Min width | Represents                                   |
| ----- | --------- | -------------------------------------------- |
| base  | 0         | Phones (design target: **320 px**)            |
| `sm`  | 640       | Large phones landscape / small tablets        |
| `md`  | 768       | Tablets portrait                              |
| `lg`  | 1024      | Tablets landscape / laptops — **app shell switches here** |
| `xl`  | 1280      | Desktop                                       |
| `2xl` | 1536      | Large desktop                                 |

**Rule A — the app shell breakpoint is `lg`, never `md`.**
The persistent sidebar is 256 px wide. At 768 px it leaves only 512 px for content and
pushes the page to 851 px, causing horizontal scroll on every authenticated route. The
sidebar is a drawer below `lg` and persistent from `lg` up. Any `md:` class in
`(app)/layout.tsx`, `app/Sidebar.tsx`, or `app/AppHeader.tsx` that gates sidebar-related
layout must be `lg:`.

**Rule B — no horizontal page scroll at any width ≥ 320 px.** `document.scrollWidth`
must never exceed `clientWidth`. Deliberate horizontal scrolling is allowed *only*
inside an explicit `overflow-x-auto` container (tables, chip rows).

---

## 2. Containers & page padding

Use exactly one of these. Do not invent new combinations.

```
Wide marketing section   max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Narrow marketing section max-w-5xl mx-auto px-4 sm:px-6 lg:px-8
Prose / legal / FAQ      max-w-3xl mx-auto px-4 sm:px-6 lg:px-8
Auth card                w-full max-w-md mx-auto px-4 sm:px-6
App page content         (provided by (app)/layout.tsx — never re-pad a page)
```

App shell main element (already correct, keep as is):
`p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto`

**Horizontal gutter is always `px-4 sm:px-6 lg:px-8`.** Never `px-6` alone, never
`px-8` alone, never `container`.

### Full-bleed escape

To let a scroller or media block reach the screen edge on mobile only:
`-mx-4 px-4 sm:mx-0 sm:px-0`

---

## 3. Vertical rhythm

```
Marketing page root      space-y-12 sm:space-y-20 lg:space-y-24
Marketing section inner  space-y-6 sm:space-y-8
Legal / prose page root  py-12 sm:py-16 space-y-8
App page root            space-y-6 sm:space-y-8
Card interior            space-y-3 sm:space-y-4
Grid gap (cards)         gap-4 sm:gap-6
Grid gap (dense chips)   gap-2 sm:gap-3
Panel padding            p-4 sm:p-6
Hero panel padding       p-6 sm:p-10 lg:p-12
```

Anchor targets (`id="how-it-works"` etc.) must carry `scroll-mt-20` so the sticky
64 px header does not cover them.

---

## 4. Type scale

Fixed ladders. Pick the row that matches the role; do not improvise.

| Role                                   | Classes                                            |
| -------------------------------------- | -------------------------------------------------- |
| Marketing hero H1                       | `text-3xl sm:text-5xl lg:text-6xl xl:text-7xl`      |
| Marketing sub-page H1                   | `text-3xl sm:text-4xl lg:text-5xl`                  |
| Legal / utility page H1                 | `text-3xl sm:text-4xl`                              |
| Marketing section H2                    | `text-2xl sm:text-3xl lg:text-4xl`                  |
| App page H1                             | `text-2xl sm:text-3xl`                              |
| Card / panel heading (H3)               | `text-base sm:text-lg`                              |
| Lead paragraph                          | `text-base sm:text-lg lg:text-xl`                   |
| Body                                    | `text-sm sm:text-base`                              |
| Secondary / meta                        | `text-xs sm:text-sm`                                |
| Micro badge (UPPERCASE, tracking-wider) | `text-[10px] sm:text-[11px]`                        |

Headings keep `font-serif font-bold text-brand-navy dark:text-white` and long marketing
headings add `leading-tight` (hero uses `leading-[1.15]`).

### Minimum legible size

* **`text-[9px]` is banned.** Replace with `text-[11px]`.
* `text-[10px]` is allowed **only** on uppercase `tracking-wider`/`tracking-widest`
  micro-labels and short numeric badges. Any sentence, name, amount, date, or
  description at `text-[10px]` becomes `text-[11px]`.
* Numeric values that must not wrap use `tabular-nums whitespace-nowrap`.

---

## 5. Touch targets

Every control must present at least a **44 × 44 px** hit area below `lg`.

```
Icon-only button   inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl
Compact icon button (inside a dense toolbar)
                   inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-lg
Text button / CTA  inline-flex items-center justify-center min-h-[44px] px-4 sm:px-5
Nav & footer link  inline-flex items-center min-h-[44px] lg:min-h-0 lg:py-1
Form input/select  min-h-[44px] px-3.5 text-base sm:text-sm
Checkbox / radio   w-5 h-5 with a label wrapper of min-h-[44px]
Chip / filter pill min-h-[36px] px-3
```

**Inputs must be `text-base` (16 px) at base width** to stop iOS Safari from zooming on
focus; step down with `sm:text-sm` if the design calls for smaller text on desktop.

Links inside a running paragraph are exempt — the rule applies to standalone controls
and list-item links.

---

## 6. Grid ladders

Always start at one or two columns and climb. Never declare `grid-cols-3` or higher at
base width.

```
2-up cards      grid-cols-1 sm:grid-cols-2
3-up cards      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
4-up cards      grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
Stat / metric strip (4)  grid-cols-2 lg:grid-cols-4
Stat / metric strip (3)  grid-cols-1 sm:grid-cols-3
5-up compact    grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
6-up compact    grid-cols-3 sm:grid-cols-4 lg:grid-cols-6
Asymmetric split grid-cols-1 lg:grid-cols-12  (children: lg:col-span-5 / lg:col-span-7)
Footer           grid-cols-1 sm:grid-cols-2 lg:grid-cols-5
```

A `lg:grid-cols-12` split whose visual order should flip on desktop uses
`lg:order-1` / `lg:order-2` rather than duplicating markup.

---

## 7. Tables

Tables never shrink below their natural column widths. Wrap every `<table>`:

```jsx
<div className="-mx-4 sm:mx-0 overflow-x-auto overscroll-x-contain">
  <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
```

Add `whitespace-nowrap` to numeric and date cells. Keep the first column sticky only if
the design already does so — do not add new sticky columns.

Where a table is really a list of records (transactions, holdings), prefer a stacked
card list below `sm` (`sm:hidden`) alongside the table (`hidden sm:table`) — but only if
the page already has that pattern. Otherwise the scroll container above is sufficient.

---

## 8. Truncation

`truncate` inside a narrow flex column silently deletes content on mobile. Rules:

* `truncate` requires `min-w-0` on the flex parent, otherwise it will not engage.
* Any label the audit showed clipped becomes
  `line-clamp-2 xl:line-clamp-none xl:truncate`. Reset at `xl`, not `sm` or `lg` — a
  card grid or a two-column split is often *narrower* per cell at 768–1024 than the same
  label is on a phone, so an earlier reset just moves the clipping to tablet. Measured
  here: a step-card label had 133 px at 1024 and did not clear until 1280.
* Wrapping to two lines is never a defect; truncation is the last resort. When in doubt
  reset later, or not at all.
* Where the container is narrow at every width (a cell in a mock preview grid, say),
  drop the reset entirely and let it wrap: plain `break-words line-clamp-2`.
* Never truncate a currency amount — give it `shrink-0 whitespace-nowrap` and let the
  label shrink instead.

---

## 9. Horizontally scrolling control rows

Period selectors, filter tabs, and category chips overflow at 320–414 px. Standard
pattern:

```jsx
<div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
  <div className="inline-flex min-w-max items-center gap-1">
    {/* each control: shrink-0 */}
  </div>
</div>
```

`no-scrollbar` is defined in `globals.css`.

---

## 10. Overlays, modals, drawers

```
Backdrop        fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm
Modal wrapper   fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4
Modal panel     w-full sm:max-w-md max-h-[90dvh] overflow-y-auto
                rounded-t-2xl sm:rounded-2xl
Mobile drawer   w-[86vw] max-w-xs h-[100dvh] overflow-y-auto
```

Sheets open from the bottom on phones (`items-end`) and centre from `sm` up. Always use
`dvh`, never `vh`, for anything that must fit the mobile viewport. Lock body scroll
while an overlay is open.

---

## 11. Charts (Recharts)

```
Chart wrapper height   h-56 sm:h-64 lg:h-72
```

Always inside `<ResponsiveContainer width="100%" height="100%">`. Reduce axis tick
density on mobile (`interval="preserveStartEnd"`, `minTickGap={24}`) and drop the Y axis
below `sm` where the values are already shown in a header stat.

---

## 12. 3D canvases (`components/3d/*`)

* The canvas must track its container: attach a `ResizeObserver` (fall back to a
  `resize` listener) and call `renderer.setSize` + `camera.updateProjectionMatrix` on
  every change. A canvas sized once at mount is a bug.
* Clamp cost on small screens: `renderer.setPixelRatio(Math.min(dpr, width < 640 ? 1.5 : 2))`
  and scale particle/node counts by roughly 0.5 below 640 px.
* Decorative canvases stay `absolute inset-0 pointer-events-none` and must be inside an
  `overflow-hidden` parent so they can never widen the page.
* Honour `prefers-reduced-motion` (already handled by `lib/webgl.ts`) and always render
  a CSS fallback of the same box size.

---

## 13. Global CSS contract

`globals.css` provides:

```css
html { -webkit-text-size-adjust: 100%; overflow-x: clip; }   /* clip, not hidden — keeps sticky working */
.no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
```

Root layout exports a Next.js `viewport`:

```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F7F8' },
    { media: '(prefers-color-scheme: dark)', color: '#1A232E' },
  ],
};
```

---

## 14. Adaptive-layout decisions (per surface)

| Surface | Below `lg` | `lg` and up |
| --- | --- | --- |
| App sidebar | Slide-in drawer, `w-[86vw] max-w-xs` | Persistent `w-64` |
| App header | Icon search button, overflow menu for secondary actions | Full search field + inline actions |
| Calendar month grid | Keeps the 7-column grid; each event becomes a colour dot (max 3 + `+N`) with the titles in an `sr-only` summary | Same grid with titled event chips (`hidden sm:block`) |
| Transactions / holdings tables | `overflow-x-auto` scroller | Full-width table |
| Marketing 12-col splits | Stacked, copy first | Side by side |
| Live preview mocks | Single column, real wrapping labels | Multi-pane app mock |

---

## 15. Verification

`node .responsive-audit.mjs out.json` visits every route at seven widths and reports:

* `H-OVERFLOW` — page-level horizontal scroll (must be zero)
* `off:` — elements past the viewport edge (must be zero)
* `clip:` — text actually cut off by `truncate`/`overflow-hidden`
* `tap:` — controls below the §5 hit area on mobile
* `tiny:` — text under 11 px on mobile

Ship only when `H-OVERFLOW` and `off:` are zero at every width.

### What the checks deliberately do not flag

Each exemption below matches a rule stated earlier in this document; without them the
harness contradicts the spec and the counts stop meaning anything.

* **Height, not width, is the binding tap rule.** A text link is legitimately narrower
  than it is tall, so width is only enforced on icon-only controls. Chips are held to
  the §5 pill height of 36 px rather than 44 px.
* **Links inside a running paragraph** (§5) are exempt; they are told apart from CTA
  links by using a plain `underline` rather than `hover:underline`.
* **A checkbox or radio inside a `min-h-[44px]` label** (§5) is measured at the label,
  since the label is the real hit area.
* **`text-[10px]` on an `uppercase` micro-label** is legal under §4 and is counted
  separately as `tinyExempt` rather than reported as a violation.
* **Marketing device-frame mocks** (`components/marketing/live-previews/*`, marked with
  `data-mock-preview`) are pictures of the product, not controls, so the touch rule does
  not apply to their internals. Their inputs still take `text-base` at base width,
  because a focused input zooms on iOS regardless of intent.
* **`sr-only` text** is clipped to 1 px on purpose — that is the technique, not a defect.
* **An element carrying a `title` attribute** is truncating deliberately with the full
  string still reachable. Use this only where truncation is the correct affordance and
  no width would fix it — a calendar event chip in a month cell, for example — never as
  a way to silence a label that simply needs `min-w-0` or a shorter neighbour.
* **A container mid-animation**, or one whose `scrollWidth` exceeds `clientWidth` while
  no descendant actually extends past its content box, is not a clip. `scrollWidth` is
  only an exact proxy for lost text on a leaf element.
