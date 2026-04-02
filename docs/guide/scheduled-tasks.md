# Scheduled Tasks

AEGIS seeds two scheduled tasks when you connect a channel.

## Daily Briefing

- **Schedule:** 8:00 AM ET, every day
- **What it does:** Fetches all RSS + Reddit feeds, filters noise, deduplicates, researches new topics, generates detection rules, validates them, delivers a batched briefing as .md file attachments
- **If nothing new:** "No new actionable threat intelligence today."

## Critical Issue Polling

- **Schedule:** Every 2 hours
- **How it works:** A lightweight script fetches recent CVEs and checks for critical indicators:
  - CVSS score >= 9.0
  - Active exploitation
  - Zero-day disclosure
  - CISA KEV addition
- **If nothing critical:** Does nothing. Zero agent tokens consumed.
- **If critical item found:** Full research pipeline runs, immediate alert posted with report attached.

## Managing Tasks

Inside a Claude session with AEGIS:

```
# List all tasks
list_tasks

# Cancel a task
cancel_task(task_id: "...")

# Create a custom task
schedule_task(
  prompt: "Your instructions",
  schedule_type: "cron",
  schedule_value: "0 9 * * 1",  # every Monday 9am
  context_mode: "isolated"
)
```
