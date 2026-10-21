---
title: 1. 왜 시작했나 — 여러 AI 프로젝트의 비용과 무질서
---

# 1. 왜 시작했나

::: lead
AI 에이전트로 여러 프로젝트를 함께 진행하면 비용은 빠르게 늘고 결과는 일정하지 않다. aise-core는 이 두 문제에서 출발했다.
:::

## 같은 규칙을 매번 다시 설명한다

워크플로우마다 따라붙는 공통 규칙이 있다. 사내망 전용 환경이라는 점, 외부 MCP 서버를 쓸 수 없다는 점, 참고할
정보의 위치, 지금 돌아가는 실행 환경이 그런 규칙이다. 에이전트는 이것을 기억하지 않는다. 워크플로우를 하나 만들
때마다 같은 설명을 처음부터 다시 넣어야 했다.

<figure>
<svg viewBox="0 0 560 250" role="img" aria-label="워크플로우 A, B, C가 각각 공통 규칙의 사본을 따로 가지고 있고, 그 아래에 각자의 고유 단계가 있다">
  <text x="280" y="24" text-anchor="middle" font-size="14" font-weight="600">워크플로우마다 공통 규칙을 다시 넣는다</text>
  <g>
    <rect x="20" y="45" width="160" height="180" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
    <text x="100" y="68" text-anchor="middle" font-size="13" font-weight="600">워크플로우 A</text>
    <rect x="34" y="82" width="132" height="58" rx="5" fill="none" stroke="#c1652a" stroke-width="2" />
    <text x="100" y="106" text-anchor="middle" font-size="13" fill="#c1652a">공통 규칙</text>
    <text x="100" y="126" text-anchor="middle" font-size="12" fill="#c1652a">(사본 1)</text>
    <rect x="34" y="152" width="132" height="58" rx="5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
    <text x="100" y="186" text-anchor="middle" font-size="13">고유 단계</text>
  </g>
  <g>
    <rect x="200" y="45" width="160" height="180" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
    <text x="280" y="68" text-anchor="middle" font-size="13" font-weight="600">워크플로우 B</text>
    <rect x="214" y="82" width="132" height="58" rx="5" fill="none" stroke="#c1652a" stroke-width="2" />
    <text x="280" y="106" text-anchor="middle" font-size="13" fill="#c1652a">공통 규칙</text>
    <text x="280" y="126" text-anchor="middle" font-size="12" fill="#c1652a">(사본 2)</text>
    <rect x="214" y="152" width="132" height="58" rx="5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
    <text x="280" y="186" text-anchor="middle" font-size="13">고유 단계</text>
  </g>
  <g>
    <rect x="380" y="45" width="160" height="180" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
    <text x="460" y="68" text-anchor="middle" font-size="13" font-weight="600">워크플로우 C</text>
    <rect x="394" y="82" width="132" height="58" rx="5" fill="none" stroke="#c1652a" stroke-width="2" />
    <text x="460" y="106" text-anchor="middle" font-size="13" fill="#c1652a">공통 규칙</text>
    <text x="460" y="126" text-anchor="middle" font-size="12" fill="#c1652a">(사본 3)</text>
    <rect x="394" y="152" width="132" height="58" rx="5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
    <text x="460" y="186" text-anchor="middle" font-size="13">고유 단계</text>
  </g>
</svg>
<figcaption>그림 1-1. 공통 규칙은 한 번 정하면 되는 내용이지만, 워크플로우를 만들 때마다 사본이 하나씩 늘어난다.</figcaption>
</figure>

<Cite ids="op-common-rules" />

## 첫 번째 시도: 시스템 프롬프트를 만드는 프레임워크

공통 규칙과 미리 준 정보로, 자동화할 워크플로우의 시스템 프롬프트를 만들어 주는 프레임워크를 만들었다.
`aise-workflow`라는 이름이었다. 여러 워크플로우를 이것으로 자동화했고, `CLAUDE.md`, `AGENTS.md`, 서브에이전트, 멀티
에이전트 같은 에이전트 도구의 기본 개념도 이 과정에서 익혔다.

