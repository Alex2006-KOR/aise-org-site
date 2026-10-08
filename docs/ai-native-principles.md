---
title: AI-Native Principles — AI라서 포기하지 않아도 되는 것들
---

# AI라서 포기하지 않아도 되는 것들

::: lead
흔한 방식과의 차이 중에서 "AI가 사람과 달라서 가능해진 것"만 모았습니다.
:::

<div class="aise-ref-note">

이 쪽은 **참고 자료**입니다. 이야기 트랙의 [3. 왜 조직인가](/story/why-organization)에서 이어집니다. 첫 화면은 [브리핑](/)입니다.

</div>


::: tip 읽는 자리 — 배경 및 철학 (3/3)
[배경 및 철학](/background) 대분류의 마지막 글입니다. 앞
[일반적인 방식과 무엇이 다른가](/real-world-vs-aise)가 흔한 방식과의 차이를 일곱 축으로
늘어놓았다면, 이 페이지는 그 차이들 중 **"AI가 사람과 다르기 때문에 가능해진 것"만 따로
모읍니다.** 이 구분이 중요한 이유는, 사람 조직에 그대로 옮기면 안 되는 것까지 일반화하기가
쉽기 때문입니다. 이걸로 "왜"는 끝나고, 다음 대분류 [동작 원리](/how-it-works)부터
"어떻게"로 넘어갑니다.
:::

인간 조직의 원칙을 따르기로 한 것과, 인간 조직의 한계까지 그대로 물려받는 것은 다른 이야기입니다.
AISE는 한계까지 물려받지는 않기로 했습니다 — 아래 능력들은 AI라서 제한하기보다 오히려 적극적으로 씁니다.

- **병렬 협업** — 여러 역할이 동시에 다른 일을 처리합니다. 순서대로 기다릴 필요가 없습니다.
- **동적 조직 구성** — 필요한 순간에 팀이 만들어지고, 필요 없어지면 흩어집니다.
- **서브에이전트 활용** — 큰 업무를 쪼개 임시로 위임하고, 끝나면 결과만 거둬들입니다.
- **실시간 지식 공유** — 한 역할이 알아낸 것을 다른 역할이 즉시 참고할 수 있습니다.
- **지속적인 조직 학습** — [Lifecycle](/lifecycle)에서 본 여섯 단계 순환이 멈추지 않습니다.
- **조직 기억의 영속성** — 세션이 끝나도 Project Record(부서 기록 파일 세트)가 남아 다음 세션이 이어받습니다
  ([AISE 개요](/overview) 참고).
- **AI 도구 독립성** — 특정 모델이나 도구에 조직의 정체성을 걸지 않습니다. 도구는 바뀔 수 있어도
  조직의 철학과 운영 원칙은 바뀌지 않습니다.

이 목록은 선언으로만 적어둔 게 아닙니다. 설계하다 보면 "사람 조직이라면 이렇게 했을 텐데"라는
습관을 내려놔야 했던 순간이 여럿 있었습니다.

::: info 결정 되짚어보기 — "역할"에게 인사기록카드를 만들어주지 않은 이유
**문제**

- 같은 역할(예: "market-researcher")이 여러 department(부서)에서 동시에 필요하면 어떻게 할까요?
- 처음 떠오른 답은 사람 조직의 직관 그대로였습니다 — 재사용 가능한 역할 **타입**(클래스)과, 부서에
  묶여 경험을 쌓으며 재배치되는 **개체**(인스턴스)를 나누는 "인재 풀" 모델.

**조사**

- 이 인스턴스 개념을 실제 실행 방식(이 배포의 어댑터, Claude Code)에 대고 검증해 봤습니다.
- 서브에이전트 호출은 매번 클래스 정의를 새로 실행하는 것이고, 호출 사이에 아무것도 남지 않습니다.
  "배치 대기 중이지만 기억은 유지되는 인스턴스"를 받쳐줄 메커니즘이 실행 기반에 없었습니다.
- 그런데도 인스턴스를 모델링하려면, 실재하지 않는 정체성을 흉내 내기 위해 대기/배정 상태 같은 새
  장부를 발명해야 했을 겁니다.
- 근거: `knowledge/decisions/roles/role-class-model.md` "2026-07-09 — role-is-a-class-not-an-instance"

**해결**

- role-class(역할 정의서) 파일 `instance/roles/<id>.yaml`은 오직 **클래스**만 정의합니다 — 부서
  소속도, 영속적 개체도, 기록되지 않은 기억도 없습니다.
- "경험"은 한 클래스의 정체성에 머물지 않고 `instance/retrospectives/` → `instance/portfolio/`의
  인사이트 항목으로 쌓여, 어느 클래스든 참고할 수 있습니다.

**그래서 생긴 강점**

- 결정 문서의 정리 — *"An abstraction that doesn't correspond to any real, persisted state in
  the execution substrate is exactly the kind of complexity ... the org didn't actually have"*
  (실행 기반에 실재하는 상태와 대응하지 않는 추상화는, 이 조직에 있지도 않은 문제를 풀려는 불필요한
  복잡함이다).
- 동시성 문제가 사라집니다 — 아무것도 "체크아웃"되지 않으니, 여러 부서가 같은 클래스를 동시에 몇
  개든 쓸 수 있습니다.
