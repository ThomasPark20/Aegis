# Research Threads

Every research request — on-demand, critical alert, or daily briefing — gets its own Discord thread.

## Why Threads

- Main channel stays clean
- Each research has its own conversation context
- Follow-up questions get fast responses from the thread-chat agent
- No concurrent research in the same thread — one topic per thread
- Threads auto-archive in Discord for future reference
- Expired threads re-activate when you message them again

## Thread Types

| Thread | Created When | Name Format |
|--------|-------------|-------------|
| Research | User asks to research something | `Research: [Topic]` |
| Critical | 2-hour scan finds a critical item | `Critical: [Topic]` |
| Daily | Scheduled daily report time | `Daily Brief — YYYY-MM-DD` |

## Follow-ups and Steering

Send messages in any thread to interact. A fast **thread-chat agent** responds immediately while the research agent continues working in the background:

```
Thread: Research: Scattered Spider
────────────────────────────────
AEGIS: Researching now...

You: "Are they the same as ShinyHunters?"
AEGIS (chat): "No — Scattered Spider (UNC3944) and ShinyHunters are
              different groups. ShinyHunters focuses on data breaches..."

You: "Focus on the IOCs, skip attribution"
AEGIS (chat): "Got it — added to the research requirements: focus
              analysis on IOCs rather than attribution."

You: "Also check Volt Typhoon overlap"
AEGIS (chat): "Added to requirements: investigate potential Volt
              Typhoon overlap. The research agent will cover this
              before delivering the report."

AEGIS (research): Report ready. [attached .md]

You: "Generate Sigma rules for the RDP lateral movement"
AEGIS: "Here's a Sigma rule targeting T1021.001..."
```

## Dual-Agent Model

Each research thread runs two agents concurrently:

| Agent | What It Does | Response Time |
|-------|-------------|---------------|
| **Research agent** | Deep investigation, web research, IOC extraction, rule generation | Minutes |
| **Thread-chat agent** | Answers questions, acknowledges steering, reports progress | Seconds |

The thread-chat agent has access to the research agent's workspace, so it can report on progress. It adds user directives to `requirements.md` — a checklist that the research agent must satisfy before delivering the final report.

## How It Works

1. Main agent writes an IPC task file requesting a thread
2. Host creates the Discord thread and registers it as a group
3. A research agent spawns in the thread with its own container
4. When you send a follow-up message:
   - A thread-chat agent spawns and responds immediately
   - The chat agent answers your question or adds your directive to `requirements.md`
   - The research agent checks `requirements.md` before delivering — all items must be addressed
5. After 10 minutes of inactivity, the thread group soft-expires
6. Send a message to re-activate — the thread comes back with its full context

## Thread Re-activation

Expired threads are **soft-deleted**, not destroyed. The group folder, session data, and research files are preserved. When you send a message to an expired thread, AEGIS automatically re-activates it — the new agent has access to all prior research context.

## Telegram

Telegram doesn't support threads. Reports are sent as regular messages with `.md` file attachments in the chat.
