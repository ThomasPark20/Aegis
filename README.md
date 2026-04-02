# AEGIS — CTI Research & Detection Platform

AEGIS is a cyber threat intelligence (CTI) research and detection engineering platform. It monitors RSS feeds for emerging threats, researches them using primary sources, generates validated Sigma/YARA/Snort detection rules, and delivers reports to your team via Discord or Telegram — all automatically.

## Quick Start

```bash
git clone git@github.com:ThomasPark20/Aegis.git
cd aegis
claude
# Then run:
/setup
# After setup, connect a channel:
/add-discord   # or /add-telegram
```

## Prerequisites

- **Git** — to clone the repo
- **Node.js 22+** — runtime (`node --version` to check)
- **Docker** — for running agent containers (`docker --version` to check)
- **Anthropic API key or Claude Pro/Max subscription** — for the AI backend
- **Claude Code CLI** — `npm install -g @anthropic-ai/claude-code`

## What `/setup` Does

The setup skill walks you through everything:

1. **Dependencies** — installs Node.js packages, builds native modules
2. **Container build** — builds the agent Docker image with Chromium, sigma-cli, yarac, and snort
3. **Model configuration** — sets Claude Opus 4.6 as the default model
4. **Credential system** — configures OneCLI for secure API key management
5. **Service start** — installs and starts the background service (launchd on macOS, systemd on Linux)

## Connecting Discord

Full walkthrough — no external docs needed:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**, give it a name (e.g., "AEGIS")
3. Go to **Bot** tab → **Reset Token** → copy the token
4. Under **Privileged Gateway Intents**, enable:
   - **Message Content Intent** (required)
   - **Server Members Intent** (optional)
5. Go to **OAuth2** → **URL Generator**:
   - Scopes: `bot`
   - Permissions: `Send Messages`, `Read Message History`, `View Channels`, `Attach Files`
   - Copy the URL, open in browser, invite bot to your server
6. In Claude Code, run `/add-discord`
7. Paste your bot token when prompted
8. Enable **Developer Mode** in Discord (Settings → Advanced)
9. Right-click the target channel → **Copy Channel ID**
10. Provide the channel ID to complete registration

## Connecting Telegram

1. Open Telegram, search for `@BotFather`
2. Send `/newbot`, follow the prompts:
   - Bot name: e.g., "AEGIS Assistant"
   - Bot username: must end in "bot" (e.g., `aegis_cti_bot`)
3. Copy the bot token
4. In Claude Code, run `/add-telegram`
5. Paste the token when prompted
6. Send `/chatid` in the chat to get the chat ID
7. Provide the chat ID to complete registration

## Architecture

```
Discord / Telegram
       │
       ▼
┌──────────────────────┐
│   AEGIS Host Process  │  Node.js — routes messages, manages containers
│   (src/index.ts)      │
└──────┬───────┬───────┘
       │       │
       ▼       ▼
┌──────────┐  ┌──────────────┐
│ Chat     │  │ Research     │  Each runs in its own Docker container
│ Container│  │ Container    │  with isolated filesystem + Claude Agent SDK
│          │  │              │
│ Responds │  │ Investigates │
│ instantly│  │ async, posts │
│ to users │  │ reports when │
│          │  │ done         │
└──────────┘  └──────────────┘
                     │
              ┌──────┴──────┐
              │  Scheduled  │  Cron-triggered containers
              │  Tasks      │  for daily briefings and
              │             │  critical alert polling
              └─────────────┘
```

## Core Features

1. **Research on demand** — Ask AEGIS to research any threat topic. It dispatches a background container that investigates, follows primary sources, and produces a full report.

2. **Validated detection rules** — Every report includes Sigma, YARA, and/or Snort rules. Each rule is validated using CLI tools (`sigma check`, `yarac`, `snort -T`) before inclusion.

3. **Reports as file attachments** — Long reports are sent as `.md` file attachments, not wall-of-text messages. Short answers go inline.