- 새 클래스 채용은 한 번뿐이고, 이미 있는 클래스를 새 부서가 쓰는 건 승인 없이 자유롭습니다.
- 실제로 `backend-engineer`·`frontend-engineer`는 `sfr-ssot-platform`에서 처음 채용된 뒤
  `llm-wiki-platform`이, `frontend-engineer`·`devops-engineer`는 이 사이트(`aise-org-site`)가
  그대로 재사용했습니다 — 부서를 건넌 재사용의 전체 흐름은 [Collaboration Model](/collaboration-model)
  참고.
:::

AI 도구 독립성 원칙도 한 번 잘못 그려졌다가 바로잡힌 적이 있습니다 — 재미있는 건, 틀렸다는 걸
실제로 테스트해 보고 알았다는 점입니다.

::: info 결정 되짚어보기 — "모델"이 지급 목록에서 빠졌다가, 다른 자격으로 돌아온 이야기
**문제**

- 원래 헌법과 세 참모 문서는 `AS_ORCHESTRATOR`(자산참모)가 지급하는 자산으로 "도구·MCP·모델·스킬" 네 가지를
  나열했습니다.
- 그런데 모델 선택은 AI 도구 자신의 UI나 설정(예: Claude Code의 `/model`)에서 일어나는 일이지,
  AISE 안의 누군가가 "결정하고 실행"할 수 있는 일이 아니었습니다.

**조사**

- 추측하지 않고 직접 확인했습니다 — 실행 중인 세션이 자기 모델을 바꿀 수 있는 도구가 있는지
  테스트해 보니, **없었습니다.**
- 가장 가까운 능력은 새로 만드는 서브에이전트에게 모델을 지정하는 것(`Agent`의 `model`
  파라미터)뿐이었고, 이건 다른 행위였습니다. 이 구분이 나중에 다시 중요해집니다.
- 근거: `knowledge/decisions/provisioning/model-tiers.md` "2026-07-08 — model-is-not-a-provisioned-asset"

**해결**

- 1차: "모델"을 provisioning(승인된 회사 제공 도구) 목록에서 제거했습니다 — 목록에 있던 것 자체가
  **범주 오류**였다는 판단입니다. 결정 문서: *"no actor inside AISE, including the AI running
  it, has a way to act on it"*(AISE 안의 그 어떤 행위자도, 이걸 실행하는 AI 자신을 포함해, 이걸
  실행할 방법이 없다).
- 그 뒤(2026-09-08): "새 서브에이전트에게 모델을 지정하는 것"은 여전히 실재하는 레버였고, 이건
  provisioning이 아니라 **매니징 행위**로 정리됐습니다 — 위임하는 쪽(업무참모→`project-manager`(PM), PM→역할)이 위임
  시점에 모델 티어를 고릅니다.
- 실제 세션에서, 서브에이전트는 생성 시점에 모델이 고정되고 스스로 바꿀 수 없다는 것, 중첩
  위임에서도 지정한 모델이 그대로 적용된다는 것을 트랜스크립트로 확인했습니다.
- 근거: `knowledge/decisions/provisioning/model-tiers.md` "2026-09-08 — model-tier-selection-delegated"

**그래서 생긴 강점**

- 뒤의 결정 문서의 요약 — *"Never mid-run, never by downgrading the PM"*(실행 중간에는 절대 바꾸지
  않고, PM 자신을 다운그레이드하는 일도 없다).
- "모델은 지급 자산이 아니다"는 그대로 두면서, "위임 시점의 티어 선택은 매니징 행위다"라는 더
  정확한 구분이 생겼습니다.
- PM은 부서원에게 위임할 때 이 판단을 그대로 씁니다 — 기본은 baseline, 벗어날 땐 근거 한 줄을
  남깁니다.
:::

## 정리

**한 문장으로.** AISE는 사람 조직의 습관(고정된 인력, 순차 처리, 도구 종속)을 무비판적으로
물려받지 않고, 매번 "이게 이 실행 기반에서 실제로 가능한 일인가"를 직접 테스트해 확인한 뒤에만
원칙으로 굳힙니다.

**이 페이지를 직접 확인해 보려면**

1. `instance/roles/*.yaml` 어떤 파일을 열어봐도 부서 소속이나 배치 상태를 나타내는 필드가
   없다는 걸 확인할 수 있습니다 — 클래스 정의만 있습니다.
2. `CONSTITUTION.md`(지금은 영문)에서 "model"을 검색해 보면, provisioning 카테고리 목록
   (§10.3, §10.9)에는 더 이상 등장하지 않는다는 걸 확인할 수 있습니다.
3. `schema/roles/project-manager.template.yaml`의 `authority` 필드에서 PM이 위임 시점에
   모델 티어를 선택하는 규칙 전문을 읽을 수 있습니다.

**다음으로.** 여기까지가 "왜"입니다. 이제 이 원칙들이 실제로 어떤 모양의 조직으로 굳었는지 →
[동작 원리](/how-it-works). 이 원칙들이 나중에 구조 층위에서 어떻게 지켜지는지가 궁금하시면
[Structural Principles/OCP](/structural-principles-ocp)로 건너뛰셔도 됩니다.

*근거: `CONSTITUTION.md` §7; `knowledge/decisions/roles/role-class-model.md` "2026-07-09 — role-is-a-class-not-an-instance",
`knowledge/decisions/provisioning/model-tiers.md` "2026-07-08 — model-is-not-a-provisioned-asset",
`knowledge/decisions/provisioning/model-tiers.md` "2026-09-08 — model-tier-selection-delegated".*
