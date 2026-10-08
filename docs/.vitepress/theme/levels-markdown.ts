// Markdown containers for the three page levels.
//
//   ::: lead            -> <div class="aise-lead" data-level="1">
//   ::: point KEY {#id} -> <details class="aise-point" data-level="3"> (non-empty body)
//                          <div class="aise-point aise-point--plain" data-level="2"> (empty body)
//
// NOTE (markdown-it-container): a container is closed by the first line with
// at least as many colons as its opener, so a point whose body holds a nested
// `::: info` box must be opened with four colons (`:::: point ...` ... `::::`).
import type MarkdownIt from 'markdown-it'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export function levelsContainers(md: MarkdownIt, container: any) {
  md.use(container, 'lead', {
    render(tokens: any[], idx: number) {
      return tokens[idx].nesting === 1 ? '<div class="aise-lead" data-level="1">\n' : '</div>\n'
    },
  })

  md.use(container, 'point', {
    validate: (params: string) => /^point(\s|$)/.test(params.trim()),
    render(tokens: any[], idx: number) {
      const tok = tokens[idx]
      if (tok.nesting === 1) {
        let text = tok.info.trim().replace(/^point\s*/, '')
        let id = ''
        const m = text.match(/\s*\{#([^\s}]+)\}\s*$/)
        if (m) {
          id = m[1]
          text = text.slice(0, m.index)
        }
        const plain = tokens[idx + 1]?.type === 'container_point_close'
        const idAttr = id ? ` id="${esc(id)}"` : ''
        const inner = md.renderInline(text)
        return plain
          ? `<div class="aise-point aise-point--plain" data-level="2"${idAttr}>${inner}`
          : `<details class="aise-point" data-level="3"${idAttr}><summary class="aise-point-summary" data-level="2">${inner}</summary><div class="aise-point-body">\n`
      }
      const plain = tokens[idx - 1]?.type === 'container_point_open'
      return plain ? '</div>\n' : '</div></details>\n'
    },
  })
}
