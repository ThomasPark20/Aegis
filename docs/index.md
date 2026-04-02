---
layout: home
hero:
  name: AEGIS
  text: Autonomous Threat Intelligence
  tagline: Research threats. Generate detection rules. Deliver reports. Never miss a zero-day.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Architecture
      link: /architecture
    - theme: alt
      text: GitHub
      link: https://github.com/ThomasPark20/Aegis

features:
  - icon: "\U0001F50D"
    title: Research on Demand
    details: Ask AEGIS to research any threat actor, CVE, or campaign. It follows primary sources, chases IOC repos and PDFs, and delivers a structured report as a file attachment.
  - icon: "\U0001F6E1\uFE0F"
    title: Validated Detection Rules
    details: Sigma, YARA, and Snort rules — every one validated with real CLI tools inside the container before delivery. Failed rules are retried three times, never silently dropped.
  - icon: "\U0001F4E8"
    title: Daily Briefing
    details: Every morning at 8am, AEGIS pulls RSS and Reddit feeds, filters noise, deduplicates, researches new topics, and delivers a batched intelligence briefing.
  - icon: "\u26A1"
    title: Critical Alerts
    details: Lightweight headline scan every 2 hours. Zero-day drops, CVSS 9+ vulnerabilities, active exploitation — you get an alert with full analysis within minutes.
  - icon: "\U0001F504"
    title: Non-Blocking Chat
    details: Research runs in isolated parallel containers. Chat never hangs. Start new research, ask follow-ups, and check status while previous tasks complete in the background.
  - icon: "\U0001F4AC"
    title: Discord & Telegram
    details: First-class support for both platforms. Reports delivered as downloadable file attachments. Thread-aware follow-up questions resolve context naturally.
---

<div class="how-it-works">

## See It In Action

```
You: "Research Scattered Spider's latest campaign"

AEGIS: "On it — researching now."

        ┌─────────────────────────────────────────┐
        │  Background Research Container           │
        │                                          │
        │  → Search for primary sources            │
        │  → Follow links to technical writeups    │
        │  → Extract IOCs, map TTPs to ATT&CK     │
        │  → Generate Sigma + YARA rules           │
        │  → Validate with sigma-cli & yarac       │
        │  → Compile report                        │
        └─────────────────────────────────────────┘

AEGIS: attached scattered-spider-2026-04.md
       "Report ready — 7 sources, 3 Sigma rules,
        1 YARA rule. All validated."

You: "What TTPs did they use?"

AEGIS: "From the report — T1566.001 (spearphishing),
        T1078 (valid accounts), T1021.001 (RDP)..."
```

</div>

<div class="quickstart-section">

## Four Commands

```bash
git clone https://github.com/ThomasPark20/Aegis.git
cd Aegis
claude
/setup
```

Then connect your channel: `/add-discord` or `/add-telegram`.

<div style="text-align: center; margin-top: 2rem;">
  <a href="/Aegis/guide/getting-started" style="
    display: inline-block;
    padding: 0.75rem 2rem;
    background: var(--vp-c-brand-1);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
  ">Read the Guide →</a>
</div>

</div>

<style>
.how-it-works {
  max-width: 800px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
}

.how-it-works h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.quickstart-section {
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 1.5rem;
}

.quickstart-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
</style>
