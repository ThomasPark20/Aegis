# Critical Alerts

AEGIS scans for critical threats every 2 hours. Most scans cost zero tokens.

## How It Works

A lightweight **script gate** runs first:
1. Fetches recent CVE data
2. Checks for critical indicators:
   - CVSS score >= 9.0
   - Active exploitation
   - Zero-day disclosure
   - CISA KEV (Known Exploited Vulnerabilities) addition

**If nothing critical:** The script returns `{wakeAgent: false}`. No agent invocation. Zero tokens consumed.

**If critical item found:** The script returns `{wakeAgent: true}`. The full research agent wakes up, runs the complete research pipeline on that specific topic, and posts an immediate alert:

```
CRITICAL: CVE-2026-XXXX — Remote code execution in Apache Struts,
actively exploited in the wild. CVSS 9.8.

[Attached: cve-2026-xxxx-struts-rce.md]
```

## Cost

Most 2-hour scans cost nothing — just a bash script checking a JSON API. You only pay for agent tokens when something genuinely critical appears.
