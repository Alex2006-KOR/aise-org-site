---
reflects-through: 67eb950b1210c55333e327e923c84fa3c8bff5e6
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
| 콘텐츠 | Markdown 19페이지 × 2언어(KOR root, EN `/en/`) | `docs/*.md`, `docs/en/*.md` |
| 설정 | 로케일·내비·사이드바·mermaid·`srcExclude`(이 문서를 빌드에서 제외) | `docs/.vitepress/config.mts` |
| 테마 | 기본 테마 + CSS 한 파일(레이아웃/컴포넌트 오버라이드 없음) | `docs/.vitepress/theme/` |
| 산출물 | `./dist` (`outDir: ../dist`) | 빌드 시 생성, git 제외 |
| 배포 | GitHub Actions → GitHub Pages | `.github/workflows/deploy.yml` |

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

사이드바는 대분류 4 + Quick Guide + 참고의 계층이다. 대분류는 랜딩 페이지를 가지며, 소분류는 페이지를 더
쪼개지 않고 각 페이지의 `##` 절로 둔다. 상단 nav는 Home·대분류 4·Quick Guide.

| 그룹 | 랜딩 | 페이지 |
|---|---|---|
| 1. 배경 및 철학 | `background` | `philosophy`, `real-world-vs-aise`, `ai-native-principles` |
| 2. 동작 원리 | `how-it-works` | `organization-model`, `staff-governance`, `lifecycle`, `collaboration-model`, `operator-vs-meta-mode` |
| 3. 쓰는 법과 이어가기 | `in-practice` | `usage`, `handoff` |
| 4. 평가와 가치 | `value` | `structural-principles-ocp`, `ultimate-goal` |
| (독립) | — | `index`(Home), `quick-guide`, `glossary`(참고) |

## 6. 페이지 서식 규약

- 페이지 머리: h1 바로 아래 `::: tip 읽는 자리` 블록(대분류·위치·앞뒤 페이지 연결). 끝: "다음으로" 링크.
- 절 이름 "정리"(EN: "Wrap-up"). 결정 서사는 "결정 되짚어보기" 상자 — 문제/조사/해결/강점 라벨 + 개조식 불릿.
- 용어 표기: 페이지당 첫 등장에만 `AISE 실제 명칭(쉬운 말)` 형식(department 포함).
- 다이어그램: 손으로 쓴 인라인 SVG와 mermaid 두 종류. 인라인 SVG `<text>`에는 `fill`을 주지 않는다 —
  `custom.css`가 `fill: currentColor`로 다크모드 가시성을 처리한다. 강조색은 명시 `fill`(예: `#c1652a`)로
  두면 규칙에서 제외된다. mermaid는 플러그인이 라이트/다크 테마를 스스로 바꾼다.
- 직접 인용은 `aise-core` 원문과 축자 일치해야 하고(INV-1/INV-4), EN 본문에는 인용 밖 한국어가 없어야 한다.

## 7. 콘텐츠 근거와 갱신 원천

콘텐츠는 aise-core의 `CONSTITUTION.md`, `schema/`, `governance/MODE_POLICY.md`, `knowledge/decisions/`에
근거한다. aise-core가 바뀌면 이 사이트가 어긋날 수 있다(과거 stale 3건이 우연히 발견됨). 점검 절차는 아직
정해지지 않았다(DoD N-05, 미해결).

## 8. 알려진 한계

- 휴대폰 폭(390px): 페이지 수준 가로 넘침은 없으나, 인라인 SVG 다이어그램 라벨이 축소되어 유효 글자 크기가
  약 4~7px(홈, 조직의 모양, 참모와 거버넌스, Operator vs Meta Mode, 생명주기)이다. 표 4곳·코드블록 2곳은
  자체 가로 스크롤이다(2026-09-30 실 브라우저 측정). 미해결 — DoD U-06.
- `docs/work/3way-reference-answers.md`는 내비에 없는 작업 문서인데도 빌드 대상이라 `/work/3way-reference-answers`
  URL로 공개돼 있다(2026-09-30 `dist/work/` 확인). 의도된 공개인지는 미확정 — operator 확인 사항.
