# Research on Demand

Ask AEGIS to research any topic:

```
You: "Research Scattered Spider latest activity"
You: "Research CVE-2026-1234"
You: "Research teampcp"
```

## How It Works

1. AEGIS acknowledges immediately — "On it, researching now"
2. A background container runs the full research pipeline
3. Chat stays responsive — you can ask other questions while research runs
4. When done, AEGIS posts the report as a .md file attachment

## What the Research Agent Does

- Web searches for primary sources (not just news articles)
- Follows links to technical writeups, IOC repos, PDFs
- Extracts IOCs (IPs, domains, hashes, URLs) and defangs them
- Maps TTPs to MITRE ATT&CK techniques
- Generates detection rules (Sigma, YARA, Snort)
- Validates every rule with CLI tools
- Compiles everything into a structured topic summary

## Exact Terms

AEGIS researches the **exact term** you give it. If you say "teampcp", it researches "teampcp" — it won't substitute "TeamTNT" or any other term it thinks you might mean. If it can't find anything for the exact term, it asks for clarification.

## Sources

Every source in a report is a clickable markdown link: `[Source Name](URL) — description`. No source is ever cited without a URL.
