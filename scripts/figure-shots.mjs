// Screenshots every <figure> on the given chapters, light and dark (rewrite step 2 evidence).
//   node scripts/figure-shots.mjs <outDir> [<baseUrl>]   (default: preview server on :4173)
//   Folded points are opened first, so a figure inside a detail is shot too.
import { chromium } from 'playwright'
const out = process.argv[2]
const base = (process.argv[3] || 'http://localhost:4173/aise-org-site/').replace(/\/?$/, '/')
const b = await chromium.launch()
for (const scheme of ['light','dark']) {
  const ctx = await b.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } })
  await ctx.addInitScript((s) => localStorage.setItem('vitepress-theme-appearance', s), scheme)
  for (const p of ['story/structure','en/story/structure','story/verification','en/story/verification','story/how-it-is-kept','en/story/how-it-is-kept']) {
    const pg = await ctx.newPage()
    await pg.goto(base + p + '.html', { waitUntil: 'networkidle' })
    await pg.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)))
    await pg.waitForTimeout(300)
    const figs = await pg.locator('figure').all()
    let i = 0
    for (const f of figs) { i++; await f.scrollIntoViewIfNeeded(); await f.screenshot({ path: `${out}/${p.replace(/\//g,'_')}-${scheme}-fig${i}.png` }) }
    console.log(scheme, p, 'figures', figs.length)
    await pg.close()
  }
}
await b.close()
