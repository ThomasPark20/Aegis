---
name: add-discord
description: Add Discord bot channel integration to AEGIS.
---

# Add Discord Channel

This skill adds Discord support to AEGIS, then walks through interactive setup.

## Phase 1: Pre-flight

### Check if already applied

Check if `src/channels/discord.ts` exists. If it does, skip to Phase 3 (Setup). The code changes are already in place.

### Ask the user

Use `AskUserQuestion` to collect configuration:

AskUserQuestion: Do you have a Discord bot token, or do you need to create one?

If they have one, collect it now. If not, we'll create one in Phase 3.

## Phase 2: Apply Code Changes

### Ensure channel remote

```bash
git remote -v
```

If `discord` is missing, add it:

```bash
git remote add discord https://github.com/qwibitai/nanoclaw-discord.git
```

### Merge the skill branch

```bash
git fetch discord main
git merge discord/main || {
  git checkout --theirs package-lock.json
  git add package-lock.json
  git merge --continue
}
```

This merges in:
- `src/channels/discord.ts` (DiscordChannel class with self-registration via `registerChannel`)
- `src/channels/discord.test.ts` (unit tests with discord.js mock)
- `import './discord.js'` appended to the channel barrel file `src/channels/index.ts`
- `discord.js` npm dependency in `package.json`
- `DISCORD_BOT_TOKEN` in `.env.example`

If the merge reports conflicts, resolve them by reading the conflicted files and understanding the intent of both sides.

### Validate code changes

```bash
npm install
npm run build
npx vitest run src/channels/discord.test.ts
```

All tests must pass (including the new Discord tests) and build must be clean before proceeding.

## Phase 2.5: Apply AEGIS Enhancements

After the Discord merge succeeds, apply these enhancements. Use the exact code shown below.

### Enhancement 1: sendFile on Channel interface

In `src/types.ts`, find the `Channel` interface and add the optional `sendFile` method after `sendMessage`:

```typescript
// Add this line after sendMessage in the Channel interface:
sendFile?(jid: string, filePath: string, caption?: string): Promise<void>;
```

The full interface should look like:
```typescript
export interface Channel {
  name: string;
  connect(): Promise<void>;
  sendMessage(jid: string, text: string): Promise<void>;
  isConnected(): boolean;
  ownsJid(jid: string): boolean;
  disconnect(): Promise<void>;
  sendFile?(jid: string, filePath: string, caption?: string): Promise<void>;
  setTyping?(jid: string, isTyping: boolean): Promise<void>;
  syncGroups?(force: boolean): Promise<void>;
}
```

### Enhancement 2: sendFile on Discord channel

In `src/channels/discord.ts`, add a `sendFile` method to the DiscordChannel class. Import `AttachmentBuilder` from discord.js at the top, then add:

```typescript
import { Client, GatewayIntentBits, AttachmentBuilder } from 'discord.js';
```

Add the method to the class:
```typescript
async sendFile(jid: string, filePath: string, caption?: string): Promise<void> {
  const channelId = jid.replace(/^dc:/, '');
  const channel = await this.client.channels.fetch(channelId);
  if (!channel || !channel.isTextBased() || !('send' in channel)) return;
  const attachment = new AttachmentBuilder(filePath);
  await channel.send({ content: caption || '', files: [attachment] });
}
```

### Enhancement 3: send_file MCP tool

In `container/agent-runner/src/ipc-mcp-stdio.ts`, add a `send_file` tool after the existing `send_message` tool:

```typescript
server.tool(
  'send_file',
  'Send a file as an attachment to the user or group. Use this for reports, summaries, or any file that should be delivered as a download rather than inline text.',
  {
    file_path: z.string().describe('Absolute path to the file inside the container (e.g., /workspace/group/summaries/report.md)'),
    caption: z.string().optional().describe('Optional message to accompany the file'),
  },
  async (args) => {
    if (!fs.existsSync(args.file_path)) {
      return {
        content: [{ type: 'text' as const, text: `File not found: ${args.file_path}` }],
        isError: true,
      };
    }

    const data: Record<string, string | undefined> = {
      type: 'file',
      chatJid,
      filePath: args.file_path,
      caption: args.caption || undefined,
      groupFolder,
      timestamp: new Date().toISOString(),
    };

    writeIpcFile(MESSAGES_DIR, data);

    return { content: [{ type: 'text' as const, text: 'File sent.' }] };
  },
);
```

### Enhancement 4: File IPC handling in host

In `src/ipc.ts`, add `sendFile` to the `IpcDeps` interface:

```typescript
export interface IpcDeps {
  sendMessage: (jid: string, text: string) => Promise<void>;
  sendFile: (jid: string, filePath: string, caption?: string) => Promise<void>;
  // ... rest of existing deps
}
```

Then, in the message processing section (after `type === 'message'` handling), add file handling:

