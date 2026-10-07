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
  // Demo entries for the fixture page (docs/levels-demo.md); remove with the fixture.
  'levels-demo': [
    {
      id: 'constitution',
      kind: 'rule',
      nature: 'record',
      name: { ko: 'AISE 헌법', en: 'AISE Constitution' },
      path: 'CONSTITUTION.md',
    },
    {
      id: 'constitution-sec',
      kind: 'rule',
      nature: 'record',
      date: '2026-09-30',
      name: { ko: '헌법의 한 절', en: 'A section of the Constitution' },
      path: 'CONSTITUTION.md',
      anchor: 'CONSTITUTION',
      quote: 'A short quoted sentence shown in italics.',
    },
    {
      id: 'agents',
      kind: 'decision',
      nature: 'record',
      date: '2026-10-01',
      name: { ko: '도구 중립 진입 문서', en: 'Tool-neutral entry document' },
      path: 'AGENTS.md',
    },
    {
      id: 'operator-memo',
      kind: 'operator',
      nature: 'operator',
      date: '2026-09-28',
      name: { ko: '운영자가 겪은 일', en: 'What the operator experienced' },
    },
    {
      id: 'guess',
      kind: 'eval',
      nature: 'hypothesis',
      name: { ko: '아직 검증하지 않은 추정', en: 'An estimate not yet verified' },
    },
    {
      id: 'ops-log',
      kind: 'record',
      nature: 'record',
      date: '2026-10-05',
      name: { ko: '운영 기록 한 건', en: 'One operating record' },
      path: 'README.md',
    },
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
