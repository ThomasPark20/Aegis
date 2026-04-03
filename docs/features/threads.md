# Research Threads

Every research request — on-demand, critical alert, or daily briefing — gets its own Discord thread.

## Why Threads

- Main channel stays clean
- Each research has its own conversation context
- Follow-up questions go to the right agent
- No concurrent research in the same thread — one topic per thread
- Threads auto-archive in Discord for future reference

## Thread Types

| Thread | Created When | Name Format |
|--------|-------------|-------------|
| Research | User asks to research something | `Research: [Topic]` |
| Critical | 2-hour scan finds a critical item | `Critical: [Topic]` |
| Daily | Scheduled daily report time | `Daily Brief — YYYY-MM-DD` |

## Follow-ups

Send messages in any thread to interact with the agent:

```
Thread: Research: Scattered Spider
────────────────────────────────
AEGIS: Researching now...
AEGIS: Report ready. [attached .md]

You: "What TTPs did they use?"
AEGIS: "T1566.001, T1078, T1021.001 — details in the report."

You: "Generate Sigma rules for the RDP lateral movement"
AEGIS: "Here's a Sigma rule targeting T1021.001..."

You: "Also check this URL: https://..."
AEGIS: "Incorporating that source into the analysis..."
```

## How It Works

1. Main agent writes an IPC task file requesting a thread
2. Host creates the Discord thread and registers it as a group
3. A research agent spawns in the thread with its own container
4. Messages in the thread get piped to the running container
5. After 10 minutes of inactivity, the thread group is unregistered
6. The Discord thread remains archived for reference

## Telegram

Telegram doesn't support threads. Reports are sent as regular messages with `.md` file attachments in the chat.