```typescript
} else if (data.type === 'file' && data.filePath) {
  // Resolve container path → host path.
  const containerPath: string = data.filePath;
  let hostPath: string | null = null;
  if (containerPath.startsWith('/workspace/group/')) {
    hostPath = path.join(
      resolveGroupFolderPath(sourceGroup),
      containerPath.slice('/workspace/group/'.length),
    );
  } else if (containerPath.startsWith('/workspace/global/')) {
    hostPath = path.join(
      GROUPS_DIR,
      'global',
      containerPath.slice('/workspace/global/'.length),
    );
  } else {
    logger.warn(
      { containerPath, sourceGroup },
      'IPC file path outside mounted directories, skipping',
    );
  }

  if (hostPath && fs.existsSync(hostPath)) {
    await deps.sendFile(targetJid, hostPath, data.caption);
    logger.info(
      { chatJid: targetJid, sourceGroup, hostPath },
      'IPC file sent',
    );
  } else if (hostPath) {
    logger.warn(
      { hostPath, containerPath, sourceGroup },
      'IPC file not found on host',
    );
  }
}
```

### Enhancement 5: Wire sendFile into IPC deps

In `src/index.ts`, find where the IPC watcher is started (the `startIpcWatcher` call with its deps object). Add `sendFile` to the deps:

```typescript
sendFile: (jid, filePath, caption) => {
  const channel = findChannel(channels, jid);
  if (!channel) throw new Error(`No channel for JID: ${jid}`);
  if (!channel.sendFile) {
    // Fallback: send caption with file name if channel doesn't support files
    const fallback = caption
      ? `${caption}\n(File: ${filePath})`
      : `(File: ${filePath})`;
    return channel.sendMessage(jid, fallback);
  }
  return channel.sendFile(jid, filePath, caption);
},
```

### Enhancement 6: Dedup fix

In `src/index.ts`, find where `getMessagesSince` is called to fetch pending messages. After the call, add:

```typescript
// If allPending is empty, the agent cursor already covers these
// messages (e.g. recovery already processing them). Skip to avoid
// piping duplicates to an active container.
if (allPending.length === 0) continue;
```

### Enhancement 7: Cache invalidation fix

In `src/container-runner.ts`, find where the agent-runner source is copied to the group session directory. Replace the simple copy with mtime comparison:

```typescript
if (fs.existsSync(agentRunnerSrc)) {
  const cachedIndex = path.join(groupAgentRunnerDir, 'index.ts');
  let needsCopy =
    !fs.existsSync(groupAgentRunnerDir) || !fs.existsSync(cachedIndex);
  if (!needsCopy) {
    const cachedMtime = fs.statSync(cachedIndex).mtimeMs;
    for (const entry of fs.readdirSync(agentRunnerSrc)) {
      const srcFile = path.join(agentRunnerSrc, entry);
      if (
        fs.statSync(srcFile).isFile() &&
        fs.statSync(srcFile).mtimeMs > cachedMtime
      ) {
        needsCopy = true;
        break;
      }
    }
  }
  if (needsCopy) {
    fs.cpSync(agentRunnerSrc, groupAgentRunnerDir, { recursive: true });
  }
}
```

### Validate all enhancements

After applying all enhancements:

```bash
npx tsc --noEmit
npm run build
```

Both must pass cleanly.

## Phase 3: Setup

### Create Discord Bot (if needed)

If the user doesn't have a bot token, tell them:

> I need you to create a Discord bot:
>
> 1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
> 2. Click **New Application** and give it a name (e.g., "AEGIS Assistant")
> 3. Go to the **Bot** tab on the left sidebar
> 4. Click **Reset Token** to generate a new bot token — copy it immediately (you can only see it once)
> 5. Under **Privileged Gateway Intents**, enable:
>    - **Message Content Intent** (required to read message text)
>    - **Server Members Intent** (optional, for member display names)
> 6. Go to **OAuth2** > **URL Generator**:
>    - Scopes: select `bot`
>    - Bot Permissions: select `Send Messages`, `Read Message History`, `View Channels`, `Attach Files`
>    - Copy the generated URL and open it in your browser to invite the bot to your server

Wait for the user to provide the token.

### Configure environment

Add to `.env`:

```bash
DISCORD_BOT_TOKEN=<their-token>
```

Channels auto-enable when their credentials are present — no extra configuration needed.

Sync to container environment:

```bash
mkdir -p data/env && cp .env data/env/env
```

The container reads environment from `data/env/env`, not `.env` directly.

### Build and restart

```bash
npm run build
launchctl kickstart -k gui/$(id -u)/com.aegis
```

## Phase 4: Registration

### Get Channel ID

Tell the user:

> To get the channel ID for registration:
>
> 1. In Discord, go to **User Settings** > **Advanced** > Enable **Developer Mode**
> 2. Right-click the text channel you want the bot to respond in
> 3. Click **Copy Channel ID**
>
> The channel ID will be a long number like `1234567890123456`.

