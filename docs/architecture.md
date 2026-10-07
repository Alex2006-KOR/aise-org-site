---
reflects-through: rescope-story-track (P-16, 2026-10-07; set to the merge commit when merged)
aise-core-through: a8aac11
title: aise-org-site 아키텍처
outline: deep
---

<!-- 이 문서는 사이트 페이지가 아니라 유지보수자용 설계 문서다. `config.mts`의 `srcExclude`로 빌드에서 제외한다.
     구조·동작을 바꾸는 PR은 같은 PR에서 이 문서를 갱신하고 reflects-through를 올린다. -->

# aise-org-site 아키텍처

AISE 조직(철학·구조·거버넌스)을 일반 독자에게 소개하는 정적 문서 사이트. 서버 런타임은 없다(INV-3).

## 1. 구성 한눈에

| 층 | 선택 | 위치 |
|---|---|---|
| 정적 사이트 생성기 | VitePress 1.x + `vitepress-plugin-mermaid`(mermaid 다이어그램) | `package.json` |
| 콘텐츠 | Markdown 27페이지 × 2언어(KOR root, EN `/en/`): 브리핑(Home) + 이야기 7(`story/`) + 참고 19 | `docs/*.md`, `docs/story/*.md`, `docs/en/**` |
| 설정 | 로케일·내비·사이드바·mermaid·`srcExclude`(이 문서를 빌드에서 제외) | `docs/.vitepress/config.mts` |
| 테마 | 기본 테마 확장: `Layout.vue`(`doc-before` 슬롯에 모두 펼치기/접기), `Cite.vue`·`SourceTable.vue`(근거 표기), `levels-markdown.ts`(`lead`/`point` 컨테이너), `levels.ts`(딥링크·인쇄), `custom.css` | `docs/.vitepress/theme/` |
| 근거 표 | 페이지 slug별 출처 목록, `repoPublic` 링크 스위치 | `docs/.vitepress/sources.ts` |
| 산출물 | `./dist` (`outDir: ../dist`) | 빌드 시 생성, git 제외 |
| 배포 | GitHub Actions → GitHub Pages | `.github/workflows/deploy.yml` |
| 점검 스크립트 | upstream 대조(§7), 실 브라우저 점검(`browser-check.mjs`, `levels-check.mjs`, `mermaid-label-check.mjs`, `wording-check.mjs`), 출처 표 점검(`check_sources.mjs`) — 빌드 대상 아님 | `scripts/` |

## 2. 빌드·배포 계약

- `npm run build` = `vitepress build docs`. 산출물 경로 `./dist`는 빌드와 배포 워크플로우 사이의
  고정 계약이다(`config.mts`의 `outDir: '../dist'` ↔ 워크플로우 `upload-pages-artifact.path: ./dist`).
- `base: '/aise-org-site/'` — 프로젝트 페이지(`https://alex2006-kor.github.io/aise-org-site/`)라
  모든 자산·링크에 접두사가 붙는다.
- 죽은 링크는 VitePress가 빌드 실패로 처리하므로, 빌드 성공이 링크 무결성 증거다.
- 배포: `main` push 또는 수동 실행(`workflow_dispatch`) 시 `build`(Node 20, `npm ci`, `npm run build`,
  artifact 업로드) → `deploy`(`actions/deploy-pages`, 환경 `github-pages`). 동시 실행은 `pages` 그룹으로
  직렬화하고 진행 중 배포는 취소하지 않는다.
- `github-pages` 환경의 배포 브랜치 정책은 `main`을 허용해야 한다(과거 `dev`만 허용돼 첫 배포가 실패한 이력).

## 3. 브랜치와 승격

`feature/<name>` → PR → `dev`(기본 브랜치, 통합) → PR(`dev`→`main`, 승격) → 자동 배포.
`main`/`dev`에 직접 push하지 않는다. 병합·승격은 operator가 한다.

## 4. 언어(i18n)

