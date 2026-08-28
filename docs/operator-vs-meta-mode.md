---
title: Operator vs Meta Mode — 매일 다른 모자를 쓴다
---

# 매일 다른 모자를 쓴다

이 조직을 운영하는 사람은 사실 하루에도 여러 번 다른 역할을 오갑니다 — 오늘 할 일을 맡길 때와,
조직 자체를 손볼 때는 완전히 다른 모드로 움직여야 하기 때문입니다.

- **Operator 모드** — 조직이 지금 가진 모습 그대로 실제 업무를 맡깁니다
  ([Staff & Governance](/staff-governance)에서 본 참모/PM 체계 그대로). 일상적인 채용, 사용자
  승인을 거친 조직개편까지도 여기 포함됩니다 — 조직의 **인스턴스**(지금 누가 무엇을 하고 있는가)는
  바뀌지만, 조직의 **스키마**(뎁스-2 피라미드 같은 구조 그 자체)는 건드리지 않습니다.
- **Meta 모드** — 조직 그 자체를 바꿉니다. 역할을 추가/제거하고, Workflow를 고치고, 포트폴리오·자산
  카탈로그의 스키마를 바꾸고, CONSTITUTION이나 이 정책 자체를 개정하는 일이 여기 속합니다. 이 모드의
  상시 파트너는 경영참모지만, 분석하고 제안할 뿐 최종 승인과 실행은 언제나 사용자를 거칩니다.

<figure>
<svg viewBox="0 0 720 300" role="img" aria-label="Operator 모드는 뎁스-2 피라미드 모양은 그대로 둔 채 그 안의 인스턴스(누가 무엇을 하는가)만 바꾸고, Meta 모드는 피라미드 모양 자체를 바꾸며 항상 사용자 확인을 거친다">
  <defs>
    <marker id="arrow-mode" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>

  <line x1="360" y1="10" x2="360" y2="290" stroke="currentColor" stroke-width="1" stroke-dasharray="3 5" opacity="0.35" />

  <text x="180" y="24" text-anchor="middle" font-size="13" font-weight="600">Operator 모드</text>
  <path d="M 180 55 L 110 175 L 250 175 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
  <line x1="156.7" y1="95" x2="203.3" y2="95" stroke="currentColor" stroke-width="1" opacity="0.6" />
  <line x1="133.3" y1="135" x2="226.7" y2="135" stroke="currentColor" stroke-width="1" opacity="0.6" />
  <text x="266" y="72" font-size="9" opacity="0.7">사용자</text>
  <text x="266" y="112" font-size="9" opacity="0.7">부서</text>
  <text x="266" y="152" font-size="9" opacity="0.7">부서원</text>

  <circle cx="205" cy="163" r="9" fill="none" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="3 3" />
  <text x="205" y="166" text-anchor="middle" font-size="9" fill="#c1652a">+1</text>
  <text x="180" y="200" text-anchor="middle" font-size="9" fill="#c1652a">신규 채용 = 인스턴스 변경</text>

  <text x="180" y="270" text-anchor="middle" font-size="11" opacity="0.8">모양(스키마)은 그대로,</text>
  <text x="180" y="286" text-anchor="middle" font-size="11" font-weight="600" opacity="0.8">안의 사람만 바뀐다</text>

  <text x="540" y="24" text-anchor="middle" font-size="13" font-weight="600">Meta 모드</text>
  <path d="M 540 55 L 470 175 L 610 175 Z" fill="none" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="5 4" />
  <path d="M 450 175 L 630 175 L 650 215 L 430 215 Z" fill="none" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="5 4" />
  <text x="540" y="235" text-anchor="middle" font-size="9" fill="#c1652a">새 층 = 스키마 자체가 바뀜</text>

  <text x="540" y="270" text-anchor="middle" font-size="11" fill="#c1652a">모양 자체가 바뀐다 —</text>
  <text x="540" y="286" text-anchor="middle" font-size="11" font-weight="600" fill="#c1652a">항상 사용자 확인 후</text>
</svg>
<figcaption>Operator 모드는 조직의 모양(뎁스-2 피라미드)을 그대로 둔 채 그 안의 인스턴스만
바꾸고, Meta 모드는 그 모양 자체를 바꾼다 — 후자는 항상 사용자 확인을 거친다.</figcaption>
</figure>

## 왜 굳이 나눴나

두 모드를 뒤섞으면, 일상적인 업무를 처리하다가 조직 자신의 정의가 의도치 않게 흔들릴 수 있습니다.
그래서 매 세션(또는 세션 안의 특정 작업 단위)은 시작 전에 반드시 하나의 모드를 명시적으로
선언해야 합니다 — 조용히 기본값으로 Meta급 쓰기 권한이 주어지는 경우는 없습니다.

*근거: `governance/MODE_POLICY.md`.*
