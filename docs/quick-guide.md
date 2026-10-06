---
title: Quick Guide — 실제로 써 보기
---

# Quick Guide — 실제로 써 보기

::: tip 이 챕터는 성격이 다릅니다
앞의 네 대분류는 AISE를 **이해하기** 위한 설명이었습니다. 이 챕터는 그 설명을 다 읽지 않아도
따라 할 수 있는, **실제로 쓰려는 분을 위한 실전 참조**입니다 — "지금 무엇을 치면 되는가"만
순서대로 적었습니다. 각 단계가 왜 이렇게 생겼는지는 링크된 설명 페이지에 있습니다.
:::

## 시작하기 전에 알아두실 것

- **필요한 것** — AI 코딩 도구 Claude Code, 그리고 `aise-core` 저장소. 지금 AISE를 Claude Code에
  묶어주는 부분은 전부 `adapters/claude-code/`와 `.claude/`(슬래시 명령·hook) 안에 있습니다.
- **솔직하게 먼저 말씀드릴 것** — 이 조직의 실제 구성원과 부서 기록이 담긴 `instance/`는
  `aise-core`와 **별도의 저장소**라서, 저장소를 받아도 함께 따라오지 않습니다. 새 조직을 빈
  `instance/`로 처음 세우는 절차는 아직 정해져 있지 않다고 `governance/DEPLOYMENT_READINESS.md`가
  스스로 적어 두고 있습니다. 아래 단계는 **이미 `instance/`가 있는 배포**(지금 이 사이트를 만든
  배포가 그렇습니다)를 기준으로 합니다.
- **대화 언어** — 모드를 처음 선언할 때 어떤 언어로 대화할지 한 번 묻고 `.aise/language`에
  기억합니다. 조직의 원문 파일은 언어 설정과 상관없이 영어로 유지됩니다.

## 1. 일을 시키려면 — `/aise:op`

Claude Code 세션을 열고 이렇게 칩니다.

```text
/aise:op
```

이 한 줄로 일어나는 일(`.claude/commands/aise/op.md`):

1. 이 세션의 모드가 `op`(Operator)로 기록됩니다. 이 선언이 없으면 보호된 경로에 쓰기가 막힙니다.
2. 부서원 역할 정의가 빠져 있으면 스크립트(`realize_role.py`)가 자동으로 다시 만듭니다.
3. 모드 진입 체크리스트(`schema/op_mode_entry_checks.yaml`)가 매번 전부 돌고, 결과를 알려줍니다.
4. 이 세션이 곧 `OP_ORCHESTRATOR`(업무참모)가 되어, 자기 운영 규칙 문서를 끝까지 읽습니다.

그다음부터는 **하고 싶은 일을 평범한 말로** 적으시면 됩니다. 어느 부서에 맡길지 지목할 필요는
없습니다 — 그건 업무참모가 판단합니다. 왜 말은 늘 업무참모 한 명에게만 거는지는
[일을 맡기는 법](/usage) 참고.

## 2. 프로젝트(부서)를 시작하려면

새로운 일을 말하면 업무참모가 먼저 이게 **실제로 누군가에게 일을 맡겨야 하는 일인지**를 봅니다.
단순 질문이면 부서를 만들지 않고 바로 답합니다(`schema/OP_ORCHESTRATOR.md` §3).

맡겨야 하는 일이면 department(부서)가 하나 생깁니다.

| 무엇이 생기나 | 어디에 |
|---|---|
| 부서 목록의 새 줄 (`project-id`, 상태) | `instance/workspace/index.yaml` |
| 부서 기록 세 파일 | `instance/workspace/<project-id>/execution.md`, `directive.md`, `project-record.md` |

- 부서는 보통 `draft`(준비 중)로 시작합니다. 의도가 이미 분명하고 규모가 가늠되면 바로
  `active`로 시작하기도 합니다.
- `draft`에서 `active`로 넘어갈 때는 업무참모가 **"이제 실제로 착수할까요?"를 물어봅니다.** 여기서
  답하시는 게 착수 승인입니다(왜 자동이 아니라 묻는지는 [일을 맡기는 법](/usage)의 결정 상자).
