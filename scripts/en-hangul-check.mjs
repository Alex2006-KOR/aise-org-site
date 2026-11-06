// Real-browser scan of the rendered EN pages for Hangul (DoD N-04). `docs/en` grep cannot see text that comes from
// sources.ts or the theme, so this reads what a reader gets.
//
//   node scripts/en-hangul-check.mjs <baseUrl>
//
// Opens the briefing, chapters 1-9 and the appendices under /en/, opens every folded point, and prints each text node
// holding Hangul, skipping the language switcher. A node inside <blockquote>, or inside a source table's verbatim path and anchor, is
// listed as "quote"; every other node is "outside" and fails. Exit 1 if any node is outside.
import { chromium } from 'playwright'

const base = (process.argv[2] || '').replace(/\/?$/, '/')
if (base === '/') { console.error('usage: node scripts/en-hangul-check.mjs <baseUrl>'); process.exit(2) }
const PAGES = ['', 'story/background', 'story/at-a-glance', 'story/principles', 'story/structure', 'story/how-it-is-kept', 'story/operation',
  'story/verification', 'story/distribution', 'story/growth-and-limits', 'quick-guide', 'glossary']
const browser = await chromium.launch()
const page = await browser.newPage()
let outside = 0, quote = 0
for (const p of PAGES) {
  await page.goto(`${base}en/${p ? p + '.html' : ''}`, { waitUntil: 'networkidle' })
  const found = await page.evaluate(() => {
    document.querySelectorAll('details').forEach(d => { d.open = true })
    const out = []
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    while (w.nextNode()) {
      const n = w.currentNode
      if (!/[가-힣]/.test(n.textContent)) continue
      const el = n.parentElement
      if (el.closest('script, style, .VPNavBarTranslations, .VPNavScreenTranslations, .VPFlyout, .VPMenu')) continue
      const quoted = !!el.closest('blockquote') || !!el.closest('[class*="quote"], q, cite, .aise-cite-path')
      out.push({ quoted, tag: el.tagName, cls: el.className && String(el.className).slice(0, 40), text: n.textContent.trim().slice(0, 100) })
    }
    return out
  })
  for (const f of found) {
    if (f.quoted) quote++; else outside++
    console.log(`${f.quoted ? 'quote  ' : 'outside'} en/${p} <${f.tag}.${f.cls}> ${f.text}`)
  }
}
await browser.close()
console.log(`pages ${PAGES.length}, quote ${quote}, outside ${outside}`)
console.log(`${outside} failure(s)`)
process.exit(outside ? 1 : 0)
