# Custom Skills

Actionable■ comes with 4 built-in CTI skills. You can add your own.

## Built-in Skills

| Skill | Path | Purpose |
|-------|------|---------|
| Ingest | `container/skills/ingest/` | Fetch and filter RSS feeds |
| Research | `container/skills/research/` | Deep-dive threat research |
| IOC Extract | `container/skills/ioc-extract/` | Extract and defang IOCs, map TTPs |
| Rule Gen | `container/skills/rule-gen/` | Generate and validate detection rules |

## Creating a Skill

```bash
mkdir -p container/skills/my-skill
```

Create `container/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: What this skill does and when to use it.
---

# My Skill

Instructions for the agent when this skill is invoked.

## Workflow
1. Step one
2. Step two

## Output
What the skill produces.
```

Skills in `container/skills/` are synced to each container's `.claude/skills/` at startup.
