# Live check after PR #14 / #15 (2026-10-07, run `rescope-site-2026-10-07`)

What was checked: the present-tense "reorganization needs the user's approval" wording, removed by PR #14, is gone
from the published site, and the new text is shown (DoD N-05).

## 1. The published commit
- `main` = `9210150` (PR #15, `dev` → `main`, merged 2026-10-06T00:35:23Z). Its tree is identical to `dev` `c4edda8`
  (`git diff c4edda8 9210150` is empty).
- Deploy: GitHub Actions "Deploy to GitHub Pages" run `37394804625`, head `9210150`, conclusion `success`,
  created 2026-10-06T00:35:26Z (`gh run list --branch main`).

## 2. Real-browser check of the rendered pages — `scripts/wording-check.mjs`
Headless Chromium (Playwright, cached chromium-1243) on `npm run preview` of this branch's build (content identical
to `main`; this branch only adds the OD-07 build exclusion). For 9 pages (KOR + EN quick-guide, operator-vs-meta-mode,
staff-governance, glossary; KOR lifecycle) the rendered text of `.vp-doc` must contain none of the removed phrases
and all the added ones.
- Result: `results.json` — 9/9 OK, `0 failure(s)`.
- Negative control: the same script on a build of `151656f` (the `main` before PR #14/#15) —
  `negative-control-151656f.json`, 9/9 FAIL (`9 failure(s)`): the check does detect the old wording.

## 3. The live URL itself (https://alex2006-kor.github.io/aise-org-site/)
Read with the web-research tool (WebFetch), 2026-10-07, since this role does not make raw outbound calls from a shell:
- `quick-guide.html`: removed sentence absent; shows "기존 역할의 정의 변경·해고도 인사참모가 스스로 하며 사용자 결재는 없습니다 …".
- `operator-vs-meta-mode.html`: "승인을 거친 조직개편까지도 여기 포함됩니다" absent; no "조직개편" on the page.
- `staff-governance.html`: removed sentence absent; box "결정 되짚어보기 — '조직개편'이라는 개념을 없앤 이유" present;
  "위 결정이 만든 '채용은 인사참모 단독, 조직개편은 사용자 결재'라는 두 갈래는 2026-09-30에 다시 바뀌었습니다." (history, marked as changed).
- `glossary.html`: HR_ORCHESTRATOR entry ends "2026-09-30까지 쓰던 "조직개편"이라는 개념은 폐지됐습니다".
- `en/quick-guide.html`, `en/operator-vs-meta-mode.html`: removed sentences absent.
- `en/staff-governance.html`: box "Revisiting the decision — why the concept of "reorganization" was dropped" present.
  (The fetch tool's yes/no on the removed phrase there was ambiguous; the exact-string check is §2, on identical content.)

## 4. Korean glyphs (OQ-10 closed: fonts-noto-cjk installed)
`ko-*.png`: Korean text renders with real glyphs (no tofu). Finding: in mermaid diagrams on Korean pages, the last
line of a node label is clipped when it is a `<b>`/`<i>` line (`ko-staff-governance-mermaid.png`: "정의 변경 · 해고",
"사용자 결재 없음", "부서는 요청만"). OQ-10 attributed this to the missing font; with the font installed it remains, so it
is a layout defect of its own — recorded for a fix (DoD U-02).