::: point 자세히 — 쓰면서 드러난 네 가지 필요 {#four-needs}
**배경.** 프레임워크는 동작했지만, 쓰는 동안 같은 손실이 반복됐다.

**문제.**

- 토큰 소비가 컸다.
- 세션이 초기화되면 진행 중인 작업물이 사라졌다.
- md 파일을 GitHub로 형상 관리해도 새 세션마다 결과가 달랐다.

**정리된 필요.**

1. 기억을 이어 줄 장치가 있어야 한다.
2. 정확해야 하는 동작은 프로그램으로 만들고 LLM에 맡기지 않는다.
3. 토큰 사용량을 추적하고 통계를 낼 수 있어야 한다.
4. 만든 것을 다른 사람에게 배포할 수 있어야 하고, 배포된 뒤에도 같은 사용자 경험을 줘야 한다.

네 가지가 각각 어디서 해결되는지는 이 장 끝의 표에 있다.

<Cite ids="op-four-needs" />
:::

## 프로그램과 에이전트의 경계가 흐려진다

워크플로우는 스크립트와 md 파일로 되어 있었다. 그런데 하는 일은 늘 같은 순서의 같은 동작이었다. 정해진 동작이라면
프로그램으로 충분하다. 여기서 "무엇을 에이전트에게 맡기고 무엇을 프로그램으로 만들 것인가"라는 질문이 생겼다. 이
질문의 결론은 [3. 왜 조직인가](/story/why-organization#agent-or-program)에 있다.

<Cite ids="op-agent-or-program" />

## 두 번째 시도: 소프트웨어 공학을 담은 프레임워크

첫 번째 프레임워크는 "소프트웨어로 개발하기 전에 워크플로우를 시험해 보는 도구"로 다시 정의했다. 그 워크플로우를
실제 소프트웨어로 개발하는 프레임워크를 따로 만들었다. `aise-development`라는 이름이었다. 인터뷰, 요구사항 분석,
개발 방법론 선택, QA 분석, 아키텍처 설계, 컴포넌트·모듈 설계 같은 소프트웨어 공학의 작업 흐름을 여기에 담았고,
일반 소프트웨어 개발에도 쓰도록 기능을 계속 더했다.

<Cite ids="op-second-framework" />

## 기능이 늘수록 비용과 무질서가 함께 커진다 {#six-problems}

기능을 더할 때마다 새 문제가 생겼다. 여섯 가지로 정리되며, 셋은 비용의 문제이고 셋은 무질서의 문제다.

<figure>
<svg viewBox="0 0 560 300" role="img" aria-label="여섯 가지 문제를 두 묶음으로 나눈 그림. 비용: 스킬과 규칙의 관리 한계, 시스템 프롬프트가 컨텍스트 창을 잠식, 새 도구를 매일 익히는 피로. 무질서: 프로젝트마다 들쭉날쭉한 동작, 프로젝트 사이에 지식이 쌓이지 않음, 정책이 동작하는지 확인할 방법이 없음">
  <rect x="15" y="15" width="255" height="270" rx="10" fill="none" stroke="#c1652a" stroke-width="2" />
  <text x="142" y="44" text-anchor="middle" font-size="15" font-weight="600" fill="#c1652a">비용</text>
  <rect x="32" y="62" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="44" y="86" font-size="13" font-weight="600">1. 관리 한계</text>
  <text x="44" y="108" font-size="12">스킬과 규칙이 끝없이 늘어난다</text>
  <rect x="32" y="134" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="44" y="158" font-size="13" font-weight="600">2. 컨텍스트 잠식</text>
  <text x="44" y="180" font-size="12">시스템 프롬프트가 창을 차지한다</text>
  <rect x="32" y="206" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="44" y="230" font-size="13" font-weight="600">3. 학습 피로</text>
  <text x="44" y="252" font-size="12">새 도구를 매일 따라가야 한다</text>

  <rect x="290" y="15" width="255" height="270" rx="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4" />
  <text x="417" y="44" text-anchor="middle" font-size="15" font-weight="600">무질서</text>
  <rect x="307" y="62" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="319" y="86" font-size="13" font-weight="600">4. 들쭉날쭉한 동작</text>
  <text x="319" y="108" font-size="12">프로젝트마다 진행 방식이 다르다</text>
  <rect x="307" y="134" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="319" y="158" font-size="13" font-weight="600">5. 지식 단절</text>
  <text x="319" y="180" font-size="12">프로젝트 사이에 쌓이지 않는다</text>
  <rect x="307" y="206" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="319" y="230" font-size="13" font-weight="600">6. 확인 불가</text>
  <text x="319" y="252" font-size="12">정책이 동작하는지 알 수 없다</text>
</svg>
<figcaption>그림 1-2. 여섯 가지 문제. 왼쪽은 쓸수록 커지는 비용, 오른쪽은 결과를 예측할 수 없게 만드는 무질서다.</figcaption>
</figure>

::: point 자세히 — 여섯 가지 문제 하나씩
1. **관리 한계.** 프레임워크를 풍부하게 만들려다 스킬과 규칙이 수없이 늘었고, 곧 사람이 관리할 수 있는 양을 넘었다.
2. **컨텍스트 잠식.** 스킬, MCP 플러그인, 개발 방법론을 담은 시스템 프롬프트가 계속 커졌다. 실제 일에 쓸 수 있는
   컨텍스트 창은 그만큼 줄었다.
3. **학습 피로.** 새로 나온 MCP 서버와 Claude Code 도구를 매일 익혀야 두 프레임워크가 강해졌다. 조사는 에이전트에게
   시킬 수 있어도, 무엇이 새로 나왔는지 알아 두는 일은 사람의 몫으로 남았다.
4. **들쭉날쭉한 동작.** 프로젝트마다 중요한 부분이 다르다. 어떤 때는 요구사항을 너무 짧게 모으고 서둘러 만들었고,
   어떤 때는 시작하지 않고 정보만 모았다.
5. **지식 단절.** 개발 워크플로우를 자동화한 도구였으므로, 동시에 진행되는 프로젝트 사이에 정보가 오가지 않았다. 익힌
   지식과 방법론이 다음 프로젝트로 이어지지 않았다.
6. **확인 불가.** 할루시네이션이 잦았다. 세운 정책이 실제로 동작하는지 확인할 방법이 없어, 오래 믿어 온 동작이 사실은
   일어나지 않았다는 것을 뒤늦게 아는 일이 많았다.

<Cite ids="op-six-problems" />
:::

## 자원은 늘 먼저 바닥난다

토큰은 매우 빨리 소진됐다. 그래서 도구만 바꾸고 정책과 기억은 유지한 채 프로젝트를 이어 가는 방법이 필요해졌다.
이 요구는 [6. 배포와 여러 도구](/story/distribution)로 이어진다.

<Cite ids="op-resources" />

## 사람의 자리는 요구자, 감시자, 승인자다 {#the-question}

AI 에이전트로 소프트웨어를 만들 때 사람은 세 자리를 맡는다. 요구사항을 주는 이해관계자, 계획·설계·중간 산출물을
확인하는 감시자, 최종 결과를 검수하고 승인하는 승인자다. 한 번의 비용으로 원하는 결과를 얻어야 하는 사람이기도 하다.

::: point 자세히 — 배경 · 문제 · 해결 방향
**배경.** 소프트웨어를 시작하는 모양은 매번 다르다. 요구사항과 설계안, NFR을 맞출 방법이 처음부터 한꺼번에 정해진
경우가 있다. 기능의 집합으로 소프트웨어가 정의되는 경우도 있다. 이미 있는 소프트웨어를 분석하고 아키텍처를 평가해
개선점을 뽑는 일이 먼저인 경우도 있다.

**문제.**

- 에이전트는 정보가 다 오기 전에 일을 시작하곤 했다. 기다렸다면 아낄 수 있었던 토큰과 하지 않아도 됐던 작업이 있었다.
- 개발 방법론도 상황에 맞는 것을 고르기보다, 입력이 오면 어떻게든 답을 내는 쪽에 가까웠다.
- 사람이 개입할 수 있는 지점은 좁았다. 워크플로우로 강제하면 속도가 떨어지고, 흐름이 중복되고, 마이크로 매니징이
  되기 쉬웠다. 강제하지 않으면 원한 것과 먼 결과가 나오는 일이 반복됐다.

**해결 방향.** 질문이 바뀌었다. "무엇을 AI 에이전트로 해결할까"에 "어떻게 통제할까, 적절한 통제의 범위는 어디까지인가"가
더해졌고, 이것이 가장 중요한 질문이 됐다.

<Cite ids="op-control" />
:::

## 남은 질문: 어떻게, 어디까지 통제하나

aise-core는 이 질문에 대한 답이다. 답의 줄기는 [3. 왜 조직인가](/story/why-organization)에, 전체 모양은
[2. 한눈에 보기](/story/at-a-glance)에 있다.

<figure>
<svg viewBox="0 0 560 210" role="img" aria-label="이 장의 흐름: 같은 규칙의 반복 설명, 첫 번째 시도, 네 가지 필요, 두 번째 시도, 여섯 가지 문제, 통제의 질문, aise-core">
  <defs>
    <marker id="bg-flow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>
  <rect x="10" y="20" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="70" y="44" text-anchor="middle" font-size="12">같은 규칙의</text>
  <text x="70" y="62" text-anchor="middle" font-size="12">반복 설명</text>
  <line x1="130" y1="48" x2="148" y2="48" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow)" />
  <rect x="150" y="20" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="210" y="44" text-anchor="middle" font-size="12">첫 번째 시도</text>
  <text x="210" y="62" text-anchor="middle" font-size="12">프롬프트 생성</text>
  <line x1="270" y1="48" x2="288" y2="48" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow)" />
  <rect x="290" y="20" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="350" y="53" text-anchor="middle" font-size="13" font-weight="600">네 가지 필요</text>
  <line x1="410" y1="48" x2="428" y2="48" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow)" />
  <rect x="430" y="20" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="490" y="44" text-anchor="middle" font-size="12">두 번째 시도</text>
  <text x="490" y="62" text-anchor="middle" font-size="12">소프트웨어 공학</text>
  <path d="M 490 76 L 490 104 L 70 104 L 70 128" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow)" />
  <rect x="10" y="130" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="70" y="154" text-anchor="middle" font-size="12">여섯 가지 문제</text>
  <text x="70" y="172" text-anchor="middle" font-size="12">비용 · 무질서</text>
  <line x1="130" y1="158" x2="148" y2="158" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow)" />
  <rect x="150" y="130" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="210" y="163" text-anchor="middle" font-size="13" font-weight="600">통제의 질문</text>
  <line x1="270" y1="158" x2="288" y2="158" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow)" />
  <rect x="290" y="130" width="120" height="56" rx="6" fill="none" stroke="#c1652a" stroke-width="2" />
  <text x="350" y="163" text-anchor="middle" font-size="13" font-weight="600" fill="#c1652a">aise-core</text>
