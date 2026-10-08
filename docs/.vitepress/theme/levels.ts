// Client-side behaviour for page levels: expand/collapse all, deep links, print.
import type { Router } from 'vitepress'

const SEL = 'details.aise-point, details.aise-cite'

export function setAllPoints(open: boolean) {
  document.querySelectorAll<HTMLDetailsElement>('details.aise-point').forEach((d) => (d.open = open))
}

/** Open every ancestor details of the element the URL hash points to, then scroll to it. */
export function revealHash() {
  const raw = location.hash.slice(1)
  if (!raw) return
  let id = raw
  try {
    id = decodeURIComponent(raw)
  } catch {}
  const el = document.getElementById(id)
  if (!el) return
  let changed = false
  let d = el.closest<HTMLDetailsElement>('details')
  while (d) {
    if (!d.open) {
      d.open = true
      changed = true
    }
    d = d.parentElement?.closest<HTMLDetailsElement>('details') ?? null
  }
  if (changed) {
    // wait a frame so the opened content has layout, then scroll
    requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }))
  }
}

const PREV = 'aiseWasOpen'
function beforePrint() {
  document.querySelectorAll<HTMLDetailsElement>(SEL).forEach((d) => {
    d.dataset[PREV] = d.open ? '1' : '0'
    d.open = true
  })
}
function afterPrint() {
  document.querySelectorAll<HTMLDetailsElement>(SEL).forEach((d) => {
    if (d.dataset[PREV] !== undefined) {
      d.open = d.dataset[PREV] === '1'
      delete d.dataset[PREV]
    }
  })
}

export function installLevels(router: Router) {
  if (typeof window === 'undefined') return
  window.addEventListener('beforeprint', beforePrint)
  window.addEventListener('afterprint', afterPrint)
  window.addEventListener('hashchange', () => setTimeout(revealHash, 0))
  window.addEventListener('load', () => setTimeout(revealHash, 50))
  const prev = router.onAfterRouteChanged
  router.onAfterRouteChanged = (to) => {
    prev?.(to)
    // content for the new route is mounted after this hook; wait a little
    setTimeout(revealHash, 150)
  }
}
