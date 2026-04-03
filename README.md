# AEGIS

Autonomous threat intelligence. Research threats, generate validated detection rules, deliver reports — through Discord and Telegram.

**[Documentation](https://thomaspark20.github.io/Aegis)** | **[Getting Started](https://thomaspark20.github.io/Aegis/guide/getting-started)**

## Quick Start

```bash
git clone https://github.com/ThomasPark20/Aegis.git
cd Aegis
claude
/setup
```

`/setup` walks you through everything: dependencies, Docker, API credentials, and channel setup (Discord/Telegram). It'll ask which channels you want and guide you through bot creation, permissions, and registration — all in one flow.

## What It Does

- **Researches threats on demand** — follows primary sources, delivers .md reports as file attachments
- **Generates validated detection rules** — Sigma, YARA, Snort — validated with real CLI tools
- **Daily briefing at 8am ET** — RSS + Reddit feeds, filtered, deduplicated, researched
- **Critical alerts every 2 hours** — zero-day, CVSS 9+, active exploitation
- **Dual-agent research threads** — each research request spins up a Discord thread with two agents: a fast **chat agent** for instant Q&A and a deep **research agent** running in the background. Steer research mid-flight, ask questions, add requirements — the chat agent responds in seconds while research continues uninterrupted
- **Research requirements** — follow-up messages in threads become mandatory requirements (`requirements.md`). The research agent checks every requirement before delivering the final report
- **Thread re-activation** — expired threads come back to life when you message them, with full context preserved

## Prerequisites

Git, Node.js 22+, Docker, [Claude Code](https://docs.anthropic.com/en/docs/claude-code), Anthropic API access.

## License

MIT
