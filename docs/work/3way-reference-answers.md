# 3-way 정확도 비교 — 레퍼런스 답 (a) 원문 직접 정독

> `instance/retrospectives/multi-project-orchestration-pilot-2026-09.md` § 골드셋 질문(확정,
> 2026-09-08) 12문항에 대한 정답 축. aise-org-site PM이 aise-core 원문(`CONSTITUTION.md`/`schema/`/
> `governance/`/`instance/`/`knowledge/decisions/`)을 직접 읽고 작성. 각 답변 끝에 근거 경로를
> 명시(ragcurl의 `source_path`와 동일 축으로 대조 가능하도록). 작성일 2026-09-09, aise-org-site PM.
>
> **기준: aise-core `f9dc210`(2026-10-21) — current.** P-11a(2026-10-21, run `decisions-p11a-2026-10-21`)에서 12문항을
> 이 커밋의 원문으로 다시 정독해 갱신했다. 문항 자체는 바꾸지 않았다(골드셋 고정). 2026-09-09판(PR #1) 대비 바뀐 답과
> 그 이유는 맨 끝 "갱신 기록"에 있다 — 3자 비교에서 (b)/(c)가 옛 사실을 답하면 어느 쪽 기준인지 가르는 데 쓴다.

---

## 1. AISE의 depth-2 피라미드 구조와 line/staff 구분은?

**Line 조직은 뎁스 2를 넘지 않는다: 사용자 — 부서 — 부서원.** 부서는 PM과 부서원으로 구성되고,
PM은 부서원의 역할/책임/능력을 알고 업무를 분해·분배한다(§10.2). 뎁스 제약의 근거는 "한 명의
인간 운영자가 조직 전체를 한눈에 파악하고 적절히 결정할 수 있어야 한다"는 요구다 — 깊어질수록 사람의
검토 부담이 무거워진다(§10.1).

이 뎁스에 **포함되지 않는** 별도 축이 staff다 — 업무참모/인사참모/자산참모 셋(§10.3). Meta 모드 전용
경영참모(§11)는 따로 있지만 §10.3의 "셋"에 더해지는 넷째가 아니다(Operator 모드 참모가 아니므로, §11.2). 세 참모는 사용자와 PM 사이에 위치하지만 line 뎁스 카운트에
들어가지 않는다 — 실제 조직의 참모장교/비서실이 위계 뎁스에 포함되지 않는 것과 같은 이치. 셋 다
실행 책임이 없고 서로 동급이며 어느 쪽도 다른 쪽에 보고하지 않는다. 채용 절차 없이 헌법적으로
정의되므로 "이 참모는 누가 채용하는가"라는 순환 문제 자체가 없다(§10.3).

**line/staff의 실질적 차이는 책임의 종류**다(§10.4) — line은 결과물의 기술적 정확성에 대한
**실행 책임**을, staff는 각자 영역(업무참모: 적합한 부서 선정·병목 포착·보고의 정확성 / 인사참모: 채용·
역할 정의·해고 판단의 타당성 / 자산참모: provisioning이 조직의 실제 제약에 맞는가)의 **운영 책임**을 진다. 사용자는 항상 해당 참모를 거쳐 조직에 지시·보고를 받는다 —
PM에게 직접 지시하지 않는다(skip-level 금지, §10.3).

*근거*: `CONSTITUTION.md` §10.1–§10.4, §11.2.

---

## 2. Operator 모드 vs Meta 모드 — 차이와 각 모드의 쓰기 가능/보호 경로는?

두 모드는 **한 사람이 하는 서로 다른 두 가지 일**을 가른다(`governance/MODE_POLICY.md` "Why this
exists"): **Operator**는 지금 있는 조직으로 실제 업무를 시키는 것(PM이 부서원에게 업무를 주듯),
**Meta/Architect**는 조직 자체를 바꾸는 것(role 추가/삭제, workflow 수정, 포트폴리오/자산카탈로그
스키마 변경, 헌법·정책 개정). 섞이면 일상 업무 도중 조직 정의가 조용히 흔들릴 위험이 있다 —
CONSTITUTION §2.1("AI 도구는 교체돼도 철학·운영방식은 유지") 위반.

**Operator 모드**: protected core path(아래) 밖의 모든 것을 읽고/쓸 수 있다 — 산출물, 작업파일,
대상 프로젝트 레포뿐 아니라 **조직 인스턴스 변경**(채용, 역할 정의 변경, 해고, provisioning)도
포함한다. 단 스키마(§10.1–§10.6) 범위 안에서만이다. (예전의 "사용자 승인을 받은 조직개편"은 2026-09-30에
개념째 폐지됐다 — 문항 8.) 스키마 자체가 부족하다는 게 드러나면(예:
뎁스-2가 안 맞음) 조용히 고치지 않고 Meta 모드 전환을 요청한다.

**Meta 모드**: protected core path를 포함해 거의 모든 것을 수정할 수 있다 — 단 배포 인스턴스
데이터(Meta-forbidden instance paths, 아래)는 예외다. 즉 Meta가 Operator의 상위집합이 아니다.

**Protected core paths(Operator에서 못 건드림, Meta 전용)**: `CONSTITUTION.md`, `.env.example`,
`governance/`, `schema/`(아래 전부 — 조직 스키마, 참모 정의, 클래스 템플릿, 포트폴리오 스키마, 워크스페이스
템플릿과 모드 진입 점검), `assets/README.md`, `assets/sandboxed.yaml`, `assets/index.example.yaml`,
`adapters/`(asset realization 제외), 각 어댑터가 스스로 선언한 자기 구현(쓰기 가능으로 선언한 경로 제외),
`knowledge/`, `continuity/`. 실제 비밀 저장소 `.env`는 일부러 목록에 없다(Operator에서 값 기록 허용).

**Meta-forbidden instance paths(Meta에서 못 건드림, Operator 전용)**: `instance/roles/`,
`instance/workspace/`, `instance/retrospectives/`, `instance/portfolio/`, `instance/staff/`,
`assets/index.yaml`, 각 어댑터의 asset-capability mapping. Meta는 이들을 **읽을 수는** 있다(스키마 결정이
실제 인스턴스 상태를 봐야 할 때가 있으므로) — 쓰기만 막힌다.

**Asset realization**(어댑터의 asset-capability mapping, 승인된 스킬을 구현하는 번들 스킬 파일)은 예외 구역이다
— Meta 밖에서는 **자산참모만** grant를 실행하며 쓴다. 그래서 adapter가 Meta 전용이라는 규칙의 예외다.

모드 선언은 **세션(또는 세션 내 특정 작업 범위) 단위**로 명시적으로 이뤄져야 하며, 조용한 기본값은
없다. 두 세션이 동시에 다른 모드일 수 있으므로, 같은 작업 트리를 공유하면 어댑터가 선언을 세션별로 저장한다.
모드 선언은 대화 언어도 정한다(`.aise/language`).

*근거*: `governance/MODE_POLICY.md` 전체.

---

## 3. 업무참모·인사참모·자산참모·경영참모 4개 스태프 역할의 책임 경계는?

네 참모는 "누가/무엇을/어떻게 쓸 수 있는가"를 서로 다른 질문으로 쪼개 각자 답한다 — 서로의 영역에
관여하지 않는다:

- **업무참모(OP_ORCHESTRATOR)** — **업무 실행 운영**: 사용자 의도 분석, 부서 착수(채용이 아니라 실행그래프
  조립), 부서 간 실행 그래프(§10.6), 진행 관리, PM 보고의 **독립 재검증**, 사용자 보고. 채용·역할 정의·
  provisioning은 직접 결정하지 않고 **요청만** 한다. 대신 인사참모·자산참모가 결정한 것 중 인스턴스 파일에
  닿는 두 가지를 실행한다 — 새로 승인된 `instance/roles/<id>.yaml` 생성(§10.5), 승인된 grant를 role의
  `provisioning`에 기록(§10.9). 부서 안에서는 `directive.md` 하나만 쓴다(부서 기록은 PM만).
- **인사참모(HR_ORCHESTRATOR)** — **role 카탈로그 전담**: 채용, 역할 정의 변경, 해고. 업무 실행에는 일절
  관여하지 않는다. 셋 다 **단독, 사용자 승인 없음** — 대신 모든 정의 변경은 업무참모의 상태 보고로 사용자에게
  보고된다(§10.8). 기존 role 파일 수정·삭제는 인사참모가 직접 하고, *새* role 파일 생성만 업무참모가 한다.
  부서에 합류하는 role의 도메인 프로필 조사도 맡는다.
- **자산참모(AS_ORCHESTRATOR)** — **provisioning 전담**: 어떤 role이 무엇을(도구/MCP/스킬) 쓸 수
  있는지. "누가 존재하는가"(인사참모)·"그 존재가 뭘 하는가"(업무참모)에는 관여하지 않는다. 카탈로그와
  asset realization은 직접 쓰고, role별 grant 반영만 업무참모가 순수 실행자로 수행한다(§10.9). 사용자의
  판단이 필요한 결정은 분석·추천과 함께 사용자 승인으로 올릴 수 있다 — 올릴지는 자산참모가 정하고, 요청자가
  정하지 않는다(2026-10-21).
- **경영참모(MG_ORCHESTRATOR)** — 위 셋과 달리 **Meta 모드에서만** 활동, Operator 모드의 업무
  실행·채용·provisioning에는 관여하지 않는다. 조직 스키마(CONSTITUTION/schema/governance)의 진화
  분석·제안, schema-mandated 클래스 템플릿과 모든 line role이 상속하는 공통 베이스
  (`schema/roles/project-member.template.yaml`) 정의·개정, **조직 자가진단(감사 — 회귀 사례 목록과 운영
  감시 목록 포함)**, 나머지 세 참모 자신의 정의 개정 검토. 실제 변경은 사용자 확인 뒤에만 한다. 케이스별 채용 승인·실행그래프 조립·provisioning 승인에는 관여하지
  않고, 부서 산출물 품질 감사도 대상이 아니다(구조/규칙 레벨 감사에 한정).

넷 다 채용 절차 없이 헌법적으로 정의된다(순환 문제 회피). 앞의 셋은 서로 동급(peer)이고 사용자에게
직접 보고하며 skip-level 없이 사용자를 대신 접견한다. 경영참모는 §10.3의 "세 개" 서술에 포함되지
않는 별도 개념(넷째가 아님, 다른 모드에서만 활동, §11.2).

*근거*: `CONSTITUTION.md` §10.3, §11 + `schema/OP_ORCHESTRATOR.md`/`HR_ORCHESTRATOR.md`/
`AS_ORCHESTRATOR.md`/`MG_ORCHESTRATOR.md` 각 "목적"/"핵심 책임" 절(다중 문서).

---

## 4. §2.1("AI 도구는 교체 가능, 철학·운영방식은 유지")이 실제 메커니즘에 어떻게 구현돼 있는가?

이 원칙은 여러 층위의 실제 메커니즘으로 구현된다(다중 문서 합성):

1. **Core/adapter 분리(구조 원칙, §9)** — `CONSTITUTION.md`/`schema/`/`assets/`/`knowledge/`/
   `continuity/`/`governance/`는 도구에 독립적인 core, Claude Code 같은 특정 도구 기능(hooks,
   slash command, subagent 형식)은 반드시 `adapters/<tool>/`에만 존재한다. 새 AI 도구를 지원하려면
   새 adapter를 추가할 뿐 core는 수정하지 않는다(OCP). 어댑터가 무엇을 해야 하는지(점검·차단·상기·기록·
   응답할 것과 그 시점)는 도구 어휘 없이 `governance/adapter_requirements.yaml` 한 곳에 있고,
   `governance/adapter_check.py <tool>`이 그 도구의 어댑터가 첫 실행 요구사항을 갖췄는지 판정한다(각 어댑터는
   `adapters/<tool>/conformance.yaml`로 무엇을 어떻게 갖췄는지 선언). 어댑터가 없는 도구는 규칙을 다 읽고도
   조용히 어길 수 있으므로, 시작 전에 이 점검을 돌리게 한다(`AGENTS.md`).
2. **역할 정의의 도구-불가지론(`schema/README.md` "Role file format (tool-agnostic)")** —
   `instance/roles/<id>.yaml` 포맷에는 도구 전용 필드가 없다. 어댑터가 role 파일을 그 도구에 필요한 형태로
   옮기고, 각 `provisioning` id를 `assets/`와 자기 mapping으로 해석한다(예: Claude Code의 에이전트 정의 생성).
3. **Provisioning의 추상화(§10.9, `AS_ORCHESTRATOR.md` §1)** — 자산 카탈로그 항목은 "무엇을 할 수
   있게 하는가"(추상 capability)만 정의하고, "지금 실행 중인 도구의 어떤 구체적 기능으로 제공하는가"
   는 기록하지 않는다. 그 연결은 어댑터의 일(`governance/ADAPTER_POLICY.md`)이고, 어댑터별 연결 기록
   (asset realization)은 자산참모가 grant를 실행하며 쓴다. role의 provisioning 기록도 추상 `id`만 참조한다.
   같은 이유로 자격 증명 저장소·버전 관리 시스템·호스팅 서비스 같은 환경 고유 이름은 aise-core에 쓰지 않고
   그 배포의 provisioning에만 둔다(`knowledge/decisions/provisioning/asset-catalog.md` "2026-10-21 —
   environment-specifics-are-provisioning").
4. **모델 자체도 provisioning 대상이 아니다** — 어떤 모델(Claude/다른 LLM)을 실행 엔진으로 쓰는지는
   자산참모가 심사하는 대상이 아니다(`knowledge/decisions/provisioning/model-tiers.md` "2026-07-08 — model-is-not-a-provisioned-asset"
   — 이 결정은 §2.1 원칙을 provisioning 계층에서 한 번 더 확인한 것).
5. **모드 정책의 Meta-only core**(`governance/MODE_POLICY.md`) — 조직의 철학·운영방식을 규정하는
   문서(CONSTITUTION/schema 핵심 문서/governance)는 Meta 모드에서만 바뀔 수 있어, 일상 Operator
   작업(AI 도구를 실제로 부리는 층위)이 그 철학을 조용히 침식하지 못하게 막는다.

즉 "AI 도구 교체 가능"은 (a) 코드/문서 구조에서 core-vs-adapter 분리로, "철학·운영방식 유지"는
(b) 모드 정책의 쓰기 권한 경계로, 그 중간의 "역할·자산이 도구에 오염되지 않게"는 (c) 역할 정의·
provisioning의 추상화로 각각 다른 메커니즘이 나눠 구현한다.

*근거*: `CONSTITUTION.md` §2.1, §9 + `schema/README.md`(Role file format 절) +
`schema/AS_ORCHESTRATOR.md` §1 + `governance/MODE_POLICY.md` + `governance/ADAPTER_POLICY.md` +
`governance/adapter_requirements.yaml` + `AGENTS.md` +
`knowledge/decisions/provisioning/model-tiers.md` "2026-07-08 — model-is-not-a-provisioned-asset" +
`knowledge/decisions/provisioning/asset-catalog.md` "2026-10-21 — environment-specifics-are-provisioning"(다중 문서 합성).

---

## 5. 부서(project)와 role-class의 관계, PM이 모든 부서에 필수인 이유는?

**부서(department/project)는 인스턴스, role-class는 클래스(카탈로그 정의)** — 서로 다른 층위다
(§10.7). `instance/roles/<id>.yaml`은 재사용 가능한 클래스이며 어느 한 부서에 귀속되지 않는다 —
어떤 부서도 이미 존재하는 role-class를 승인 절차 없이 자유롭게 재사용할 수 있다. 부서는 role을 소유하지
않으므로 기존 role을 고칠 권한도 없다(§10.5, §10.8). 어느 부서가 어떤 role을 쓰는지는 산문 Roster가 아니라
`instance/workspace/index.yaml`의 부서별 `roles:` 목록에서 읽는다 — 인사참모의 해고·축소 판단이 이 목록을
본다. 부서가 끝나도 generic role-class는 카탈로그에 남고, `domain-specific` class는 그 부서의 종료 검토에서
다른 `active`/`ended` 부서가 쓰지 않을 때만 해고될 수 있다(§10.8).

부서 착수 자체는 채용이 아니다 — 사용자의 의도가 실제 role 실행(위임)을 필요로 하는 순간 업무참모가
부서를 착수하는 것은 일상적인 실행그래프 조립 행위다(§10.5). 부서 형성과 role-class 신규 채용은
서로 다른 두 종류의 사건이다(`schema/README.md` "Phase 1 stance: recruit-on-demand" — "Forming a department
and recruiting a class are different events").

**PM이 모든 부서에 필수인 이유**: PM은 `schema-mandated` 클래스다 — CONSTITUTION §10.2가 부서를
"PM과 부서원으로 구성"된다고 무조건적으로 정의하기 때문에, 인사참모의 재량적 채용 판단(다른
generic-technical/domain-specific 클래스와 달리)이 개입할 여지가 없다. PM은 부서원의 역할·책임·
능력을 알고 업무를 분해·분배하며, **부서를 대표하는 유일한 인터페이스**로서 업무참모와 소통한다
(§10.2, §10.6 — 업무참모는 부서의 다른 부서원에게 직접 위임하지 않는다, skip-level 금지의 부서
내부 버전). 이 schema-mandated 지위 때문에 PM 클래스의 내용은 `instance/roles/`(얇은 인스턴스 파일)가 아니라
포터블 템플릿으로 core에 실려 배포 간 이식된다 — 경계(authority)는 `schema/roles/project-manager.template.yaml`,
절차(run 시작·계획·위임·tier 선택·슬라이스 완료·종료)는 `schema/roles/project-manager.run-start.md`,
부서 파일 형식은 `schema/README.md` "Storage"와 `schema/workspace/execution.template.md`.

*근거*: `CONSTITUTION.md` §10.2, §10.5, §10.7, §10.8 + `schema/README.md`("Role file format (tool-agnostic)",
"Phase 1 stance: recruit-on-demand", "Where the PM's rules live" 절).

---

## 6. Project Record의 섹션 구성(Task/Plan/Invariants/Ledger/Decisions/Open Questions/Next Steps)과 각 역할은?

Project Record(`project-record.md`)는 PM 자신만 쓰고 읽는 상세 연속성 메모리다(업무참모는 절대
직접 쓰지 않음 — 결정·정정은 `directive.md`를 거쳐 PM이 자기 말로 흡수). 실제로는 8개 섹션이다
(Roster 포함):

- **Task** — 원래 요청/목적. "왜"가 필요한 독자를 위한 근거가 여기 남는다.
- **Plan** — Phase별 계획. 남은 작업이 1슬라이스를 넘거나 2개 이상 role-class가 관여할 걸로
  예상되면(기계적 트리거) 작성 필수 — Phase별 중간산출물, 역할 간 공유계약이 언제 확정되는지, 확정
  후 병렬 착수 가능한 role, 통합 지점. 각 Phase는 고정 ID와 그것이 겨냥하는 DoD ID를 갖고
  (`### P-3 — <name> → DoD: F-02, U-02`), `execution.md`의 Plan Traceability 표와 짝을 이룬다. 실행이
  계획과 어긋나면 먼저 갱신(재계획 트리거) — 한 번 쓰고 마는 게 아니다.
- **Invariants** — 미래의 모든 결정이 일관돼야 하는 소수의 교차원칙, **근거(왜)는 담지 않고** 대조
  가능한 한 줄만(근거는 Task에).
- **Roster** — 참여 중인 role-class 목록(run-label별, active/idle 표시) + 합류 시점의 도메인 프로필(인사참모
  조사, 또는 조사가 불필요한 이유 한 줄). role-class 파일 자체는 부서-무관해야 하므로, 이 부서만의 맥락이
  실제로 사는 유일한 자리 — PM이 위임할 때마다 이 프로필을 브리핑에 넣는다. (해고 판단이 보는 "사용 중"
  목록은 Roster가 아니라 `instance/workspace/index.yaml`의 `roles:`.)
- **Ledger** — `| class | run_label | deliverable | timestamp |` 표, 실행 이력. `run_label`은 업무참모가 준
  값 그대로, `deliverable`은 위임 모양을 고정 표기(`delegated: <group> → <group>`)로 적고, 그 run의 세션
  id를 함께 남겨 실제 토큰 비용을 나중에 찾게 한다. 표기가 바뀌어도 기존 행은 고쳐 쓰지 않는다.
- **Decisions** — 다음 run이 다시 논쟁하면 안 되는, 이미 확정된 판단.
- **Open Questions** — 미해소 항목.
- **Next Steps** — 다음 PM run이 이어받을 것.

**핵심 설계**: 매 PM run은 이 세 파일(`execution.md`/`directive.md`/`project-record.md`)에서
매번 재부트스트랩한다 — 이전 run의 기억을 이어받지 않는다("no run carries memory into the next").
세 파일은 읽는 사람·쓰는 사람·갱신 주기로 나뉜다: `execution.md`는 PM이 쓰고 업무참모·사용자가 읽는 현재
상태 보고(Definition of Done + 대시보드, `schema/workspace/execution.template.md` 형식, 서술 기록은 담지
않음), `directive.md`는 업무참모가 추가하고 PM이 흡수한 뒤 지우는 대기 지시, `project-record.md`가 PM 자신의
상세 기억이다. Project Record는 Handoff Record의 섹션 모양(Task/Decisions/Open Questions/Next Steps)을
재사용하되 그 형식을 그대로 쓰지는 않는다. Handoff Record의 걸러 내기 규칙 — 더 이상 운영자 판단이 필요
없는 것(적용된 결정, 깨끗한 점검)은 설명이 아니라 포인터(커밋 등)로 남기고, 다른 기록이 없는 미결 사항만 압축
없이 적는다 — 은 `governance/CONTINUITY_POLICY.md` "Handoff Record format"에 있다.

*근거*: `schema/README.md` "Storage" 절(project-record.md 포맷 정의 전체) + `governance/CONTINUITY_POLICY.md`
"Handoff Record format"(`knowledge/decisions/continuity/handoff-records.md` "2026-07-10 —
continuity-handoff-format-redesigned-around-filtering").

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

이것이 PM run tier의 세 spawn-time 경로(운영자 플래그, 업무참모의 지시문-의도 분류, PM이 run을 끝내며
재계획 필요를 플래그 — PM은 자기 tier를 스스로 바꾸지 않는다)를 **타협이 아니라 실제로 유효한 선택지**로 만든다 — "매
spawn 시점에 결정"이 handoff-tax 연구가 권장하는 방향(mid-run 승격보다 decide-at-spawn이 낫다)과
AISE 설계가 그 결정을 거의 공짜로 만드는 조합이기 때문이다.

**남은 잔여 세금(Residual)**: Record는 구조화돼 있지만, run 종료 전 baseline PM이 Record에 남기는
**문제 서술(problem characterization) 자체는 여전히 baseline 품질**이다 — 더 강한 후속 run은 그
문제 프레이밍을 그대로 받아들이지 않고 재도출해야 한다. handoff-tax가 측정하는 전체 궤적 세금보다는
훨씬 가볍고 제한적인 버전.

*근거*: `knowledge/decisions/execution/delegation.md` "2026-09-08 — stateless-pm-sidesteps-handoff-tax" 전체(근거 문서)
+ `knowledge/decisions/provisioning/model-tiers.md` "2026-09-08 — model-tier-selection-delegated"(세 경로).

---

## 8. 채용(recruitment)과 조직개편(reorganization)의 권한 경로 차이는?

**현재(aise-core `f9dc210`) 기준 답: "조직개편"이라는 권한 경로는 더 없다.** 2026-09-30 operator 결정 D3로
조직개편은 **개념째 폐지**됐고(Tag: reversal), CONSTITUTION v0.6(2026-10-01) §10.5·§10.8이 그에 맞춰 다시
쓰였다. 지금의 차이는 "채용 vs 조직개편"이 아니라 **새 role을 만드는 채용**과 **기존 role의 정의 변경·해고**
사이에 있고, 둘 다 사용자 승인이 없다:

| | 채용(§10.5) | 기존 role의 정의 변경·해고(§10.8) |
|---|---|---|
| 대상 | 새 role-class(`instance/roles/<id>.yaml`) 생성 | 기존 class의 `responsibility`/`authority`/`capabilities`/`reuse_tier` 변경, 카탈로그에서 제거 |
| 분석·승인 | **인사참모 단독**(재사용 우선 확인, 뎁스 점검, 구체적 이유), 사용자 승인 불필요 | **인사참모 단독**, 승인 단계 없음 — 대신 모든 정의 변경을 업무참모의 상태 보고로 **사용자에게 보고** |
| 실행 | 요청 출처와 무관하게 항상 **업무참모**가 파일 생성 | **인사참모**가 직접 수정·삭제(포트폴리오 `role` 항목 포함) |
| 조건 | 기존 카탈로그에 맞는 것이 없을 때 | 확장은 제한 없음. **축소(분할 포함)**는 요청자 외 다른 부서(`active`/`ended`)가 쓰지 않을 때만 — 아니면 그대로 재사용하거나 더 작은 새 role을 나란히 채용(겹쳐도 됨). **해고**는 부서 종료 검토 때, `domain-specific` role만, 어떤 `active`/`ended` 부서도 쓰지 않을 때만(generic은 놀아도 유지) |
| 부서(PM)의 권한 | 요청만(업무참모 경유) | **권한 없음** — 업무참모를 거쳐 인사참모에게 요청 |

`provisioning`은 둘 어디에도 속하지 않는다 — 자산참모의 것이다(§10.9, 문항 9). "사용 중인가"는 산문 Roster가
아니라 `instance/workspace/index.yaml`의 부서별 `roles:` 목록에서 읽고, 사용 중인 role의 삭제는 어댑터가
기계적으로 막는다(`governance/adapter_requirements.yaml` `role-lifecycle`).

**왜 바뀌었나**: 조직개편은 "role이 부서에 속한다"는 전제를 깔고 있었는데, role은 모든 부서가 인스턴스화하는
**공유 class**다(§10.7). 실제로 해가 될 수 있는 것은 "다른 부서가 쓰고 있는 role을 바꾸는 것"뿐이므로, 모든 편집에
승인을 거는 대신 그 위험만 겨냥해 축소·해고에 사용 여부 점검을 걸었다. 축소인지 아닌지는 어떤 장치도 판정할 수
없는 판단이라 승인 대신 보고로 사용자에게 보이게 했다.

(2026-09-09판의 답 — "조직개편은 인사참모가 분석·제안만, 승인은 사용자만, 실행은 인사참모" — 은 당시 원문에는
맞았지만 지금은 폐지된 규칙이다. 3자 비교에서 (b)/(c)가 이 옛 답을 내면 코퍼스가 2026-09-30 이전 상태라는 뜻이다.)

*근거*: `CONSTITUTION.md` §10.5, §10.7, §10.8 + `governance/MODE_POLICY.md` "Org schema vs. org instance" +
`knowledge/decisions/roles/recruitment-and-reorganization.md` "2026-09-30 —
reorganization-abolished-hr-owns-recruitment-and-firing", "2026-09-30 —
role-use-read-from-department-role-list-changes-reported".

---

## 9. 자산 프로비저닝(§10.9)이 채용·조직개편과 직교하는 이유, 자산참모의 역할은?

세 개의 서로 다른 질문이 있고, 각각 다른 참모가 답한다(§10.9): **"이 role이 존재해도 되는가"**
(인사참모, 채용·정의 변경·해고)와 **"그 role이 실제로 무엇을 쓸 수 있는가"**(자산참모, provisioning)는
근본적으로 다른 판단이라 서로 대신할 수 없다. **모든 role은 예외 없이** provisioning 승인을 거친다
— 신규 채용된 role이든 이미 오래 존재한 role이든, 도구/MCP/스킬 등 실제 쓸 수 있는 자산의 **승인된
카탈로그**는 role 개인이 아니라 **조직에 귀속되는 공유 자산**이기 때문이다(사람이 회사 장비를
개인 소유물처럼 다루지 않는 것과 같은 비유, `AS_ORCHESTRATOR.md` "목적").

**직교(orthogonal)한 이유**: 채용이 승인되었다고 provisioning이 자동으로 따라오지 않고, provisioning
승인이 role의 존재 자체를 정당화하지도 않는다 — 두 축이 서로 독립적으로 움직인다. 실제로 role의
provisioning 기록(`instance/roles/<id>.yaml`의 `provisioning:` 필드)은 처음엔 비어 있다가 자산참모의
승인·실행 이후에만 채워진다.

**자산참모의 역할**: (1) 조직이 처한 실제 제약(보안/비용/라이선스/규제 — 내용은 배포별
`governance/ASSET_POLICY.md`)에 따라 승인된 자산 카탈로그를 `assets/`에 관리, (2) 채용 시점(인사참모 경유)이든
업무 수행 중(업무참모 경유)이든 provisioning 요청을 받아 분석·승인/거부 — 사용자의 판단이 필요한 결정은
분석·추천과 함께 사용자 승인으로 올릴 수 있다(올릴지는 자산참모가 정함, 2026-10-21), (3) 실행 — 카탈로그와
어댑터별 asset realization은 자산참모가 직접 쓰지만, "특정 role의 인가 범위(`provisioning` 목록)"는 role 파일에
새 내용이 들어가는 길을 하나로 두기 위해 업무참모가 그대로 옮겨 적는다(재량 없음). grant 기록은 §10.8의 정의
변경이 아니다. 카탈로그 갱신만으로 기존 role의 실제 권한이 조용히 바뀌면 안 되므로, 카탈로그 정의와 role별
인가는 분리돼 있다. 카탈로그 항목은 "무엇을 할 수 있게 하는가"라는 추상 capability로만 정의되고 구체적 도구
이름은 담지 않는다 — 그 연결은 어댑터의 몫(문항 4 참고). 위험의 종류에 따라 심사 깊이도 세 등급으로 나뉜다:
Sandboxed(조직 밖에 닿을 수 없는 것, Meta 전용 목록), Standard-conditional(안전 조건이 확립된 것, 빠른 확인),
Elective(그 밖 전부, 건별 전체 심사)(`assets/README.md` "Provisioning tiers").

*근거*: `CONSTITUTION.md` §10.9 + `schema/AS_ORCHESTRATOR.md` "Purpose"/§1/§2/§4 + `assets/README.md`
"Provisioning tiers"(다중 문서).

---

## 10. 현재 AISE에 존재하는 role-class 목록과 각 capability는?

`instance/portfolio/index.yaml`(2026-10-21 재조회 — 2026-09-09와 같음) 기준 5개 role-class:

| id | capabilities | summary |
|---|---|---|
| `project-manager` | project-management, work-decomposition, department-coordination, stakeholder-reporting | 부서 업무를 분해·분배하고 업무참모와의 유일한 인터페이스 역할을 하는 PM class |
| `backend-engineer` | backend-development, api-service-design, github-workflow-integration, spike-prototyping | 플랫폼 웹 서비스의 서버 사이드 개발(API/서비스 로직, GitHub 자동화 연동, 인증/RBAC 백엔드) |
| `hw-toolchain-engineer` | data-modeling, toolchain-integration, hw-domain-parsing, spike-prototyping | SFR 도메인 데이터 모델/스키마 설계와 외부 HW 툴체인(SystemRDL/PeakRDL 등) 통합 구현 |
| `frontend-engineer` | frontend-development, ui-component-implementation, grid-interaction-engineering, spike-prototyping | 웹 UI 컴포넌트·그리드·에디터 구현과 프론트엔드 상호작용 로직 |
| `devops-engineer` | github-actions-engineering, ci-cd-workflow-design, repo-automation-orchestration, spike-prototyping | GitHub Actions 워크플로우·branch protection/CODEOWNERS·repository_dispatch 등 저장소 자동화 인프라 |

이 5개 외에 세 명의 staff(업무참모/인사참모/자산참모)와 경영참모는 이 카탈로그에 속하지 않는다 —
채용으로 생기지 않는 헌법적 role이라 `instance/roles/`/`instance/portfolio/`의 대상이 아니다(문항
1/3 참고). 포트폴리오에는 role 항목만 있고 `workflow`·`insight` 항목은 아직 없다(종료된 부서가 없어 회고에서
승격된 것이 없다). 부서별 사용 role(`instance/workspace/index.yaml` `roles:`): sfr-ssot-platform 5개 전부,
simple-ragcurl-platform·llm-wiki-platform은 project-manager·backend-engineer·frontend-engineer, aise-org-site는
project-manager·frontend-engineer·devops-engineer.

*근거*: `instance/portfolio/index.yaml` + `instance/workspace/index.yaml`(인스턴스 데이터, 2026-10-21 조회).

---

## 11. 현재 진행 중인 4개 프로젝트와 각각의 상태·목표는?

`instance/workspace/index.yaml`(2026-10-21 조회, 4개 부서 모두 `status: active`) + 각 부서 `execution.md`
Current Status 기준:

- **sfr-ssot-platform** (`active`, last-run `g6-save-fidelity-2026-10-21`) — SFR(HW 레지스터 SoT) 관리
  플랫폼. GHES를 콘텐츠 SSoT로 삼고 플랫폼이 저작/RBAC/리비전 diff/FREEZE 상태머신 등을 감싸는 웹 서비스.
  DoD 40행 중 ✅ 13(가중 43%), 🟡. 지금은 G-6(저장 충실도: Save가 access/reset 값 토큰만 바꾸고 나머지는
  바이트 동일) 구현·검증을 마치고 브랜치 push·PR이 operator 조치 대기(OD-09).
- **simple-ragcurl-platform** (`active` — 2026-09-09에는 `draft`였다, last-run `directive-absorb-2026-10-07-ragcurl`)
  — 개인용 범용 RAG 서비스(retrieval-only, 답변 생성 없음), curl로 조회하는 HTTP API. DoD 27행 중 ✅ 17(가중
  70%), 🟡. 차분 동기화(PR #20)로 코퍼스 경계를 적용(8322청크, 문서 559개), 골드셋 v2 mean recall 0.690→0.711;
  다음은 골드셋 v3. 배포 대상은 operator 미정.
- **llm-wiki-platform** (`active`, last-run `directive-absorb-2026-10-07-wiki`) — 여러 주제별 위키를 만들고 관리하는
  통합 LLM Wiki 플랫폼, `simple-ragcurl-platform`의 검색 API와 연동. DoD 24행 중 ✅ 7(가중 54%), 🟡. P-6~P-8·P-11
  병합(dev `88dba25`), 목업 잠정 승인; 현재 P-9 통합·실검증 단계(로컬 에이전트·실브라우저 실검증은 아직 0회).
- **aise-org-site** (`active`, 이 문서를 작성한 부서 자신) — AISE를 설명하는 웹사이트, GitHub Pages
  (`https://alex2006-kor.github.io/aise-org-site/`). 목적이 2026-10-07 "operator의 포트폴리오·설명 글·필요할 때의
  발표 자료"로 바뀌어, 브리핑(Home) → 이야기 트랙 7쪽 → 참고 자료(기존 19쪽) 구조로 재구성됐고 2026-10-08 공개.
  DoD 22행 중 ✅ 17(가중 80%, 2026-10-07 기준), 🟢. 이번 run은 operator 결정 반영(검토 질문 상자 제거)과 이 문서
  갱신(P-11a); 3자 비교는 업무참모가 한다.

*근거*: `instance/workspace/index.yaml` + 4개 부서 각 `execution.md` Current Status·Dashboard(인스턴스 데이터,
다중 파일, 2026-10-21 조회).

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
승격됐다(2026-10-21 재확인: Invariants에 "GHES 메타데이터 레포(`.rdl` 소스)의 직접 write 권한은 플랫폼 서비스
계정에만 있고 어떤 인간 사용자도 직접 git write를 갖지 않는다" 행이 그대로 있다).

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
  따랐음. 2026-10-21 갱신 뒤에는 8이 단일 문서에서 다중 문서(CONSTITUTION + decision 항목)로 넓어졌다.
- 인스턴스 데이터 문항(10, 11)은 `instance/`가 aise-core 본 저장소 git 밖(중첩 저장소)에 있어, ragcurl/llm-wiki
  코퍼스가 그것을 담는지에 따라 (b)/(c)가 답할 수 없을 수 있다. 문항 11은 시점에 민감하다 — 위 수치는 2026-10-21
  조회값이다.

## 갱신 기록 (P-11a, 2026-10-21 — 2026-09-09판 PR #1 대비)

기준 커밋: aise-core `f9dc210`(2026-10-21). 원문을 다시 정독해 바꾼 곳:

| 문항 | 바뀐 것 | 원인(원문) |
|---|---|---|
| 1 | 경영참모를 "넷째"로 세던 서술 정정; 뎁스 근거 문구; 참모별 운영 책임 구체화 | CONSTITUTION §10.1, §10.4, §11.2 |
| 2 | Operator의 인스턴스 변경에서 "조직개편" 삭제 → 채용·정의 변경·해고·provisioning; protected core를 `schema/` 전체로; `instance/staff/`가 Meta-forbidden에 추가; asset realization 예외; 세션별 모드 선언·대화 언어 | `governance/MODE_POLICY.md`(2026-10-01 이후) |
| 3 | 인사참모 = role 카탈로그 전담(채용·정의 변경·해고 단독, 보고); 업무참모의 독립 재검증·실행 몫; 자산참모의 사용자 승인 경로 | CONSTITUTION §10.3, §10.8; `schema/*_ORCHESTRATOR.md`; AS 2026-10-21 |
| 4 | 어댑터 요구사항 목록·`adapter_check.py`·`conformance.yaml`; 환경 고유 이름은 provisioning | `governance/adapter_requirements.yaml`, `AGENTS.md`; asset-catalog 2026-10-21 |
| 5 | 사용 role 목록(`index.yaml` `roles:`), 해고 조건; PM 규칙의 세 자리; 인용한 절 이름 정정 | CONSTITUTION §10.8; `schema/README.md` |
| 6 | Plan의 Phase ID ↔ DoD ID; Roster·Ledger 세부; `execution.md` = DoD + 대시보드; 없어진 인용 "pointer-not-narrative"를 현재 위치("Handoff Record format"의 걸러 내기 규칙)로 교체 | `schema/README.md` "Storage"; `governance/CONTINUITY_POLICY.md` |
| 7 | 내용 그대로; PM은 자기 tier를 바꾸지 않는다는 점과 근거 항목 추가 | model-tiers 2026-09-08 |
| 8 | **전면 교체** — 조직개편 폐지, 정의 변경·해고는 인사참모 단독(승인 없음, 보고) | recruitment-and-reorganization 2026-09-30 ×2; CONSTITUTION v0.6 §10.8 |
| 9 | 조직개편 언급 삭제; 사용자 승인 경로; grant ≠ 정의 변경; 심사 세 등급 | CONSTITUTION §10.9; AS §2; `assets/README.md` |
| 10 | 재조회 — 변화 없음(5개); 포트폴리오에 workflow·insight 0; 부서별 사용 role | `instance/portfolio/index.yaml`, `instance/workspace/index.yaml` |
| 11 | **전면 교체** — 2026-10-21 상태(ragcurl `draft`→`active`, 각 부서 DoD 수치, 사이트 재구성) | 4개 부서 `execution.md` |
| 12 | 내용 그대로; Invariant 존재 재확인 | sfr-ssot-platform `project-record.md` |
