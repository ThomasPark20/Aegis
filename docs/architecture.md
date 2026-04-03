# Architecture

## Overview

```
Discord / Telegram
        │
        ▼
┌──────────────────────────────────────────────────┐
│              AEGIS Host Process                   │
│                                                   │
│  Message Router ──► Group Queue ──► Container     │
│                                                   │
│  Task Scheduler ──► Cron/Interval ──► Container   │
│                                                   │
│  IPC Watcher ◄──── File-based JSON messaging      │
│       │                                           │
│       ├── send_message / send_file → Channel      │
│       ├── schedule_task → Task Scheduler          │
│       ├── start_research_thread → Discord Thread  │
│       └── register_group → Group Registry         │
└──────────────────────────────────────────────────┘
        │                          │
        ▼                          ▼
┌──────────────┐          ┌──────────────────────┐
│  Container   │          │  Container           │
│  (chat)      │          │  (research thread)   │
│              │          │                      │
│ Claude Code  │          │ Claude Code          │
│ + sigma-cli  │          │ + sigma-cli          │
│ + yarac      │          │ + yarac              │
│ + snort      │          │ + snort              │
│              │          │                      │
│ IPC Tools:   │          │ IPC Tools:           │
│ send_message │          │ send_message         │
│ send_file    │          │ send_file            │
│ schedule_task│          │ schedule_task        │
│ start_research_thread   │                      │
└──────────────┘          └──────────────────────┘
```

## Research Thread Flow

```
User: "Research Salt Typhoon"
  │
  ▼
Main Agent (container) ──► IPC: start_research_thread
  │                              │
  │ "On it — spinning up        ▼
  │  a research thread"    Host creates Discord thread
  │                        Registers thread as group
  ▼                        Injects research prompt
Main channel stays              │
clean, agent exits              ▼
                          Research Agent (new container)
                          Works inside the thread
                          User can follow up
                                │
                          10 min idle → thread group expires
                          Discord thread stays archived
```

## Why Chat Never Blocks

Each message spawns a **new container**. Research runs in its own container tied to a Discord thread. The main channel agent acknowledges immediately and exits. Multiple research threads can run concurrently.

## Container Mounts

| Container Path | Host Path | Access |
|----------------|-----------|--------|
| `/workspace/project` | Project root | read-only |
| `/workspace/group` | `groups/{folder}/` | read-write |
| `/workspace/global` | `groups/global/` | read-only |
| `/home/node/.claude` | `data/sessions/{group}/.claude/` | read-write |
| `/workspace/ipc` | `data/ipc/{group}/` | read-write |

## IPC

Containers communicate with the host via JSON files:

| Directory | Direction | Purpose |
|-----------|-----------|---------|
| `/workspace/ipc/messages/` | Container → Host | Send messages and files to channels |
| `/workspace/ipc/tasks/` | Container → Host | Schedule tasks, create threads, register groups |
| `/workspace/ipc/input/` | Host → Container | Pipe follow-up messages to running containers |

The host resolves `$NANOCLAW_CHAT_JID` in task files to the actual channel JID automatically.

## Thread Groups

Research threads are registered as temporary groups with `idleExpiryMs`. After 10 minutes of inactivity, the group is unregistered and the container stops. The Discord thread remains archived.

Each thread group gets:
- Its own group folder with research CLAUDE.md
- Its own IPC namespace
- Its own container and session
- No trigger required (all messages in the thread are processed)

## Detection Validation

The container image includes:
- **sigma-cli** — `sigma check` + `sigma convert --without-pipeline -t splunk`
- **yarac** — compiles YARA rules
- **snort** — validates Snort rules

Rules validate before inclusion. Failed rules retry 3 times. If still failing, marked `<!-- UNVALIDATED -->`.

## Model

All containers use **Claude Opus 4.6** (`claude-opus-4-6`).
