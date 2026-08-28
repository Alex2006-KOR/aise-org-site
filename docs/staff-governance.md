---
title: Staff & Governance — 실행 책임과 운영 책임을 갈라놓은 이유
---

# 실행 책임과 운영 책임을 갈라놓은 이유

부서가 일을 하는 동안, 그 위에서 조직 전체가 어긋나지 않게 살피는 역할이 따로 있어야 했습니다.
그런데 이 역할을 [뎁스-2 피라미드](/organization-model) 안에 그냥 끼워 넣으면 문제가 생깁니다 —
사용자가 부서마다 일일이 이 역할을 거치게 되어 뎁스가 조용히 늘어나기 때문입니다. 그래서 이
역할들은 아예 뎁스 바깥에 두기로 했습니다. 실제 회사에서 참모장교나 비서실이 위계도의 뎁스에
포함되지 않는 것과 같은 이치입니다.

## 세 명의 참모, 서로 동급

- **업무참모** — 사용자의 의도를 실제로 수행 가능한 업무로 바꾸고, 가장 알맞은 부서를 조립합니다.
- **인사참모** — 채용과 조직개편을 전담합니다. 업무 실행 자체에는 관여하지 않습니다.
- **자산참모** — 어떤 역할이 실제로 어떤 도구·MCP·스킬을 쓸 수 있는지(provisioning)를 전담합니다.

셋 다 실행 책임을 지지 않고, 서로 동급이며, 어느 쪽도 다른 쪽에 보고하지 않습니다. 업무참모가
인사나 provisioning을 직접 결정하는 일도 없습니다 — 필요하면 해당 참모에게 요청만 합니다.

<figure>
<svg viewBox="0 0 640 300" role="img" aria-label="사용자 아래 부서-부서원으로 이어지는 라인 조직과, 뎁스에는 포함되지 않지만 사용자와 부서 사이에서 조율하는 업무참모·인사참모·자산참모 세 명의 동급 참모, 그리고 Meta 모드에서만 활동하는 별도의 경영참모">
  <defs>
    <marker id="arrow-sg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>

  <text x="160" y="18" text-anchor="middle" font-size="12" font-weight="600">라인(뎁스 2)</text>
  <circle cx="160" cy="34" r="12" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="160" y="65" text-anchor="middle" font-size="11">사용자</text>
  <line x1="160" y1="46" x2="160" y2="83" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-sg)" />

  <rect x="100" y="85" width="120" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="160" y="110" text-anchor="middle" font-size="12">부서(PM)</text>
  <line x1="160" y1="125" x2="160" y2="158" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-sg)" />

  <rect x="100" y="158" width="120" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="160" y="183" text-anchor="middle" font-size="12">부서원</text>

  <text x="495" y="18" text-anchor="middle" font-size="12" font-weight="600">참모(Staff) — 뎁스 밖</text>
  <path d="M 220 100 C 300 100, 330 90, 392 82" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 4" />
  <text x="300" y="90" text-anchor="middle" font-size="9" opacity="0.7">필요할 때만 경유</text>

  <rect x="392" y="65" width="86" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="435" y="90" text-anchor="middle" font-size="11">업무참모</text>

  <rect x="486" y="65" width="86" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="529" y="90" text-anchor="middle" font-size="11">인사참모</text>

  <rect x="580" y="65" width="52" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="606" y="90" text-anchor="middle" font-size="10">자산<tspan x="606" dy="11">참모</tspan></text>

  <line x1="478" y1="85" x2="486" y2="85" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 3" />
  <line x1="572" y1="85" x2="580" y2="85" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 3" />
  <text x="512" y="122" text-anchor="middle" font-size="10" opacity="0.7">동급 · 실행 책임 없음 · 서로 보고하지 않음</text>

  <path d="M 435 105 C 400 135, 260 130, 222 108" fill="none" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#arrow-sg)" />
  <text x="330" y="150" text-anchor="middle" font-size="10" fill="#c1652a">부서 조립 · 지시</text>

  <rect x="452" y="200" width="178" height="52" rx="6" fill="none" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="4 4" />
  <text x="541" y="221" text-anchor="middle" font-size="11" fill="#c1652a">경영참모</text>
  <text x="541" y="238" text-anchor="middle" font-size="9" fill="#c1652a">Meta 모드 전용 · 뎁스 밖</text>
  <line x1="529" y1="105" x2="541" y2="200" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="4 4" />
  <text x="600" y="180" text-anchor="middle" font-size="9" fill="#c1652a">실행에는 관여 안 함</text>
</svg>
<figcaption>왼쪽은 뎁스-2 라인 조직, 오른쪽 위는 뎁스 밖에서 서로 동급으로 일하는 세 참모,
오른쪽 아래는 Operator 모드 조직 운영에는 관여하지 않고 Meta 모드에서만 활동하는 경영참모.</figcaption>
</figure>

## 책임을 두 종류로 나눈 이유

**실행 책임**(부서가 지는, 결과물의 기술적 정확성에 대한 책임)과 **운영 책임**(세 참모가 각자
영역에서 지는 책임)을 섞으면, 문제가 생겼을 때 "누구 책임인가"가 다시 흐려집니다.
[Philosophy](/philosophy)의 넷째 원칙이 다시 등장하는 지점입니다.

## Meta 모드의 파트너

이 셋과 별개로, 조직 스키마(CONSTITUTION·schema·governance) 자체의 진화를 분석·제안하는
**경영참모**가 있습니다 — 다만 오직 Meta 모드에서만 활동하고, 실제 변경은 항상 사용자 확인을
거칩니다. 자세한 구분은 [Operator vs Meta Mode](/operator-vs-meta-mode)에서 이어집니다.

*근거: `CONSTITUTION.md` §10.3–§10.9, §11; `schema/OP_ORCHESTRATOR.md`,
`schema/HR_ORCHESTRATOR.md`, `schema/AS_ORCHESTRATOR.md`, `schema/MG_ORCHESTRATOR.md`.*
