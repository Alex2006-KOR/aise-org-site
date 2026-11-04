# P-19 live integration check (2026-10-28/29, run `p19-live-check-2026-10-28`)

Target: the published site, `main` `2af4444` (PR #24), whose tree is identical to `dev` `315d65a` (`git diff origin/dev origin/main`
empty). Real browser: Chromium via Playwright 1.63.0 on a local build of that tree (`npm run build` → `build complete in 50.54s.`
under a load average of about 6 on 2 cores), served by `vitepress preview`. The live URL itself was read with the web-research tool
(this role makes no raw outbound calls from a shell): `story/verification.html` shows "7. 검증과 평가", captions 그림 7-1·7-2,
"다음으로. → 8. 배포와 여러 도구", "이 페이지의 근거 전체", no "결정 되짚어보기"; `overview.html` → HTTP 404;
`en/story/growth-and-limits.html` shows "Results (TBD)" and "Back to the start. → Briefing" — the same as the local build.

| File | Check | Result |
|---|---|---|
| `levels-run.log`, `levels/` | `levels-check.mjs`, briefing + chapters 1–9, KOR/EN × light/dark (U-07, U-08 automated parts) | `40 page-runs, 640 checks, 0 failure(s)` |
| `structure-run.log`, `structure/` | `live-integration-check.mjs` (new): sidebar groups 브리핑/이야기/부록 and story 1–9 order, "다음으로" chain by clicking briefing→1→…→9→briefing (U-03); point titles, no "결정 되짚어보기" (U-04); every diagram in a `<figure>` with a numbered caption `그림 N-k`, in order (U-10, F-05); one source table per chapter, no aise-core links (U-09); N-06 markers (TBD, 운영자가 채울 자리, 설계됨·구현됨·검증 전, 실험 뒤 채울 자리); 18 retired pages × 2 languages answer 404 (F-02) | first run: 2 failures — chapter 4's recruitment-path mermaid (F9) had no number/caption, KOR and EN. Fixed (그림 4-3, later figures renumbered 4-4…4-7, `docs/work/rewrite-plan.md` §9). After the fix: `0 failure(s)` |
| `levels-ch4-after-fix.log` | `levels-check.mjs` chapter 4 KOR/EN after the fix | `4 page-runs, 64 checks, 0 failure(s)` |
| `mermaid-run.log`, `mermaid/` | `mermaid-label-check.mjs` chapter 4 KOR/EN after the fix | `0 clipped label(s)` |
| `figures/` | `figure-shots.mjs` (now opens folded points first): chapters 4, 5, 7 KOR/EN × light/dark, 52 PNGs; 4-3 read by eye (KOR dark, EN light) | readable, caption under the diagram |
| `sources-run.log` | `check_sources.mjs /workspaces/aise-core` (U-09) | `0 finding(s)` — the earlier single finding was a false positive in `architecture.md` (build-excluded; the script now skips build-excluded files) |
| `upstream-run.log` | `upstream-check.sh`, `e176648` → `0553da7` (N-05, N-01) | references `0 finding(s)`, quotes `0 finding(s) in 8 quote(s)`; reading list reviewed below |

SSOT (F-03): sentences of 50+ characters repeated across the briefing and chapters — KOR 0, EN 1 ("A new deployment starts with an
empty organization.", chapters 4 and 8, each a one-line summary linking to the other — kept). Company names: none; the environment is
generalized as "사내망 전용 환경" / "intranet-only environment".

Upstream reading list (`e176648` → `0553da7`): execution report format 2 (Stage per DoD row, plan to the demo), the briefing in two
parts, a pinned `none` elevated tier, delegation activity including descendants, concurrent commits closed without a tool. The site
describes none of these at that level of detail; what it does say (chapter 3: two tiers, members never above baseline; chapter 6:
`execution.md` holds DoD, operator decisions, recent runs; chapter 7: re-verification dates in "Verified") still holds. No page change;
`aise-core-through` raised to `0553da7`.
