// Real-browser check that the old "reorganization needs user approval" wording is gone and the new text is
// shown (DoD N-05 after PR #14/#15), plus Korean glyph screenshots (CJK fonts installed, OQ-10 closed).
//
//   npm run build && npm run preview -- --port 4173 &
//   npm install --no-save playwright@<matching cached chromium>
//   node scripts/wording-check.mjs <outDir> [baseUrl]
//
// The rendered text of each page (innerText of .vp-doc) must not contain any OLD phrase and must contain
// every NEW phrase listed for it. Exit 1 on any failure.
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const outDir = process.argv[2] || 'checks/latest'
const base = (process.argv[3] || 'http://localhost:4173/aise-org-site/').replace(/\/?$/, '/')

// Phrases removed by PR #14 (present-tense "reorganization needs the user's approval") and phrases it added.
const PAGES = [
  { p: 'quick-guide', old: ['기존 구조를 흔드는 조직개편만 사용자 결재가 필요합니다'], neu: ['기존 역할의 정의 변경·해고도 인사참모가 스스로 하며 사용자 결재는 없습니다'] },
  { p: 'operator-vs-meta-mode', old: ['승인을 거친 조직개편까지도 여기 포함됩니다'], neu: [] },
  { p: 'staff-governance', old: ['채용/조직개편의 분석·승인·실행 분리는'], neu: ['조직개편"이라는 개념을 없앤 이유', '2026-09-30에 다시 바뀌었습니다'] },
  { p: 'glossary', old: [], neu: ['2026-09-30까지 쓰던 "조직개편"이라는 개념은 폐지됐습니다'] },
  { p: 'lifecycle', old: [], neu: ['개념도 2026-09-30에 폐지돼'] },
  { p: 'en/quick-guide', old: ['Only a reorganization that shakes the existing structure'], neu: [] },
  { p: 'en/operator-vs-meta-mode', old: ['even reorganization that has been approved by the user'], neu: [] },
  { p: 'en/staff-governance', old: ['split for recruitment/reorganization'], neu: ['why the concept of "reorganization" was dropped'] },
  { p: 'en/glossary', old: [], neu: ['The concept of "reorganization" used until 2026-09-30 has been dropped'] },
]

fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const rows = []
let bad = 0
for (const { p, old, neu } of PAGES) {
  const page = await ctx.newPage()
  const url = base + p + '.html'
  const res = await page.goto(url, { waitUntil: 'networkidle' })
  const text = await page.evaluate(() => document.querySelector('.vp-doc')?.innerText || '')
  const norm = s => s.replace(/[“”]/g, '"').replace(/\s+/g, ' ')
  const t = norm(text)
  const oldFound = old.filter(s => t.includes(norm(s)))
  const newMissing = neu.filter(s => !t.includes(norm(s)))
  const ok = res.status() === 200 && oldFound.length === 0 && newMissing.length === 0
  if (!ok) bad++
  rows.push({ page: p, status: res.status(), oldFound, newMissing, ok })
  if (['staff-governance', 'glossary', 'quick-guide'].includes(p)) {
    await page.screenshot({ path: path.join(outDir, `ko-${p}.png`) })
  }
  await page.close()
}
// Korean glyph check: count characters rendered with a CJK-capable font is not observable directly, so record
// the computed font stack and take a screenshot of a Korean diagram page for visual review.
const page = await ctx.newPage()
await page.goto(base + 'staff-governance.html', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
const fam = await page.evaluate(() => getComputedStyle(document.querySelector('.vp-doc p')).fontFamily)
const mer = await page.locator('.mermaid').first()
if (await mer.count()) { await mer.scrollIntoViewIfNeeded(); await mer.screenshot({ path: path.join(outDir, 'ko-staff-governance-mermaid.png') }) }
await browser.close()
const out = { base, checkedAt: new Date().toISOString(), fontFamily: fam, failures: bad, rows }
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(out, null, 2))
console.log(rows.map(r => `${r.ok ? 'OK  ' : 'FAIL'} ${r.page} ${r.status} old=${r.oldFound.length} missing=${r.newMissing.length}`).join('\n'))
console.log(`${bad} failure(s)`)
process.exit(bad ? 1 : 0)