- KOR이 root 로케일이라 기존 URL(`/philosophy` 등)이 그대로 유지된다. EN은 `docs/en/` 아래 같은 파일명.
- VitePress `locales`가 언어 전환 드롭다운을 자동 렌더링한다(커스텀 토글 없음).
- **동기화 규칙(INV-5)**: 콘텐츠를 바꾸면 KOR과 EN을 같은 PR에서 함께 갱신한다. 로케일별 nav/sidebar는
  `config.mts`에 각각 있으므로 페이지를 추가·개명하면 두 블록을 모두 고친다.

## 5. 정보 구조(IA)

2026-10-07 재구성(P-16): **브리핑(Home) → 이야기 트랙 → 참고 자료**. 기존 URL은 하나도 바꾸지 않았다.

| 묶음 | 페이지 |
|---|---|
| 브리핑 | `index` — 임시 정의 한 줄, 이야기 순서(단계마다 1–2줄 + 링크), 읽는 법 |
| 이야기 트랙 | `story/background` · `story/at-a-glance` · `story/why-organization` · `story/principles` · `story/how-it-is-kept` · `story/distribution` · `story/growth-and-limits` (순서대로, "다음으로" 링크) |
| 참고 자료 | 그룹 랜딩 4(`background`, `how-it-works`, `in-practice`, `value`)와 그 아래 쪽들, `overview`(예전 Home 본문), `quick-guide`, `glossary` |

참고 쪽은 머리에 `::: lead` 한 문장과 `.aise-ref-note`(어느 이야기 쪽에서 이어지는지)를 둔다. 본문 3단계화는 P-17.
사이드바: 브리핑 · 이야기(펼침) · 참고 자료(그룹은 접힘). 상단 nav: 브리핑 · 이야기 · 참고 자료 · Quick Guide.

## 6. 페이지 서식 규약

- **3단계(이야기 트랙·브리핑)**: `::: lead`(한 문장, `data-level="1"`) → `::: point 요점 {#id}`(요점은 보임, `summary data-level="2"`;
  본문은 접힘, `details data-level="3"`; 본문이 없으면 접히지 않는 불릿). 레벨은 HTML `data-level`로 구별한다(발표 모드 호환,
  발표 모드는 만들지 않음). point 본문 안에 `::: info` 같은 컨테이너를 넣으려면 바깥을 `:::: point … ::::`(콜론 4개)로 연다
  (markdown-it-container는 같은 수 이상의 콜론에서 닫힌다).
- 모두 펼치기/접기는 point가 있는 쪽에 테마가 자동으로 넣는다. `#id` 링크는 접힌 point를 펼치고 스크롤한다. 인쇄 시 전부 펼친다.
- **근거 표기(시범, `story/how-it-is-kept`만 — OD-11)**: `<Cite ids="…"/>`는 종류·개수 요약 → 펼치면 목록(이름·종류·날짜·
  성격·경로), `<SourceTable/>`는 쪽 끝의 전체 표. 출처는 `sources.ts` 한 곳에(KOR/EN 공용), `repoPublic=false`인 동안 링크 없음.
  `scripts/check_sources.mjs <aise-core>`가 경로·제목 실존과 id를 점검한다. 다른 쪽은 아직 기존 "근거:" 줄 형식.
- 검토용 질문은 `::: warning 검토 질문 Q-n` 상자로 둔다 — `main` 승격(공개) 전에 지운다.
- 참고 쪽: 페이지 머리 `::: tip 읽는 자리` 블록(대분류·위치·앞뒤 연결), 끝 "다음으로" 링크. 절 이름 "정리"(EN "Wrap-up").
  결정 서사는 "결정 되짚어보기" 상자 — 문제/조사/해결/강점 라벨 + 개조식 불릿.
