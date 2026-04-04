<script setup>
import { withBase, useData } from 'vitepress'

const { isDark } = useData()
</script>

<template>
  <img
    :src="isDark ? withBase('/favicon/dark/favicon-128x128.png') : withBase('/favicon/light/favicon-128x128.png')"
    alt="Actionable."
    class="inline-wordmark"
  />
</template>