4. **Non-blocking chat** — Research runs asynchronously in separate containers. The chat agent stays responsive to new messages while research is in progress.

5. **Daily briefing at 8 AM ET** — Every morning, AEGIS fetches RSS feeds, filters noise, deduplicates, researches new topics, generates rules, and delivers a consolidated briefing report.

6. **Critical alerts every 2 hours** — A lightweight script polls CISA KEV and other feeds for CVSS ≥ 9, active exploitation, or zero-day indicators. Only wakes the agent if something critical is found.

7. **Thread-aware follow-ups** — Ask follow-up questions in a thread and AEGIS reads the full context. "What TTPs did they use?" works after a research report.

8. **/status command** — Check what AEGIS is working on, recent reports, and system health.

## Adding RSS Feeds

Edit `feeds.yaml` to add or remove RSS/Atom feed sources:

```yaml
feeds:
  - name: CISA Advisories
    url: https://www.cisa.gov/cybersecurity-advisories/all.xml
    category: advisories

  - name: Your Custom Feed
    url: https://example.com/feed.xml
    category: custom
```

## Adding Custom Skills

Create a directory under `container/skills/` with a `SKILL.md` file:

```
container/skills/my-skill/SKILL.md
```

Skills are automatically loaded into agent containers at runtime.

## Updating AEGIS

```bash
git pull upstream main
npm install
cd container && bash build.sh && cd ..
npm run build
# Restart the service:
launchctl kickstart -k gui/$(id -u)/com.aegis  # macOS
# systemctl --user restart aegis               # Linux
```

## Project Structure

```
aegis/
├── .claude/skills/      # Claude Code skills (/setup, /add-discord, etc.)
├── container/
│   ├── Dockerfile       # Agent container with Chromium + detection tools
│   ├── build.sh         # Container build script
│   └── agent-runner/    # MCP server running inside containers
│       └── src/
│           └── ipc-mcp-stdio.ts  # send_file, send_message, schedule_task tools
├── docs/                # Detection rule reference docs
│   ├── sigma-spec.md
│   ├── yara-ref.md
│   └── snort-ref.md
├── feeds.yaml           # RSS feed sources
├── groups/
│   ├── main/CLAUDE.md   # Chat agent identity (deployed to new main groups)
│   └── global/CLAUDE.md # Research agent instructions (mounted in all containers)
├── setup/               # Setup step implementations
├── setup.sh             # Bootstrap script
├── src/                 # Host process source code
│   ├── index.ts         # Orchestrator
│   ├── container-runner.ts  # Spawns agent containers
│   ├── ipc.ts           # IPC watcher (file-based message passing)
│   ├── task-scheduler.ts    # Cron + one-shot task scheduling
│   └── config.ts        # Configuration (ASSISTANT_NAME, paths, etc.)
├── templates/
│   └── topic-summary.md # Report template
└── store/               # SQLite database (messages, groups, tasks)
```

## Troubleshooting

### Bot not responding
- Check service is running: `launchctl list | grep aegis` (macOS) or `systemctl --user status aegis` (Linux)
- Check logs: `tail -f logs/aegis.log`
- Verify credentials: `onecli secrets list`
- Ensure bot token is in `.env` AND synced: `cp .env data/env/env`

### Research not returning results
- Check container logs: `ls groups/*/logs/container-*.log`
- Verify Docker is running: `docker info`
- Rebuild container: `cd container && bash build.sh`

### Rules failing validation
- sigma-cli, yarac, and snort are installed in the container
- Check with: `docker run --rm --entrypoint bash nanoclaw-agent:latest -c 'sigma -h'`
- Rules that fail validation 3 times are marked `<!-- UNVALIDATED -->` with the error

### Duplicate responses
- The dedup fix prevents re-piping messages to active containers
- If still occurring, check for multiple service instances: `ps aux | grep aegis`

---

Built on [NanoClaw](https://github.com/qwibitai/nanoclaw)
