# Gate on the integrated branch (2026-11-04, run `site-p21-live-2026-11-04`)

Tree: `feature/p21-mobile-figures`, with `feature/p21-figure-component` (`055ed53`) merged and P-23 applied. Real browser: Chromium via Playwright on a local build served by `vitepress preview`, run serially. Exit codes: `exit-codes.log`. Emulated Chromium only: no real phone and no Safari (real phone at DEMO, OD-20).

| File | Check | Result |
|---|---|---|
| `build-run.log` | `npm run build` (dead links fail it) | `build complete in 34.89s.` |
| `structure-run.log`, `structure/` | `live-integration-check.mjs`: sidebar, "next" chain, figures in order, source tables, N-06 markers, retired pages | `0 failure(s)` |
| `mobile-run.log`, `mobile/` | `mobile-figures-check.mjs --min=11`, 24 pages at 390x844 | page overflow 0, 58 figures, smallest label 11, `0 failure(s)` |
| `interaction-run.log`, `interaction/` | `mobile-figures-interaction.mjs`: touch scrolling, dark toggle, route change, opening a point, resize, mutation loop | 32 ok, `0 failure(s)` |
| `mermaid-run.log`, `mermaid/` | `mermaid-label-check.mjs`, chapters 2, 4, 6, KOR/EN (labels changed here) | `0 clipped label(s)` |
| `levels-run.log`, `levels/` | `levels-check.mjs`, briefing + chapters 1-9, KOR/EN x light/dark | `40 page-runs, 640 checks, 0 failure(s)` (PNGs not kept, 117 MB) |
| `sources-run.log`, `upstream-run.log`, `quotes-run.log`, `en-hangul-count.log` | `check_sources`, `upstream-check` (`0553da7` to `c71fa8a`), `check_quotes`, `docs/en` Hangul lines | 0 findings; 0 lines |
| `shots/` | figures 2-2 and 4-7, KOR and EN, at desktop and phone (both ends of the scroll), read by eye | see below |

Read by eye: the first look at figure 2-2 broke "프로젝트" mid-word after the longer label, so the label now has an explicit line break (KOR/EN); that was re-checked in `shots/`. Figure 4-7's longer label fits its box at desktop and phone.

Limits of the interaction check, as its author states them: the widening of a figure inside a closed point is tested on a clone, since the one real figure in a closed point needs no widening; touch is raw `Input.dispatchTouchEvent`; `overscroll-behavior-x: contain` is untested. Browsers older than Safari 16, Chrome 105 or Firefox 110 lack `cqw`, so the caption there scrolls with the figure.
