// Real-browser smoke check of the built site (headless Chromium via Playwright).
//
//   npm run build && npx vitepress preview docs --port 4173 &
//   npm install --no-save playwright@1.49 && npx playwright install chromium
//   node scripts/browser-check.mjs [outDir] [baseUrl]
//
// For every KOR/EN page in light and dark mode: HTTP status, rendered mermaid SVGs, unrendered mermaid
// code blocks, console errors. Screenshots of the pages named in SHOTS go to outDir.
// Exit 1 on any non-200 page or unrendered mermaid block.
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const outDir = process.argv[2] || 'checks/latest'
const base = (process.argv[3] || 'http://localhost:4173/aise-org-site/').replace(/\/?$/, '/')
const docs = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'docs')
const listMd = dir => fs.existsSync(path.join(docs, dir)) ? fs.readdirSync(path.join(docs, dir)).filter(f => f.endsWith('.md') && f !== 'architecture.md').map(f => (dir ? dir + '/' : '') + f.replace(/\.md$/, '')) : []
const pages = [...listMd(''), ...listMd('story')]
const SHOTS = (process.env.SHOTS || 'staff-governance').split(',')

fs.mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
const rows = []
let bad = 0
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } })
  await ctx.addInitScript(s => localStorage.setItem('vitepress-theme-appearance', s), scheme)
  for (const lang of ['', 'en/']) {
    for (const p of pages) {
      const page = await ctx.newPage()
      const errors = []
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
      const url = base + lang + (p === 'index' ? '' : p + '.html')
      const res = await page.goto(url, { waitUntil: 'networkidle' })
      await page.waitForTimeout(400)
      const r = await page.evaluate(() => ({
        mermaid: document.querySelectorAll('.mermaid svg').length,
        unrendered: document.querySelectorAll('.language-mermaid').length,
        boxes: document.querySelectorAll('.custom-block.info').length,
        dark: document.documentElement.classList.contains('dark'),
      }))
      const row = { scheme, lang: lang || 'ko/', page: p, status: res.status(), ...r, consoleErrors: errors.length }
      if (row.status !== 200 || row.unrendered > 0 || row.dark !== (scheme === 'dark')) bad++
      rows.push(row)
      if (SHOTS.includes(p)) await page.screenshot({ path: path.join(outDir, `${(lang || 'ko/').slice(0, 2)}-${p}-${scheme}.png`), fullPage: true })
      await page.close()
    }
  }
  await ctx.close()
}
await browser.close()
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(rows, null, 1))
const sum = k => rows.reduce((a, r) => a + r[k], 0)
console.log(`${rows.length} requests, non-200 ${rows.filter(r => r.status !== 200).length}, mermaid svg ${sum('mermaid')}, unrendered ${sum('unrendered')}, console errors ${sum('consoleErrors')}, failures ${bad}`)
process.exit(bad ? 1 : 0)
