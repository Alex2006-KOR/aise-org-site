// Extends the VitePress default theme: custom.css, the page-levels toolbar
// (doc-before slot), <Cite>/<SourceTable>, and levels.ts runtime behaviour.
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Cite from './Cite.vue'
import SourceTable from './SourceTable.vue'
import { installLevels } from './levels'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component('Cite', Cite)
    app.component('SourceTable', SourceTable)
    installLevels(router)
  },
}