Wait for the user to provide the channel ID (format: `dc:1234567890123456`).

### Register the channel

The channel ID, name, and folder name are needed. Use `npx tsx setup/index.ts --step register` with the appropriate flags.

For a main channel (responds to all messages):

```bash
npx tsx setup/index.ts --step register -- --jid "dc:<channel-id>" --name "<server-name> #<channel-name>" --folder "discord_main" --trigger "@${ASSISTANT_NAME}" --channel discord --no-trigger-required --is-main
```

For additional channels (trigger-only):

```bash
npx tsx setup/index.ts --step register -- --jid "dc:<channel-id>" --name "<server-name> #<channel-name>" --folder "discord_<channel-name>" --trigger "@${ASSISTANT_NAME}" --channel discord
```

## Phase 5: Seed Scheduled Tasks

After successful registration, seed the daily briefing and critical polling tasks using `schedule_task`:

### Daily Briefing (8 AM ET)

```
mcp__nanoclaw__schedule_task({
  prompt: "Run the daily threat intelligence briefing. Steps: 1) Read feeds.yaml for RSS feed URLs. 2) Fetch each feed and filter for items from the last 24 hours. 3) Deduplicate by title similarity. 4) For each unique item, research the topic using /research skill. 5) Generate detection rules using /rule-gen skill. 6) Validate all rules (sigma check, yarac, snort -T). 7) Compile everything into a single briefing report as a markdown file. 8) Send the report via send_file. If no new actionable threat intelligence today, send: 'No new actionable threat intelligence today.'",
  schedule_type: "cron",
  schedule_value: "0 8 * * *",
  timezone: "America/New_York"
})
```

### Critical Issue Polling (Every 2 Hours)

```
mcp__nanoclaw__schedule_task({
  prompt: "Check for critical security issues that need immediate attention. Review the script output for any headlines flagged as critical.",
  schedule_type: "cron",
  schedule_value: "0 */2 * * *",
  timezone: "America/New_York",
  script: "node --input-type=module -e \"\nimport https from 'https';\nconst feeds = ['https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'];\nlet critical = [];\nfor (const url of feeds) {\n  try {\n    const data = await new Promise((resolve, reject) => {\n      https.get(url, {headers: {'User-Agent': 'AEGIS/1.0'}}, (res) => {\n        let body = '';\n        res.on('data', (c) => body += c);\n        res.on('end', () => resolve(body));\n        res.on('error', reject);\n      }).on('error', reject);\n    });\n    const parsed = JSON.parse(data);\n    const vulns = (parsed.vulnerabilities || []).slice(0, 5);\n    for (const v of vulns) {\n      const kev = v.knownRansomwareCampaignUse === 'Known';\n      if (kev) critical.push(v.vulnerabilityName + ' - ' + v.shortDescription);\n    }\n  } catch(e) { /* skip feed errors */ }\n}\nconsole.log(JSON.stringify({wakeAgent: critical.length > 0, data: {headlines: critical}}));\n\""
})
```

## Phase 6: Verify

### Test the connection

Tell the user:

> Send a message in your registered Discord channel:
> - For main channel: Any message works
> - For non-main: @mention the bot in Discord
>
> The bot should respond within a few seconds.

### Check logs if needed

```bash
tail -f logs/aegis.log
```

## Troubleshooting

### Bot not responding

1. Check `DISCORD_BOT_TOKEN` is set in `.env` AND synced to `data/env/env`
2. Check channel is registered: `sqlite3 store/messages.db "SELECT * FROM registered_groups WHERE jid LIKE 'dc:%'"`
3. For non-main channels: message must include trigger pattern (@mention the bot)
4. Service is running: `launchctl list | grep aegis`
5. Verify the bot has been invited to the server (check OAuth2 URL was used)

### Bot only responds to @mentions

This is the default behavior for non-main channels (`requiresTrigger: true`). To change:
- Update the registered group's `requiresTrigger` to `false`
- Or register the channel as the main channel

### Message Content Intent not enabled

If the bot connects but can't read messages, ensure:
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application > **Bot** tab
3. Under **Privileged Gateway Intents**, enable **Message Content Intent**
4. Restart AEGIS

### Getting Channel ID

If you can't copy the channel ID:
- Ensure **Developer Mode** is enabled: User Settings > Advanced > Developer Mode
- Right-click the channel name in the server sidebar > Copy Channel ID

## After Setup

The Discord bot supports:
- Text messages in registered channels
- File attachments via `send_file` MCP tool
- Attachment descriptions (images, videos, files shown as placeholders)
- Reply context (shows who the user is replying to)
- @mention translation (Discord `<@botId>` → AEGIS trigger format)
- Message splitting for responses over 2000 characters
- Typing indicators while the agent processes
- Daily threat intelligence briefings (8 AM ET)
- Critical issue polling (every 2 hours)
