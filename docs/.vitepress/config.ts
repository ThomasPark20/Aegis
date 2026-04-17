import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Actioner',
  description: 'Threat intelligence that works for you.',
  base: '/Aegis/',
  ignoreDeadLinks: true,
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/Aegis/logo-dark.svg', media: '(prefers-color-scheme: dark)' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/Aegis/logo-light.svg', media: '(prefers-color-scheme: light)' }],
  ],
  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
    },
    siteTitle: false,
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Research', link: '/research/' },
      { text: 'Architecture', link: '/architecture' },
      { text: 'Features', link: '/features/' },
      { text: 'GitHub', link: 'https://github.com/ThomasPark20/Aegis' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Quick Start', link: '/guide/getting-started' },
            { text: 'Prerequisites', link: '/guide/prerequisites' },
            { text: 'Connect Discord', link: '/guide/discord' },
            { text: 'Connect Telegram', link: '/guide/telegram' },
          ],
        },
        {
          text: 'Configuration',
          items: [
            { text: 'RSS Feeds', link: '/guide/feeds' },
            { text: 'Custom Skills', link: '/guide/skills' },
            { text: 'Scheduled Tasks', link: '/guide/scheduled-tasks' },
          ],
        },
        {
          text: 'Operations',
          items: [
            { text: 'Updating', link: '/guide/updating' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          ],
        },
      ],
      '/research/': [
        {
          text: 'Research',
          items: [
            { text: 'All Reports', link: '/research/' },
            { text: 'Redsun: Defender Cloud File LPE', link: '/research/redsun-defender-lpe' },
            { text: 'Axios npm Supply Chain Compromise', link: '/research/axios-supply-chain' },
            { text: 'BlueHammer: Windows Defender Zero-Day', link: '/research/bluehammer-zero-day' },
            { text: 'TeamPCP Supply Chain Campaign', link: '/research/teampcp-supply-chain-2026' },
            { text: 'Scattered Spider: Recent Campaigns', link: '/research/scattered-spider-2026' },
            { text: 'Lazarus Group: Threat Actor Profile', link: '/research/lazarus-group-2026' },
          ],
        },
      ],
      '/features/': [
        {
          text: 'Core Features',
          items: [
            { text: 'Overview', link: '/features/' },
            { text: 'Research on Demand', link: '/features/research' },
            { text: 'Detection Rules', link: '/features/detection-rules' },
            { text: 'File Attachments', link: '/features/attachments' },
            { text: 'Daily Briefing', link: '/features/daily-briefing' },
            { text: 'Critical Alerts', link: '/features/critical-alerts' },
            { text: 'Thread Follow-ups', link: '/features/threads' },
            { text: 'Status Command', link: '/features/status' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ThomasPark20/Aegis' },
    ],
    footer: {
      copyright: 'MIT License',
    },
    search: {
      provider: 'local',
    },
  },
})
