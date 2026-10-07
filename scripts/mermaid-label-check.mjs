// Measures whether mermaid node labels are clipped (label content taller than its foreignObject / node box).
//
//   npm run build && npm run preview -- --port 4173 &
//   npm install --no-save playwright@1.63.0
//   node scripts/mermaid-label-check.mjs <outDir> <baseUrl> <page-path> [<page-path> ...]
//
// page-path: `staff-governance`, `en/staff-governance`, ... Light and dark. For every mermaid diagram node/edge
// label: the label's laid-out size in the page (offsetHeight/offsetWidth, unscaled px) vs the size mermaid reserved
// (foreignObject height/width attributes; the foreignObject clips anything beyond). clipPx / clipXPx = overflow. Writes results.json and one
// PNG per diagram into <outDir>. Exit 1 if any label is clipped by more than 0.5px.
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const [outDir, baseArg, ...pages] = process.argv.slice(2)
if (!outDir || !baseArg || !pages.length) {
  console.error('usage: node scripts/mermaid-label-check.mjs <outDir> <baseUrl> <page-path> [...]')
  process.exit(2)
}
const base = baseArg.replace(/\/?$/, '/')
fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
const out = []
let clippedTotal = 0
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } })
  await ctx.addInitScript((s) => localStorage.setItem('vitepress-theme-appearance', s), scheme)
  for (const p of pages) {
    const page = await ctx.newPage()
    await page.goto(base + p + '.html', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    // open collapsed points so every diagram is laid out
    await page.evaluate(() => document.querySelectorAll('details.aise-point').forEach((d) => (d.open = true)))
    await page.waitForTimeout(500)
    const res = await page.evaluate(() => {
      const diagrams = [...document.querySelectorAll('.mermaid svg')]
      return diagrams.map((svg, di) => {
        const labels = [...svg.querySelectorAll('foreignObject')].map((fo) => {
          const inner = fo.firstElementChild
          // unscaled layout px (svg may be scaled): size mermaid reserved (foreignObject attrs) vs size the label has in the page
          const reservedH = parseFloat(fo.getAttribute('height'))
          const reservedW = parseFloat(fo.getAttribute('width'))
          const naturalH = inner.offsetHeight
          const naturalW = inner.offsetWidth
          const cs = getComputedStyle(inner)
          const p = inner.querySelector('p')
          return {
            text: inner.textContent.trim().replace(/\s+/g, ' ').slice(0, 40),
            reservedH, naturalH, reservedW, naturalW,
            clipPx: +Math.max(0, naturalH - reservedH).toFixed(2),
            clipXPx: +Math.max(0, naturalW - reservedW).toFixed(2),
            pLineHeight: p ? getComputedStyle(p).lineHeight : null,
            divLineHeight: cs.lineHeight,
            fontSize: cs.fontSize,
          }
        }).filter((l) => l.text)
        return { diagram: di, labels }
      })
    })
    const flat = res.flatMap((d) => d.labels)
    const clipped = flat.filter((l) => l.clipPx > 0.5 || l.clipXPx > 0.5)
    clippedTotal += clipped.length
    out.push({ scheme, page: p, diagrams: res.length, labels: flat.length, clipped: clipped.length, maxClipPx: Math.max(0, ...flat.map((l) => l.clipPx)), maxClipXPx: Math.max(0, ...flat.map((l) => l.clipXPx)), clippedLabels: clipped, detail: res })
    const els = await page.$$('.mermaid')
    for (let i = 0; i < els.length; i++) {
      await els[i].scrollIntoViewIfNeeded()
      await els[i].screenshot({ path: path.join(outDir, `${p.replace(/\//g, '_')}-${scheme}-diagram${i}.png`) }).catch(() => {})
    }
    await page.close()
  }
  await ctx.close()
}
await browser.close()
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(out, null, 1))
for (const r of out) console.log(`${r.scheme} ${r.page}: diagrams ${r.diagrams}, labels ${r.labels}, clipped ${r.clipped}, maxClipPx ${r.maxClipPx}, maxClipXPx ${r.maxClipXPx}`)
console.log(`${clippedTotal} clipped label(s)`)
process.exit(clippedTotal ? 1 : 0)
