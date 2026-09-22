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
            { text: '배경 및 철학', link: '/background' },
            { text: '동작 원리', link: '/how-it-works' },
            { text: '쓰는 법', link: '/in-practice' },
            { text: '평가와 가치', link: '/value' },
          ],
          sidebar: [
            { text: 'Home', link: '/' },
            {
              text: '1. 배경 및 철학',
              link: '/background',
              collapsed: false,
              items: [
                { text: '다섯 원칙', link: '/philosophy' },
                { text: '일반적인 방식과 무엇이 다른가', link: '/real-world-vs-aise' },
                { text: 'AI라서 다르게 설계한 것', link: '/ai-native-principles' },
              ],
            },
            {
              text: '2. 동작 원리',
              link: '/how-it-works',
              collapsed: false,
              items: [
                { text: '조직의 모양', link: '/organization-model' },
                { text: '참모와 거버넌스', link: '/staff-governance' },
                { text: '부서의 생명주기', link: '/lifecycle' },
                { text: '협업 방식', link: '/collaboration-model' },
                { text: 'Operator vs Meta Mode', link: '/operator-vs-meta-mode' },
              ],
            },
            {
              text: '3. 쓰는 법과 이어가기',
              link: '/in-practice',
              collapsed: false,
              items: [
                { text: '일을 맡기는 법', link: '/usage' },
                { text: '세션을 넘어 이어가기', link: '/handoff' },
              ],
            },
            {
              text: '4. 평가와 가치',
              link: '/value',
              collapsed: false,
              items: [
                { text: '구조가 변경을 견디는 법', link: '/structural-principles-ocp' },
                { text: '궁극적으로 무엇을 노리나', link: '/ultimate-goal' },
              ],
            },
            {
              text: '참고',
              collapsed: false,
              items: [{ text: 'Glossary', link: '/glossary' }],
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
            { text: 'Background', link: '/en/background' },
            { text: 'How It Works', link: '/en/how-it-works' },
            { text: 'In Practice', link: '/en/in-practice' },
            { text: 'Value', link: '/en/value' },
          ],
          sidebar: [
            { text: 'Home', link: '/en/' },
            {
              text: '1. Background & Philosophy',
              link: '/en/background',
              collapsed: false,
              items: [
                { text: 'The five principles', link: '/en/philosophy' },
                { text: 'What the usual way does differently', link: '/en/real-world-vs-aise' },
                { text: 'Designed differently because it is AI', link: '/en/ai-native-principles' },
              ],
            },
            {
              text: '2. How It Works',
              link: '/en/how-it-works',
              collapsed: false,
              items: [
                { text: 'The shape of the org', link: '/en/organization-model' },
                { text: 'Staff & governance', link: '/en/staff-governance' },
                { text: "A department's lifecycle", link: '/en/lifecycle' },
                { text: 'How collaboration works', link: '/en/collaboration-model' },
                { text: 'Operator vs Meta Mode', link: '/en/operator-vs-meta-mode' },
              ],
            },
            {
              text: '3. In Practice: Usage & Handoff',
              link: '/en/in-practice',
              collapsed: false,
              items: [
                { text: 'How to hand work to this org', link: '/en/usage' },
                { text: 'Carrying on across sessions', link: '/en/handoff' },
              ],
            },
            {
              text: '4. Evaluation & Value',
              link: '/en/value',
              collapsed: false,
              items: [
                { text: 'How the structure absorbs change', link: '/en/structural-principles-ocp' },
                { text: 'What it is ultimately for', link: '/en/ultimate-goal' },
              ],
            },
            {
              text: 'Reference',
              collapsed: false,
              items: [{ text: 'Glossary', link: '/en/glossary' }],
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
