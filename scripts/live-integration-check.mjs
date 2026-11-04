// Real-browser integration check of the published site's structure (P-19; DoD F-02, F-03, U-03, U-04, U-09, U-10, N-06).
//
//   node scripts/live-integration-check.mjs <outDir> <baseUrl>
//
// Per language (KOR root, EN /en/): sidebar groups and story order; the "다음으로"/"Next." chain from the briefing
// through chapters 1-9 back to the briefing (by clicking); per page: point titles (no "결정 되짚어보기" box), figure
// numbers and captions inside <figure>, no diagram (mermaid / inline SVG) without one, exactly one source table, no hyperlink to aise-core, N-06 markers; retired
// reference pages answer 404. Writes results.json + one sidebar screenshot per language. Exit 1 on any failure.
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const [outDir, baseArg] = process.argv.slice(2)
if (!outDir || !baseArg) { console.error('usage: node scripts/live-integration-check.mjs <outDir> <baseUrl>'); process.exit(2) }
const base = baseArg.replace(/\/?$/, '/')
fs.mkdirSync(outDir, { recursive: true })

const CH = ['background', 'at-a-glance', 'principles', 'structure', 'how-it-is-kept', 'operation', 'verification', 'distribution', 'growth-and-limits']
const LANG = {
  ko: { pre: '', groups: ['브리핑', '이야기', '부록'], next: /^(다음으로|처음으로)\./, fig: /^그림 (\d+)-(\d+)\./, revisit: /결정 되짚어보기/,
        marks: { 'story/growth-and-limits': ['TBD', '운영자가 채울 자리'], 'story/distribution': ['설계됨', '구현됨', '검증 전', '실험 뒤 채울 자리'] } },
  en: { pre: 'en/', groups: ['Briefing', 'Story', 'Appendix'], next: /^(Next|Back to the start)\./, fig: /^Figure (\d+)-(\d+)\./, revisit: /Revisiting the decision/,
        marks: { 'story/growth-and-limits': ['TBD'], 'story/distribution': [] } },
}
// Retired by the rewrite (docs/work/rewrite-plan.md §3): the reference track, overview, story/why-organization.
const RETIRED = ['overview', 'story/why-organization', 'ai-native-principles', 'background', 'collaboration-model', 'handoff', 'how-it-works',
  'in-practice', 'lifecycle', 'operator-vs-meta-mode', 'organization-model', 'philosophy', 'real-world-vs-aise', 'staff-governance',
  'structural-principles-ocp', 'ultimate-goal', 'usage', 'value']

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()
const results = { base, at: new Date().toISOString(), langs: {}, retired: [] }
let failed = 0
const fail = (where, msg) => { failed++; (results.failures ||= []).push(`${where}: ${msg}`) }

