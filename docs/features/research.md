# Research on Demand

Ask Actionable. to research any topic:

```
"Research Scattered Spider latest activity"
"Research CVE-2026-1234"
"Research teampcp"
```

## What Happens

1. Actionable. creates a **Discord thread** named "Research: [Topic]"
2. A research agent starts working in that thread
3. Main channel stays clean — no research clutter
4. When done, the report is attached as a `.md` file in the thread
5. You can follow up with questions or steer the research — a fast chat agent responds immediately

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

Actionable. researches the **exact term** you give it. "teampcp" stays "teampcp" — it won't substitute what it thinks you meant. If the exact term yields nothing, it asks for clarification.

## Mid-Research Interaction

While the research agent is working, you can interact in the thread. A fast **chat agent** responds immediately:

- **Ask questions** — "Are Scattered Spider and ShinyHunters the same?" gets an instant answer
- **Add requirements** — "Include FBI most wanted members" becomes a mandatory checklist item
- **Expand scope** — "Also check Volt Typhoon overlap" added to requirements
- **Add sources** — "Also check this URL: https://..." incorporated into the investigation
- **Stop early** — "That's enough, wrap it up" tells the research agent to finish

Requirements are written to `requirements.md` in the research workspace. The research agent **must** address every requirement before delivering the final report — it's a contract, not a suggestion.

## Thread Lifecycle

- **Active** — research agent working, chat agent responds to follow-ups
- **Idle** — 10 minutes of no activity triggers soft-expiry
- **Expired** — group unregistered, but folder and session preserved on disk
- **Re-activated** — send a message to bring it back with full context
