# 3-way 정확도 비교 — 레퍼런스 답 (a) 원문 직접 정독

> `instance/retrospectives/multi-project-orchestration-pilot-2026-09.md` § 골드셋 질문(확정,
> 2026-09-08) 12문항에 대한 정답 축. aise-org-site PM이 aise-core 원문(`CONSTITUTION.md`/`schema/`/
> `governance/`/`instance/`/`knowledge/decisions/`)을 직접 읽고 작성. 각 답변 끝에 근거 경로를
> 명시(ragcurl의 `source_path`와 동일 축으로 대조 가능하도록). 작성일 2026-09-09, aise-org-site PM.

---

## 1. AISE의 depth-2 피라미드 구조와 line/staff 구분은?

**Line 조직은 뎁스 2를 넘지 않는다: 사용자 — 부서 — 부서원.** 부서는 PM과 부서원으로 구성되고,
PM은 부서원의 역할/책임/능력을 알고 업무를 분해·분배한다(§10.2). 뎁스 제약의 근거는 "한 명의
인간 운영자가 조직 전체를 한눈에 파악할 수 있어야 한다"는 요구다(§10.1 구현 주석).

이 뎁스에 **포함되지 않는** 별도 축이 staff다 — 업무참모/인사참모/자산참모 셋(§10.3), 그리고
Meta 모드 전용 경영참모(§11)까지 넷. 세 참모는 사용자와 PM 사이에 위치하지만 line 뎁스 카운트에
들어가지 않는다 — 실제 조직의 참모장교/비서실이 위계 뎁스에 포함되지 않는 것과 같은 이치. 셋 다
실행 책임이 없고 서로 동급이며 어느 쪽도 다른 쪽에 보고하지 않는다. 채용 절차 없이 헌법적으로
정의되므로 "이 참모는 누가 채용하는가"라는 순환 문제 자체가 없다(§10.3).

**line/staff의 실질적 차이는 책임의 종류**다(§10.4) — line은 결과물의 기술적 정확성에 대한
**실행 책임**을, staff는 각자 영역(적합한 부서 선정/채용 판단 타당성/provisioning이 조직 제약에
맞는가)의 **운영 책임**을 진다. 사용자는 항상 해당 참모를 거쳐 조직에 지시·보고를 받는다 —
PM에게 직접 지시하지 않는다(skip-level 금지, §10.3).

*근거*: `CONSTITUTION.md` §10.1–§10.4.

---

## 2. Operator 모드 vs Meta 모드 — 차이와 각 모드의 쓰기 가능/보호 경로는?

