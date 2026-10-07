<script setup lang="ts">
import { kindMeta, natureLabel, repoBase, repoPublic, type Source } from '../sources'
import { useSources } from './useSources'

const { isKo, list, label } = useSources()
const href = (s: Source) => (repoPublic && s.path ? repoBase + s.path : '')
</script>

<template>
  <details class="aise-cite aise-source-table" data-level="3">
    <summary class="aise-cite-summary">
      {{ isKo ? '이 페이지의 근거 전체' : 'All sources for this page' }} <span class="aise-cite-caret" aria-hidden="true">▾</span>
    </summary>
    <div class="aise-source-scroll">
      <table>
        <thead>
          <tr>
            <th>{{ isKo ? '종류' : 'Kind' }}</th>
            <th>{{ isKo ? '이름' : 'Name' }}</th>
            <th>{{ isKo ? '성격' : 'Nature' }}</th>
            <th>{{ isKo ? '경로 / 앵커' : 'Path / anchor' }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in list" :key="s.id">
            <td>{{ kindMeta[s.kind].icon }} {{ isKo ? kindMeta[s.kind].ko : kindMeta[s.kind].en }}</td>
            <td>
              <a v-if="href(s)" :href="href(s)">{{ label(s.name) }}</a>
              <template v-else>{{ label(s.name) }}</template>
            </td>
            <td><span class="aise-badge" :class="`aise-badge--${s.nature}`">{{ label(natureLabel[s.nature]) }}</span></td>
            <td><code v-if="s.path" class="aise-cite-path">{{ s.path }}{{ s.anchor ? ` "${s.anchor}"` : '' }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </details>
</template>
