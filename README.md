<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/public/actioner-wordmark-white-2x.png">
  <source media="(prefers-color-scheme: light)" srcset="docs/public/actioner-wordmark-dark-2x.png">
  <img alt="Actioner" src="docs/public/actioner-wordmark-dark-2x.png" width="360">
</picture>

<br><br>

**Threat intelligence that works for you.**

Research threats, generate validated detection rules, deliver reports, all through Discord and Telegram.

[Documentation](https://thomaspark20.github.io/Aegis/) &nbsp;&middot;&nbsp; [Getting Started](https://thomaspark20.github.io/Aegis/guide/getting-started) &nbsp;&middot;&nbsp; [Architecture](https://thomaspark20.github.io/Aegis/architecture) &nbsp;&middot;&nbsp; [Features](https://thomaspark20.github.io/Aegis/features/)

</div>

---

## Quick Start

```bash
git clone https://github.com/ThomasPark20/Aegis.git
cd Aegis
claude
/setup
```

Setup walks you through everything: dependencies, Docker, API credentials, Discord/Telegram bot creation, and feed configuration.

## Features

### Research on Demand

Ask Actioner to research any threat. It spins up a dedicated thread, investigates primary sources, extracts IOCs, maps MITRE ATT&CK TTPs, and delivers a structured report with validated detection rules.

### Dual-Agent Threads

Every research thread runs two agents concurrently: a fast chat agent that answers follow-ups in seconds and a deep research agent that performs thorough investigation in the background.

### Requirements Contract

Follow-up messages in a research thread become mandatory checklist items. The report will not ship until every requirement is addressed.

### Validated Detection Rules

Rules are generated and validated with real CLI tools before delivery:

- **Sigma** for log-based detection (process, registry, network, auth, file, cloud audit)
- **YARA** for file-level detection (malware samples, byte patterns, PE structures)
- **Snort / Suricata** for network detection (IPs, domains, URLs, JA3/JA4 fingerprints, TLS)

If validation fails, the generator retries up to 3 times. Rules that still fail are marked `UNVALIDATED` with the error attached.

### Automated Feed Monitoring

11 RSS feeds (BleepingComputer, Unit42, Krebs on Security, Cisco Talos, Microsoft Security, Google TAG, and more) are polled every 2 hours. Critical items (APTs, CVEs, active exploitation, zero-days, ransomware) automatically spawn research threads. Non-critical items are saved for the daily briefing.

### Daily Briefing

An executive summary delivered at a configured time each day, compiling all research and new articles into a single report.

### IOC Extraction

Indicators of compromise are automatically identified, normalized, and defanged from source material during research.

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                     Node.js Runtime                  │
│                                                      │
│  ┌─────────┐  ┌───────────┐  ┌────────────────────┐ │
│  │ Discord │  │ Telegram  │  │  Task Scheduler    │ │
│  │ Channel │  │ Channel   │  │  (feeds, briefing) │ │
│  └────┬────┘  └─────┬─────┘  └─────────┬──────────┘ │
│       │             │                   │            │
│       └─────────────┼───────────────────┘            │
│                     │                                │
│              ┌──────▼──────┐                         │
│              │   Router    │                         │
│              └──────┬──────┘                         │
│                     │                                │
│           ┌─────────▼──────────┐                     │
│           │  Container Runner  │                     │
│           └─────────┬──────────┘                     │
└─────────────────────┼────────────────────────────────┘
                      │
          ┌───────────▼───────────┐
          │   Docker Container    │
          │                       │
          │  Claude Agent SDK     │
          │  (claude-opus-4-6)    │
          │                       │
          │  Skills:              │
          │  - Research           │
          │  - Rule Generation    │
          │  - IOC Extraction     │
          │  - Browser            │
          │                       │
          │  IPC ◄──► Runtime     │
          └───────────────────────┘
```

Each research thread gets its own Docker container with isolated filesystem and memory. Containers communicate with the runtime via JSON-based IPC. Groups are soft-deleted after 10 minutes of inactivity but can be reactivated.

## Prerequisites

- Git, Node.js 22+, Docker
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
- Anthropic API key or Claude Pro/Max subscription

## Learn More

Full documentation, architecture diagrams, and feature guides at **[thomaspark20.github.io/Aegis](https://thomaspark20.github.io/Aegis/)**.

## Built on NanoClaw

Actioner is built on [NanoClaw](https://github.com/qwibitai/nanoclaw), an open-source personal Claude assistant framework.

## License

MIT
