# 2026-10-21 rewrite step 1 — real-browser evidence

Run `rewrite-step1-2026-10-21`. Local build (`npm run build`, clean) served by `npm run preview -- --port 4180`; Playwright 1.63.0
headless Chromium (`chromium-1243`).

- `levels/` — `node scripts/levels-check.mjs levels http://localhost:4180/aise-org-site/ story/background en/story/background
  story/how-it-is-kept en/story/how-it-is-kept index en/index` → `12 page-runs, 192 checks, 0 failure(s)` (`levels-run.log`,
  `levels/results.json`). Print PNGs were deleted after the run to keep the repository small; the print checks themselves are in
  `results.json`.
- `mermaid/` — `node scripts/mermaid-label-check.mjs mermaid http://localhost:4180/aise-org-site/ story/how-it-is-kept
  en/story/how-it-is-kept` → `0 clipped label(s)` (chapter 1 has no mermaid diagram after the rewrite).
- `figures/` — every `<figure>` on the two pilot chapters, KOR/EN × light/dark, one PNG each (taken element by element for visual
  review; three figures per page).
