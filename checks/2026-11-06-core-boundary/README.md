# Gate on `feature/p23-core-boundary` (2026-11-06, run `site-live-check-2026-11-05`)

Upstream: aise-core `c71fa8a` to `60a85c9`. Real browser: Chromium via Playwright on a local build. Exit codes: `exit-codes.log`.

| File | Check | Result |
|---|---|---|
| (not kept) | `npm run build`, dead links fail it | `build complete in 21.50s.` |
| `mobile-run.log`, `mobile/` | `mobile-figures-check.mjs --min=11` | page overflow 0, 58 figures, smallest label 11, `0 failure(s)` |
| `structure-run.log`, `structure/` | `live-integration-check.mjs` | `0 failure(s)` |
| `mermaid-run.log`, `mermaid/` | `mermaid-label-check.mjs`, chapter 5 KOR/EN (figure 5-4 changed) | `0 clipped label(s)` |
| `levels-run.log`, `levels/` | `levels-check.mjs`, briefing and chapters 4, 5, KOR/EN x light/dark | `12 page-runs, 192 checks, 0 failure(s)` (PNGs not kept) |
| `en-hangul-rendered.log`, `exit-codes.log` | rendered EN pages, `docs/en` lines | outside quotes 0; 0 lines |
| `sources-run.log` | `check_sources.mjs` | `0 finding(s)` |
| `upstream-run.log` | `upstream-check.sh` after raising `aise-core-through` | references 0, quotes 0 in 8 |
| `briefing-lines.log` | folded lines per briefing step at 1280 wide | EN 2,2,2,2,2,2,2,2,2 (step 2 was 3); KOR unchanged |
| `shots/` | figures 5-2 and 5-4 at desktop, read by eye | fit; a first caption showed literal backticks, fixed |

`upstream-run.log` here compares `60a85c9` with itself. The check that counted was run before raising it, `c71fa8a` to `60a85c9`: references 0, quotes 0 in 8, reading list read by hand.

Reading list, judged: `governance/` and `schema/` moves (paths followed); assets moved to `instance/assets/` and written by the asset staff (chapter 5 section and figure 5-2, chapter 4); starter catalog replaced by an empty catalog with starting values (chapter 4, and the EN sentence still said "empty files"); `write_policy.yaml`, gone since 2026-10-29 and missed by the 2026-11-04 review (figure 5-4, now `spaces.yaml`). Below what the site describes, no change: default tools and two tiers, the push tool's retry line, loopback curl, the entry report, skills generated from the instance, re-verification rules.

The theme is unchanged, so `mobile-figures-interaction.mjs` was not re-run. `docs/work/3way-reference-answers.md` keeps its paths: it is the answer key pinned to `f9dc210`.
