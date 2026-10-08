import { computed } from 'vue'
import { useData } from 'vitepress'
import { sources, type Source } from '../sources'

export function useSources() {
  const { page, lang } = useData()
  const isKo = computed(() => lang.value.toLowerCase().startsWith('ko'))
  const slug = computed(() =>
    page.value.relativePath.replace(/\.md$/, '').replace(/^en\//, ''),
  )
  const list = computed<Source[]>(() => sources[slug.value] ?? [])
  const label = (s: { ko: string; en: string }) => (isKo.value ? s.ko : s.en)
  return { isKo, slug, list, label }
}
