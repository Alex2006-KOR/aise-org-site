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

export const sources: Record<string, Source[]> = {
  // Example page for the citation format (content J, OD-11). Other pages adopt it after the operator's review.
  'story/how-it-is-kept': [
    { id: 'hooks-delegation', kind: 'decision', nature: 'record', date: '2026-09-01', name: { ko: '역할 위임 점검 훅을 연결하고 패턴을 넓힘', en: 'Role-delegation check wired, pattern widened' }, path: 'knowledge/decisions/adapter/hooks.md', anchor: '2026-09-01 — role-delegation-check-wired-regex-widened' },
    { id: 'hooks-reorg', kind: 'decision', nature: 'record', date: '2026-09-01', name: { ko: '승인 게이트와 공통 훅 모듈', en: 'Approval gate and the shared hook module' }, path: 'knowledge/decisions/adapter/hooks.md', anchor: '2026-09-01 — reorg-approval-gate-shared-common-module', quote: 'an explicit anti-bypass instruction, written one day, violated the next' },
    { id: 'operator-policy', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '정책은 운영자가, 구현 제안은 Claude Code가', en: 'Policy from the operator, implementation proposals from Claude Code' } },
    { id: 'watchlist', kind: 'rule', nature: 'record', name: { ko: '감시 목록 규약', en: 'Operational watchlist protocol' }, path: 'knowledge/protocols/operational-watchlist/README.md', anchor: 'Observation cases.' },
    { id: 'regression-fts', kind: 'rule', nature: 'record', name: { ko: '회귀 점검 목록 규약', en: 'Regression test protocol' }, path: 'knowledge/protocols/regression-fts/README.md' },
    { id: 'operator-watch', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '일어나지 않은 일은 판단하지 않고 실제 데이터로', en: 'Judge from real data, not from what has not happened' } },
    { id: 'portfolio-report', kind: 'record', nature: 'record', date: '2026-10-07', name: { ko: '부서 전체 진행 보고(독립 재검증 비율)', en: 'Portfolio report (independently verified share)' }, path: 'instance/staff/portfolio-report.md', anchor: 'Verified rate' },
    { id: 'fts01-round4', kind: 'eval', nature: 'record', date: '2026-10-01', name: { ko: '부서 평가 4회차 — 54일 동안 동작하지 않은 편집 기능', en: 'Department evaluation, round 4 — an editing path broken for 54 days' }, path: 'knowledge/evaluation/2026-10-01-fts01-round4-sfr-ssot.md', anchor: 'never worked in a real browser' },
    { id: 'pm-run-start', kind: 'rule', nature: 'record', name: { ko: 'PM 실행 규칙 — 슬라이스 완료 조건', en: 'PM run rules — when a slice is done' }, path: 'schema/roles/project-manager.run-start.md', anchor: 'for UI work, a real-browser interaction check' },
    { id: 'operator-handoff', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '컨텍스트 30%와 핸드오프의 시작', en: 'The 30% context habit and how handoff began' } },
    { id: 'adapter-continuity', kind: 'rule', nature: 'record', name: { ko: '어댑터 — 세션 연속성', en: 'Adapter — session continuity' }, path: 'adapters/claude-code/README.md', anchor: '## Session continuity' },
    { id: 'handoff-cmd', kind: 'rule', nature: 'record', name: { ko: '/aise:handoff 명령', en: 'The /aise:handoff command' }, path: '.claude/commands/aise/handoff.md', anchor: 'Write a continuity record now' },
    { id: 'ragcurl-task', kind: 'record', nature: 'record', name: { ko: '검색 플랫폼 부서의 과제 정의(개인용 범용 RAG 서비스)', en: 'Search-platform department task (personal general-purpose RAG service)' }, path: 'instance/workspace/simple-ragcurl-platform/project-record.md', anchor: '개인용, 범용 RAG 서비스' },
    { id: 'operator-tokens', kind: 'operator', nature: 'operator', date: '2026-10-06', name: { ko: '토큰 추적의 계기와 목적', en: 'Why token tracking began and what it is for' } },
    { id: 'usage-cmd', kind: 'rule', nature: 'record', name: { ko: '/aise:usage 명령', en: 'The /aise:usage command' }, path: '.claude/commands/aise/usage.md', anchor: "Report a session's own token usage and execution graph" },
    { id: 'coordination-wave', kind: 'record', nature: 'record', date: '2026-10-05', name: { ko: '업무참모 기록 — 사용량 한도로 끊긴 run을 같은 에이전트로 재개', en: 'Ops-staff record — a rate-limited run resumed as the same agent' }, path: 'instance/staff/op-orchestrator-record.md', anchor: 'resumed the same agent with SendMessage' },
    { id: 'revive-resume', kind: 'decision', nature: 'record', date: '2026-09-30', name: { ko: '멈춘 위임은 새로 띄우지 말고 같은 에이전트를 깨운다', en: 'Revive a stalled delegation by resuming it, not respawning' }, path: 'knowledge/decisions/execution/delegation.md', anchor: '2026-09-30 — revive-by-resuming-not-respawning' },
  ],
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
