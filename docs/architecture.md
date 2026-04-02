# Architecture

## Overview

```
Discord / Telegram
        │
        ▼
┌──────────────────────────────────────────────┐
│            AEGIS Host Process                │
│                                              │
│  Message Router ──► Group Queue ──► Spawn    │
│                                    Container │
│  Task Scheduler ──► Cron/Interval ──► Spawn  │
│                                    Container │
│  IPC Watcher ◄──── File-based messaging      │
└──────────────────────────────────────────────┘
        │                          │
        ▼                          ▼
┌──────────────┐          ┌──────────────┐
│  Container A │          │  Container B │
│  (chat msg)  │          │  (research)  │
│              │          │              │
│ Claude Code  │          │ Claude Code  │
│ + sigma-cli  │          │ + sigma-cli  │
│ + yarac      │          │ + yarac      │
│ + snort      │          │ + snort      │
│              │          │              │
│ MCP Tools:   │          │ MCP Tools:   │
│ send_message │          │ send_message │
│ send_file    │          │ send_file    │
│ schedule_task│          │ schedule_task│
└──────────────┘          └──────────────┘
```

## Why Chat Never Blocks

Each incoming message spawns a **new container**. If a research task takes 5 minutes, it runs in Container B while Container A has already responded and exited. The next message gets Container C. They're completely independent.

The chat agent uses `schedule_task` to dispatch research as a background one-shot task. It acknowledges immediately ("On it"), then wraps up. The research container runs asynchronously and posts results via `send_file` when done.

## Container Mounts

Each container sees:

| Container Path | Host Path | Access |
|----------------|-----------|--------|
| `/workspace/project` | Project root | read-only |
| `/workspace/group` | `groups/{folder}/` | read-write |
| `/workspace/global` | `groups/global/` | read-only |
| `/home/node/.claude` | `data/sessions/{group}/.claude/` | read-write |
| `/workspace/ipc` | `data/ipc/{group}/` | read-write |

## IPC (Inter-Process Communication)

Containers communicate with the host via JSON files:

- **`/workspace/ipc/messages/`** — container writes `{type: "message", chatJid, text}` to send messages
- **`/workspace/ipc/messages/`** — container writes `{type: "file", chatJid, filePath, caption}` to send file attachments
- **`/workspace/ipc/tasks/`** — container writes task JSON to schedule background work
- **`/workspace/ipc/input/`** — host pipes new messages to active containers

The host process watches these directories and routes messages to the correct channel (Discord/Telegram).

## Detection Validation

The container image includes:
- **sigma-cli** — validates Sigma rules (`sigma check`) and converts to Splunk queries (`sigma convert -t splunk`)
- **yarac** — compiles YARA rules
- **snort** — validates Snort rules (when available)

Rules are validated before inclusion in summaries. Failed rules are retried up to 3 times. If still failing, they're marked `<!-- UNVALIDATED -->` — never silently dropped.

## Model

All containers use **Claude Opus 4.6** (`claude-opus-4-6`), configured automatically in `data/sessions/{group}/.claude/settings.json`.
