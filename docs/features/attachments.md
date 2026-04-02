# File Attachments

Reports are delivered as downloadable `.md` files — not pasted as message walls that get truncated.

## How It Works

- **Reports (500+ words):** Attached as `.md` files with a short summary message
- **Short answers:** Sent as regular messages (queries, follow-ups, status)

## Discord

Uses Discord's `AttachmentBuilder` to send files directly in the channel. Users can preview or download.

## Telegram

Uses Telegram's `sendDocument` API. Files appear as downloadable documents in the chat.

## File Location

All summaries are saved to `groups/global/summaries/` on the host. You can access them directly:

```bash
ls groups/global/summaries/
```
