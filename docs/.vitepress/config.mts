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

    // Maintainer-facing design doc, not a site page.
    srcExclude: ['architecture.md'],

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
            { text: '참고 자료', link: '/background' },
            { text: 'Quick Guide', link: '/quick-guide' },
          ],
          sidebar: [
            { text: '브리핑 — 한 쪽으로', link: '/' },
            {
              text: '이야기',
              collapsed: false,
              items: [
                { text: '1. 왜 시작했나', link: '/story/background' },
                { text: '2. 한눈에 보기', link: '/story/at-a-glance' },
                { text: '3. 왜 조직인가', link: '/story/why-organization' },
                { text: '4. 원칙', link: '/story/principles' },
                { text: '5. 어떻게 유지하나', link: '/story/how-it-is-kept' },
                { text: '6. 배포와 여러 도구', link: '/story/distribution' },
                { text: '7. 성장, 성과, 한계', link: '/story/growth-and-limits' },
              ],
            },
            {
              text: '참고 자료',
              collapsed: false,
              items: [
                {
                  text: '배경 및 철학',
                  link: '/background',
                  collapsed: true,
                  items: [
                    { text: '다섯 원칙', link: '/philosophy' },
                    { text: '일반적인 방식과 무엇이 다른가', link: '/real-world-vs-aise' },
                    { text: 'AI라서 다르게 설계한 것', link: '/ai-native-principles' },
                  ],
                },
                {
                  text: '동작 원리',
                  link: '/how-it-works',
                  collapsed: true,
                  items: [
                    { text: '조직의 모양', link: '/organization-model' },
                    { text: '참모와 거버넌스', link: '/staff-governance' },
                    { text: '부서의 생명주기', link: '/lifecycle' },
                    { text: '협업 방식', link: '/collaboration-model' },
                    { text: 'Operator vs Meta Mode', link: '/operator-vs-meta-mode' },
                  ],
                },
                {
                  text: '쓰는 법과 이어가기',
                  link: '/in-practice',
                  collapsed: true,
                  items: [
                    { text: '일을 맡기는 법', link: '/usage' },
                    { text: '세션을 넘어 이어가기', link: '/handoff' },
                  ],
                },
                {
                  text: '평가와 가치',
                  link: '/value',
                  collapsed: true,
                  items: [
                    { text: '구조가 변경을 견디는 법', link: '/structural-principles-ocp' },
                    { text: '궁극적으로 무엇을 노리나', link: '/ultimate-goal' },
                  ],
                },
                { text: 'AISE 개요 (예전 첫 화면)', link: '/overview' },
                { text: 'Quick Guide — 실제로 써 보기', link: '/quick-guide' },
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
            { text: 'Briefing', link: '/en/' },
            { text: 'Story', link: '/en/story/background' },
            { text: 'Reference', link: '/en/background' },
            { text: 'Quick Guide', link: '/en/quick-guide' },
          ],
          sidebar: [
            { text: 'Briefing — on one page', link: '/en/' },
            {
              text: 'Story',
              collapsed: false,
              items: [
                { text: '1. Why it started', link: '/en/story/background' },
                { text: '2. At a glance', link: '/en/story/at-a-glance' },
                { text: '3. Why an organization', link: '/en/story/why-organization' },
                { text: '4. Principles', link: '/en/story/principles' },
                { text: '5. How it is kept', link: '/en/story/how-it-is-kept' },
                { text: '6. Distribution and many tools', link: '/en/story/distribution' },
                { text: '7. Growth, results, limits', link: '/en/story/growth-and-limits' },
              ],
            },
            {
              text: 'Reference',
              collapsed: false,
              items: [
                {
                  text: 'Background & Philosophy',
                  link: '/en/background',
                  collapsed: true,
                  items: [
                    { text: 'The five principles', link: '/en/philosophy' },
                    { text: 'What the usual way does differently', link: '/en/real-world-vs-aise' },
                    { text: 'Designed differently because it is AI', link: '/en/ai-native-principles' },
                  ],
                },
                {
                  text: 'How It Works',
                  link: '/en/how-it-works',
                  collapsed: true,
                  items: [
                    { text: 'The shape of the org', link: '/en/organization-model' },
                    { text: 'Staff & governance', link: '/en/staff-governance' },
                    { text: "A department's lifecycle", link: '/en/lifecycle' },
                    { text: 'How collaboration works', link: '/en/collaboration-model' },
                    { text: 'Operator vs Meta Mode', link: '/en/operator-vs-meta-mode' },
                  ],
                },
                {
                  text: 'In Practice: Usage & Handoff',
                  link: '/en/in-practice',
                  collapsed: true,
                  items: [
                    { text: 'How to hand work to this org', link: '/en/usage' },
                    { text: 'Carrying on across sessions', link: '/en/handoff' },
                  ],
                },
                {
                  text: 'Evaluation & Value',
                  link: '/en/value',
                  collapsed: true,
                  items: [
                    { text: 'How the structure absorbs change', link: '/en/structural-principles-ocp' },
                    { text: 'What it is ultimately for', link: '/en/ultimate-goal' },
                  ],
                },
                { text: 'AISE overview (former front page)', link: '/en/overview' },
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
