# /status Command

Send `/status` in your channel to see what AEGIS is doing.

## Output

```
AEGIS — ONLINE

Active Research: Scattered Spider campaign (started 2 min ago)

Recent Reports:
  - 2026-04-02 cve-2026-1234-struts-rce.md
  - 2026-04-01 scattered-spider-q2-update.md
  - 2026-04-01 blackcat-ransomware-variant.md

Stats: 12 reports, 34 detection rules generated
```

## What It Shows

- AEGIS status (online/offline)
- Currently running research tasks
- Last 5 reports generated
- Quick stats (total reports, total rules)

## What It Doesn't Show

AEGIS never exposes internal details like file paths, container IDs, database queries, or system architecture. The output is user-friendly, not a debug dump.
