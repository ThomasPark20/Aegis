import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ArchitectureFlow from './components/ArchitectureFlow.vue'
import ResearchThreadFlow from './components/ResearchThreadFlow.vue'
import HowItWorks from './components/HowItWorks.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ArchitectureFlow', ArchitectureFlow)
    app.component('ResearchThreadFlow', ResearchThreadFlow)
    app.component('HowItWorks', HowItWorks)
  },
}
