import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// NOTE on outDir: the repo-root build contract is `./dist` (shared with
// .github/workflows/deploy.yml, which runs `npm run build` then uploads
// `./dist` as the Pages artifact). VitePress resolves `outDir` relative to
// the docs root (this directory's parent, i.e. `docs/`), so `../dist`
// resolves to `<repo-root>/dist`.
//
// NOTE on locales: Korean stays the root locale (existing docs/*.md paths
// are untouched, so already-deployed URLs like /aise-org-site/philosophy
// keep working). English lives under docs/en/ and is served at /en/.
// VitePress auto-renders a language switcher dropdown in the nav bar
// whenever `locales` has more than the implicit root entry, so no custom
// toggle component is added here.
export default withMermaid(
  defineConfig({
    title: 'AISE',
    description: 'AISE 조직의 철학·아키텍처·거버넌스를 설명하는 explainer 사이트',
    outDir: '../dist',

    // Served at https://<org>.github.io/aise-org-site/ (project page, not a
    // user/org root page), so all asset/link paths must be prefixed.
    base: '/aise-org-site/',

    locales: {
      root: {
        label: '한국어',
        lang: 'ko-KR',
        themeConfig: {
          nav: [
            { text: 'Home', link: '/' },
            { text: 'Philosophy', link: '/philosophy' },
          ],
          sidebar: [
            {
              text: 'AISE',
              items: [
                { text: 'Home', link: '/' },
                { text: 'Philosophy', link: '/philosophy' },
                { text: 'Organization Model', link: '/organization-model' },
                { text: 'Lifecycle', link: '/lifecycle' },
                { text: 'Collaboration Model', link: '/collaboration-model' },
                { text: 'AI-Native Principles', link: '/ai-native-principles' },
                { text: 'Staff & Governance', link: '/staff-governance' },
                { text: 'Operator vs Meta Mode', link: '/operator-vs-meta-mode' },
                { text: 'Structural Principles / OCP', link: '/structural-principles-ocp' },
                { text: 'Ultimate Goal', link: '/ultimate-goal' },
                { text: 'Glossary', link: '/glossary' },
              ],
            },
          ],
        },
      },
      en: {
        label: 'English',
        lang: 'en-US',
        link: '/en/',
        themeConfig: {
          nav: [
            { text: 'Home', link: '/en/' },
            { text: 'Philosophy', link: '/en/philosophy' },
          ],
          sidebar: [
            {
              text: 'AISE',
              items: [
                { text: 'Home', link: '/en/' },
                { text: 'Philosophy', link: '/en/philosophy' },
                { text: 'Organization Model', link: '/en/organization-model' },
                { text: 'Lifecycle', link: '/en/lifecycle' },
                { text: 'Collaboration Model', link: '/en/collaboration-model' },
                { text: 'AI-Native Principles', link: '/en/ai-native-principles' },
                { text: 'Staff & Governance', link: '/en/staff-governance' },
                { text: 'Operator vs Meta Mode', link: '/en/operator-vs-meta-mode' },
                { text: 'Structural Principles / OCP', link: '/en/structural-principles-ocp' },
                { text: 'Ultimate Goal', link: '/en/ultimate-goal' },
                { text: 'Glossary', link: '/en/glossary' },
              ],
            },
          ],
        },
      },
    },

    themeConfig: {
      // Shared across all locales; per-locale nav/sidebar above override this.
      socialLinks: [
        { icon: 'github', link: 'https://github.com/Alex2006-KOR/aise-org-site' },
      ],
    },

    // vitepress-plugin-mermaid: renders ```mermaid fences as diagrams.
    // It watches for VitePress's dark-mode `<html class="dark">` toggle and
    // switches the mermaid theme itself, so diagrams stay legible in both
    // light and dark mode without extra CSS-variable wiring here.
    mermaid: {
      theme: 'default',
    },
  }),
)
