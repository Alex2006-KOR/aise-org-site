---
title: Staff & Governance
---

# Staff & Governance

사용자와 부서 사이에는, 뎁스에는 포함되지 않지만 조직 운영을 상시 지원하는 세 개의
**staff(참모)** 역할이 있습니다 — 실행 책임을 지지 않고, 서로 동급이며, 누구도 다른 쪽에
보고하지 않습니다.

- **업무참모(OP_ORCHESTRATOR)** — 사용자의 의도를 조직이 수행 가능한 업무로 바꾸고, 가장
  적합한 부서를 구성해 실행 그래프를 조립합니다. 인사와 provisioning은 직접 결정하지 않고
  각각 인사참모/자산참모에게 요청만 합니다.
- **인사참모(HR_ORCHESTRATOR)** — 채용과 조직개편을 전담합니다. 채용은 인사참모 단독 승인으로
  끝나지만(일상적 마찰을 줄이기 위해), 조직개편(기존 역할의 통합·분화·재분류·해고)은 인사참모가
  분석·제안만 하고 최종 승인은 항상 사용자가 합니다.
- **자산참모(AS_ORCHESTRATOR)** — provisioning(도구·MCP·스킬 등 role이 실제로 쓸 수 있는
  자산)을 전담합니다. 도구·MCP·스킬은 조직에 귀속되는 공유 자산이며, 개인에게 귀속되지
  않습니다. 모든 role은 예외 없이 자산참모의 provisioning 승인을 거칩니다.

책임은 **실행 책임**(부서가 지는, 결과물의 기술적 정확성에 대한 책임)과 **운영 책임**(세
참모가 각자 영역에서 지는 책임)으로 나뉩니다. 참모는 실행 책임을 지지 않습니다 — 이 구분이
없으면 문제가 생겼을 때 "누구 책임인가"가 다시 흐려지기 때문입니다.

Meta 모드에서는 이 셋과 별개로 **경영참모(MG_ORCHESTRATOR)**가 조직 스키마(CONSTITUTION,
schema, governance) 자체의 진화를 분석·제안하는 상시 파트너 역할을 합니다 — 다만 실제
변경은 항상 사용자 확인을 거칩니다.

*근거: `CONSTITUTION.md` §10.3–§10.9, §11; `schema/OP_ORCHESTRATOR.md`,
`schema/HR_ORCHESTRATOR.md`, `schema/AS_ORCHESTRATOR.md`, `schema/MG_ORCHESTRATOR.md`.*
