# Live check of the published tree (2026-11-09, run `site-p23-close-2026-11-09`)

Published: `main` `a0584e2` (PR #31, merging `dev` `ab84b0a` = PR #30), deployment run 42185323796 `completed success`
(2026-11-06T08:06:32Z). `git diff origin/dev origin/main` is empty. Real browser: Chromium via Playwright on a local
build of `dev` `ab84b0a`, because this role reads the live site only through its web-research tool.

| File | Check | Result |
|---|---|---|
| `structure-run.log`, `structure/` | `live-integration-check.mjs` | `0 failure(s)`; 9 chapters x KOR/EN: 1 source table each, `<Cite>` 5-20, aise-core links 0; briefing has no citations |
| `sources-run.log` | `check_sources.mjs` against aise-core `7533c7a` | `0 finding(s)` |
| `upstream-run.log` | `upstream-check.sh`, `60a85c9` -> `7533c7a` | references `0 finding(s)`, quotes `0 finding(s) in 8 quote(s)`; reading list reviewed below |

Reading list `60a85c9` -> `7533c7a` (10 commits): `op_mode_entry_checks.yaml` (staff inbox absorbed before any PM;
due re-verifications planned into the session, not done at entry), `OP_ORCHESTRATOR.md` (same, plus the launch report
loses its "every launch" clause), `CONTINUITY_POLICY.md` (natural-observation fields), `adapter_requirements.yaml`
(`staff-inbox-first`), `push.py` (`pr-edit`). The site does not describe any of these at that level: the Quick Guide
says only that the entry checklist runs in full and reports (still true); chapters 6 and 7 describe the inbox and
re-verification without the entry-time rule. No page change; `aise-core-through` raised to `7533c7a`.

Read live by the web-research tool: EN chapter 5 (no `ASSET_POLICY.md`, `asset_command_patterns.yaml` or
`write_policy.yaml`; `instance/assets/policy.md` and `instance/assets/conditions.yaml` present; one source table, 16
rows; no aise-core link), KOR Quick Guide (every path it names exists in aise-core `7533c7a`; no aise-core link). The
live theme chunk named in the deployment log, `assets/chunks/theme.Bzkxlnu1.js`, holds `aise-fig-wide` and
`path:"instance/assets/policy.md"`, and no `ASSET_POLICY`. The local build's theme chunk got another hash
(`theme.CsPFJpAo.js`, 404 live): the CI build (`npm ci`) and this local build differ in environment, so the content
match is by those strings, not by hash. The Pages artifact had expired (`gh run download`: no valid artifacts).

Not checked: a real phone and Safari (DEMO, OD-20).
