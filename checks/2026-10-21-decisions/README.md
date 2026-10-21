# 2026-10-21 — operator decisions (OD-14) and P-11a

- `levels-run.log`, `levels/results.json`: `scripts/levels-check.mjs` on the 10 changed story pages (KOR/EN),
  local `vitepress preview` of this branch's build — `20 page-runs, 320 checks, 0 failure(s)`. Screenshots kept
  only for the pages whose content was added (background, growth-and-limits); the other pages only lost a box.
- `decisions-run.log`, `results.json`, `*-six-problems.png`: `scripts/decisions-check-2026-10-21.mjs` — no
  review-question box or text left, the six-problems table has 6 rows (KOR/EN), the page-7 limit point is present,
  no console errors — `10 pages, 0 failure(s)`.
- `upstream-check.log`: `scripts/upstream-check.sh` against aise-core `f9dc210` — references 0, quotes 0/105.
- Run with Playwright 1.63.0 (Chromium 1243) installed outside the repo.
