<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LevelsToolbar from './LevelsToolbar.vue'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before><LevelsToolbar /></template>
  </Layout>
</template>
