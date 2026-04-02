# Daily Briefing

Every morning at 8:00 AM ET, AEGIS delivers a threat intelligence briefing.

## What Happens

1. Fetches all RSS + Reddit feeds from `feeds.yaml`
2. Filters noise (listicles, vendor marketing, career advice, memes)
3. Deduplicates against existing summaries
4. Groups new articles by topic
5. Researches each new topic in depth
6. Extracts IOCs and maps TTPs
7. Generates and validates detection rules
8. Delivers a batched briefing with all .md reports attached

## Example Output

```
Good morning. Here's your daily CTI briefing — 3 new reports:

1. CVE-2026-XXXX — Critical RCE in Apache Struts
2. Scattered Spider — New social engineering campaign
3. BlackCat ransomware — Updated encryptor variant

[Attached: 3 .md files]
```

## Quiet Days

If no new actionable intelligence is found:

```
No new actionable threat intelligence today.
```

## Token Efficiency

The briefing deduplicates aggressively. Topics already covered in existing summaries are skipped. Only genuinely new intelligence triggers research.
