// Real-browser check of the page-level machinery (lead / point / expand-all / deep link / print / mermaid / find).
//
//   npm run build && npm run preview -- --port 4173 &
//   npm install --no-save playwright@1.63.0        # not a dependency; matches ~/.cache/ms-playwright chromium-1243
//   node scripts/levels-check.mjs <outDir> <baseUrl> <page-path> [<page-path> ...]
//
// page-path: `story/how-it-is-kept`, `en/story/...`, or `index` (Home; `en/index` for English Home).
// Per page, light and dark: level counts, initial state, expand/collapse all, deep link (load, hashchange,
// client-side navigation), print (emulated media + page.pdf), mermaid size in an opened point, find-in-page
// attempt, console errors, 390px overflow. Writes results.json + PNGs to <outDir>. Exit 1 on any failure.
//
// PDF note: no PDF text extractor is available in this repo, so PDF evidence is page counts and byte sizes:
// closed page == all-open page (print CSS expanded the content) and both > a baseline where point bodies are
// forced hidden. It does not prove individual words are in the PDF.
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const [outDir, baseArg, ...pagePaths] = process.argv.slice(2)
if (!outDir || !baseArg || !pagePaths.length) {
  console.error('usage: node scripts/levels-check.mjs <outDir> <baseUrl> <page-path> [<page-path> ...]')
  process.exit(2)
}
const base = baseArg.replace(/\/?$/, '/')
fs.mkdirSync(outDir, { recursive: true })

