// Real-browser check of figures at phone width (DoD U-06, P-21).
//
//   node scripts/mobile-figures-check.mjs <outDir> <baseUrl> [--min=<px>]
//
// Chromium with a 390x844 mobile context. For the briefing, chapters 1-9 and the two appendix pages, KOR and EN:
// opens every folded point, then reports page-level horizontal overflow, and for every diagram in a <figure> its
// rendered width, whether the figure itself scrolls, and the effective size of its labels (computed font size x the
// SVG's on-screen scale; every text node in the SVG). With --min, exit 1 if any page overflows, any label's effective
// size is under <px>, or a figure breaks the figures.ts contract (reason printed):
//   wide (aise-fig-wide): it is not the scroller or does not scroll, its SVG's left or right edge is out of reach, its
//     caption leaves view when scrolled to the far end, no sticky hint, not keyboard reachable, labels over <px> + 0.2
//     (enlarged beyond need), or its width differs from the one it had while its point was closed;
//   not wide: it was changed anyway (it scrolls, or the SVG is wider than the figure).
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
    await page.waitForTimeout(600) // mermaid's first render, while the points are still closed
    const closedWidths = await page.evaluate(() => [...document.querySelectorAll('.vp-doc figure')]
      .map(f => f.closest('details:not([open])') ? f.style.getPropertyValue('--aise-fig-width') : null))
    await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true }))
    await page.waitForTimeout(800)
    const r = await page.evaluate(({ closedWidths, min }) => {
      const all = [...document.querySelectorAll('.vp-doc figure')]
      const figs = all.filter(f => f.querySelector('svg'))
      return {
        scrollWidth: document.documentElement.scrollWidth,
        figures: figs.map(f => {
          const svg = f.querySelector('svg')
          const ctm = svg.getScreenCTM()
          const scale = ctm ? ctm.a : 0
          const sizes = []
          const texts = document.createTreeWalker(svg, NodeFilter.SHOW_TEXT)
          while (texts.nextNode()) {
            const parent = texts.currentNode.parentElement
            if (texts.currentNode.nodeValue.trim() && !parent.closest('style, title, desc')) sizes.push(parseFloat(getComputedStyle(parent).fontSize) * scale)
          }
          const box = svg.getBoundingClientRect()
          let scroller = null
          for (let e = svg.parentElement; e && e !== document.body; e = e.parentElement) {
            if (e.scrollWidth > e.clientWidth + 1 && /(auto|scroll)/.test(getComputedStyle(e).overflowX)) { scroller = e; break }
          }
          const wide = f.classList.contains('aise-fig-wide')
          const closed = closedWidths[all.indexOf(f)]
          const problems = []
          const fbox = f.getBoundingClientRect()
          if (wide) {
            const cap = f.querySelector('figcaption')
            const capInView = () => { const b = cap.getBoundingClientRect(); return b.width > 0 && b.left >= fbox.left - 1 && b.right <= fbox.right + 1 }
            if (scroller !== f) problems.push('figure is not the scroller')
            if (box.left < fbox.left - 1) problems.push(`svg left cut off by ${Math.round(fbox.left - box.left)}px`)
            if (!capInView()) problems.push('caption out of view at scroll 0')
            f.scrollLeft = 1e6
            if (f.scrollLeft <= 0) problems.push('does not scroll')
            if (svg.getBoundingClientRect().right > fbox.right + 1) problems.push('svg right edge unreachable')
            if (!capInView()) problems.push('caption scrolls away')
            f.scrollLeft = 0
            const hint = getComputedStyle(f, '::before')
            if (hint.position !== 'sticky' || hint.content === 'none') problems.push('no sticky hint')
            if (f.tabIndex !== 0) problems.push('not keyboard reachable')
            if (min != null && sizes.length && Math.min(...sizes) > min + 0.2) problems.push('enlarged beyond need')
            if (closed !== null && closed !== undefined && closed !== f.style.getPropertyValue('--aise-fig-width')) problems.push(`width while closed: ${closed || 'unset'}`)
          } else if (scroller === f || box.width > fbox.width + 1) problems.push('changed though not wide')
          return {
            caption: (f.querySelector('figcaption')?.textContent || '').trim().slice(0, 14),
            kind: svg.closest('.mermaid') ? 'mermaid' : 'svg',
            width: Math.round(box.width), height: Math.round(box.height), scale: +scale.toFixed(3),
            minLabel: sizes.length ? +Math.min(...sizes).toFixed(1) : null,
            maxLabel: sizes.length ? +Math.max(...sizes).toFixed(1) : null,
            labels: sizes.length, scrolls: !!scroller,
            right: Math.round(box.right), wide, closed: closed !== null && closed !== undefined, problems,
          }
        }),
      }
    }, { closedWidths, min })
    const row = { page: (lang || 'ko/') + (p || 'index'), status: res.status(), ...r }
    if (row.status !== 200 || row.scrollWidth > 390) bad++
    if (min != null) bad += row.figures.filter(f => f.minLabel == null || f.minLabel < min || f.problems.length).length
    rows.push(row)
    await page.close()
  }
}
await browser.close()
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(rows, null, 1))
const figs = rows.flatMap(r => r.figures.map(f => ({ page: r.page, ...f })))
for (const f of figs) console.log(`${f.page.padEnd(30)} ${f.caption.padEnd(15)} ${f.kind.padEnd(7)} w=${String(f.width).padEnd(5)} h=${String(f.height).padEnd(5)} scale=${String(f.scale).padEnd(6)} min=${f.minLabel} max=${f.maxLabel} n=${f.labels} scrolls=${f.scrolls}${f.wide ? ' wide' : ''}${f.closed ? ' closed' : ''}${f.problems.length ? ' PROBLEM: ' + f.problems.join('; ') : ''}`)
const widest = figs.filter(f => f.wide).sort((a, b) => b.width - a.width)
console.log(`widened ${widest.length} of ${figs.length}; widest: ${widest.slice(0, 3).map(f => `${f.page} ${f.caption} ${f.width}px`).join(', ')}`)
console.log(`pages ${rows.length}, page overflow ${rows.filter(r => r.scrollWidth > 390).length}, figures ${figs.length}, min label ${Math.min(...figs.map(f => f.minLabel ?? 999))}, under ${min ?? '-'}: ${min != null ? figs.filter(f => (f.minLabel ?? 0) < min).length : '-'}`)
console.log(`${bad} failure(s)`)
process.exit(bad ? 1 : 0)
