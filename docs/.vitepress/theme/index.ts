import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ArchitectureFlow from './components/ArchitectureFlow.vue'
import ResearchThreadFlow from './components/ResearchThreadFlow.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ArchitectureFlow', ArchitectureFlow)
    app.component('ResearchThreadFlow', ResearchThreadFlow)
  },
}
