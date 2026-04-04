<script setup>
import { withBase } from 'vitepress'
import { useData } from 'vitepress'

const { isDark } = useData()
</script>

<template>
  <img
    v-if="isDark"
    :src="withBase('/actionable-wordmark-white-1x.png')"
    alt="Actionable."
    class="inline-wordmark"
  />
  <img
    v-else
    :src="withBase('/actionable-wordmark-dark-1x.png')"
    alt="Actionable."
    class="inline-wordmark"
  />
</template>