- 용어 표기: 페이지당 첫 등장에만 `AISE 실제 명칭(쉬운 말)` 형식(department 포함). 이야기 트랙은 쉬운 말 위주.
- 다이어그램: 손으로 쓴 인라인 SVG와 mermaid 두 종류. 인라인 SVG `<text>`에는 `fill`을 주지 않는다 —
  `custom.css`가 `fill: currentColor`로 다크모드 가시성을 처리한다. 강조색은 명시 `fill`(예: `#c1652a`)로
  두면 규칙에서 제외된다. mermaid는 플러그인이 라이트/다크 테마를 스스로 바꾼다. mermaid 라벨은 `.vp-doc`의 문단
  줄 높이를 받지 않게 한다(`custom.css`; 받으면 측정 높이보다 커져 마지막 줄이 잘림 — 2026-10-07 수정).
- 직접 인용은 `aise-core` 원문과 축자 일치해야 하고(INV-1/INV-4), EN 본문에는 인용 밖 한국어가 없어야 한다.
- 공개 사이트 규칙: 회사는 일반화, 수직 구조의 우열 주장 없음, 측정 결과 주장 없음, 성과는 TBD, 미검증은
  "설계됨 / 구현됨 / 검증 전"으로 표시.

## 7. 콘텐츠 근거와 갱신 원천

콘텐츠는 aise-core의 `CONSTITUTION.md`, `schema/`, `governance/`, `adapters/`, `knowledge/decisions/`에
근거한다. aise-core가 바뀌면 이 사이트가 어긋날 수 있다(과거 stale 3건은 우연히 발견됨).

**점검 절차(DoD N-05, 2026-10-01 정착).** 머리말 `aise-core-through:`는 사이트가 마지막으로 대조된 aise-core
커밋이다. aise-core가 바뀌었다는 소식이 오면(또는 콘텐츠 PR마다) `scripts/upstream-check.sh [aise-core 경로]`를
실행한다. 세 축을 본다.

1. **참조** — 경로·decision 인용이 아직 풀리는가(aise-core `governance/reference_check.py` + 옛 decision 파일명
   잔존 검사. reference_check는 "renamed/deleted"가 들어간 줄을 건너뛰므로 슬러그에 그 단어가 있는 인용을 놓친다 —
   두 번째 검사가 그 구멍을 메운다). 고칠 새 인용은 reference_check가 줄마다 출력한다.
2. **직접 인용** — `*"…"*` 형식의 영문 인용 중, `aise-core-through`에서는 축자 일치했는데 지금은 아닌 것
   (`scripts/check_quotes.py --baseline`). 처음부터 축약·의역이던 인용(2026-10-01 기준 105건 중 24건)은 보고하지 않는다.
3. **읽을 목록** — `aise-core-through` 이후 바뀐 규칙 문서와 새 decision 항목. 서술된 *규칙 자체*가 바뀌었는지는
   스크립트가 판정할 수 없으므로, 이 목록을 사이트 용어로 grep해 해당 페이지만 다시 읽는다. 과거 결정 서사는
   역사이므로 고치지 않고 "(이후 바뀜)" 주석만 단다. 현재형 서술과 "직접 확인해 보려면" 단계는 고친다.

세 축을 처리한 PR에서 `aise-core-through`를 올린다. `scripts/`는 빌드 대상이 아니다(`docs/` 밖).

## 8. 알려진 한계

- 휴대폰 폭(390px): 페이지 수준 가로 넘침은 없으나, 인라인 SVG 다이어그램 라벨이 축소되어 유효 글자 크기가
  약 4~7px(홈, 조직의 모양, 참모와 거버넌스, Operator vs Meta Mode, 생명주기)이다. 표 4곳·코드블록 2곳은
  자체 가로 스크롤이다(2026-09-30 실 브라우저 측정). 미해결 — DoD U-06.
- `docs/work/3way-reference-answers.md`는 내비에 없는 작업 문서인데도 빌드 대상이라 `/work/3way-reference-answers`
  URL로 공개돼 있다(2026-09-30 `dist/work/` 확인). 의도된 공개인지는 미확정 — operator 확인 사항.
