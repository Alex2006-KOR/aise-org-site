---
title: Organization Model — 조직도와 실행 그래프
---

# 사람 하나가 여전히 전체를 볼 수 있어야 한다

[Philosophy](/philosophy)에서 정한 다섯 가지 원칙 중 넷째, "책임은 명확해야 한다"를 실제 구조로
옮기면 이렇게 됩니다.

## 그림이 두 장 필요했다

처음엔 조직도 한 장으로 다 그리려고 했습니다. 그런데 "이 일에 누가 책임지는가"를 그리는 선과
"오늘 실제로 누가 누구와 일했는가"를 그리는 선이 자꾸 어긋났습니다. 둘을 억지로 한 장에 넣으면
어느 쪽도 정확하지 않은 그림이 됐습니다. 그래서 아예 그림을 두 장으로 나눴습니다.

- **조직도(Organization Chart)** — 역할, 책임, 권한, 보고 라인을 정의하는 **고정된 책임 구조**입니다.
  누가 누구에게 책임지는지는 정의하지만, 오늘 실제로 어떻게 협업할지는 정의하지 않습니다.
- **실행 그래프(Execution Graph)** — 업무를 실제로 처리하면서 그때그때 만들어지는 **협업 구조**입니다.
  병렬 작업, 임시 서브에이전트, 부서를 넘나드는 협업이 여기서 자유롭게 일어납니다. 조직도를
  발판 삼지만, 조직도 그 자체는 아닙니다.

<figure>
<svg viewBox="0 0 640 380" role="img" aria-label="사용자 아래 부서 A와 부서 B가 있고 각 부서 아래 부서원 두 명씩이 있는 뎁스-2 조직도(실선), 그 위에 서로 다른 부서 부서원 간 협업과 임시 서브에이전트 참여로 이뤄지는 실행 그래프(점선)가 겹쳐 있다">
  <defs>
    <marker id="arrow-org" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>

  <circle cx="320" cy="30" r="14" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="320" y="55" text-anchor="middle" font-size="12" font-weight="600">사용자</text>

  <line x1="320" y1="44" x2="320" y2="78" stroke="currentColor" stroke-width="1.5" />
  <line x1="320" y1="78" x2="172" y2="94" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-org)" />
  <line x1="320" y1="78" x2="468" y2="94" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-org)" />

  <rect x="100" y="95" width="140" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="170" y="120" text-anchor="middle" font-size="12">부서 A — PM</text>

  <rect x="400" y="95" width="140" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="470" y="120" text-anchor="middle" font-size="12">부서 B — PM</text>

  <line x1="170" y1="135" x2="112" y2="173" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-org)" />
  <line x1="170" y1="135" x2="228" y2="173" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-org)" />
  <line x1="470" y1="135" x2="412" y2="173" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-org)" />
  <line x1="470" y1="135" x2="528" y2="173" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-org)" />

  <rect x="60" y="175" width="100" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="110" y="200" text-anchor="middle" font-size="11">부서원 A1</text>

  <rect x="180" y="175" width="100" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="230" y="200" text-anchor="middle" font-size="11">부서원 A2</text>

  <rect x="360" y="175" width="100" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="410" y="200" text-anchor="middle" font-size="11">부서원 B1</text>

  <rect x="480" y="175" width="100" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="530" y="200" text-anchor="middle" font-size="11">부서원 B2</text>

  <path d="M 280 195 C 320 235, 320 235, 360 195" fill="none" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#arrow-org)" />
  <text x="320" y="248" text-anchor="middle" font-size="10" fill="#c1652a">부서 간 협업(실행 그래프)</text>

  <line x1="110" y1="215" x2="110" y2="250" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#arrow-org)" />
  <rect x="40" y="250" width="140" height="40" rx="6" fill="none" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="4 4" />
  <text x="110" y="275" text-anchor="middle" font-size="11" fill="#c1652a">서브에이전트(임시)</text>

  <text x="320" y="335" text-anchor="middle" font-size="11" opacity="0.7">실선 = 조직도(고정된 책임 구조)</text>
  <text x="320" y="353" text-anchor="middle" font-size="11" fill="#c1652a">점선 = 실행 그래프(그때그때 조립되는 협업)</text>
</svg>
<figcaption>사용자 — 부서 — 부서원이라는 뎁스-2 조직도(실선) 위에, 부서를 넘나드는 협업과 임시
서브에이전트 참여로 만들어지는 실행 그래프(점선)가 그때그때 겹쳐진다.</figcaption>
</figure>

## 왜 뎁스를 2로 못박았나

두 번째 질문은 "조직도를 얼마나 깊게 쌓을 것인가"였습니다. 답은 의외로 조직 이론이 아니라 아주
실용적인 데서 나왔습니다 — **사용자 한 명이 조직 전체를 한눈에 파악할 수 있어야 한다.** 뎁스가
깊어질수록 그 사람이 검토해야 할 층이 늘어나고, 결국 무슨 일이 일어나는지 아무도 온전히 파악하지
못하는 상태에 빠집니다. 그래서 라인 조직(실행 책임을 지는 조직)은 딱 두 단계로 고정했습니다 —
**사용자 — 부서 — 부서원.**

부서는 PM과 부서원으로 구성됩니다. PM은 부서원 각자의 역할·책임·역량을 파악하고, 사용자에게서
받은 큰 업무를 부서원이 실제로 감당할 수 있는 크기로 쪼개 나눠줍니다.

*근거: `CONSTITUTION.md` §3, §10.1–§10.2.*