for (const [lang, L] of Object.entries(LANG)) {
  const R = (results.langs[lang] = { pages: {} })
  await page.goto(base + L.pre, { waitUntil: 'networkidle' })
  // Sidebar: group titles and story items in order.
  R.sidebar = await page.$$eval('.VPSidebar .VPSidebarItem.level-0', (gs) => gs.map((g) => ({
    title: (g.querySelector(':scope > .item .text') || g.querySelector('.text'))?.textContent.trim(),
    items: [...g.querySelectorAll('.VPSidebarItem.level-1 > .item .text, .VPSidebarItem.level-2 > .item .text')].map((e) => e.textContent.trim()),
  })))
  await page.screenshot({ path: path.join(outDir, `${lang}-sidebar.png`) })
  const gt = R.sidebar.map((g) => g.title || '')
  L.groups.forEach((g, i) => { if (!(gt[i] || '').startsWith(g)) fail(`${lang} sidebar`, `group ${i} "${gt[i]}" does not start with "${g}"`) })
  const storyItems = R.sidebar.flatMap((g) => g.items).filter((t) => /^\d\. /.test(t))
  storyItems.forEach((t, i) => { if (!t.startsWith(`${i + 1}. `)) fail(`${lang} sidebar`, `story item ${i} "${t}"`) })
  if (storyItems.length !== 9) fail(`${lang} sidebar`, `${storyItems.length} story items, expected 9`)

  // Next chain by clicking.
  const chain = [new URL(page.url()).pathname]
  for (let i = 0; i < 10; i++) {
    const link = page.locator('.vp-doc p').filter({ hasText: L.next }).locator('a').last()
    if (!(await link.count())) { fail(`${lang} chain`, `no next link on ${page.url()}`); break }
    await link.click(); await page.waitForLoadState('networkidle'); await page.waitForTimeout(150)
    chain.push(new URL(page.url()).pathname)
  }
  R.chain = chain
  const want = [base + L.pre, ...CH.map((c) => `${base}${L.pre}story/${c}.html`), base + L.pre].map((u) => new URL(u).pathname)
  want.forEach((w, i) => { if (chain[i] !== w && chain[i] !== w.replace(/\.html$/, '')) fail(`${lang} chain`, `step ${i}: ${chain[i]} != ${w}`) })

  // Per page.
  for (const p of ['index', ...CH.map((c) => 'story/' + c)]) {
    const url = p === 'index' ? base + L.pre : `${base}${L.pre}${p}.html`
    const res = await page.goto(url, { waitUntil: 'networkidle' })
    const info = await page.evaluate(() => {
      const doc = document.querySelector('.vp-doc')
      return {
        h1: doc.querySelector('h1')?.textContent.trim(),
        points: [...doc.querySelectorAll('summary.aise-point-summary, .aise-point--plain')].map((e) => e.textContent.trim().split('\n')[0]),
        figures: [...doc.querySelectorAll('figcaption')].map((f) => ({ text: f.textContent.trim().slice(0, 120), inFigure: !!f.closest('figure'), hasVisual: !!f.closest('figure')?.querySelector('svg, img, .mermaid, pre, table') })),
        uncaptioned: [...doc.querySelectorAll('.mermaid, svg[role="img"]')].filter((e) => !e.closest('figure')?.querySelector('figcaption')).map((e) => (e.getAttribute('aria-label') || e.textContent).trim().slice(0, 60)),
        sourceTables: doc.querySelectorAll('.aise-source-table').length,
        cites: doc.querySelectorAll('.aise-cite-wrap').length,
        coreLinks: [...doc.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => /github\.com\/[^/]+\/aise-core/.test(h)),
        text: doc.innerText,
      }
    })
    const P = { status: res.status(), uncaptioned: info.uncaptioned, h1: info.h1, points: info.points, figures: info.figures, sourceTables: info.sourceTables, cites: info.cites, coreLinks: info.coreLinks }
    R.pages[p] = P
    const where = `${lang} ${p}`
    if (res.status() !== 200) fail(where, `HTTP ${res.status()}`)
    if (info.points.some((t) => L.revisit.test(t)) || L.revisit.test(info.text)) fail(where, 'a "revisit the decision" box remains')
    if (p !== 'index') {
      if (info.sourceTables !== 1) fail(where, `${info.sourceTables} source tables`)
      const chNo = CH.indexOf(p.slice(6)) + 1
      let k = 0
      for (const f of info.figures) {
        const m = f.text.match(L.fig)
        if (!m) { fail(where, `caption without a number: "${f.text.slice(0, 40)}"`); continue }
        k++
        if (+m[1] !== chNo || +m[2] !== k) fail(where, `figure ${m[1]}-${m[2]} out of order (expected ${chNo}-${k})`)
        if (!f.inFigure || !f.hasVisual) fail(where, `figure ${m[1]}-${m[2]} caption not inside a figure with its visual`)
      }
    }
    for (const u of info.uncaptioned) fail(where, `diagram without a numbered caption: "${u}"`)
    if (info.coreLinks.length) fail(where, `links to aise-core: ${info.coreLinks.join(' ')}`)
    for (const m of L.marks[p] || []) if (!info.text.includes(m)) fail(where, `N-06 marker "${m}" missing`)
    P.firstPerson = (lang === 'ko' ? info.text.match(/(^|[\s(“"'])(저는|제가|저의|저도|저를|제 )/g) : info.text.match(/\b(I|my|we|our|We|Our|My)\b/g)) || []
  }
}
for (const r of RETIRED) for (const pre of ['', 'en/']) {
  const res = await page.goto(`${base}${pre}${r}.html`)
  results.retired.push({ url: `${pre}${r}.html`, status: res.status() })
  if (res.status() !== 404) fail('retired', `${pre}${r}.html answers ${res.status()}`)
}
await browser.close()
results.failed = failed
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2))
console.log(`${failed} failure(s)`); for (const f of results.failures || []) console.log('  ' + f)
process.exit(failed ? 1 : 0)