const urlFor = (p) => {
  if (p === 'index') return base
  if (p === 'en/index' || p === 'en') return base + 'en/'
  return base + p.replace(/\.html$/, '') + '.html'
}
const pdfPages = (buf) => (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length

const browser = await chromium.launch()
const results = []
let failed = 0

for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } })
  await ctx.addInitScript((s) => localStorage.setItem('vitepress-theme-appearance', s), scheme)

  for (const p of pagePaths) {
    const slug = p.replace(/\//g, '_')
    const shot = (name) => path.join(outDir, `${slug}-${scheme}-${name}.png`)
    const r = { page: p, scheme, checks: {}, notes: {} }
    const errors = []
    const check = (name, ok, detail) => {
      r.checks[name] = { ok: !!ok, ...(detail !== undefined ? { detail } : {}) }
      if (!ok) failed++
    }
    const open = async (url, vp = { width: 1280, height: 900 }) => {
      const page = await ctx.newPage()
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
      page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
      await page.setViewportSize(vp)
      const res = await page.goto(url, { waitUntil: 'networkidle' })
      await page.waitForTimeout(500)
      return { page, res }
    }
    const url = urlFor(p)
    const { page, res } = await open(url)
    check('http-200', res.status() === 200, res.status())
    check('dark-class', (await page.evaluate(() => document.documentElement.classList.contains('dark'))) === (scheme === 'dark'))

    // 1. level counts
    r.levels = await page.evaluate(() => ({
      1: document.querySelectorAll('[data-level="1"]').length,
      2: document.querySelectorAll('[data-level="2"]').length,
      3: document.querySelectorAll('[data-level="3"]').length,
      points: document.querySelectorAll('details.aise-point').length,
      plain: document.querySelectorAll('.aise-point--plain').length,
    }))
    const hasPoints = r.levels.points > 0
    check('has-collapsible-points', hasPoints, r.levels.points)

    // 2. initial state
    check('initial-all-closed', await page.evaluate(() => [...document.querySelectorAll('details.aise-point')].every((d) => !d.open)))
    const ids = await page.evaluate(() => [...document.querySelectorAll('details.aise-point[id]')].map((d) => d.id))
    await page.screenshot({ path: shot('collapsed'), fullPage: true })

    // 3. toolbar
    const btnText = await page.evaluate(() => [...document.querySelectorAll('.aise-toolbar button')].map((b) => b.textContent.trim()))
    const wantBtn = p.startsWith('en') ? ['Expand all', 'Collapse all'] : ['모두 펼치기', '모두 접기']
    check('toolbar-labels', JSON.stringify(btnText) === JSON.stringify(wantBtn), btnText)
    await page.click('.aise-toolbar button[data-action="expand-all"]')
    check('expand-all-opens-all', await page.evaluate(() => [...document.querySelectorAll('details.aise-point')].every((d) => d.open)))
    await page.waitForTimeout(600)
    await page.screenshot({ path: shot('expanded'), fullPage: true })

    // 6/7 mermaid inside a point (opened by expand-all)
    const mer = await page.evaluate(() => {
      const col = document.querySelector('.vp-doc')?.getBoundingClientRect().width ?? 0
      return [...document.querySelectorAll('.aise-point-body .mermaid svg')].map((s) => {
        const b = s.getBoundingClientRect()
        return { w: Math.round(b.width), h: Math.round(b.height), column: Math.round(col), fontPx: parseFloat(getComputedStyle(s.querySelector('text, foreignObject div, span') || s).fontSize) }
      })
    })
    r.mermaid = mer
    // Not applicable on a page with no diagram inside a point (counts as pass; r.mermaid stays []).
    check('mermaid-in-point-sized', mer.every((m) => m.w > 0 && m.h > 0 && m.w <= m.column), mer)

    await page.click('.aise-toolbar button[data-action="collapse-all"]')
    check('collapse-all-closes-all', await page.evaluate(() => [...document.querySelectorAll('details.aise-point')].every((d) => !d.open)))

    // find-in-page attempt: text inside a closed point body
    const probe = await page.evaluate(() => {
      const d = document.querySelector('details.aise-point')
      const body = d.querySelector('.aise-point-body')
      const words = body.textContent.trim().split(/\s+/).slice(0, 2).join(' ')
      window.__beforematch = 0
      d.addEventListener('beforematch', () => window.__beforematch++, true)
      window.getSelection().removeAllRanges()
      const found = window.find(words, false, false, true)
      const opened = d.open
      // control: a plain native <details> outside our theme, same API
      const c = document.createElement('details')
      c.innerHTML = '<summary>ctl</summary><p>zzqxcontroltext unique</p>'
      document.body.append(c)
      window.getSelection().removeAllRanges()
      const cfound = window.find('zzqxcontroltext', false, false, true)
      const copened = c.open
      c.remove()
      return { words, found, opened, beforematch: window.__beforematch, control: { found: cfound, opened: copened } }
    })
    r.find = probe
    r.notes.find = 'window.find() is a script-driven search, not the Ctrl+F UI; headless Chromium has no find bar. Reported as observed, not as proof of Ctrl+F.'
    check('find-in-page-text-findable-in-closed-point(window.find; auto-expand is NOT asserted)', probe.found, probe)

    // print: emulated media, all closed
    await page.click('.aise-toolbar button[data-action="collapse-all"]')
    await page.emulateMedia({ media: 'print' })
    await page.waitForTimeout(300)
    const pr = await page.evaluate(() => {
      const bodies = [...document.querySelectorAll('details.aise-point > .aise-point-body')]
      const hidden = bodies.filter((b) => {
        const cs = getComputedStyle(b)
        const r = b.getBoundingClientRect()
        return cs.display === 'none' || cs.visibility === 'hidden' || r.height === 0
      }).length
      const btn = document.querySelector('.aise-toolbar')
      const marker = document.querySelector('.aise-point-summary')
      return {
        bodies: bodies.length, hidden,
        toolbarHidden: !btn || getComputedStyle(btn).display === 'none',
        markerHidden: !marker || getComputedStyle(marker, '::before').display === 'none',
      }
    })
    r.printEmulated = pr
    check('print-emulated-all-bodies-visible', pr.bodies > 0 && pr.hidden === 0, pr)
    check('print-hides-toolbar-and-markers', pr.toolbarHidden && pr.markerHidden, pr)
    await page.screenshot({ path: shot('print'), fullPage: true })

    // PDF (page.pdf uses print media). collapsed vs all-open vs forced-hidden baseline.
    const pdfClosed = await page.pdf({ format: 'A4' })
    await page.evaluate(() => document.querySelectorAll('details.aise-point').forEach((d) => (d.open = true)))
    const pdfOpen = await page.pdf({ format: 'A4' })
    await page.evaluate(() => {
      document.querySelectorAll('details.aise-point').forEach((d) => (d.open = false))
      const st = document.createElement('style')
      st.id = 'baseline-hide'
      st.textContent = 'details.aise-point > .aise-point-body{display:none!important} details.aise-point::details-content{content-visibility:hidden!important;display:none!important}'
      document.head.append(st)
    })
    const pdfBase = await page.pdf({ format: 'A4' })
    r.pdf = { pagesClosed: pdfPages(pdfClosed), pagesOpen: pdfPages(pdfOpen), pagesHiddenBaseline: pdfPages(pdfBase), bytesClosed: pdfClosed.length, bytesOpen: pdfOpen.length, bytesBaseline: pdfBase.length }
    check('pdf-closed-equals-open', r.pdf.pagesClosed === r.pdf.pagesOpen, r.pdf)
    check('pdf-open-larger-than-hidden-baseline', r.pdf.pagesOpen > r.pdf.pagesHiddenBaseline || r.pdf.bytesOpen > r.pdf.bytesBaseline * 1.05, r.pdf)
    await page.close()

    // beforeprint / afterprint restore (dispatch the events directly)
    {
      const { page: pg } = await open(url)
      const st = await pg.evaluate(() => {
        const ds = [...document.querySelectorAll('details.aise-point')]
        ds[0].open = true
        const before = ds.map((d) => d.open)
        window.dispatchEvent(new Event('beforeprint'))
        const during = ds.every((d) => d.open)
        window.dispatchEvent(new Event('afterprint'))
        const after = ds.map((d) => d.open)
        return { before, during, after }
      })
      check('beforeprint-opens-afterprint-restores', st.during && JSON.stringify(st.before) === JSON.stringify(st.after), st)
      await pg.close()
    }

    // 4. deep link on load
    if (ids.length) {
      const { page: pg } = await open(url + '#' + ids[0])
      await pg.waitForTimeout(600)
      const dl = await pg.evaluate((id) => {
        const el = document.getElementById(id)
        const b = el.getBoundingClientRect()
        return { open: el.open, top: Math.round(b.top), bottom: Math.round(b.bottom), vh: innerHeight }
      }, ids[0])
      check('deeplink-load-open-and-in-viewport', dl.open && dl.top < dl.vh && dl.bottom > 0, dl)
      // hashchange
      const hc = await pg.evaluate(async (id) => {
        document.querySelectorAll('details.aise-point').forEach((d) => (d.open = false))
        location.hash = '#' + id
        await new Promise((r) => setTimeout(r, 600))
        const el = document.getElementById(id)
        const b = el.getBoundingClientRect()
        return { open: el.open, top: Math.round(b.top), vh: innerHeight }
      }, ids[ids.length - 1])
      check('deeplink-hashchange', hc.open && hc.top < hc.vh && hc.top > -50, hc)
      await pg.close()

      // client-side navigation: start on Home (other page), click an injected in-app link
      const home = p.startsWith('en/') ? base + 'en/' : base
      const { page: pn } = await open(home)
      const nav = await pn.evaluate(async ({ href }) => {
        window.__noReload = 1
        const a = document.createElement('a')
        a.href = href
        a.id = 'inject-link'
        a.textContent = 'go'
        document.querySelector('.vp-doc, main, body').prepend(a)
        a.click()
        await new Promise((r) => setTimeout(r, 1800))
        const hash = location.hash.slice(1)
        const el = document.getElementById(hash)
        return { sameDocument: window.__noReload === 1, url: location.pathname + location.hash, open: el?.open, hasEl: !!el }
      }, { href: url.replace(location_origin(url), '') + '#' + ids[0] })
      check('deeplink-client-side-navigation', nav.sameDocument && nav.hasEl && nav.open, nav)
      await pn.close()
    }

    // 8. mobile 390x844 with points expanded
    {
      const { page: pm } = await open(url, { width: 390, height: 844 })
      await pm.click('.aise-toolbar button[data-action="expand-all"]')
      await pm.waitForTimeout(800)
      const mo = await pm.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, merW: [...document.querySelectorAll('.aise-point-body .mermaid svg')].map((s) => Math.round(s.getBoundingClientRect().width)) }))
      check('mobile-390-no-horizontal-overflow', mo.scrollWidth <= 390, mo)
      await pm.screenshot({ path: shot('mobile'), fullPage: true })
      await pm.close()
    }

    r.consoleErrors = errors
    check('no-console-errors', errors.length === 0, errors.slice(0, 5))
    results.push(r)
  }
  await ctx.close()
}
await browser.close()

function location_origin(u) { return new URL(u).origin }

fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 1))
let n = 0
for (const r of results) for (const [k, v] of Object.entries(r.checks)) { n++; if (!v.ok) console.log(`FAIL ${r.scheme} ${r.page}: ${k} ${JSON.stringify(v.detail)}`) }
console.log(`${results.length} page-runs, ${n} checks, ${failed} failure(s)`)
process.exit(failed ? 1 : 0)
