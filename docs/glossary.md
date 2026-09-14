---
title: Glossary — 여기 나온 말들을 한 번에
---

# 여기 나온 말들을 한 번에

이 사이트 곳곳에서 쓴 용어를 모아뒀습니다. 어디서 나온 개념인지 궁금하면 링크를 따라가면 됩니다.

- **부서(Department)** — PM과 부서원으로 구성된, 하나의 업무를 책임지는 단위. 영속적일 수도,
  특정 task 단위로 결성·해체되는 project일 수도 있습니다.
- **부서원(Project Member)** — 하나의 분야에 대한 단일 책임(SRP)을 갖는 전문가 역할.
- **PM(Project Manager)** — 부서의 업무를 분해·분배하고, 부서를 대표해 업무참모와 소통하는 역할.
  [뎁스-2 피라미드](/organization-model)에 속하는 line 역할.
- **업무참모 / 인사참모 / 자산참모 / 경영참모** — [Staff & Governance](/staff-governance) 참고.
- **조직도(Organization Chart) / 실행 그래프(Execution Graph)** — [Organization
  Model](/organization-model) 참고.
- **Provisioning** — 어떤 역할이 실제로 쓸 수 있는 도구·MCP·스킬의 범위. 자산참모가 승인합니다.
- **Role-class** — 카탈로그(`instance/roles/`)에 등록된 재사용 가능한 역할 정의. 실제 부서에
  합류할 때 그 부서만의 도메인 프로필이 더해집니다.
- **reuse_tier** — role-class의 재사용 가능성 등급(`schema-mandated` / `generic-technical` /
  `domain-specific`).
- **draft / active / ended / closed** — 부서(project)의 생명주기 상태. [Lifecycle](/lifecycle)
  참고.
- **Operator 모드 / Meta 모드** — [Operator vs Meta Mode](/operator-vs-meta-mode) 참고.
- **Project Record** — PM의 상세 연속성 기억(`project-record.md`), 업무참모가 남기는 미흡수
  지시함(`directive.md`), 업무참모에게 보내는 경량 보고(`report.md`)로 구성됩니다.

이 용어들 중 둘은 그 자체로 짧은 사연을 갖고 있습니다 — 왜 이런 구분이 필요했는지 알면, 위
목록의 다른 용어들도 왜 지금의 이름과 자리로 갈라져 있는지 더 선명해집니다.

::: info 결정 되짚어보기 — 같은 이름이 두 가지를 가리키면 안 된다
**문제.** 한때 `org/`라는 디렉터리 하나가 이 조직 자신의 스키마 파일(`README.md`,
`OP_ORCHESTRATOR.md` 등, aise-core 저장소 소속)과, 실제 배포의 인스턴스 데이터(역할 파일,
Project Record 등, `aise-instance-prod`라는 완전히 별도의 저장소 소속)를 동시에 담고 있었습니다.
감사 도중 이걸 들여다보던 업무참모 자신도 어느 git이 뭘 추적하는지 헷갈려 한 번 오진했습니다.

**조사.** 결정 문서는 이 문제의 본질을 이렇게 짚습니다 — *"A directory whose name is the mount
point for two independent, differently-scoped git repositories is a standing source of
confusion, not a one-time documentation gap"*(이름 하나가 서로 다른 두 git 저장소의 마운트
지점 역할을 겸하는 디렉터리는, 한 번 고치면 끝나는 문서화 공백이 아니라 계속 혼란을 낳는
구조적 문제다).
(근거: `knowledge/decisions/2026-08-06-org-instance-directory-split.md`)

**해결.** 인스턴스 데이터의 마운트 지점을 `org/`에서 그 저장소 자신의 실제 이름을 딴
**`instance/`**로 옮겼습니다. `org/`는 이제 스키마 파일 4개만 남습니다.

