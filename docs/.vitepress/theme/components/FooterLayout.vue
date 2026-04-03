<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-after>
      <footer v-if="frontmatter.layout !== 'page'" class="aegis-footer">
        <p>MIT License</p>
      </footer>
    </template>
  </Layout>
</template>

<style scoped>
.aegis-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 1.5rem 0;
  margin-top: 3rem;
  text-align: center;
}

.aegis-footer p {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin: 0;
}
</style>
