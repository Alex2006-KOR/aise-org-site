// Screenshots every <figure> on the given chapters, light and dark (rewrite step 2 evidence).
//   node scripts/figure-shots.mjs <outDir>   (preview server on :4173)
import { chromium } from 'playwright'
const out = process.argv[2]
const b = await chromium.launch()
for (const scheme of ['light','dark']) {
  const ctx = await b.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } })
  await ctx.addInitScript((s) => localStorage.setItem('vitepress-theme-appearance', s), scheme)
  for (const p of ['story/structure','en/story/structure','story/verification','en/story/verification','story/how-it-is-kept','en/story/how-it-is-kept']) {
    const pg = await ctx.newPage()
    await pg.goto('http://localhost:4173/aise-org-site/' + p + '.html', { waitUntil: 'networkidle' })
    const figs = await pg.locator('figure').all()
    let i = 0
    for (const f of figs) { i++; await f.scrollIntoViewIfNeeded(); await f.screenshot({ path: `${out}/${p.replace(/\//g,'_')}-${scheme}-fig${i}.png` }) }
    console.log(scheme, p, 'figures', figs.length)
    await pg.close()
  }
}
await b.close()
