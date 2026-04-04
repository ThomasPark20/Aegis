<div align="center">

# Actioner

**Threat intelligence that works for you.**

Research threats, generate validated detection rules, deliver reports — through Discord and Telegram.

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

Setup walks you through everything — dependencies, Docker, API credentials, Discord/Telegram bot creation, and feed configuration.

## What It Does

- **Research on demand** — ask Actioner to research any threat. It spins up a Discord thread, investigates primary sources, extracts IOCs, maps TTPs, and delivers a structured report.
- **Dual-agent threads** — a fast chat agent answers follow-ups in seconds while a deep research agent works in the background.
- **Requirements contract** — follow-up messages become mandatory checklist items. The report won't ship until every requirement is addressed.
- **Validated detection rules** — Sigma, YARA, and Snort rules generated and validated with real CLI tools before delivery.
- **Automated monitoring** — RSS feeds scanned every 2 hours. Critical items get their own research thread. Daily briefings compile everything into an executive summary.

## Prerequisites

- Git, Node.js 22+, Docker
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
- Anthropic API key or Claude Pro/Max subscription

## Learn More

Full documentation, architecture diagrams, and feature guides are at **[thomaspark20.github.io/Aegis](https://thomaspark20.github.io/Aegis/)**.

## Built on NanoClaw

Actioner is built on [NanoClaw](https://github.com/qwibitai/nanoclaw), an open-source personal Claude assistant framework.

## License

MIT