**그래서 생긴 강점.** *"org/ is schema, full stop; instance/ is this deployment's own data,
full stop"*(org/는 스키마, 그뿐이고, instance/는 이 배포 자신의 데이터, 그뿐이다) — 경로
이름만 봐도 구분이 self-evident해졌습니다. 위 목록의 "Project Record"가 왜 하필
`instance/workspace/<project-id>/` 밑에 있는지도 이걸로 설명됩니다.
:::

::: info 결정 되짚어보기 — 이 용어집이 인용하는 knowledge/decisions/는 어떻게 채워지나
**문제.** 한 부서의 Decisions 항목이 전혀 무관한 다른 부서에서 독자적으로 다시 채택되는 일이
실제로 있었는데, 그때마다 인용할 수 있는 조직 차원의 출처가 없었습니다 — 두 부서 모두 아직
`active`인 채로 서로의 결정을 재사용하는 상황은, 부서가 `closed`돼야 열리는 회고 리뷰로도, 부서
안에서만 작동하는 승격 규칙으로도 잡히지 않는 사각지대였습니다.

**조사.** 결정 문서는 그 틈을 이렇게 메웁니다 — *"When a department's Decisions entry is found
to have been independently adopted by a second, unrelated department ... that reuse is itself
the trigger to write it up in knowledge/decisions/ immediately"*(한 부서의 Decisions 항목이
전혀 무관한 다른 부서에서 독자적으로 채택됐다는 게 확인되면, 그 재사용 자체가
knowledge/decisions/에 즉시 기록해야 하는 트리거다).
(근거: `knowledge/decisions/2026-08-13-cross-department-decision-promotion-trigger.md`)

**해결.** 부서가 끝나기를 기다리지 않고, 재사용이 확인되는 바로 그 순간이 승격 트리거가
됩니다 — `closed` 시점의 회고 리뷰는 이 트리거가 놓친 것들을 훑는 마지막 그물로만 남습니다.

**그래서 생긴 강점.** *"whoever reads only one department's Project Record has no signal that
the decision they're re-deriving is already settled org-wide"*(한 부서의 Project Record만
읽는 사람은, 자기가 다시 유도해 내고 있는 결론이 이미 조직 전체에서 정착된 것이라는 신호를
전혀 받지 못한다)던 문제가 사라집니다. 이 용어집이 지금 인용하는 결정 문서들도 전부 이런
경로로 `knowledge/decisions/`에 자리 잡은 것들입니다.
:::

## Quick guide

**한 문장으로.** 이 용어집은 사이트 곳곳에서 쓴 말을 모은 색인이자, 그 말들이 왜 지금의 형태로
갈라졌는지(같은 이름에 두 가지 뜻을 담지 않는다, 조직 차원 지식은 부서가 끝나길 기다리지 않고
승격된다)를 보여주는 축소판이기도 합니다.

**이 페이지를 직접 확인해 보려면**

1. `knowledge/decisions/` 디렉터리에서 파일명을 훑어보는 것만으로도 이 조직이 무엇을 두고
   고민해 왔는지 감을 잡을 수 있습니다.
2. `instance/workspace/aise-org-site/project-record.md`(바로 이 사이트를 만든 부서 자신의
   기록)를 열어보면, 이 페이지가 인용한 결정들이 실제로 어떻게 쓰였는지 볼 수 있습니다.
3. `org/` 디렉터리에 파일이 정확히 4개(`README.md`/`OP_ORCHESTRATOR.md`/`HR_ORCHESTRATOR.md`/
   `AS_ORCHESTRATOR.md`)뿐이라는 것도 직접 셀 수 있습니다.

**다음으로.** 처음으로 돌아가 전체 그림을 다시 보고 싶다면 → [Home](/).

*근거: `CONSTITUTION.md` 전체, `schema/README.md`, `governance/MODE_POLICY.md`;
`knowledge/decisions/2026-08-06-org-instance-directory-split.md`,
`knowledge/decisions/2026-08-13-cross-department-decision-promotion-trigger.md`.*
