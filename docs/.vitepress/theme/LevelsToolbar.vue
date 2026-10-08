<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { onContentUpdated, useData } from 'vitepress'
import { setAllPoints } from './levels'

const { lang } = useData()
const show = ref(false)
const isKo = () => lang.value.toLowerCase().startsWith('ko')

function refresh() {
  nextTick(() => {
    show.value = !!document.querySelector('details.aise-point')
  })
}
onMounted(refresh)
onContentUpdated(refresh)
</script>

<template>
  <div v-if="show" class="aise-toolbar" role="group" :aria-label="isKo() ? '펼치기 / 접기' : 'Expand / collapse'">
    <button type="button" data-action="expand-all" @click="setAllPoints(true)">{{ isKo() ? '모두 펼치기' : 'Expand all' }}</button>
    <button type="button" data-action="collapse-all" @click="setAllPoints(false)">{{ isKo() ? '모두 접기' : 'Collapse all' }}</button>
  </div>
</template>
