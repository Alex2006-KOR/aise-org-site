// Source registry for the <Cite> / <SourceTable> components.
// Key: page slug without locale prefix and without `.md`
// (docs/en/story/x.md and docs/story/x.md both use `story/x`).

/** One switch for links: while the repository is private, no source links are rendered. */
export const repoPublic = false
/** Used only when `repoPublic` is true. */
export const repoBase = 'https://github.com/Alex2006-KOR/aise-core/blob/main/'

export type Kind = 'rule' | 'decision' | 'eval' | 'record' | 'operator'
export type Nature = 'record' | 'operator' | 'hypothesis'

export interface Source {
  id: string
  kind: Kind
  nature: Nature
  date?: string
  name: { ko: string; en: string }
  path?: string
  anchor?: string
  quote?: string
}

// Shared pool: each source is defined once and picked by id for the pages that cite it.
const D = 'knowledge/decisions/'
const pool: Record<string, Source> = {
  // ── rules ──
  'constitution-why': { id: 'constitution-why', kind: 'rule', nature: 'record', name: { ko: '헌법 §1 — 존재 이유', en: 'Constitution §1 — why AISE exists' }, path: 'CONSTITUTION.md', anchor: '## 1. Why AISE Exists (Why)' },
  'constitution-philosophy': { id: 'constitution-philosophy', kind: 'rule', nature: 'record', name: { ko: '헌법 §2 — 다섯 원칙', en: 'Constitution §2 — the five principles' }, path: 'CONSTITUTION.md', anchor: "## 2. AISE's Philosophy" },
  'constitution-accountability': { id: 'constitution-accountability', kind: 'rule', nature: 'record', name: { ko: '헌법 §2.4 — 책임자는 감사 추적의 라벨', en: 'Constitution §2.4 — the accountable party is an audit-trail label' }, path: 'CONSTITUTION.md', anchor: 'Ultimate accountability rests with the human operating the organization.' },
  'constitution-chart': { id: 'constitution-chart', kind: 'rule', nature: 'record', name: { ko: '헌법 §3 — 조직도와 실행 그래프', en: 'Constitution §3 — organization chart and execution graph' }, path: 'CONSTITUTION.md', anchor: '### 3.4 Organization Chart vs. Execution Graph' },
  'constitution-lifecycle': { id: 'constitution-lifecycle', kind: 'rule', nature: 'record', name: { ko: '헌법 §4 — 조직의 생애', en: 'Constitution §4 — organization lifecycle' }, path: 'CONSTITUTION.md', anchor: '## 4. Organization Lifecycle' },
  'constitution-recruitment': { id: 'constitution-recruitment', kind: 'rule', nature: 'record', name: { ko: '헌법 §4.1 — 조직도는 미리 채우지 않는다', en: 'Constitution §4.1 — the organization chart is not pre-filled' }, path: 'CONSTITUTION.md', anchor: 'The organization chart is not pre-filled.' },
  'constitution-ai': { id: 'constitution-ai', kind: 'rule', nature: 'record', name: { ko: '헌법 §7 — AI의 장점 활용', en: "Constitution §7 — leveraging AI's strengths" }, path: 'CONSTITUTION.md', anchor: "## 7. Principles for Leveraging AI's Strengths" },
  'constitution-goal': { id: 'constitution-goal', kind: 'rule', nature: 'record', name: { ko: '헌법 §8 — 궁극 목표', en: 'Constitution §8 — the ultimate goal' }, path: 'CONSTITUTION.md', anchor: "## 8. AISE's Ultimate Goal" },
  'constitution-ocp': { id: 'constitution-ocp', kind: 'rule', nature: 'record', name: { ko: '헌법 §9 — 구조 원칙(OCP)', en: 'Constitution §9 — structural principles (OCP)' }, path: 'CONSTITUTION.md', anchor: '## 9. Structural Principles' },
  'constitution-depth': { id: 'constitution-depth', kind: 'rule', nature: 'record', name: { ko: '헌법 §10.1 — 깊이 2', en: 'Constitution §10.1 — depth 2' }, path: 'CONSTITUTION.md', anchor: 'never exceeds depth 2' },
  'constitution-staff': { id: 'constitution-staff', kind: 'rule', nature: 'record', name: { ko: '헌법 §10.3 — 참모 셋, 건너뛰기 없음', en: 'Constitution §10.3 — three staff, no skip-level' }, path: 'CONSTITUTION.md', anchor: 'The user does not instruct a PM directly (no skip-level)' },
  'constitution-two-accountability': { id: 'constitution-two-accountability', kind: 'rule', nature: 'record', name: { ko: '헌법 §10.4 — 두 종류의 책임', en: 'Constitution §10.4 — two kinds of accountability' }, path: 'CONSTITUTION.md', anchor: '### 10.4 Two kinds of accountability' },
  'constitution-assembly': { id: 'constitution-assembly', kind: 'rule', nature: 'record', name: { ko: '헌법 §10.6 — 협업을 조립하는 쪽', en: 'Constitution §10.6 — who assembles collaboration' }, path: 'CONSTITUTION.md', anchor: '### 10.6 Who assembles collaboration' },
  'constitution-schema-instance': { id: 'constitution-schema-instance', kind: 'rule', nature: 'record', name: { ko: '헌법 §10.7 — 조직의 모양과 구성', en: "Constitution §10.7 — the organization's shape vs. its instance" }, path: 'CONSTITUTION.md', anchor: "### 10.7 The organization's shape (Schema) vs. the organization's instance" },
  'constitution-role-change': { id: 'constitution-role-change', kind: 'rule', nature: 'record', name: { ko: '헌법 §10.8 — 역할의 변경과 해고', en: 'Constitution §10.8 — changing and firing roles' }, path: 'CONSTITUTION.md', anchor: '### 10.8 Changing and firing existing roles' },
  'constitution-mg': { id: 'constitution-mg', kind: 'rule', nature: 'record', name: { ko: '헌법 §11 — 경영참모', en: 'Constitution §11 — the management staff' }, path: 'CONSTITUTION.md', anchor: "## 11. 경영참모 — Meta Mode's Standing Partner" },
  'op-matrix': { id: 'op-matrix', kind: 'rule', nature: 'record', name: { ko: '업무참모 문서 — 결정 권한 표', en: 'Ops-staff document — authority matrix' }, path: 'schema/OP_ORCHESTRATOR.md', anchor: 'Only a decision whose approver is the operator goes to the operator.' },
  'op-directive': { id: 'op-directive', kind: 'rule', nature: 'record', name: { ko: '업무참모 문서 — 부서 안에서는 지시 파일만', en: 'Ops-staff document — only directive.md inside a department' }, path: 'schema/OP_ORCHESTRATOR.md', anchor: 'Inside a department it writes only `directive.md`' },
  'op-reverify': { id: 'op-reverify', kind: 'rule', nature: 'record', name: { ko: '업무참모 문서 — 독립 재검증', en: 'Ops-staff document — independent re-verification' }, path: 'schema/OP_ORCHESTRATOR.md', anchor: 'Independent re-verification' },
  'op-close': { id: 'op-close', kind: 'rule', nature: 'record', name: { ko: '업무참모 문서 — 조직의 성장(닫기 전 검토)', en: 'Ops-staff document — growing the organization (review before closing)' }, path: 'schema/OP_ORCHESTRATOR.md', anchor: '### 8. Growing the organization' },
  'schema-lifecycle': { id: 'schema-lifecycle', kind: 'rule', nature: 'record', name: { ko: '스키마 — 부서의 생애', en: 'Schema — department lifecycle' }, path: 'schema/README.md', anchor: '## Department lifecycle' },
  'schema-storage': { id: 'schema-storage', kind: 'rule', nature: 'record', name: { ko: '스키마 — 부서 기록의 저장', en: 'Schema — storage of department records' }, path: 'schema/README.md', anchor: 'Storage' },
  'instance-skeleton': { id: 'instance-skeleton', kind: 'rule', nature: 'record', name: { ko: '인스턴스 뼈대 — 첫 Operator 모드 진입 때 생성', en: 'Instance skeleton — created at the first Operator-mode entry' }, path: 'schema/instance/README.md', anchor: 'A fresh organization starts with no `instance/` at all' },
  'member-template': { id: 'member-template', kind: 'rule', nature: 'record', name: { ko: '부서원 공통 템플릿', en: 'Common template for department members' }, path: 'schema/roles/project-member.template.yaml' },
  'role-provisioning': { id: 'role-provisioning', kind: 'record', nature: 'record', name: { ko: '역할 파일의 도구 목록(backend-engineer)', en: 'A role file’s provisioning list (backend-engineer)' }, path: 'instance/roles/backend-engineer.yaml', anchor: 'provisioning:' },
  'portfolio-index': { id: 'portfolio-index', kind: 'record', nature: 'record', date: '2026-10-27', name: { ko: '포트폴리오 목록', en: 'Portfolio index' }, path: 'instance/portfolio/index.yaml' },
  'mode-policy': { id: 'mode-policy', kind: 'rule', nature: 'record', name: { ko: '모드 정책 — 두 모드와 보호 경로', en: 'Mode policy — two modes and protected paths' }, path: 'governance/MODE_POLICY.md', anchor: '## Protected core paths' },
  'duplication-policy': { id: 'duplication-policy', kind: 'rule', nature: 'record', name: { ko: '중복 정책 — 다시 적은 값은 어긋난다', en: 'Duplication policy — restated values drift' }, path: 'governance/DUPLICATION_POLICY.md', anchor: 'a single push condition was found restated in six' },
  'adapter-requirements': { id: 'adapter-requirements', kind: 'rule', nature: 'record', name: { ko: '어댑터 요구사항 목록', en: 'Adapter requirements list' }, path: 'governance/adapter_requirements.yaml', anchor: 'id: mode-boundary' },
  'adapter-check': { id: 'adapter-check', kind: 'record', nature: 'record', date: '2026-10-27', name: { ko: '어댑터 점검 결과(claude-code: 37/39)', en: 'Adapter check result (claude-code: 37/39)' }, path: 'governance/adapter_check.py' },
  'agents-md': { id: 'agents-md', kind: 'rule', nature: 'record', name: { ko: '새 도구에서 처음 열 때의 안내(AGENTS.md)', en: 'First steps in a new tool (AGENTS.md)' }, path: 'AGENTS.md', anchor: '## Before doing any other work' },
  'pm-run-start': { id: 'pm-run-start', kind: 'rule', nature: 'record', name: { ko: 'PM 실행 규칙 — 슬라이스 완료 조건', en: 'PM run rules — when a slice is done' }, path: 'schema/roles/project-manager.run-start.md', anchor: 'for UI work, a real-browser interaction check' },
  'audit-readme': { id: 'audit-readme', kind: 'rule', nature: 'record', name: { ko: '감사 — 네 종류와 항목 등록 기준', en: 'Audit — the four kinds and when an item is registered' }, path: 'knowledge/audit/README.md', anchor: '## The kinds' },
  'cmd-op': { id: 'cmd-op', kind: 'rule', nature: 'record', name: { ko: '/aise:op 명령', en: 'The /aise:op command' }, path: '.claude/commands/aise/op.md', anchor: 'Run the entry tools' },
  'adapter-continuity': { id: 'adapter-continuity', kind: 'rule', nature: 'record', name: { ko: '어댑터 — 세션 연속성', en: 'Adapter — session continuity' }, path: 'adapters/claude-code/README.md', anchor: '## Session continuity' },
  'handoff-cmd': { id: 'handoff-cmd', kind: 'rule', nature: 'record', name: { ko: '/aise:handoff 명령', en: 'The /aise:handoff command' }, path: '.claude/commands/aise/handoff.md', anchor: 'Write a continuity record now' },
  'usage-cmd': { id: 'usage-cmd', kind: 'rule', nature: 'record', name: { ko: '/aise:usage 명령', en: 'The /aise:usage command' }, path: '.claude/commands/aise/usage.md', anchor: "Report a session's own token usage and execution graph" },
  // ── decisions ──
  'hooks-reorg': { id: 'hooks-reorg', kind: 'decision', nature: 'record', date: '2026-09-01', name: { ko: '승인 게이트와 공통 훅 모듈', en: 'Approval gate and the shared hook module' }, path: D + 'adapter/hooks.md', anchor: '2026-09-01 — reorg-approval-gate-shared-common-module', quote: 'an explicit anti-bypass instruction, written one day, violated the next' },
  'hook-engine': { id: 'hook-engine', kind: 'decision', nature: 'record', date: '2026-10-21', name: { ko: '훅 엔진 하나, 실패하면 막는다, 정책은 데이터로', en: 'One hook engine, fail closed, policy as data' }, path: D + 'adapter/hooks.md', anchor: '2026-10-21 — hook-engine-and-policy-as-data' },
  'grant-scope': { id: 'grant-scope', kind: 'decision', nature: 'record', date: '2026-07-09', name: { ko: '도구 승인의 범위는 장치가 아니라 판단', en: 'Provisioning scope is a judgment, not a mechanism' }, path: D + 'provisioning/grant-scope-and-conditions.md', anchor: '2026-07-09 — provisioning-scope-is-a-judgment-not-a-mechanism' },
  'folder-access': { id: 'folder-access', kind: 'decision', nature: 'record', date: '2026-07-14', name: { ko: '폴더 단위 접근 제어는 보류(경계는 인프라 층)', en: 'Folder-scoped access control deferred (the boundary is infrastructure)' }, path: D + 'adapter/environment.md', anchor: '2026-07-14 — folder-scoped-access-control-deferred' },
  'hr-split': { id: 'hr-split', kind: 'decision', nature: 'record', date: '2026-07-07', name: { ko: '채용 권한을 인사참모로 분리', en: 'Recruitment authority split to HR staff' }, path: D + 'organization/staff-orchestrators.md', anchor: '2026-07-07 — hr-orchestrator-split' },
  'as-split': { id: 'as-split', kind: 'decision', nature: 'record', date: '2026-07-07', name: { ko: '도구 승인을 자산참모로 분리', en: 'Provisioning split to asset staff' }, path: D + 'organization/staff-orchestrators.md', anchor: '2026-07-07 — as-orchestrator-provisioning-split' },
  'reorg-abolished': { id: 'reorg-abolished', kind: 'decision', nature: 'record', date: '2026-09-30', name: { ko: '"조직개편" 폐지 — 인사참모가 채용과 해고', en: '"Reorganization" abolished — HR staff owns hiring and firing' }, path: D + 'roles/recruitment-and-reorganization.md', anchor: '2026-09-30 — reorganization-abolished-hr-owns-recruitment-and-firing' },
  'pm-recruited': { id: 'pm-recruited', kind: 'decision', nature: 'record', date: '2026-07-09', name: { ko: 'PM은 네 번째 참모가 아니라 채용되는 역할', en: 'The PM is a recruited role, not a fourth staff' }, path: D + 'organization/line-staff-model.md', anchor: '2026-07-09 — pm-is-a-recruited-role-not-a-fourth-staff' },
  'line-staff': { id: 'line-staff', kind: 'decision', nature: 'record', date: '2026-07-07', name: { ko: '라인과 참모 모델 — 예외 없는 건너뛰기 금지', en: 'Line-and-staff model — no skip-level, no exceptions' }, path: D + 'organization/line-staff-model.md', anchor: '2026-07-07 — line-staff-org-model' },
  'persona-never-read': { id: 'persona-never-read', kind: 'decision', nature: 'record', date: '2026-09-15', name: { ko: '참모가 자기 문서를 읽은 적이 없었다', en: 'The staff persona was never realized nor read' }, path: D + 'organization/line-staff-model.md', anchor: '2026-09-15 — orchestrator-persona-never-realized-nor-read' },
  'role-class': { id: 'role-class', kind: 'decision', nature: 'record', date: '2026-07-09', name: { ko: '역할은 인스턴스가 아니라 클래스', en: 'A role is a class, not an instance' }, path: D + 'roles/role-class-model.md', anchor: '2026-07-09 — role-is-a-class-not-an-instance' },
  'recruit-on-demand': { id: 'recruit-on-demand', kind: 'decision', nature: 'record', date: '2026-07-07', name: { ko: '필요할 때만 채용 — 빈 조직도로 시작', en: 'Recruit on demand — start with an empty chart' }, path: D + 'roles/role-class-model.md', anchor: '2026-07-07 — recruit-on-demand-phase-1' },
  'role-proficiency': { id: 'role-proficiency', kind: 'decision', nature: 'record', date: '2026-09-02', name: { ko: '개인 숙련 장치는 다시 보류', en: 'Role proficiency still deferred' }, path: D + 'roles/role-class-model.md', anchor: '2026-09-02 — role-proficiency-idea-still-deferred' },
  'department-project': { id: 'department-project', kind: 'decision', nature: 'record', date: '2026-07-09', name: { ko: '부서는 프로젝트 단위', en: 'A department is project-scoped' }, path: D + 'organization/departments.md', anchor: '2026-07-09 — department-is-project-scoped-not-renamed' },
  'memory-local': { id: 'memory-local', kind: 'decision', nature: 'record', date: '2026-07-07', name: { ko: '조직의 기억은 저장소 안에', en: "The organization's memory lives in the repository" }, path: D + 'organization/departments.md', anchor: '2026-07-07 — org-memory-must-be-project-local' },
  'instance-location': { id: 'instance-location', kind: 'decision', nature: 'record', date: '2026-07-08', name: { ko: '인스턴스 데이터는 aise-core 밖에', en: 'Instance data lives outside the aise-core repository' }, path: D + 'workspace/instance-data-location.md', anchor: '2026-07-08 — instance-data-lives-outside-repo-git' },
  'activation-prompt': { id: 'activation-prompt', kind: 'decision', nature: 'record', date: '2026-07-27', name: { ko: '자동 전환 대신 착수를 묻는 자리', en: 'An activation prompt instead of an automatic trigger' }, path: D + 'modes/mode-model.md', anchor: '2026-07-27 — activation-prompt-point' },
  'record-split': { id: 'record-split', kind: 'decision', nature: 'record', date: '2026-08-26', name: { ko: '부서 기록을 쓰는 주체가 하나인 세 파일로', en: 'Department records split into three single-writer files' }, path: D + 'workspace/department-record-files.md', anchor: '2026-08-26 — report-directive-channel-split' },
  'record-files': { id: 'record-files', kind: 'decision', nature: 'record', date: '2026-08-28', name: { ko: '진행 보고 파일의 이름(execution.md)', en: 'The status file’s name (execution.md)' }, path: D + 'workspace/department-record-files.md', anchor: '2026-08-28 — report-md-renamed-execution-md-harness-collision' },
  'handoff-filter': { id: 'handoff-filter', kind: 'decision', nature: 'record', date: '2026-07-10', name: { ko: '인수인계는 요약 대신 걸러내기', en: 'Handoff by filtering, not summarizing' }, path: D + 'continuity/handoff-records.md', anchor: '2026-07-10 — continuity-handoff-format-redesigned-around-filtering' },
  'knowledge-continuity': { id: 'knowledge-continuity', kind: 'decision', nature: 'record', date: '2026-07-08', name: { ko: '"기억"을 knowledge와 continuity로 나눔', en: '"Memory" split into knowledge and continuity' }, path: D + 'continuity/handoff-records.md', anchor: '2026-07-08 — knowledge-continuity-split' },
  'interface-first': { id: 'interface-first', kind: 'decision', nature: 'record', date: '2026-08-06', name: { ko: '병렬 전에 공유 결정을 먼저', en: 'Settle the shared decision before parallel work' }, path: D + 'execution/pm-authority-and-method.md', anchor: '2026-08-06 — pm-interface-negotiation-before-parallel-work' },
  'isolation': { id: 'isolation', kind: 'decision', nature: 'record', date: '2026-08-28', name: { ko: '병렬 작업에는 독립이 아니라 격리가 필요', en: 'Parallel work needs isolation, not just independence' }, path: D + 'execution/delegation.md', anchor: '2026-08-28 — parallel-work-needs-isolation-not-just-independence' },
  'stateless-pm': { id: 'stateless-pm', kind: 'decision', nature: 'record', date: '2026-09-08', name: { ko: '매번 새로 시작하는 PM은 이어받기의 손실을 피한다', en: 'A stateless PM sidesteps the handoff tax' }, path: D + 'execution/delegation.md', anchor: '2026-09-08 — stateless-pm-sidesteps-handoff-tax' },
  'revive-resume': { id: 'revive-resume', kind: 'decision', nature: 'record', date: '2026-09-30', name: { ko: '멈춘 위임은 새로 띄우지 말고 같은 에이전트를 깨운다', en: 'Revive a stalled delegation by resuming it, not respawning' }, path: D + 'execution/delegation.md', anchor: '2026-09-30 — revive-by-resuming-not-respawning' },
  'model-not-asset': { id: 'model-not-asset', kind: 'decision', nature: 'record', date: '2026-07-08', name: { ko: '모델은 지급하는 자산이 아니다', en: 'The model is not a provisioned asset' }, path: D + 'provisioning/model-tiers.md', anchor: '2026-07-08 — model-is-not-a-provisioned-asset' },
  'model-tiers': { id: 'model-tiers', kind: 'decision', nature: 'record', date: '2026-10-22', name: { ko: '모델 등급은 세션 모델을 따른다, 부서원은 기본 등급', en: 'Tiers follow the session model; members stay at baseline' }, path: D + 'provisioning/model-tiers.md', anchor: '2026-10-22 — tiers-follow-the-session-model' },
  'audits-replace': { id: 'audits-replace', kind: 'decision', nature: 'record', date: '2026-10-26', name: { ko: '감시 목록과 회귀 목록을 감사(AUD)로 대체', en: 'Watchlist and regression registries replaced by audits (AUD)' }, path: D + 'knowledge/self-evaluation-protocols.md', anchor: '2026-10-26 — audits-replace-fts-registries' },
  'observed-not-told': { id: 'observed-not-told', kind: 'decision', nature: 'record', date: '2026-10-21', name: { ko: '관찰되는 쪽에게 관찰 기준을 알리지 않는다', en: 'The observed are not told what is watched' }, path: D + 'knowledge/self-evaluation-protocols.md', anchor: '2026-10-21 — observed-not-told-what-is-watched' },
  'real-browser-by-use': { id: 'real-browser-by-use', kind: 'decision', nature: 'record', date: '2026-10-22', name: { ko: '실제 브라우저 점검은 분류가 아니라 쓰는 방식으로', en: 'Real-browser check by use, not by category' }, path: D + 'workspace/execution-report.md', anchor: '2026-10-22 — real-browser-check-by-use-not-category' },
  // ── evaluations ──
  'ssot-audit': { id: 'ssot-audit', kind: 'eval', nature: 'record', date: '2026-09-30', name: { ko: '저장소 전체 중복 감사', en: 'Repository-wide duplication audit' }, path: 'knowledge/audit/results/2026-09-30-ssot-duplication-audit.md', anchor: '12 functional defects' },
  'round4': { id: 'round4', kind: 'eval', nature: 'record', date: '2026-10-01', name: { ko: '부서 평가 4회차 — 54일 동안 동작하지 않은 편집 기능', en: 'Department evaluation, round 4 — an editing path broken for 54 days' }, path: 'instance/audit/results/assessments/sfr-ssot-platform/2026-10-01-round4.md', anchor: 'never worked in a real browser' },
  // ── operating records ──
  'refactor-commits': { id: 'refactor-commits', kind: 'record', nature: 'record', date: '2026-10-01', name: { ko: '리팩토링 커밋 e314f6d · 8625c8d · 31e90d2 · f53429b', en: 'Refactoring commits e314f6d · 8625c8d · 31e90d2 · f53429b' } },
  'coordination-upstream': { id: 'coordination-upstream', kind: 'record', nature: 'record', date: '2026-10-01', name: { ko: '업무참모의 조율 기록 — upstream 변경 전파 시험', en: 'Coordination record — upstream change propagation test' }, path: 'instance/staff/coordination-record.md', anchor: '2026-10-01 — aise-core upstream restructure: propagation test' },
  'wiki-parallel': { id: 'wiki-parallel', kind: 'record', nature: 'record', date: '2026-10-01', name: { ko: '위키 부서 — 같은 역할 셋에게 병렬 위임 후 병합', en: 'Wiki department — three parallel delegations, then a merge' }, path: 'instance/workspace/llm-wiki-platform/project-record.md', anchor: 'op-batch-absorb-2026-10-01-wiki' },
  'sfr-auth': { id: 'sfr-auth', kind: 'record', nature: 'record', date: '2026-08-20', name: { ko: '한 부서의 로그인 기능 위임(순차, 재검증)', en: 'A department’s login feature delegation (sequential, re-verified)' }, path: 'instance/workspace/sfr-ssot-platform/project-record.md', anchor: 'f9-auth-phase2-phase3-2026-08-20' },
  'ragcurl-eval': { id: 'ragcurl-eval', kind: 'record', nature: 'record', date: '2026-09-15', name: { ko: '검색 부서 — 평가 점수가 떨어진 원인', en: 'Search department — why the evaluation score dropped' }, path: 'instance/workspace/simple-ragcurl-platform/project-record.md', anchor: 'ragcurl-eval-miss-root-cause-llm-wiki-decoy-2026-09-15' },
  'ragcurl-task': { id: 'ragcurl-task', kind: 'record', nature: 'record', name: { ko: '검색 플랫폼 부서의 과제 정의(개인용 범용 RAG 서비스)', en: 'Search-platform department task (personal general-purpose RAG service)' }, path: 'instance/workspace/simple-ragcurl-platform/project-record.md', anchor: '개인용, 범용 RAG 서비스' },
  'portfolio-roles': { id: 'portfolio-roles', kind: 'record', nature: 'record', name: { ko: '포트폴리오 — 역할의 채용 날짜와 재사용', en: 'Portfolio — when roles were recruited, and their reuse' }, path: 'instance/portfolio/index.yaml', anchor: 'id: backend-engineer' },
  'site-ledger': { id: 'site-ledger', kind: 'record', nature: 'record', name: { ko: '이 사이트 부서의 Ledger', en: "This site department's Ledger" }, path: 'instance/workspace/aise-org-site/project-record.md', anchor: '## Ledger' },
  'coordination-wave': { id: 'coordination-wave', kind: 'record', nature: 'record', date: '2026-10-05', name: { ko: '업무참모 기록 — 사용량 한도로 끊긴 run을 같은 에이전트로 재개', en: 'Ops-staff record — a rate-limited run resumed as the same agent' }, path: 'instance/staff/op-orchestrator-record.md', anchor: 'resumed the same agent with SendMessage' },
  'portfolio-report': { id: 'portfolio-report', kind: 'record', nature: 'record', date: '2026-10-26', name: { ko: '부서 전체 진행 보고(독립 재검증 비율)', en: 'Portfolio report (independently verified share)' }, path: 'instance/staff/portfolio-report.md', anchor: 'Verified rate' },
  'backlog-ledger': { id: 'backlog-ledger', kind: 'record', nature: 'record', date: '2026-09-15', name: { ko: '네 부서 Ledger의 op-parallel-backlog-2026-09-15 행', en: 'The op-parallel-backlog-2026-09-15 rows in four Ledgers' }, path: 'instance/workspace/sfr-ssot-platform/project-record.md', anchor: 'op-parallel-backlog-2026-09-15' },
  // ── operator's experience (2026-10-06 account) ──
  'op-fine-control': { id: 'op-fine-control', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '세밀한 통제의 실패와 판단을 맡긴 방향', en: 'Fine control failed; judgment was handed over' } },
  'op-company': { id: 'op-company', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '회사의 구조를 빌린 이유, 하네스도 소프트웨어', en: "Why a company's structure, and the harness is software" } },
  'op-vertical': { id: 'op-vertical', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '수직 구조를 고른 이유와 포기한 것', en: 'Why a vertical structure, and what was given up' } },
  'op-stance': { id: 'op-stance', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '원칙과 경계는 먼저, 기능은 열어 둔다', en: 'Principles and boundaries first, features left open' } },
  'op-solid': { id: 'op-solid', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: 'SOLID — 두 중심축, 의도한 것과 맞아떨어진 것', en: 'SOLID — two axes; intended vs. fell into place' } },
  'op-ocp': { id: 'op-ocp', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: 'OCP를 가장 중요한 원칙으로 삼은 이유', en: 'Why OCP became the most important principle' } },
  'op-template': { id: 'op-template', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '역할 템플릿의 패턴', en: 'The pattern of the role templates' } },
  'op-layered': { id: 'op-layered', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '레이어드 아키텍처와 조직의 말로 지은 이름', en: 'Layered architecture, and names from organizational vocabulary' } },
  'op-hr': { id: 'op-hr', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '인사참모가 생긴 이유', en: 'Why the HR staff exists' } },
  'op-assets': { id: 'op-assets', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '자산참모가 생긴 이유', en: 'Why the asset staff exists' } },
  'op-meta': { id: 'op-meta', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: 'Meta 모드와 경영참모가 생긴 순서', en: 'How Meta mode, then the management staff, came about' } },
  'op-department': { id: 'op-department', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '프로젝트를 부서로 다루는 이유', en: 'Why a project is a department' } },
  'operator-policy': { id: 'operator-policy', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '정책은 운영자가, 구현 제안은 Claude Code가', en: 'Policy from the operator, implementation proposals from Claude Code' } },
  'operator-handoff': { id: 'operator-handoff', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '컨텍스트 30%와 핸드오프의 시작', en: 'The 30% context habit and how handoff began' } },
  'operator-tokens': { id: 'operator-tokens', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '토큰 추적의 계기와 목적', en: 'Why token tracking began and what it is for' } },
  'operator-watch': { id: 'operator-watch', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '일어나지 않은 일은 판단하지 않고 실제 데이터로', en: 'Judge from real data, not from what has not happened' } },
  'op-distribution': { id: 'op-distribution', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '조직이 아니라 정책을 배포한다', en: 'Distribute policy, not the organization' } },
  'op-multi-tool': { id: 'op-multi-tool', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '여러 도구 — 검증 전 표시와 진행 중인 사이트', en: 'Many tools — the "not yet tested" label, and a site built in progress' } },
  'op-growth': { id: 'op-growth', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '성장의 정의 — 템플릿과 포트폴리오', en: 'What growth means — templates and the portfolio' } },
  'op-people-growth': { id: 'op-people-growth', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '사람의 성장 대신 채용과 해고', en: 'Hiring and firing instead of modeling people growth' } },
  'op-results': { id: 'op-results', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '성과는 TBD로 남긴다', en: 'Results stay TBD' } },
  'op-limits': { id: 'op-limits', kind: 'operator', nature: 'operator', date: '2026-10-07', name: { ko: '실패와 한계를 다루는 방식', en: 'How failures and limits are handled' } },
}
const pick = (...ids: string[]): Source[] =>
  ids.map((id) => {
    const s = pool[id]
    if (!s) throw new Error(`sources.ts: unknown source id ${id}`)
    return s
  })

