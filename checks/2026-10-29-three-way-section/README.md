# P-20 — chapter 7 three-way comparison section (2026-10-29, run `p19-live-check-2026-10-28`)

OD-14 as decided ("Pm 제안대로 넣기", 2026-10-28): a section in chapter 7, KOR/EN — totals table, two observations, the label
"한 번의 비교·12문항 — 성능 측정 아님", the comparison date 2026-10-21 and the pinned inputs (aise-core `f9dc210`, llm-wiki pages `88dba25`).

- Content checked against `instance/staff/coordination-record.md` "2026-10-21 — P-11 three-way comparison …" (totals, observations,
  order/independence) and the gold questions in `instance/retrospectives/multi-project-orchestration-pilot-2026-09.md`; both are new
  entries in `sources.ts` (`three-way`, `gold-questions`), anchors checked by `check_sources.mjs` (the only finding is the known
  `architecture.md` false positive, removed by PR #25).
- `npm run build` → `build complete in 32.20s.`
- `levels-check.mjs` chapter 7 KOR/EN × light/dark → `4 page-runs, 64 checks, 0 failure(s)` (`levels-run.log`).
- Screenshots of the section, KOR light and EN dark, read by eye. In KOR the bold lead-ins render at normal weight in this headless
  Chromium (no CJK bold face installed); the markup is the same as EN.
- First person: none (KOR grep hit "문제가" only; EN none).