두 모드는 **한 사람이 하는 서로 다른 두 가지 일**을 가른다(`governance/MODE_POLICY.md` "Why this
exists"): **Operator**는 지금 있는 조직으로 실제 업무를 시키는 것(PM이 부서원에게 업무를 주듯),
**Meta/Architect**는 조직 자체를 바꾸는 것(role 추가/삭제, workflow 수정, 포트폴리오/자산카탈로그
스키마 변경, 헌법·정책 개정). 섞이면 일상 업무 도중 조직 정의가 조용히 흔들릴 위험이 있다 —
CONSTITUTION §2.1("AI 도구는 교체돼도 철학·운영방식은 유지") 위반.

**Operator 모드**: protected core path(아래) 밖의 모든 것을 읽고/쓸 수 있다 — 산출물, 작업파일,
대상 프로젝트 레포뿐 아니라 **조직 인스턴스 변경**(일상적 채용, 사용자 승인을 받은 조직개편)도
포함한다. 단 스키마(§10.1–§10.6) 범위 안에서만이다. 스키마 자체가 부족하다는 게 드러나면(예:
뎁스-2가 안 맞음) 조용히 고치지 않고 Meta 모드 전환을 요청한다.

**Meta 모드**: protected core path를 포함해 거의 모든 것을 수정할 수 있다 — 단 배포 인스턴스
데이터(Meta-forbidden instance paths, 아래)는 예외다. 즉 Meta가 Operator의 상위집합이 아니다.

**Protected core paths(Operator에서 못 건드림, Meta 전용)**: `CONSTITUTION.md`, `.env.example`,
`governance/`, `schema/README.md`, `schema/OP_ORCHESTRATOR.md`, `schema/HR_ORCHESTRATOR.md`,
`schema/AS_ORCHESTRATOR.md`, `schema/MG_ORCHESTRATOR.md`, `schema/roles/`(포터블 템플릿),
`schema/portfolio/README.md`, `assets/README.md`, `assets/sandboxed.yaml`,
`assets/index.example.yaml`, `adapters/`(어댑터별 asset-mapping 파일 제외), `knowledge/`,
`continuity/`.

**Meta-forbidden instance paths(Meta에서 못 건드림, Operator 전용)**: `instance/roles/`,
`instance/workspace/`, `instance/retrospectives/`, `instance/portfolio/`, `assets/index.yaml`,
어댑터별 asset-mapping 파일. Meta는 이들을 **읽을 수는** 있다(스키마 결정이 실제 인스턴스 규모를
봐야 할 때가 있으므로) — 쓰기만 막힌다.

모드 선언은 **세션(또는 세션 내 특정 작업 범위) 단위**로 명시적으로 이뤄져야 하며, 조용한 기본값은
없다.

*근거*: `governance/MODE_POLICY.md` 전체.

---

## 3. 업무참모·인사참모·자산참모·경영참모 4개 스태프 역할의 책임 경계는?

네 참모는 "누가/무엇을/어떻게 쓸 수 있는가"를 서로 다른 질문으로 쪼개 각자 답한다 — 서로의 영역에
관여하지 않는다:

- **업무참모(OP_ORCHESTRATOR)** — **업무 실행 운영**: 사용자 의도 분석, 조직 역량 판단, 책임 부서
  선정(부서 착수는 채용이 아니라 실행그래프 조립), 채용/provisioning은 직접 결정하지 않고 **요청만**
  한다, 부서 간 실행 그래프 조립(§10.6), 진행상황 관리, 결과 검토·보고. 인사(채용/조직개편)는
  업무참모 책임이 아니다(§10.5), provisioning도 아니다(§10.9) — 둘 다 해당 참모에게 요청.
- **인사참모(HR_ORCHESTRATOR)** — **인력 구성(채용/조직개편) 전담**, 업무 실행에는 일절 관여하지
  않는다. 채용은 단독 승인(사용자 재승인 불필요), 조직개편은 분석·제안까지만(승인은 사용자만).
  role 콘텐츠(title/responsibility/authority/capabilities) 작성까지 하되 파일 생성(실행)은 하지 않음
  — 실행은 항상 업무참모.
- **자산참모(AS_ORCHESTRATOR)** — **provisioning 전담**: 어떤 role이 무엇을(도구/MCP/스킬) 쓸 수
  있는지. "누가 존재하는가"(인사참모)·"그 존재가 뭘 하는가"(업무참모)에는 관여하지 않는다. 카탈로그
  관리·분석·승인·실행까지 스스로 한다(예외적으로 role별 인가 반영만 업무참모가 순수 실행자로
  수행, §10.9).
- **경영참모(MG_ORCHESTRATOR)** — 위 셋과 달리 **Meta 모드에서만** 활동, Operator 모드의 업무
  실행·채용·provisioning에는 관여하지 않는다. 조직 스키마(CONSTITUTION/schema/governance)의 진화
  분석·제안, schema-mandated 클래스의 공통 베이스 정의·개정, **조직 자가진단(감사)**, 나머지 세
  참모 자신의 정의 개정 검토. 케이스별 채용 승인·실행그래프 조립·provisioning 승인에는 관여하지
  않고, 부서 산출물 품질 감사도 대상이 아니다(구조/규칙 레벨 감사에 한정).

넷 다 채용 절차 없이 헌법적으로 정의된다(순환 문제 회피). 앞의 셋은 서로 동급(peer)이고 사용자에게
직접 보고하며 skip-level 없이 사용자를 대신 접견한다. 경영참모는 §10.3의 "세 개" 서술에 포함되지
않는 별도 개념(넷째가 아님, 다른 모드에서만 활동).

*근거*: `CONSTITUTION.md` §10.3, §11 + `schema/OP_ORCHESTRATOR.md`/`HR_ORCHESTRATOR.md`/
`AS_ORCHESTRATOR.md`/`MG_ORCHESTRATOR.md` 각 "목적"/"핵심 책임" 절(다중 문서).

---

## 4. §2.1("AI 도구는 교체 가능, 철학·운영방식은 유지")이 실제 메커니즘에 어떻게 구현돼 있는가?

이 원칙은 여러 층위의 실제 메커니즘으로 구현된다(다중 문서 합성):

1. **Core/adapter 분리(구조 원칙, §9)** — `CONSTITUTION.md`/`schema/`/`assets/`/`knowledge/`/
   `continuity/`/`governance/`는 도구에 독립적인 core, Claude Code 같은 특정 도구 기능(hooks,
   slash command, subagent 형식)은 반드시 `adapters/<tool>/`에만 존재한다. 새 AI 도구를 지원하려면
   새 adapter를 추가할 뿐 core는 수정하지 않는다(OCP).
2. **역할 정의의 도구-불가지론(`schema/README.md` "Role file format")** — `instance/roles/<id>.yaml`
   포맷 자체가 "tool-agnostic"으로 명시된다. 실제로 role을 구체화하는 방법(예: Claude Code의
   `.claude/agents/<id>.md` 생성)은 어댑터의 몫이다.
3. **Provisioning의 추상화(§10.9, `AS_ORCHESTRATOR.md`)** — 자산 카탈로그 항목은 "무엇을 할 수
   있게 하는가"(추상 capability)만 정의하고, "지금 실행 중인 도구의 어떤 구체적 기능으로 제공하는가"
   는 기록하지 않는다. 그 연결은 어댑터의 일(`governance/ADAPTER_POLICY.md`)이지 자산참모의 일이
   아니다. role의 provisioning 기록도 추상 `id`만 참조한다.
4. **모델 자체도 provisioning 대상이 아니다** — 어떤 모델(Claude/다른 LLM)을 실행 엔진으로 쓰는지는
   자산참모가 심사하는 대상이 아니다(`knowledge/decisions/2026-07-08-model-is-not-a-provisioned-asset.md`
   — 이 결정은 §2.1 원칙을 provisioning 계층에서 한 번 더 확인한 것).
5. **모드 정책의 Meta-only core**(`governance/MODE_POLICY.md`) — 조직의 철학·운영방식을 규정하는
   문서(CONSTITUTION/schema 핵심 문서/governance)는 Meta 모드에서만 바뀔 수 있어, 일상 Operator
   작업(AI 도구를 실제로 부리는 층위)이 그 철학을 조용히 침식하지 못하게 막는다.

즉 "AI 도구 교체 가능"은 (a) 코드/문서 구조에서 core-vs-adapter 분리로, "철학·운영방식 유지"는
(b) 모드 정책의 쓰기 권한 경계로, 그 중간의 "역할·자산이 도구에 오염되지 않게"는 (c) 역할 정의·
provisioning의 추상화로 각각 다른 메커니즘이 나눠 구현한다.

*근거*: `CONSTITUTION.md` §2.1, §9 + `schema/README.md`(Role file format 절) +
`schema/AS_ORCHESTRATOR.md` §1 + `governance/MODE_POLICY.md` + `governance/ADAPTER_POLICY.md` +
`knowledge/decisions/2026-07-08-model-is-not-a-provisioned-asset.md`(다중 문서 합성).

---

## 5. 부서(project)와 role-class의 관계, PM이 모든 부서에 필수인 이유는?

**부서(department/project)는 인스턴스, role-class는 클래스(카탈로그 정의)** — 서로 다른 층위다
(§10.7). `instance/roles/<id>.yaml`은 재사용 가능한 클래스이며 어느 한 부서에 귀속되지 않는다 —
어떤 부서도 이미 존재하는 role-class를 승인 절차 없이 자유롭게 재사용할 수 있다. 부서가 끝나도
role-class는 카탈로그에 남아 다른 부서가 계속 쓸 수 있다(`schema/README.md` "Role file format").

부서 착수 자체는 채용이 아니다 — 사용자의 의도가 실제 role 실행(위임)을 필요로 하는 순간 업무참모가
부서를 착수하는 것은 일상적인 실행그래프 조립 행위다(§10.5). 부서 형성과 role-class 신규 채용은
서로 다른 두 종류의 사건이다(`schema/README.md` "Department formation and class recruitment are
two different kinds of events").

**PM이 모든 부서에 필수인 이유**: PM은 `schema-mandated` 클래스다 — CONSTITUTION §10.2가 부서를
"PM과 부서원으로 구성"된다고 무조건적으로 정의하기 때문에, 인사참모의 재량적 채용 판단(다른
generic-technical/domain-specific 클래스와 달리)이 개입할 여지가 없다. PM은 부서원의 역할·책임·
능력을 알고 업무를 분해·분배하며, **부서를 대표하는 유일한 인터페이스**로서 업무참모와 소통한다
(§10.2, §10.6 — 업무참모는 부서의 다른 부서원에게 직접 위임하지 않는다, skip-level 금지의 부서
내부 버전). 이 schema-mandated 지위 때문에 PM 클래스의 정의 자체가 `instance/roles/`가 아니라
포터블 템플릿(`schema/roles/project-manager.template.yaml`)으로 core에 실려 배포 간 이식된다.

*근거*: `CONSTITUTION.md` §10.2, §10.5, §10.7 + `schema/README.md`("Role file format",
"Department formation and class recruitment are two different kinds of events" 절).

---

## 6. Project Record의 섹션 구성(Task/Plan/Invariants/Ledger/Decisions/Open Questions/Next Steps)과 각 역할은?

Project Record(`project-record.md`)는 PM 자신만 쓰고 읽는 상세 연속성 메모리다(업무참모는 절대
직접 쓰지 않음 — 결정·정정은 `directive.md`를 거쳐 PM이 자기 말로 흡수). 실제로는 8개 섹션이다
(Roster 포함):

- **Task** — 원래 요청/목적. "왜"가 필요한 독자를 위한 근거가 여기 남는다.
- **Plan** — Phase별 계획. 남은 작업이 1슬라이스를 넘거나 2개 이상 role-class가 관여할 걸로
  예상되면(기계적 트리거) 작성 필수 — Phase별 중간산출물, 역할 간 공유계약이 언제 확정되는지, 확정
  후 병렬 착수 가능한 role, 통합 지점. 실행이 계획과 어긋나면 갱신(재계획 트리거) — 한 번 쓰고 마는
  게 아니다.
- **Invariants** — 미래의 모든 결정이 일관돼야 하는 소수의 교차원칙, **근거(왜)는 담지 않고** 대조
  가능한 한 줄만(근거는 Task에).
- **Roster** — 참여 중인 role-class 목록 + 위임 시점의 도메인 프로필(인사참모 조사). role-class
  파일 자체는 부서-무관해야 하므로, 이 부서만의 맥락이 실제로 사는 유일한 자리.
- **Ledger** — `| class | run_label | deliverable | timestamp |` 표, append-only 실행 이력.
- **Decisions** — 다음 run이 다시 논쟁하면 안 되는, 이미 확정된 판단.
- **Open Questions** — 미해소 항목.
- **Next Steps** — 다음 PM run이 이어받을 것.

**핵심 설계**: 매 PM run은 이 세 파일(`execution.md`/`directive.md`/`project-record.md`)에서
매번 재부트스트랩한다 — 이전 run의 기억을 이어받지 않는다("no run ever persists into the next
one"). `Decisions`/`Ledger`는 `governance/CONTINUITY_POLICY.md`의 "pointer-not-narrative" 압축
규칙을 상속한다 — 확정되고 더 이상 유보조건이 없는 서술은 재서술이 아니라 포인터(커밋 해시 등)로
남는다.

*근거*: `schema/README.md` "Storage" 절(단일 문서, project-record.md 포맷 정의 전체).

---

## 7. Stateless PM + Project Record가 "LLM handoff tax"를 어떻게 우회하는가?

**Handoff tax**란(arXiv 2608.24358): 강한 모델이 약한 모델의 **진행 중이던 추론 궤적(trajectory)을
이어받아 계속** 진행하면, 처음부터 강한 모델로 시작했을 때 얻는 품질 이득의 **절반도 회복하지
못한다**는 관측이다. 대부분의 에이전트 프레임워크는 하나의 긴 오케스트레이터 컨텍스트를 유지하므로,
모델 티어를 바꾸는 순간 이 세금을 물거나(중간에 갈아탐) 혹은 상태를 버리고 재시작해야 하는 딜레마에
빠진다.

**AISE가 이를 우회하는 메커니즘**: PM run은 "일시정지된 추론 체인"을 물려받지 않는다 — 매 run이
**구조화된 기록**(`instance/workspace/<project-id>/`의 `execution.md`/`directive.md`/
`project-record.md`)에서 **처음부터 다시 부트스트랩**한다(`schema/README.md`의 "Storage"). 이건
"의도적으로 작성된 섹션 문서"이지, 모델의 중간 사고 과정이 아니다. 그래서 handoff-tax 시나리오
자체(한 모델이 다른 모델의 non-native in-progress 컨텍스트를 이어받는 것)가 PM run 사이에서는
**구조적으로 발생하지 않는다**. 더 강한 티어로 새 PM run을 스폰해도 그 run은 "약한 모델이 반쯤
풀다 만 문제"가 아니라 Record가 제공하는 **깨끗한 구조화 입력**에서 새로 시작하므로, 이건 거의
"처음부터 강한 모델로 시작"에 가깝다.

이것이 `[model-tier-selection]`의 세 spawn-time 경로(운영자 플래그, 업무참모의 지시문-의도 분류,
PM이 run을 끝내며 재계획 필요를 플래그)를 **타협이 아니라 실제로 유효한 선택지**로 만든다 — "매
spawn 시점에 결정"이 handoff-tax 연구가 권장하는 방향(mid-run 승격보다 decide-at-spawn이 낫다)과
AISE 설계가 그 결정을 거의 공짜로 만드는 조합이기 때문이다.

**남은 잔여 세금(Residual)**: Record는 구조화돼 있지만, run 종료 전 baseline PM이 Record에 남기는
**문제 서술(problem characterization) 자체는 여전히 baseline 품질**이다 — 더 강한 후속 run은 그
문제 프레이밍을 그대로 받아들이지 않고 재도출해야 한다. handoff-tax가 측정하는 전체 궤적 세금보다는
훨씬 가볍고 제한적인 버전.

*근거*: `knowledge/decisions/2026-09-08-stateless-pm-sidesteps-handoff-tax.md` 전체(근거 문서).

---

## 8. 채용(recruitment)과 조직개편(reorganization)의 권한 경로 차이는?

둘 다 §10.7의 **인스턴스 변경**(스키마 자체는 안 바뀜)이지만 승인 주체와 파급 범위가 다르다(§10.8):

| | 채용 | 조직개편 |
|---|---|---|
| 대상 | 신규 role-class 생성 | 기존 role-class들의 관계/개수를 동시에 바꿈(통합/분화/재분류/다건 해고) |
| 분석·승인 | **인사참모 단독** 승인, 사용자 추가 승인 불필요 | 인사참모는 **분석·제안만**, 승인은 **사용자만** |
| 실행 | 요청 출처(업무참모 자신이든 부서 PM이든)와 무관하게 항상 **업무참모** | 사용자 승인 후 **인사참모 자신**이 직접 실행(`instance/roles/*.yaml` 수정·삭제, 포트폴리오 갱신 포함) |
| 부서(PM)의 권한 | 요청만 가능(업무참모 경유, 직접 인사참모에게 요청 불가) | **권한 없음** — 기존 class를 건드리는 모든 변경은 인사참모를 거쳐야 함 |

이 비대칭은 의도적이다 — 채용은 카탈로그에 항목 하나를 새로 더할 뿐이라 그 부서 하나에만 걸린
판단이지만, 조직개편은 role이 여러 부서가 재사용하는 **공유 class**이기 때문에(§10.7) 그 정의를
고치거나 없애는 파급이 지금 그 role을 쓰는 부서를 넘어 **앞으로 재사용할 모든 부서**에 미친다.
이 파급 범위는 채용보다 크고, 참모 단독 판단만으로 실행하기엔 책임(§2.4)이 무겁다고 판단해 최종
결정권을 사용자에게 둔다.

*근거*: `CONSTITUTION.md` §10.5, §10.8 + `governance/MODE_POLICY.md` "Org schema vs. org instance"
(단일 주제, §10.5/§10.8 조항 자체가 이미 단일 문서 안의 인접 절).

---

## 9. 자산 프로비저닝(§10.9)이 채용·조직개편과 직교하는 이유, 자산참모의 역할은?

세 개의 서로 다른 질문이 있고, 각각 다른 참모가 답한다(§10.9): **"이 role이 존재해도 되는가"**
(인사참모, 채용/조직개편)와 **"그 role이 실제로 무엇을 쓸 수 있는가"**(자산참모, provisioning)는
근본적으로 다른 판단이라 서로 대신할 수 없다. **모든 role은 예외 없이** provisioning 승인을 거친다
— 신규 채용된 role이든 이미 오래 존재한 role이든, 도구/MCP/스킬 등 실제 쓸 수 있는 자산의 **승인된
카탈로그**는 role 개인이 아니라 **조직에 귀속되는 공유 자산**이기 때문이다(사람이 회사 장비를
개인 소유물처럼 다루지 않는 것과 같은 비유, `AS_ORCHESTRATOR.md` "목적").

**직교(orthogonal)한 이유**: 채용이 승인되었다고 provisioning이 자동으로 따라오지 않고, provisioning
승인이 role의 존재 자체를 정당화하지도 않는다 — 두 축이 서로 독립적으로 움직인다. 실제로 role의
provisioning 기록(`instance/roles/<id>.yaml`의 `provisioning:` 필드)은 처음엔 비어 있다가 자산참모의
승인·실행 이후에만 채워진다.

**자산참모의 역할**: (1) 조직이 처한 실제 제약(보안/비용/라이선스/규제)에 따라 승인된 자산 카탈로그를
`assets/`에 관리, (2) 채용 시점(인사참모 경유)이든 업무 수행 중(업무참모 경유)이든 provisioning
요청을 받아 분석·승인/거부, (3) 승인 결과 반영까지 — 단, "카탈로그 자체"는 자산참모가 직접
쓰지만, "특정 role의 인가 범위 자체"는 skip-level 방지를 위해 실행이 업무참모로 나뉜다(2026-08-14
개정). 카탈로그 항목은 "무엇을 할 수 있게 하는가"라는 추상 capability로만 정의되고 구체적 도구
이름은 담지 않는다 — 그 연결은 어댑터의 몫(§4 답 참고).

*근거*: `CONSTITUTION.md` §10.9 + `schema/AS_ORCHESTRATOR.md` "목적"/§1/§2(다중 문서).

---

## 10. 현재 AISE에 존재하는 role-class 목록과 각 capability는?

`instance/portfolio/index.yaml`(2026-09-09 시점) 기준 5개 role-class:

| id | capabilities | summary |
|---|---|---|
| `project-manager` | project-management, work-decomposition, department-coordination, stakeholder-reporting | 부서 업무를 분해·분배하고 업무참모와의 유일한 인터페이스 역할을 하는 PM class |
| `backend-engineer` | backend-development, api-service-design, github-workflow-integration, spike-prototyping | 플랫폼 웹 서비스의 서버 사이드 개발(API/서비스 로직, GitHub 자동화 연동, 인증/RBAC 백엔드) |
| `hw-toolchain-engineer` | data-modeling, toolchain-integration, hw-domain-parsing, spike-prototyping | SFR 도메인 데이터 모델/스키마 설계와 외부 HW 툴체인(SystemRDL/PeakRDL 등) 통합 구현 |
| `frontend-engineer` | frontend-development, ui-component-implementation, grid-interaction-engineering, spike-prototyping | 웹 UI 컴포넌트·그리드·에디터 구현과 프론트엔드 상호작용 로직 |
| `devops-engineer` | github-actions-engineering, ci-cd-workflow-design, repo-automation-orchestration, spike-prototyping | GitHub Actions 워크플로우·branch protection/CODEOWNERS·repository_dispatch 등 저장소 자동화 인프라 |

이 5개 외에 세 명의 staff(업무참모/인사참모/자산참모)와 경영참모는 이 카탈로그에 속하지 않는다 —
채용으로 생기지 않는 헌법적 role이라 `instance/roles/`/`instance/portfolio/`의 대상이 아니다(문항
1/3 참고).

*근거*: `instance/portfolio/index.yaml`(인스턴스 데이터, 2026-09-09 조회).

---

## 11. 현재 진행 중인 4개 프로젝트와 각각의 상태·목표는?

`instance/workspace/`(2026-09-09 시점, `index.yaml` 산하 4개 부서) 기준:

- **sfr-ssot-platform** (`status: active`) — SFR(HW 레지스터 SoT) 관리 플랫폼. GHES를 콘텐츠
  SSoT로 삼고 플랫폼이 저작/RBAC/리비전 diff/FREEZE 상태머신 등을 감싸는 웹 서비스. F1~F13 기능
  단위 중 다수가 완료(F9/F12 등 엔지니어링 관점 완결), 현재 파일럿 사이클에서 PM 자율 백로그로
  db.py 분해·F4 diff core 진행(PR #22/#23, operator 병합 완료).
- **simple-ragcurl-platform** (`status: draft`) — 개인용 범용 RAG 서비스(retrieval-only, 답변
  생성 없음). curl로 외부에서 조회 가능한 HTTP API. 여덟 개 기능 단위 `dev` 머지 완료, 아홉 번째
  (다부서 파일럿 Wave 1 — BGE-M3+Chroma 배선, 조직 코퍼스 인제스트, RAG 평가 기능, Claude Code
  스킬) 진행 중 — 스킬(`ragcurl-search`)은 산출됐고 인제스트는 세션 경계 밖 백그라운드로 계속됨.
- **llm-wiki-platform** (`status: active`) — 여러 주제별 위키를 만들고 관리하는 통합 LLM Wiki
  플랫폼. `simple-ragcurl-platform`의 검색 API와 연동. Phase 4a/4c(수집 에이전트, 자체 합성)
  구현·PM 검증 완료, PR #10/#11 operator 승인 대기.
- **aise-org-site** (`status: active`, 이 문서를 작성한 부서 자신) — AISE 조직 자체(아키텍처·가치·
  철학)를 설명하는 웹페이지, GitHub Pages 호스팅. 11페이지 IA 확정·배포 완료
  (`https://alex2006-kor.github.io/aise-org-site/`), 현재 파일럿 Wave 2로 콘텐츠·디자인 톤 대폭
  개선 + ragcurl 스킬 통합 + 3-way 비교 레퍼런스 답 작성(이 문서) 진행 중.

*근거*: `instance/workspace/index.yaml` + 4개 부서 각 `execution.md`/`project-record.md` Task/
Status Brief(인스턴스 데이터, 다중 파일).

---

## 12. sfr-ssot에서 "provenance self-attestation"을 폐기하고 권한 기반 차단으로 대체한 이유는?

**원래 설계(F3)**: HW 담당자와 리뷰어가 플랫폼 저작 경로(F2/F12)를 건너뛰고 GHES에 직접
git push→PR을 올리는 걸 막기 위해, "provenance self-attestation"이라는 **사후 검증(콜백)** 체크를
required status check로 두려 했다 — 워크플로우가 백엔드에 콜백해 "이 커밋이 플랫폼을 거쳤는가"를
사후에 검증하는 방식.

**폐기 계기**: 위협모델을 다시 짚어보니, 이 체크가 막으려던 건 결국 "HW 담당자가 플랫폼을
안 거치고 GHES에 직접 접근할 수 있다"는 전제 자체였다. operator가 토의 중 "GitHub 권한 자체를
제한하면 해결되지 않냐"는 방향을 제시했다.

**최종 결정(2026-07-29)**: 사후 검증 메커니즘 자체를 **폐기**하고 **GitHub 권한 구조로 원천
차단**한다 — HW 담당자(Block Owner)에게 메타데이터 레포(GHES)에 대한 **직접 write 권한을 아예
부여하지 않는다.** 플랫폼 서비스 계정(봇)만 write 권한을 가지고, F12(저장=커밋, 제출=PR 생성)를
Git Data API로 전담 대행한다. HW 담당자는 이 레포에 git으로 접근할 **수단 자체가 없으므로**,
"플랫폼을 거쳤는가"를 사후에 검증할 필요 자체가 소멸한다(우회 경로가 권한상 부존재).

**왜 이 방향이 더 나은가**: (1) **탐지보다 원천 차단이 더 확실**하다 — 사후 검증은 놓칠 수 있지만
권한 자체가 없으면 우회가 물리적으로 불가능하다. (2) 기존 F12 설계 철학("GitHub 자체를 완전히
감추는 연결고리 역할" — HW 담당자는 GitHub 개념을 몰라도 됨)과 **완성도 있게 정합**한다 — HW
담당자가 이 레포에 접근할 수단이 아예 없어야 "GitHub을 몰라도 된다"는 UI 약속이 실제로 성립한다.
(3) **파급 단순화** — F3의 세 status check(스키마검증/린터/provenance) 중 provenance만 유일하게
워크플로우→백엔드 콜백이 필요했는데, 이게 제거되며 F3 전체가 콜백 없는 자체완결 워크플로우로
단순해졌다. F9의 RBAC(Block Owner 쓰기 권한)도 "GHES 레포 자체의 사람별 write grant"가 아니라
"플랫폼 애플리케이션 레벨 판정"으로 실현 메커니즘이 명확해졌다. 이 권한 구조는 F3/F9/F12 세 결정이
동시에 의존하는 횡단적 규칙으로 확인되어 sfr-ssot-platform의 project-record.md `Invariants`에
승격됐다.

*근거*: `instance/workspace/sfr-ssot-platform/project-record.md` Ledger
`oq-e-b-f3-provenance-replaced-by-permission-model-2026-07-29` + F3/F9/F12 테이블 행 + Invariants
(근거 문서, 인스턴스 데이터).

---

## 메타 노트 (평가용, 콘텐츠 아님)

- 작성 방식: aise-core 원문 파일을 PM이 직접 Read/Bash로 열람해 정독, ragcurl 스킬은 **사용하지
  않음**(이 경로 (a) 자체가 "원문 직접 정독" 정의이므로 — retrospective § 3-way 정확도 비교 참고).
- 코퍼스 신선도 제약(`directive.md` 2026-09-09 브리핑)에 따라, 이 답변 자체는 아무 영향받지 않음
  — 원문을 직접 읽었기 때문. (b)/(c) 경로와의 대조·집계 시점은 업무참모가 인제스트 완료 확인 후
  조정.
- 질문 유형 분포(retrospective 원안): 단일 문서 5개(1,2,5,6,8), 다중 문서 2개(3,9), 다중 문서 합성
  1개(4), 근거 문서 2개(7,12), 인스턴스 데이터 2개(10,11) — 실제 작성 결과도 이 분포를 그대로
  따랐음.
