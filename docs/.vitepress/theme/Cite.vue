<script setup lang="ts">
import { computed } from 'vue'
import { kindMeta, kindOrder, natureLabel, repoBase, repoPublic, type Source } from '../sources'
import { useSources } from './useSources'

const props = defineProps<{ ids: string }>()
const { isKo, list, label } = useSources()

const wanted = computed(() => props.ids.split(',').map((s) => s.trim()).filter(Boolean))
const found = computed(() =>
  wanted.value.map((id) => list.value.find((s) => s.id === id)).filter((s): s is Source => !!s),
)
const unknown = computed(() => wanted.value.filter((id) => !list.value.some((s) => s.id === id)))

const summary = computed(() => {
  const parts = kindOrder
    .map((k) => ({ k, n: found.value.filter((s) => s.kind === k).length }))
    .filter((x) => x.n > 0)
    .map((x) =>
      isKo.value ? `${kindMeta[x.k].ko} ${x.n}` : `${kindMeta[x.k].enPlural} ${x.n}`,
    )
  return (isKo.value ? '근거: ' : 'Sources: ') + parts.join(' · ')
})
const href = (s: Source) => (repoPublic && s.path ? repoBase + s.path : '')
</script>

<template>
  <div class="aise-cite-wrap">
    <details v-if="found.length" class="aise-cite" data-level="3">
      <summary class="aise-cite-summary">{{ summary }} <span class="aise-cite-caret" aria-hidden="true">▾</span></summary>
      <ul class="aise-cite-list">
        <li v-for="s in found" :key="s.id" class="aise-cite-item">
          <span class="aise-cite-kind"
            >{{ kindMeta[s.kind].icon }} {{ isKo ? kindMeta[s.kind].ko : kindMeta[s.kind].en }}</span
          >
          <span v-if="s.date" class="aise-cite-date">{{ s.date }}</span>
          <a v-if="href(s)" :href="href(s)" class="aise-cite-name">{{ label(s.name) }}</a>
          <span v-else class="aise-cite-name">{{ label(s.name) }}</span>
          <span class="aise-badge" :class="`aise-badge--${s.nature}`">{{ label(natureLabel[s.nature]) }}</span>
          <code v-if="s.path" class="aise-cite-path">{{ s.path }}{{ s.anchor ? ` "${s.anchor}"` : '' }}</code>
          <em v-if="s.quote" class="aise-cite-quote">{{ s.quote }}</em>
        </li>
      </ul>
    </details>
    <span v-for="id in unknown" :key="id" class="aise-cite-unknown">[unknown source: {{ id }}]</span>
  </div>
</template>
