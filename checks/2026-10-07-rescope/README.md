# Re-scoping first result — real-browser evidence (2026-10-07, run `rescope-site-2026-10-07`)

Headless Chromium (Playwright 1.63, cached chromium-1243) on `npm run preview` of this branch's build. Korean glyphs
render with the installed CJK font (fonts-noto-cjk). Re-run: `npm run build && npm run preview -- --port 4195`, then the
commands below (`npm install --no-save playwright@1.63.0` first).

| Check | Command | Result |
|---|---|---|
| 3 levels and dynamic behavior on the briefing and the 7 story pages, KOR + EN, light + dark | `node scripts/levels-check.mjs checks/2026-10-07-rescope/levels http://localhost:4195/aise-org-site/ index en/index story/<7 pages> en/story/<7 pages>` | `32 page-runs, 512 checks, 0 failure(s)` (`levels/results.json`, `levels-run.log`, screenshots collapsed / expanded / print / mobile 390px) |
| Mermaid label clipping, every page with a diagram, KOR + EN, light + dark | `node scripts/mermaid-label-check.mjs checks/2026-10-07-rescope/mermaid … ` (11 pages × 2 languages) | `0 clipped label(s)` (`mermaid/`) |
| Whole site: every page 200, mermaid rendered, console errors | `SHOTS=index,story/at-a-glance node scripts/browser-check.mjs checks/2026-10-07-rescope/site http://localhost:4195/aise-org-site/` | `108 requests, non-200 0, mermaid svg 52, unrendered 0, console errors 0` (27 pages × 2 languages × 2 schemes) |

What each levels check covers (per page and scheme): elements by `data-level` 1/2/3; all points start closed; the
"모두 펼치기 / 모두 접기" ("Expand all / Collapse all") buttons open and close every point; a `#id` deep link opens its
point and scrolls it into view; print media shows every point body and hides buttons and markers; `beforeprint` opens
all and `afterprint` restores; `page.pdf()` of the closed page equals the opened page (and is larger than a baseline
with bodies forced hidden); at 390px wide, no horizontal overflow with all points open; no console errors.

Not demonstrated (stated plainly):
- **Find in page (Ctrl+F) auto-expanding a closed point.** Headless Chromium has no find bar. `window.find()` finds the
  text inside a closed point but does not open it — the same for a plain native `<details>` control outside the theme,
  so it is the API, not this site. The points are native `<details>`, which current desktop Chromium auto-expands on
  find; this was not observed here.
- **PDF text content.** No PDF text extractor is installed; the PDF evidence is page counts and sizes only.
- **Diagram inside a collapsed point.** No story page has one yet; the case was tested on the component fixture
  (`checks/2026-10-07-levels-components/`: SVG 577px wide in a 624px column, non-zero height).
- Real printers and the browser's own "Save as PDF" dialog were not exercised.
