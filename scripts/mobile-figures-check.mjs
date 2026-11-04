// Real-browser check of figures at phone width (DoD U-06, P-21).
//
//   node scripts/mobile-figures-check.mjs <outDir> <baseUrl> [--min=<px>]
//
// Chromium with a 390x844 mobile context. For the briefing, chapters 1-9 and the two appendix pages, KOR and EN:
// opens every folded point, then reports page-level horizontal overflow, and for every diagram in a <figure> its
// rendered width, whether the figure itself scrolls, and the effective size of its labels (computed font size x the
// SVG's on-screen scale). With --min, exit 1 if any page overflows or any label's effective size is under <px>.
import { chromium, devices } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const minArg = args.find(a => a.startsWith('--min='))
const min = minArg ? Number(minArg.slice(6)) : null
const [outDir, baseArg] = args.filter(a => !a.startsWith('--'))
if (!outDir || !baseArg) { console.error('usage: node scripts/mobile-figures-check.mjs <outDir> <baseUrl> [--min=<px>]'); process.exit(2) }
const base = baseArg.replace(/\/?$/, '/')
fs.mkdirSync(outDir, { recursive: true })

const PAGES = ['', 'story/background', 'story/at-a-glance', 'story/principles', 'story/structure', 'story/how-it-is-kept', 'story/operation',
  'story/verification', 'story/distribution', 'story/growth-and-limits', 'quick-guide', 'glossary']
const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
const rows = []
let bad = 0
for (const lang of ['', 'en/']) {
  for (const p of PAGES) {
    const page = await ctx.newPage()
    const res = await page.goto(base + lang + (p ? p + '.html' : ''), { waitUntil: 'networkidle' })
    await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true }))
    await page.waitForTimeout(800)
    const r = await page.evaluate(() => {
      const figs = [...document.querySelectorAll('.vp-doc figure')].filter(f => f.querySelector('svg'))
      return {
        scrollWidth: document.documentElement.scrollWidth,
        figures: figs.map(f => {
          const svg = f.querySelector('svg')
          const ctm = svg.getScreenCTM()
          const scale = ctm ? ctm.a : 0
          const sizes = []
          for (const t of svg.querySelectorAll('text')) { if (t.textContent.trim() && !t.closest('foreignObject')) sizes.push(parseFloat(getComputedStyle(t).fontSize) * scale) }
          for (const t of svg.querySelectorAll('foreignObject')) {
            if (!t.textContent.trim()) continue
            const inner = t.querySelector('p, span, div') || t
            sizes.push(parseFloat(getComputedStyle(inner).fontSize) * scale)
          }
          const box = svg.getBoundingClientRect()
          let scroller = null
          for (let e = svg.parentElement; e && e !== document.body; e = e.parentElement) {
            if (e.scrollWidth > e.clientWidth + 1 && /(auto|scroll)/.test(getComputedStyle(e).overflowX)) { scroller = e; break }
          }
          return {
            caption: (f.querySelector('figcaption')?.textContent || '').trim().slice(0, 14),
            kind: svg.closest('.mermaid') ? 'mermaid' : 'svg',
            width: Math.round(box.width), height: Math.round(box.height), scale: +scale.toFixed(3),
            minLabel: sizes.length ? +Math.min(...sizes).toFixed(1) : null,
            maxLabel: sizes.length ? +Math.max(...sizes).toFixed(1) : null,
            labels: sizes.length, scrolls: !!scroller,
            right: Math.round(box.right),
          }
        }),
      }
    })
    const row = { page: (lang || 'ko/') + (p || 'index'), status: res.status(), ...r }
    if (row.status !== 200 || row.scrollWidth > 390) bad++
    if (min != null) bad += row.figures.filter(f => f.minLabel == null || f.minLabel < min).length
    rows.push(row)
    await page.close()
  }
}
await browser.close()
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(rows, null, 1))
const figs = rows.flatMap(r => r.figures.map(f => ({ page: r.page, ...f })))
for (const f of figs) console.log(`${f.page.padEnd(30)} ${f.caption.padEnd(15)} ${f.kind.padEnd(7)} w=${String(f.width).padEnd(5)} h=${String(f.height).padEnd(5)} scale=${String(f.scale).padEnd(6)} min=${f.minLabel} max=${f.maxLabel} n=${f.labels} scrolls=${f.scrolls}`)
console.log(`pages ${rows.length}, page overflow ${rows.filter(r => r.scrollWidth > 390).length}, figures ${figs.length}, min label ${Math.min(...figs.map(f => f.minLabel ?? 999))}, under ${min ?? '-'}: ${min != null ? figs.filter(f => (f.minLabel ?? 0) < min).length : '-'}`)
console.log(`${bad} failure(s)`)
process.exit(bad ? 1 : 0)
