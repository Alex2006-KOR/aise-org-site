---
title: Structural Principles / OCP
---

# Structural Principles / OCP

이 조직의 구현 자체도 SOLID 원칙, 특히 **개방-폐쇄 원칙(OCP)**을 따릅니다.

- 새로운 AI 도구를 지원하려면 새로운 `adapters/<tool>/`를 추가합니다 — 기존 core
  (`CONSTITUTION.md`, `schema/`, `assets/`, `knowledge/`, `continuity/`, `governance/`)는
  건드리지 않습니다.
- 새로운 역할/역량을 추가하려면 `schema/` 안에 새 파일을 추가합니다 — 기존 adapter나 core
  로직은 수정하지 않습니다.
- Core는 도구에 독립적인 문서/데이터로만 구성됩니다. 특정 AI 도구에만 있는 기능(예: hooks,
  slash command, subagent 형식)은 반드시 `adapters/`에만 존재합니다.

즉, 조직에 새로운 능력이나 새로운 실행 도구가 필요해질 때, 이미 있는 것을 고치는 대신 확장을
더하는 방식으로 자란다는 뜻입니다.

*근거: `CONSTITUTION.md` §9.*
