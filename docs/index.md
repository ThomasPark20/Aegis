---
layout: home
hero:
  name: AEGIS
  text: Autonomous Threat Intelligence
  tagline: Research threats, generate detection rules, deliver reports — all through Discord.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Architecture
      link: /architecture
---

<div class="how-it-works">

## How It Works

```
You: "Research Scattered Spider's latest campaign"

                    ┌─────────────────────────────┐
AEGIS creates ────► │  Research: Scattered Spider  │  ◄── Discord thread
a thread            │                              │
                    │  AEGIS: Researching now...    │
                    │                              │
                    │  → Web search primary sources │
                    │  → Extract IOCs & TTPs        │
                    │  → Generate Sigma + YARA      │
                    │  → Validate with CLI tools    │
                    │                              │
                    │  AEGIS: Report ready.         │
                    │  📎 scattered-spider-2026.md  │
                    │                              │
                    │  You: "What TTPs?"            │
                    │  AEGIS: "T1566, T1078..."     │
                    └─────────────────────────────┘

Main channel stays clean. Follow up in the thread.
```

</div>

<div class="quickstart-section">

## Get Running

```bash
git clone https://github.com/ThomasPark20/Aegis.git
cd Aegis
claude
/setup
```

Setup handles everything: dependencies, Docker, API keys, Discord bot, feed scanning, and daily reports.

</div>
