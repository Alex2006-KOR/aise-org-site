# Live check of the published tree (2026-11-06, run `site-live-check-2026-11-05`)

Published: `main` `5d10d47`, deployment run 41968669032 `completed success`. Real browser: Chromium via Playwright on a local build of the same tree (`git diff origin/dev origin/main` empty, `dev` `8c8d920`), because this role reads the live site only through its web-research tool. That tool found the live theme chunk `assets/chunks/theme.DK0BNVAh.js` holding `aise-fig-wide`, the same content-hashed name the local build produced.

| File | Check | Result |
|---|---|---|
| `mobile-run.log`, `mobile/` | `mobile-figures-check.mjs --min=11`, 24 pages at 390x844 | page overflow 0, 58 figures, smallest label 11, 52 widened, `0 failure(s)` |
| `interaction-run.log`, `interaction/` | `mobile-figures-interaction.mjs` | `0 failure(s)` |
| `structure-run.log`, `structure/` | `live-integration-check.mjs` | `0 failure(s)` |
| `en-hangul-rendered.log` | `en-hangul-check.mjs`, 12 rendered EN pages | outside quotes 0; 6 nodes, all verbatim anchors in source tables |

Read live by the web-research tool: glossary KOR/EN (no "결정 되짚어보기" or "Revisiting the decision", 2 "자세히" boxes), EN briefing, EN chapters 2 and 4 (Hangul only in the language switcher and source anchors; chapter 4 has one source table, 24 rows, no aise-core links).

Against aise-core `60a85c9`, this published tree gives `check_sources` 19 findings and `upstream-check` references 16, all from paths moved after `c71fa8a`. Those logs were not kept; the commands reproduce them on `5d10d47`. Their fix is `../2026-11-06-core-boundary/`.

Not checked: a real phone and Safari (DEMO, OD-20).
