import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import container from 'markdown-it-container'
import { levelsContainers } from './theme/levels-markdown'

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

    // Maintainer-facing design doc, not a site page. `work/` holds working documents kept in the
    // repository but not published: the 3-way reference answers (operator decision OD-07, 2026-10-07)
    // and the rewrite plan (step 1, 2026-10-21).
    srcExclude: ['architecture.md', 'work/**'],

    // Served at https://<org>.github.io/aise-org-site/ (project page, not a
    // user/org root page), so all asset/link paths must be prefixed.
    base: '/aise-org-site/',

    locales: {
      root: {
        label: '한국어',
        lang: 'ko-KR',
        themeConfig: {
          nav: [
            { text: '브리핑', link: '/' },
            { text: '이야기', link: '/story/background' },
            { text: 'Quick Guide', link: '/quick-guide' },
            { text: '용어집', link: '/glossary' },
          ],
          sidebar: [
            { text: '브리핑 — 한 쪽으로', link: '/' },
            {
              text: '이야기',
              collapsed: false,
              items: [
                { text: '1. 왜 시작했나', link: '/story/background' },
                { text: '2. 해법: 회사의 구조를 빌린다', link: '/story/at-a-glance' },
                { text: '3. 원칙', link: '/story/principles' },
                { text: '4. 구조', link: '/story/structure' },
                { text: '5. 어떻게 유지하나', link: '/story/how-it-is-kept' },
                { text: '6. 운영', link: '/story/operation' },
                { text: '7. 검증과 평가', link: '/story/verification' },
                { text: '8. 배포와 여러 도구', link: '/story/distribution' },
                { text: '9. 성장, 성과, 한계', link: '/story/growth-and-limits' },
              ],
            },
            {
              text: '부록',
              collapsed: false,
              items: [
                { text: 'Quick Guide — 실제로 써 보기', link: '/quick-guide' },
                { text: '용어집', link: '/glossary' },
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
            { text: 'Briefing', link: '/en/' },
            { text: 'Story', link: '/en/story/background' },
            { text: 'Quick Guide', link: '/en/quick-guide' },
            { text: 'Glossary', link: '/en/glossary' },
          ],
          sidebar: [
            { text: 'Briefing — on one page', link: '/en/' },
            {
              text: 'Story',
              collapsed: false,
              items: [
                { text: '1. Why it started', link: '/en/story/background' },
                { text: '2. The answer: borrow a company\'s structure', link: '/en/story/at-a-glance' },
                { text: '3. Principles', link: '/en/story/principles' },
                { text: '4. Structure', link: '/en/story/structure' },
                { text: '5. How it is kept', link: '/en/story/how-it-is-kept' },
                { text: '6. Operation', link: '/en/story/operation' },
                { text: '7. Verification and evaluation', link: '/en/story/verification' },
                { text: '8. Distribution and many tools', link: '/en/story/distribution' },
                { text: '9. Growth, results, limits', link: '/en/story/growth-and-limits' },
              ],
            },
            {
              text: 'Appendix',
              collapsed: false,
              items: [
                { text: 'Quick Guide — Actually Using It', link: '/en/quick-guide' },
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

    // Page levels (lead / point containers). See theme/levels-markdown.ts.
    // withMermaid() chains its own mermaid fence rule before this callback.
    markdown: {
      config(md) {
        levelsContainers(md, container)
      },
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
