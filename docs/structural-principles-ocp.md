---
title: Structural Principles / OCP — 고치지 않고 확장한다
---

# 고치지 않고 확장한다

이 조직의 구현 자체도 소프트웨어 설계 원칙을 하나 그대로 따릅니다 — SOLID 중에서도
**개방-폐쇄 원칙(OCP)**입니다. 새로운 게 필요해지면 기존 걸 고치는 대신 옆에 더합니다.

- 새로운 AI 도구를 지원하려면 새로운 `adapters/<tool>/`를 추가합니다 — 기존 core
  (`CONSTITUTION.md`, `schema/`, `assets/`, `knowledge/`, `continuity/`, `governance/`)는
  건드리지 않습니다.
- 새로운 역할·역량이 필요하면 `schema/` 안에 새 파일을 추가합니다 — 기존 adapter나 core 로직은
  수정하지 않습니다.
- Core는 도구에 독립적인 문서·데이터로만 구성됩니다. 특정 AI 도구에만 있는 기능(hooks, slash
  command, subagent 형식 등)은 반드시 `adapters/`에만 존재합니다.

즉 조직에 새로운 능력이나 새로운 실행 도구가 필요해질 때마다, 이미 있는 것을 뜯어고치는 대신
옆에 확장을 붙이는 방식으로 자랍니다 — 오늘 이 사이트에 아홉 페이지를 새로 써 넣은 방식과도
닮았습니다: 기존 열한 페이지의 틀(정보구조)은 그대로 두고, 각 페이지의 내용만 확장했습니다.

*근거: `CONSTITUTION.md` §9.*