export const sources: Record<string, Source[]> = {
  // Pilot of the step-1 rewrite (2026-10-21): the operator's own account, told 2026-10-06 (parts 1–7).
  'story/background': [
    { id: 'op-common-rules', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '워크플로우마다 공통 규칙을 다시 설명한 경험', en: 'Re-explaining the common rules for every workflow' } },
    { id: 'op-four-needs', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '첫 번째 프레임워크와 네 가지 필요', en: 'The first framework and the four needs' } },
    { id: 'op-agent-or-program', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '워크플로우는 정해진 동작을 하는 프로그램이었다', en: 'The workflows were programs with fixed behavior' } },
    { id: 'op-second-framework', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '두 번째 프레임워크 — 소프트웨어 공학의 작업 흐름', en: 'The second framework — software-engineering workflows' } },
    { id: 'op-six-problems', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '기능이 늘며 생긴 여섯 가지 문제', en: 'Six problems as features grew' } },
    { id: 'op-resources', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '토큰 소진과 도구를 바꿔 이어 가는 생각', en: 'Tokens running out, and switching tools while keeping policy and memory' } },
    { id: 'op-control', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '요구자·감시자·승인자의 자리와 통제의 질문', en: 'The stakeholder, overseer and approver, and the question of control' } },
  ],
  'story/how-it-is-kept': [
  // Chapter-5-only sources.
    { id: 'standing-core-neutral', kind: 'rule', nature: 'record', name: { ko: '상시 규칙 — 핵심은 도구 중립, 도구 고유 부분은 어댑터에', en: 'Standing rules — core stays tool-agnostic; adapters carry the tool-specific parts' }, path: 'governance/STANDING_RULES.md', anchor: '## 3. Core must be tool-agnostic' },
    { id: 'adapter-test', kind: 'rule', nature: 'record', name: { ko: '어댑터 정책 — 도구 고유인지 판별하는 기준', en: 'Adapter policy — the tool-specific test' }, path: 'governance/ADAPTER_POLICY.md', anchor: '## The tool-specific test' },
    { id: 'asset-policy', kind: 'rule', nature: 'record', name: { ko: '자산 정책 — 이 조직의 도구 제약', en: "Asset policy — this organization's tool constraints" }, path: 'governance/ASSET_POLICY.md', anchor: 'Deployment-specific policy' },
    { id: 'asset-patterns', kind: 'rule', nature: 'record', name: { ko: '승인된 도구의 명령 조건 목록', en: 'Command conditions on approved assets' }, path: 'governance/asset_command_patterns.yaml', anchor: 'the machine-readable source the' },
    { id: 'adapter-conformance', kind: 'rule', nature: 'record', name: { ko: 'Claude Code 어댑터의 답(conformance)', en: 'The Claude Code adapter’s conformance inventory' }, path: 'adapters/claude-code/conformance.yaml', anchor: 'mode-boundary:' },
    { id: 'hooks-delegation', kind: 'decision', nature: 'record', date: '2026-09-01', name: { ko: '역할 위임 점검 훅을 연결하고 패턴을 넓힘', en: 'Role-delegation check wired, pattern widened' }, path: 'knowledge/decisions/adapter/hooks.md', anchor: '2026-09-01 — role-delegation-check-wired-regex-widened' },
    ...pick('mode-policy', 'duplication-policy', 'adapter-requirements', 'agents-md', 'hooks-reorg', 'operator-policy', 'hook-engine', 'grant-scope', 'folder-access'),
  ],
  'story/at-a-glance': pick('constitution-depth', 'constitution-staff', 'constitution-why', 'coordination-upstream', 'hooks-reorg', 'mode-policy', 'op-company', 'op-directive', 'op-fine-control', 'op-matrix', 'op-vertical', 'wiki-parallel'),
  'story/principles': pick('adapter-requirements', 'constitution-accountability', 'constitution-ai', 'constitution-depth', 'constitution-goal', 'constitution-ocp', 'constitution-philosophy', 'constitution-why', 'duplication-policy', 'hooks-reorg', 'member-template', 'model-not-asset', 'model-tiers', 'op-layered', 'op-ocp', 'op-solid', 'op-stance', 'op-template', 'refactor-commits', 'role-provisioning', 'ssot-audit', 'recruit-on-demand', 'role-class', 'grant-scope', 'folder-access', 'stateless-pm', 'memory-local', 'line-staff', 'role-proficiency'),
  'story/structure': pick('as-split', 'constitution-chart', 'constitution-depth', 'constitution-mg', 'constitution-recruitment', 'constitution-role-change', 'constitution-schema-instance', 'constitution-staff', 'constitution-two-accountability', 'department-project', 'hr-split', 'instance-location', 'instance-skeleton', 'mode-policy', 'op-assets', 'op-close', 'op-department', 'op-hr', 'op-meta', 'pm-recruited', 'recruit-on-demand', 'reorg-abolished', 'role-class', 'schema-lifecycle'),
  'story/operation': pick('activation-prompt', 'adapter-continuity', 'cmd-op', 'constitution-assembly', 'constitution-staff', 'coordination-wave', 'handoff-cmd', 'handoff-filter', 'interface-first', 'isolation', 'knowledge-continuity', 'line-staff', 'memory-local', 'op-matrix', 'operator-handoff', 'persona-never-read', 'portfolio-roles', 'ragcurl-eval', 'ragcurl-task', 'record-files', 'record-split', 'revive-resume', 'schema-lifecycle', 'schema-storage', 'sfr-auth', 'site-ledger', 'stateless-pm'),
  'story/verification': pick('audit-readme', 'audits-replace', 'backlog-ledger', 'observed-not-told', 'op-reverify', 'operator-tokens', 'operator-watch', 'pm-run-start', 'portfolio-report', 'real-browser-by-use', 'round4', 'usage-cmd'),
  'story/distribution': pick('adapter-check', 'adapter-requirements', 'agents-md', 'instance-location', 'instance-skeleton', 'op-distribution', 'op-multi-tool'),
  'story/growth-and-limits': pick('constitution-goal', 'constitution-lifecycle', 'folder-access', 'op-close', 'op-growth', 'op-limits', 'op-people-growth', 'op-results', 'op-vertical', 'portfolio-index', 'role-proficiency'),
}

export const kindOrder: Kind[] = ['rule', 'decision', 'eval', 'record', 'operator']

export const kindMeta: Record<Kind, { icon: string; ko: string; en: string; enPlural: string }> = {
  rule: { icon: '📜', ko: '규칙', en: 'rule', enPlural: 'rules' },
  decision: { icon: '🧭', ko: '결정', en: 'decision', enPlural: 'decisions' },
  eval: { icon: '🧪', ko: '평가', en: 'evaluation', enPlural: 'evaluations' },
  record: { icon: '📓', ko: '운영 기록', en: 'operating record', enPlural: 'operating records' },
  operator: { icon: '🗣', ko: '운영자 경험', en: "operator's experience", enPlural: "operator's experiences" },
}

export const natureLabel: Record<Nature, { ko: string; en: string }> = {
  record: { ko: '기록 있음 (저장소 비공개 — 공개 예정)', en: 'Record exists (repository private — to be published)' },
  operator: { ko: '운영자 경험', en: "Operator's recollection" },
  hypothesis: { ko: '가설 (검증 전)', en: 'Hypothesis (not verified)' },
}
