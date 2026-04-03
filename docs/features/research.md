# Research on Demand

Ask AEGIS to research any topic:

```
"Research Scattered Spider latest activity"
"Research CVE-2026-1234"
"Research teampcp"
```

## What Happens

1. AEGIS creates a **Discord thread** named "Research: [Topic]"
2. A research agent starts working in that thread
3. Main channel stays clean — no research clutter
4. When done, the report is attached as a `.md` file in the thread
5. You can follow up with questions directly in the thread

## Research Pipeline

The research agent runs this pipeline inside an isolated container:

1. Web search for primary sources (vendor reports, advisories, OSINT)
2. Follow links to technical writeups, IOC repos, PDFs
3. Extract IOCs (IPs, domains, hashes, URLs) and defang them
4. Map TTPs to MITRE ATT&CK techniques
5. Generate detection rules (Sigma, YARA, Snort)
6. Validate every rule with CLI tools
7. Compile structured topic summary
8. Deliver via `send_file` in the thread

## Exact Terms

AEGIS researches the **exact term** you give it. "teampcp" stays "teampcp" — it won't substitute what it thinks you meant. If the exact term yields nothing, it asks for clarification.

## Follow-ups

Messages you send in the research thread get piped to the running agent. Ask questions, add context ("also check this URL"), or request detection rules — the agent incorporates it into the ongoing research.

Thread agents expire after 10 minutes of inactivity. The thread stays in Discord for reference.
