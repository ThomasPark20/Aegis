# Connect Telegram

## Create a Telegram Bot

1. Open Telegram and message [@BotFather](https://t.me/BotFather)
2. Send `/newbot`
3. Follow the prompts — choose a name and username
4. BotFather gives you a token — copy it

## Run /add-telegram

In your Actionable■ Claude session:

```
/add-telegram
```

You'll be asked for:
- **Bot token** — from BotFather

Actionable■ writes the token, builds, registers the channel, and seeds scheduled tasks.

## Verify

Send a message to your bot in Telegram. Actionable■ should respond within a few seconds.