</svg>
<figcaption>그림 1-3. 이 장의 흐름. 두 번의 시도에서 얻은 필요와 문제가 "어떻게 통제할 것인가"라는 하나의 질문으로 모인다.</figcaption>
</figure>

## 문제와 답하는 곳

| 필요 | 답하는 곳 | 한 줄 |
|---|---|---|
| 1. 기억을 이어 줄 장치 | [5. 어떻게 유지하나](/story/how-it-is-kept#memory) — 핸드오프, 부서 기록 | 끝난 일은 중요한 사실만, 못 한 일은 다음 세션이 같은 지식으로 이어 가도록 기록한다. |
| 2. 정확한 동작은 프로그램으로 | [3. 왜 조직인가](/story/why-organization), [5](/story/how-it-is-kept#hooks) — 훅과 스크립트 | 무엇을 프로그램으로 만들지는 Claude Code가 판단해 제안하고, 꼭 지킬 정책은 훅과 스크립트로 강제한다. |
| 3. 토큰 추적과 통계 | [5. 어떻게 유지하나](/story/how-it-is-kept#tokens) — 토큰 사용 기록 | 위임 구조의 고정 비용과 일의 흐름을 살피는 데 쓴다. |
| 4. 배포와 같은 사용자 경험 | [6. 배포와 여러 도구](/story/distribution) | 조직이 아니라 정책·훅·도구를 배포한다. 같아야 하는 것은 정책 층이 맡고, 조직은 쓰는 사람마다 달라지게 열어 둔다. |

| 문제 | 답하는 곳 | 한 줄 |
|---|---|---|
| 1. 스킬·규칙의 관리 한계 | [3. 왜 조직인가](/story/why-organization) — 무엇부터 만들었나 | 스킬과 MCP 서버는 필요할 때 바꿔 끼우고, 공통 정책은 거버넌스로 모은다. |
| 2. 컨텍스트 잠식 | [3. 왜 조직인가](/story/why-organization) — 무엇부터 만들었나 | 늘 불러오지 않고 필요할 때만 끼우므로, 쓰지 않는 도구가 컨텍스트를 차지하지 않는다. |
| 3. 새 도구를 매일 익히는 피로 | [3. 왜 조직인가](/story/why-organization) — 자산참모 | 자산참모가 도구를 조사하고 승인한다. |
| 4. 들쭉날쭉한 동작 | [2. 한눈에 보기](/story/at-a-glance) — 누가 무엇을 하나 | 부서의 PM이 계획과 완료 기준을 세우고, 그 기준으로 결과를 확인한다. |
| 5. 프로젝트 사이의 지식 단절 | [7. 성장과 한계](/story/growth-and-limits), [2. 한눈에 보기](/story/at-a-glance) | 포트폴리오와 회고에 지식이 쌓이고, 부서 사이는 업무참모가 조율한다. |
| 6. 정책이 동작하는지 확인 불가 | [5. 어떻게 유지하나](/story/how-it-is-kept#hooks) — 거버넌스와 훅 | 꼭 지킬 것은 훅이 막고, 아직 일어나지 않은 일은 감시 목록에 두고 지켜본다. |

<SourceTable />

**다음으로.** → [2. 한눈에 보기](/story/at-a-glance)
