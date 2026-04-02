# AEGIS

Autonomous threat intelligence. Research threats, generate validated detection rules, deliver reports — through Discord and Telegram.

**[Documentation](https://thomaspark20.github.io/Aegis)** | **[Getting Started](https://thomaspark20.github.io/Aegis/guide/getting-started)**

## Quick Start

```bash
git clone https://github.com/ThomasPark20/Aegis.git
cd Aegis
claude
/setup
/add-discord    # or /add-telegram
```

## What It Does

- **Researches threats on demand** — follows primary sources, delivers .md reports as file attachments
- **Generates validated detection rules** — Sigma, YARA, Snort — validated with real CLI tools
- **Daily briefing at 8am ET** — RSS + Reddit feeds, filtered, deduplicated, researched
- **Critical alerts every 2 hours** — zero-day, CVSS 9+, active exploitation
- **Never blocks chat** — research runs in parallel containers
- **Thread-aware** — follow-up questions just work

## Prerequisites

Git, Node.js 22+, Docker, [Claude Code](https://docs.anthropic.com/en/docs/claude-code), Anthropic API access.

## License

ISC
