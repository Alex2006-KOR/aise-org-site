// Real-browser interaction check of phone-width figures (P-21), Chromium at 390x844 in a mobile (touch) context.
//
//   npm run build && npx vitepress preview docs --port 4174 &
//   node scripts/mobile-figures-interaction.mjs <outDir> <baseUrl>
//
// KOR and EN: scrolls a wide mermaid and a wide inline-SVG figure with a real touch gesture; toggles dark mode from the
// nav menu and confirms the width holds after mermaid's re-render; clicks the "next" link (SPA route change, no reload)
// and confirms the new page's figures are handled; opens a closed point by clicking its summary (the one real figure in a
// closed point needs no widening, so a clone of a wide figure in a test-only closed point covers the widening path);
// resizes across 640px and back; watches for a mutation loop on the figures; goes back through history. Saves PNGs to
// <outDir>. Exit 1 on any failure.
import { chromium, devices } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const [outDir, baseArg] = process.argv.slice(2)
if (!outDir || !baseArg) { console.error('usage: node scripts/mobile-figures-interaction.mjs <outDir> <baseUrl>'); process.exit(2) }
const base = baseArg.replace(/\/?$/, '/')
fs.mkdirSync(outDir, { recursive: true })

let failures = 0
const check = (name, ok, detail = '') => {
  if (!ok) failures++
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail === '' ? '' : ' -- ' + JSON.stringify(detail)}`)
}

/** State of the figure whose caption starts with `prefix` (light DOM read, no scrolling). */
const stateOf = (page, prefix) => page.evaluate((prefix) => {
  const f = [...document.querySelectorAll('.vp-doc figure')].find(x => x.querySelector('figcaption')?.textContent.trim().startsWith(prefix))
  if (!f) return null
  const svg = f.querySelector('svg')
  const scale = svg?.getScreenCTM()?.a ?? 0
  let min = Infinity
  if (svg) {
    const t = document.createTreeWalker(svg, NodeFilter.SHOW_TEXT)
    while (t.nextNode()) {
      const p = t.currentNode.parentElement
      if (t.currentNode.nodeValue.trim() && !p.closest('style, title, desc')) min = Math.min(min, parseFloat(getComputedStyle(p).fontSize) * scale)
    }
  }
  const box = svg?.getBoundingClientRect()
  const c = f.querySelector('figcaption').getBoundingClientRect()
  const b = f.getBoundingClientRect()
  return {
    wide: f.classList.contains('aise-fig-wide'), widthVar: f.style.getPropertyValue('--aise-fig-width'), svgWidth: box ? +box.width.toFixed(1) : 0,
    effective: +min.toFixed(2), scrollLeft: f.scrollLeft, scrollWidth: f.scrollWidth, clientWidth: f.clientWidth,
    captionInView: c.left >= b.left - 1 && c.right <= b.right + 1 && c.width > 0, tabindex: f.getAttribute('tabindex'),
  }
}, prefix)

/** A real touch swipe on the figure: raw touch events through the browser's input pipeline (not setting scrollLeft). */
async function swipe(page, cdp, prefix) {
  const point = await page.evaluate((prefix) => {
    const f = [...document.querySelectorAll('.vp-doc figure')].find(x => x.querySelector('figcaption')?.textContent.trim().startsWith(prefix))
    const svg = f.querySelector('svg')
    svg.scrollIntoView({ block: 'center' })
    const b = svg.getBoundingClientRect()
    const column = f.getBoundingClientRect()
    return { x: Math.round(column.left + column.width * 0.8), y: Math.round(b.top + Math.min(b.height / 2, 400)) }
  }, prefix)
  await page.waitForTimeout(150)
  const touch = (type, x) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y: point.y }] })
  await touch('touchStart', point.x)
  for (let i = 1; i <= 10; i++) {
    await touch('touchMove', point.x - i * 20)
    await page.waitForTimeout(16)
  }
  await touch('touchEnd', 0)
  await page.waitForTimeout(250)
}

async function toggleDark(page) {
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.click('.VPNavBarHamburger')
  await page.waitForTimeout(350)
  await page.click('.VPNavScreen .VPSwitchAppearance')
  await page.waitForTimeout(200)
  await page.click('.VPNavBarHamburger')
  await page.waitForTimeout(350)
}

const browser = await chromium.launch()
const LANGS = [
  { tag: 'ko', prefix: '', mermaid: '그림 6-5', inline: '그림 4-1', mermaidPage: 'story/operation', inlinePage: 'story/structure', closedFig: '그림 4-3', nextText: '다음으로', nextPage: 'story/verification', nextFig: '그림 7-1' },
  { tag: 'en', prefix: 'en/', mermaid: 'Figure 6-5', inline: 'Figure 4-1', mermaidPage: 'story/operation', inlinePage: 'story/structure', closedFig: 'Figure 4-3', nextText: 'Next', nextPage: 'story/verification', nextFig: 'Figure 7-1' },
]
for (const L of LANGS) {
  const ctx = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', e => errors.push('pageerror: ' + e.message))
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()) })
  const cdp = await ctx.newCDPSession(page)
  const shot = (name) => page.screenshot({ path: path.join(outDir, `${L.tag}-${name}.png`) })
  const go = async (p) => { await page.goto(base + L.prefix + p + '.html', { waitUntil: 'networkidle' }); await page.waitForTimeout(700) }

  // 1. Scroll a wide mermaid figure
  await go(L.mermaidPage)
  let s = await stateOf(page, L.mermaid)
  check(`${L.tag} mermaid wide after first render`, s?.wide && s.effective >= 11, s)
  await swipe(page, cdp, L.mermaid)
  s = await stateOf(page, L.mermaid)
  check(`${L.tag} mermaid scrolls by touch, caption stays`, s.scrollLeft > 0 && s.captionInView, s)
  await shot('mermaid-scrolled')

  // 2. Dark toggle: mermaid re-renders (the svg element is replaced); width and scroll container must hold
  const before = s
  await page.evaluate((prefix) => {
    const f = [...document.querySelectorAll('.vp-doc figure')].find(x => x.querySelector('figcaption')?.textContent.trim().startsWith(prefix))
    f.querySelector('svg').dataset.old = '1'
  }, L.mermaid)
  await toggleDark(page)
  await page.waitForFunction(() => document.documentElement.classList.contains('dark'))
  await page.waitForTimeout(900)
  const reRendered = await page.evaluate((prefix) => {
    const f = [...document.querySelectorAll('.vp-doc figure')].find(x => x.querySelector('figcaption')?.textContent.trim().startsWith(prefix))
    return !f.querySelector('svg').dataset.old
  }, L.mermaid)
  s = await stateOf(page, L.mermaid)
  check(`${L.tag} dark toggle: mermaid re-rendered, width holds`, reRendered && s.wide && s.widthVar === before.widthVar && Math.abs(s.svgWidth - before.svgWidth) < 1 && s.effective >= 11, { reRendered, ...s })
  await swipe(page, cdp, L.mermaid)
  s = await stateOf(page, L.mermaid)
  check(`${L.tag} dark: still scrolls by touch, caption stays`, s.scrollLeft > 0 && s.captionInView, s)
  await shot('mermaid-dark')
  await toggleDark(page)
  await page.waitForTimeout(600)

  // 3. No mutation loop: the figures are quiet when nothing happens
  const mutations = await page.evaluate(() => new Promise((resolve) => {
    let n = 0
    const o = new MutationObserver((r) => { n += r.length })
    document.querySelectorAll('.vp-doc figure').forEach(f => o.observe(f, { attributes: true, childList: true, subtree: true }))
    setTimeout(() => { o.disconnect(); resolve(n) }, 1500)
  }))
  check(`${L.tag} no mutation loop on figures (1.5s idle)`, mutations === 0, { mutations })

  // 4. SPA route change by clicking the "next" link
  await page.evaluate(() => { window.__sameDocument = true })
  const next = page.locator('.vp-doc p', { hasText: L.nextText }).last().locator('a').first()
  await next.scrollIntoViewIfNeeded()
  await next.click()
  await page.waitForURL('**/' + L.nextPage + '.html')
  await page.waitForTimeout(1000)
  const same = await page.evaluate(() => window.__sameDocument === true)
  s = await stateOf(page, L.nextFig)
  check(`${L.tag} SPA route change: no reload, new page's figure handled`, same && s?.wide && s.effective >= 11, { same, ...s })
  await page.evaluate((prefix) => {
    [...document.querySelectorAll('.vp-doc figure')].find(x => x.querySelector('figcaption')?.textContent.trim().startsWith(prefix)).scrollIntoView({ block: 'center' })
  }, L.nextFig)
  await page.waitForTimeout(200)
  await shot('after-route-change')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth)
  check(`${L.tag} no page overflow after route change`, overflow <= 390, { overflow })

  // 5. History back unmounts the page cleanly and handles the figures again
  await page.goBack()
  await page.waitForURL('**/' + L.mermaidPage + '.html')
  await page.waitForTimeout(1000)
  s = await stateOf(page, L.mermaid)
  check(`${L.tag} history back: figure handled`, s?.wide && s.effective >= 11, s)

  // 6. Wide inline SVG, and a closed point opened by clicking its summary
  await go(L.inlinePage)
  await swipe(page, cdp, L.inline)
  s = await stateOf(page, L.inline)
  check(`${L.tag} inline SVG wide, scrolls by touch, caption stays`, s.wide && s.scrollLeft > 0 && s.captionInView && s.effective >= 11 && s.tabindex === '0', s)
  await shot('inline-scrolled')

  const closedBefore = await page.evaluate((prefix) => {
    const f = [...document.querySelectorAll('.vp-doc figure')].find(x => x.querySelector('figcaption')?.textContent.trim().startsWith(prefix))
    const d = f.closest('details')
    return { inClosedPoint: !!d && !d.open, widthVar: f.style.getPropertyValue('--aise-fig-width') }
  }, L.closedFig)
  check(`${L.tag} figure in a closed point already has its width`, closedBefore.inClosedPoint && !!closedBefore.widthVar, closedBefore)
  const summary = page.locator('details.aise-point', { has: page.locator('figcaption', { hasText: L.closedFig }) }).locator('> summary')
  await summary.scrollIntoViewIfNeeded()
  await summary.click()
  await page.waitForTimeout(400)
  await swipe(page, cdp, L.closedFig)
  s = await stateOf(page, L.closedFig)
  check(`${L.tag} opened point: figure that meets the minimum stays as it is`, !s.wide && s.widthVar === closedBefore.widthVar && s.effective >= 11, s)
  await shot('opened-point')

  // Widening inside a closed point: test-only clone of a wide figure in a closed point, appended to the page
  await page.evaluate((prefix) => {
    const f = [...document.querySelectorAll('.vp-doc figure')].find(x => x.querySelector('figcaption')?.textContent.trim().startsWith(prefix))
    const clone = f.cloneNode(true)
    clone.classList.remove('aise-fig-wide')
    clone.removeAttribute('style')
    clone.removeAttribute('tabindex')
    clone.querySelector('figcaption').textContent = 'CLONE'
    const point = document.querySelector('details.aise-point').cloneNode(false)
    point.id = 'aise-test-point'
    point.open = false
    point.innerHTML = '<summary class="aise-point-summary">test</summary><div class="aise-point-body"></div>'
    point.querySelector('.aise-point-body').append(clone)
    document.querySelector('details.aise-point').after(point)
  }, L.inline)
  await page.waitForTimeout(200)
  const cloneClosed = await stateOf(page, 'CLONE')
  check(`${L.tag} wide figure in a closed point has its width before opening`, !!cloneClosed.widthVar, cloneClosed)
  await page.locator('#aise-test-point > summary').click()
  await page.waitForTimeout(300)
  await swipe(page, cdp, 'CLONE')
  s = await stateOf(page, 'CLONE')
  check(`${L.tag} opening that point: wide, scrolls, caption stays`, s.wide && s.widthVar === cloneClosed.widthVar && s.scrollLeft > 0 && s.captionInView && s.effective >= 11, s)
  await shot('opened-point-wide')
  await page.evaluate(() => document.getElementById('aise-test-point').remove())

  // 7. Across 640px and back: desktop is untouched, phone comes back
  await page.setViewportSize({ width: 800, height: 844 })
  await page.waitForTimeout(300)
  const desktop = await stateOf(page, L.inline)
  check(`${L.tag} at 800px: no class, no width, no tabindex`, !desktop.wide && !desktop.widthVar && desktop.tabindex === null && desktop.scrollWidth <= desktop.clientWidth + 1, desktop)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForTimeout(300)
  s = await stateOf(page, L.inline)
  const fin = await page.evaluate(() => document.documentElement.scrollWidth)
  check(`${L.tag} back at 390px: wide again, no page overflow`, s.wide && s.effective >= 11 && fin <= 390, { ...s, fin })

  check(`${L.tag} no console or page errors`, errors.length === 0, errors)
  await ctx.close()
}
await browser.close()
console.log(`${failures} failure(s)`)
process.exit(failures ? 1 : 0)
