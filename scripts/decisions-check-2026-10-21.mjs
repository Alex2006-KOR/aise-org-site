import { chromium } from 'playwright'
import fs from 'node:fs'
const [out, base] = process.argv.slice(2)
const pages = ['story/background','story/distribution','story/growth-and-limits','story/how-it-is-kept','story/why-organization','en/story/background','en/story/distribution','en/story/growth-and-limits','en/story/how-it-is-kept','en/story/why-organization']
const b = await chromium.launch(); const res=[]; let fail=0
for (const p of pages) {
  const pg = await b.newPage({viewport:{width:1280,height:900}}); const errs=[]
  pg.on('console', m => m.type()==='error' && errs.push(m.text()))
  const r = await pg.goto(base+p+'.html', {waitUntil:'networkidle'})
  const txt = await pg.locator('.vp-doc').innerText()
  const boxes = await pg.locator('.vp-doc .warning').count()
  const qtext = /검토 질문 Q-|Review question Q-/.test(txt)
  const rec = {page:p, status:r.status(), warningBoxes:boxes, reviewQuestionText:qtext, consoleErrors:errs.length}
  if (p.endsWith('background')) {
    const t = pg.locator('.vp-doc table').nth(1)
    rec.sixProblemRows = await t.locator('tbody tr').count()
    await t.scrollIntoViewIfNeeded(); await t.screenshot({path:`${out}/${p.replace(/\//g,'_')}-six-problems.png`})
  }
  if (p.endsWith('growth-and-limits')) rec.notVerifiedPoint = /다른 사용자로 검증하지 않았습니다|has not been verified with another user/.test(txt)
  const ok = rec.status===200 && !rec.reviewQuestionText && rec.warningBoxes===0 && rec.consoleErrors===0 && (rec.sixProblemRows??6)===6 && (rec.notVerifiedPoint??true)
  if(!ok) fail++; rec.ok=ok; res.push(rec); await pg.close()
}
await b.close(); fs.writeFileSync(`${out}/results.json`, JSON.stringify(res,null,2))
console.log(`${res.length} pages, ${fail} failure(s)`)
