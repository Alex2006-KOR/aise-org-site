// Phone-width figures: a figure whose labels would fall under MIN_LABEL_PX in the column gets the width it needs and
// scrolls sideways (the CSS is in custom.css). Nothing in the DOM moves: inline SVGs are Vue static content.
const MIN_LABEL_PX = 11
const PHONE = '(max-width: 640px)' // same query as custom.css
const WIDE = 'aise-fig-wide'
const WIDTH = '--aise-fig-width'

/** Smallest label font size in SVG units. Computed styles work without layout, so also inside a closed point. */
function smallestLabel(svg: SVGSVGElement) {
  let smallest = Infinity
  const texts = document.createTreeWalker(svg, NodeFilter.SHOW_TEXT)
  while (texts.nextNode()) {
    const parent = texts.currentNode.parentElement!
    if (texts.currentNode.nodeValue!.trim() && !parent.closest('style, title, desc')) {
      smallest = Math.min(smallest, parseFloat(getComputedStyle(parent).fontSize))
    }
  }
  return smallest
}

function requiredWidth(svg: SVGSVGElement) {
  const viewBoxWidth = svg.viewBox.baseVal?.width
  const label = smallestLabel(svg)
  return viewBoxWidth && label < Infinity ? Math.ceil((viewBoxWidth * MIN_LABEL_PX) / label) : 0
}

function fit(figure: HTMLElement, phone: boolean) {
  const svg = figure.querySelector('svg')
  if (!svg) return // mermaid has not rendered yet
  const width = phone ? requiredWidth(svg) : 0
  // A closed point has no layout inside: judge by the point itself; opening it runs this again with the real column.
  const wide = width > (figure.closest('details:not([open])') ?? figure).clientWidth
  figure.classList.toggle(WIDE, wide)
  if (width) figure.style.setProperty(WIDTH, `${width}px`)
  else figure.style.removeProperty(WIDTH)
  if (wide) figure.tabIndex = 0
  else figure.removeAttribute('tabindex')
}

export function installFigures() {
  if (typeof window === 'undefined') return
  const phone = window.matchMedia(PHONE)
  let frame = 0
  const schedule = () => {
    frame ||= requestAnimationFrame(() => {
      frame = 0
      document.querySelectorAll<HTMLElement>('.vp-doc figure').forEach((figure) => fit(figure, phone.matches))
    })
  }
  // Route changes and mermaid renders add nodes; opening a point flips `open`. This module only writes the figure's
  // class, style and tabindex, which are not observed, so it cannot trigger itself.
  new MutationObserver(schedule).observe(document.body, { subtree: true, childList: true, attributeFilter: ['open'] })
  window.addEventListener('resize', schedule)
  schedule()
}
