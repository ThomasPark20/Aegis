# Thread Follow-ups

After receiving a report, ask follow-up questions naturally. AEGIS reads the full thread context.

## Examples

```
You: "Research Volt Typhoon"
AEGIS: [delivers report]

You (reply): "What TTPs did they use?"
AEGIS: "Based on the report — T1566.001 (spearphishing),
        T1078 (valid accounts), T1021.001 (RDP)..."

You (reply): "Any Sigma rules for the RDP lateral movement?"
AEGIS: "Yes, the report includes a Sigma rule targeting
        T1021.001. Here's the relevant detection..."

You (reply): "Show me the IOCs"
AEGIS: "From the report: hxxps://example[.]com/payload,
        185.220.101[.]1, SHA256: a1b2c3..."
```

## How It Works

AEGIS reads the reply chain / thread context before responding. References like "it", "that report", "those IOCs", "the TTPs" are resolved from the conversation history.

This works on both Discord (reply threads) and Telegram (reply-to chains).
