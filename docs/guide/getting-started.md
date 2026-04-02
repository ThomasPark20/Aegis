# Getting Started

## Quick Start

```bash
git clone https://github.com/ThomasPark20/Aegis.git
cd Aegis
claude
/setup
```

Then connect a channel:

```
/add-discord    # for Discord
/add-telegram   # for Telegram
```

That's it. AEGIS handles dependencies, container builds, and model configuration automatically.

## What Happens During Setup

`/setup` runs through these steps:

1. **Prerequisites** — checks for Node.js 22+, Docker, git
2. **Dependencies** — `npm install`
3. **API Authentication** — configures your Anthropic API key or OAuth token
4. **Container Build** — builds the agent container with detection tools (sigma-cli, yarac, snort)
5. **Model Configuration** — sets Claude Opus 4.6 as the default
6. **Service Start** — launches the background service

After setup, `/add-discord` or `/add-telegram` walks you through connecting a chat channel. No config files to edit manually.

## What You Get

Once connected, AEGIS:

- Responds to research requests in real-time
- Delivers reports as `.md` file attachments
- Runs a daily briefing at 8am ET
- Scans for critical threats every 2 hours
- Validates every detection rule before delivery
- Never blocks chat while researching
