---
layout: home
hero:
  name: AEGIS
  text: Threat Intelligence, Automated
  tagline: Research threats. Generate detection rules. Deliver reports. Stay ahead.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/ThomasPark20/Aegis

features:
  - icon: "\U0001F50D"
    title: Research on Demand
    details: "Ask AEGIS to research any threat — it follows primary sources, chases IOC repos, and delivers a complete report as a .md file attachment."
  - icon: "\U0001F6E1\uFE0F"
    title: Validated Detection Rules
    details: "Sigma, YARA, and Snort rules generated and validated with real CLI tools inside the container. Failed rules are retried, never silently dropped."
  - icon: "\U0001F4E8"
    title: Daily Briefing
    details: "Every morning at 8am ET, AEGIS pulls RSS + Reddit feeds, filters noise, and delivers a batched threat intelligence briefing."
  - icon: "\u26A1"
    title: Critical Alerts
    details: "Headline scan every 2 hours. If something critical hits — zero-day, CVSS 9+, active exploitation — you get an alert immediately."
  - icon: "\U0001D5E8"
    title: Non-Blocking Chat
    details: "Research runs in parallel containers. Chat never hangs. Ask follow-ups, run /status, start new research — all while previous tasks complete."
  - icon: "\U0001F4AC"
    title: Discord & Telegram
    details: "First-class support for both platforms. Reports delivered as file attachments. Thread-aware follow-up questions just work."
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #1a9fff 30%, #0052cc);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #1a9fff50 50%, #0052cc50 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.dark {
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #4db8ff 30%, #1a9fff);
}
</style>

## How It Works

```
You: "Research Scattered Spider latest activity"

AEGIS: "On it — researching now."

  ┌─────────────────────────────────────────┐
  │  Research Container (async)             │
  │                                         │
  │  → Web search for primary sources       │
  │  → Follow links to technical writeups   │
  │  → Extract IOCs, map TTPs to ATT&CK    │
  │  → Generate Sigma + YARA rules          │
  │  → Validate with sigma-cli & yarac      │
  │  → Save report to summaries/            │
  └─────────────────────────────────────────┘

AEGIS: [Attaches scattered-spider-2026-04.md]
       "Here's your report — 7 sources, 3 Sigma rules,
        1 YARA rule. All validated."

You: "What TTPs did they use?"

AEGIS: "Based on the report — T1566.001 (spearphishing),
        T1078 (valid accounts), T1021.001 (RDP)..."
```

## Quick Start

```bash
git clone https://github.com/ThomasPark20/Aegis.git
cd Aegis
claude
/setup
/add-discord    # or /add-telegram
```

Four commands. Five minutes. You're running a CTI platform.
