// Source-registry check.
//   node scripts/check_sources.mjs <aise-core-path>
// - every source with a `path`: file exists under <aise-core-path>; `anchor` (if set) appears verbatim in it
// - every <Cite ids="..."> id used in docs/**/*.md exists in that page's source list
// - every kind / nature is valid
// Prints findings and `N finding(s)`; exit 1 if any.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const core = process.argv[2]
if (!core || !fs.existsSync(core)) {
  console.error('usage: node scripts/check_sources.mjs <aise-core-path>')
  process.exit(2)
}

// sources.ts is plain data + types; strip types and import it as a module.
const ts = fs.readFileSync(path.join(root, 'docs/.vitepress/sources.ts'), 'utf8')
const js = ts
  .replace(/^export type .*$/gm, '')
  .replace(/^export interface Source \{[\s\S]*?^\}/m, '')
  .replace(/:\s*Record<Kind,[^=]*=/g, ' =')
  .replace(/:\s*Record<Nature,[^=]*=/g, ' =')
  .replace(/:\s*Record<string,\s*Source\[\]>\s*=/g, ' =')
  .replace(/:\s*Kind\[\]\s*=/g, ' =')
const { sources } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'))

const KINDS = ['rule', 'decision', 'eval', 'record', 'operator']
const NATURES = ['record', 'operator', 'hypothesis']
const findings = []

for (const [slug, list] of Object.entries(sources)) {
  const seen = new Set()
  for (const s of list) {
    const where = `[${slug}#${s.id}]`
    if (seen.has(s.id)) findings.push(`${where} duplicate id`)
    seen.add(s.id)
    if (!KINDS.includes(s.kind)) findings.push(`${where} invalid kind "${s.kind}"`)
    if (!NATURES.includes(s.nature)) findings.push(`${where} invalid nature "${s.nature}"`)
    if (s.path) {
      const f = path.join(core, s.path)
      if (!fs.existsSync(f)) findings.push(`${where} path not found: ${s.path}`)
      else if (s.anchor && !fs.readFileSync(f, 'utf8').includes(s.anchor))
        findings.push(`${where} anchor not found verbatim in ${s.path}: "${s.anchor}"`)
    }
  }
}

function* walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === '.vitepress' || e.name === 'node_modules') continue
    const p = path.join(d, e.name)
    if (e.isDirectory()) yield* walk(p)
    else if (e.name.endsWith('.md')) yield p
  }
}
const docs = path.join(root, 'docs')
for (const f of walk(docs)) {
  const rel = path.relative(docs, f).split(path.sep).join('/')
  const slug = rel.replace(/\.md$/, '').replace(/^en\//, '')
  const text = fs.readFileSync(f, 'utf8')
  const ids = new Set((sources[slug] || []).map((s) => s.id))
  for (const m of text.matchAll(/<Cite\s+[^>]*?ids\s*=\s*"([^"]*)"/g))
    for (const id of m[1].split(',').map((x) => x.trim()).filter(Boolean))
      if (!ids.has(id)) findings.push(`[${rel}] <Cite> id "${id}" not in sources["${slug}"]`)
}

for (const f of findings) console.log(f)
console.log(`${findings.length} finding(s)`)
process.exit(findings.length ? 1 : 0)
