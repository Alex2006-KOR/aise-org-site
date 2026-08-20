import { defineConfig } from 'vitepress'

// NOTE on outDir: the repo-root build contract is `./dist` (shared with
// .github/workflows/deploy.yml, which runs `npm run build` then uploads
// `./dist` as the Pages artifact). VitePress resolves `outDir` relative to
// the docs root (this directory's parent, i.e. `docs/`), so `../dist`
// resolves to `<repo-root>/dist`.
export default defineConfig({
  title: 'AISE',
  description: 'AISE 조직의 철학·아키텍처·거버넌스를 설명하는 explainer 사이트',
  lang: 'ko-KR',
  outDir: '../dist',

  // Served at https://<org>.github.io/aise-org-site/ (project page, not a
  // user/org root page), so all asset/link paths must be prefixed.
  base: '/aise-org-site/',

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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Alex2006-KOR/aise-org-site' },
    ],
  },
})
