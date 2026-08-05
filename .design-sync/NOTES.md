# design-sync notes — nourish

Repo-specific gotchas for future syncs. Read this before re-running anything.

## Shape of this repo

- The design system is **`packages/ui` (`@nourish/ui`)**, not the repo root. The root is the Vite app that consumes the same design language.
- `node_modules/@nourish/ui` is a `file:` symlink created by the root `npm install`. That's why `--node-modules ./node_modules` (repo root) is correct.
- Groups: Layout, Navigation, Typography, Forms, Actions, Feedback, Plan, Content — 41 components.

## History worth knowing

This repo was synced **twice**, against two completely different designs:

1. **2026-08-03** — extracted from the pre-redesign `App.jsx` (dark navy gradient, Georgia serif, emoji). That work is parked on the branch **`design-sync/dark-serif-extraction`** and is superseded. Don't merge it.
2. **2026-08-04** — rebuilt against the editorial "recipe box" redesign that landed on `main` in commits `949634f..7810512`. That is what this config and the uploaded project describe.

**Lesson: `git fetch` before starting a sync.** The first pass was built on a local `main` that was 22 commits stale, and the entire extraction had to be redone. A clean working tree says nothing about whether the branch is current.

## The library is the single source of the design — the app consumes it

`packages/ui/src/tokens.css` and `components.css` hold the whole design (they originated as copies of the app's `src/index.css` and `src/App.css`). **The app now imports them rather than duplicating them:**

- `src/index.css` → `@import "@nourish/ui/tokens.css";`
- `src/App.css` → `@import "@nourish/ui/components.css";`

Both app files are now three lines of comment plus one import. **Edit CSS in `packages/ui/src/`, never in `src/`** — otherwise you're adding rules the design system doesn't know about.

`src/App.jsx` was also refactored onto the components (`Page`, `RecipeBox`, `CardStack`, `IndexCard`, `GoalCard`, `Chip`, …). It keeps only app concerns: the wizard state machine, `useSwipeCard`, `usePhoto`/`MealPhoto`, the prompt construction and the streaming fetch. `MealPhoto` fetches and hands presentation to `Polaroid`; `SwipeCard` wraps `IndexCard` with pointer handlers.

That refactor kept all 69 tests green and left the rendered output pixel-identical.

## Props added for the app's sake

Wiring the app up surfaced four real gaps, all added to the library rather than worked around:

- `IndexCard` — `onPointerDown/Move/Up/Cancel`, so a card can be dragged between siblings.
- `ScrollPanel` — `size="tips"`, because `.tips-panel p.plain` is a real selector that `shopping-panel` doesn't satisfy.
- `Polaroid` — `onImageError`, so a broken photo URL falls back to the tinted panel.
- `TextField` — `inputMode` and `maxLength`, for the numeric ZIP field.

None changed rendering, so the anchored re-sync reported all 41 components verified-unchanged and shipped only those four plus the bundle.

## Build order — this bites on a fresh clone

`dist` is gitignored, so **`packages/ui/dist` does not exist on a fresh clone** and the converter fails with `[NO_DIST]`. Always:

```
npm install && npm --prefix packages/ui install && npm --prefix packages/ui run build
```

(`cfg.buildCmd` records the last step.)

**Installing from the repo root hoists `packages/ui`'s devDependencies up to the root `node_modules`** — `typescript` ends up at `/node_modules`, not `/packages/ui/node_modules`. `build.mjs` therefore resolves `tsc` via `createRequire(...).resolve("typescript/bin/tsc")` instead of a hardcoded path. Don't hardcode it back; it breaks depending on install order.

## Stylesheet split — do not "simplify" it

`packages/ui/src` ships **three** CSS files on purpose:

- `tokens.css` — custom properties only, plus the Google Fonts `@import`
- `components.css` — rules only, **no `@import`**
- `styles.css` — just the two imports (what applications consume)

`cfg.cssEntry` points at **`dist/components.css`**, not `styles.css`. Pointing it at `styles.css` makes the converter copy a file whose relative `@import "./tokens.css"` dangles inside the bundle → `[CSS_IMPORT_MISSING]` plus a flood of undefined tokens. If someone flattens these into one file, the sync breaks.

## Fonts

Dancing Script and Kalam are **remote Google Fonts**. The app loads them via a `<link>` in `index.html`; the design system can't rely on that, so `tokens.css` carries an `@import url("https://fonts.googleapis.com/...")` as its first line (CSS requires `@import` before other rules).

Validate prints `[FONT_REMOTE]` — **expected and informational**, not a problem. Confirmed working: the review screenshots render in real script faces, not the `cursive` fallbacks.

If the cards ever render in Comic Sans / Segoe Script, the font host was unreachable at capture time. Both families are SIL Open Font License, so vendoring the woff2 files into `packages/ui` and using `cfg.extraFonts` is a legitimate fallback.

## Config gotchas discovered the hard way

- **`tokensGlob` is ignored unless `tokensPkg` is also set** (`lib/css.mjs` returns early on `!tokensPkg`). Both point at `@nourish/ui` itself, since this DS is its own token package.
- **`guidelinesGlob` deliberately points at `docs/guides/**/*.md`, which doesn't exist.** The default glob includes `docs/*.md`, which would sweep all 41 per-component docs into `guidelines/` as cross-cutting guidance. The `! guidelinesGlob: docs/guides not found — skipped` line is expected. Real guides would go in `packages/ui/docs/guides/`.
- **`cfg.provider` is `Page`.** Not a React context provider — the visual root that paints the tabletop and sets the body font. Without it every preview renders on white in a system sans.
- **Per-component `cfg.overrides.<Name>.viewport`** exists because `Page` is `min-height: 100vh`: at the default 900x700 every card became a mostly-empty letterbox. Each height is hand-tuned to its tallest cell. **Two rounds of tuning were needed** — guessed heights clipped roughly a third of the cards. If you add cells, re-check that component's height; a cropped card does not fail validate.
- Changing anything under `cfg.overrides` needs a full `package-build.mjs` before capture; `preview-rebuild.mjs` alone fails `[CONFIG_STALE]`.

## Previews must sit on the right surface

The design has two surfaces (dark tabletop, cream card) and most components belong on the card. Preview files therefore wrap card-content components in `<RecipeBox><IndexCard>…` — otherwise dark ink renders on the dark tabletop and the card grades as unstyled. Only `Brand`, `PlanHeader`, `Progress`, `DayTabs`, `Actions` and `ErrorNote` are authored on the box/tabletop directly.

## Windows

`resync.mjs` failed once with `EPERM ... rm ds-bundle` while clearing the output dir — a transient lock. **Re-running immediately succeeded.** Also make sure no shell has its cwd inside `ds-bundle/` and that `storybook/http-serve.mjs` isn't still serving it (that held the directory open once and blocked `rm`).

The Bash tool's cwd persists between calls; several runs failed with `Cannot find module '.ds-sync/…'` because a previous command left the shell inside `ds-bundle/` or `.ds-sync/`. **Prefix converter runs with `cd /c/Users/FluxL/nourish &&`.**

## Known render warns

`[FONT_REMOTE]` only. As of the last sync `package-validate.mjs` exits 0 with no other warn lines and 41/41 previews rendering clean. **Any other warn on a future run is new** — investigate rather than assuming it was always there.

## Re-sync risks — what to watch

- **The app depends on the library's API now.** Renaming a component or a prop breaks `src/App.jsx`, and the app's test suite is the thing that will tell you — run `npx vitest run` after any library API change, not just the converter.
- **Grades are keyed to the authored previews and preview-affecting config.** The 97 graded cells carry forward for free, but editing a `previews/*.tsx` or a `viewport` override clears that component's grade and it must be re-captured and re-graded from its sheet.
- **The viewport overrides are hand-tuned numbers with no test.** Eyeball `ds-bundle/_screenshots/review/` after any preview edit.
- **`conventions.md` names ~30 concrete tokens, classes and components.** If the design shifts again those go stale and the design agent will confidently emit vocabulary that no longer resolves. The conventions step re-validates them against each fresh build — take its drift report seriously.
- **The remote font import is a runtime network dependency** of every design built with this system.
- **Emoji still appear** in `GoalCard` icons, `Segmented` labels and `Polaroid` fallbacks. The redesign removed decorative emoji elsewhere; if that cleanup continues, these are the remaining ones.