- 필요한 역할이 조직에 없으면 채용이 일어나고, 그 판단은 `HR_ORCHESTRATOR`(인사참모)가 합니다.
  기존 역할의 정의 변경·해고도 인사참모가 스스로 하며 사용자 결재는 없습니다 — 대신 업무참모의 상황 보고에 실립니다.

## 3. 진행 중에 할 일

| 하고 싶은 것 | 이렇게 하시면 됩니다 |
|---|---|
| 지금 부서들이 어떤 상태인지 보기 | 업무참모에게 "지금 부서 현황 알려줘"처럼 묻기 — `index.yaml`을 읽어 `draft`/`active`/`ended` 부서를 요약해 줍니다 |
| 이어서 지시하기 | 그냥 업무참모에게 말하기 — 부서 PM이 지금 돌고 있지 않으면 그 부서의 `directive.md`에 적어 두고, 다음 PM run이 흡수합니다 |
| 되돌리기 어려운 일 승인하기 | 공개 배포, `main` 병합 같은 것은 부서가 PR까지만 만들고, 병합은 사용자가 합니다 |
| 비용과 위임 구조 보기 | `/aise:usage` — 이 세션의 토큰 사용량과 누가 누구에게 무엇을 맡겼는지(실행 그래프)를 실제 기록에서 재구성해 보여줍니다 |

## 4. 세션이 끊기기 전에 — `/aise:handoff`

컨텍스트가 바닥나거나 자리를 비우기 전에 칩니다.

```text
/aise:handoff
```

- Operator 모드에서는 지금까지의 상황을 **그 부서의 `directive.md`에 한 항목으로** 남깁니다. 다음 PM
  run이 그걸 읽고 자기 기록으로 옮깁니다.
- Meta 모드에서는 `continuity/`에 인수인계 기록을 남깁니다.
- 요약하지 않고 "아직 판단이 남은 것"만 걸러서 남기는 방식입니다 — 이유는
  [세션을 넘어 이어가기](/handoff).

## 5. 조직 자체를 고치려면 — `/aise:meta`

역할을 새로 설계하거나, 규칙·워크플로우를 바꾸고 싶을 때만 씁니다.

```text
/aise:meta
```

- 이 세션이 `MG_ORCHESTRATOR`(경영참모)가 되고, `continuity/`에 이어서 할 일이 남아 있으면 먼저
  그걸 브리핑합니다(`.claude/commands/aise/meta.md`).
- 보호된 핵심 경로(헌법·스키마·거버넌스 등)는 이 모드에서만 고칠 수 있습니다. 반대로 이 배포의
  `instance/` 데이터는 Meta 모드에서도 건드리지 않습니다.
- 특정 AI 도구에서만 동작하는 것을 조직에 넣으려 할 때는 Meta 모드라도 먼저 확인을 받습니다.
  자세한 구분은 [Operator vs Meta Mode](/operator-vs-meta-mode).

## 6. 끝내려면

부서를 끝낼지는 **사용자가 정합니다.** PM은 스스로 부서를 끝내지 않습니다 — "이 결과가 내 의도를
충족하는가"는 사용자만 판정할 수 있기 때문입니다. 업무참모에게 끝내라고 말하면, PM이 최종 보고를
`execution.md`에 쓰고 업무참모가 확인하면 부서는 `ended`, 업무참모가 회고(재사용할 교훈이 있는지
검토)까지 마치면 `closed`가 됩니다(`schema/README.md` "Department lifecycle", [Lifecycle](/lifecycle)).

## 한 장으로

| 순서 | 치는 것 / 하는 것 |
|---|---|
| 1 | `/aise:op` |
| 2 | 하고 싶은 일을 평범한 말로 |
| 3 | 착수 여부를 물어오면 답하기 |
| 4 | 부서가 올린 PR 검토·병합 |
| 5 | 끊기기 전 `/aise:handoff` |
| 6 | 조직을 고칠 땐 `/aise:meta` |
| 7 | 끝낼 땐 업무참모에게 종료 지시 |

용어가 낯설면 [Glossary](/glossary)에 전부 모아 두었습니다.

*근거: `.claude/commands/aise/{op,meta,handoff,usage}.md`; `schema/OP_ORCHESTRATOR.md` §3;
`schema/README.md` "Storage", "Department lifecycle"; `governance/MODE_POLICY.md`;
`governance/DEPLOYMENT_READINESS.md`.*
