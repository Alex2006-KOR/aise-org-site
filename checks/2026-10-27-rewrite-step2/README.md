# Rewrite step 2 — real-browser evidence (2026-10-27, run rewrite-step2-2026-10-26)

Local build (`npm run build` → `build complete in 41.32s.`), served by `npm run preview -- --port 4173`, Chromium via
Playwright 1.63.0.

- `levels/` + `levels-run.log` — `scripts/levels-check.mjs`, briefing and chapters 1–9, KOR and EN, light and dark:
  `40 page-runs, 640 checks, 0 failure(s)` (levels, initial state, expand/collapse all, deep link, print/PDF, mermaid size in an
  opened point, find attempt, console errors, 390px overflow). Quick Guide and Glossary have no `point` blocks, so no toolbar; they
  are not part of this check.
- `mermaid/` + `mermaid-run.log` — `scripts/mermaid-label-check.mjs`, chapters 2–8 with mermaid, KOR and EN, light and dark:
  `0 clipped label(s)`.
