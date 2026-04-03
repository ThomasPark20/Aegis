/**
 * Step: seed-tasks — Create default scheduled tasks (RSS scan, daily report).
 *
 * Usage:
 *   npx tsx setup/index.ts --step seed-tasks -- --jid "dc:123" [--daily-cron "0 9 * * *"] [--no-rss] [--no-daily]
 */
import { CronExpressionParser } from 'cron-parser';

import { TIMEZONE } from '../src/config.ts';
import { createTask, getTaskById, initDatabase } from '../src/db.ts';
import { logger } from '../src/logger.ts';
import { emitStatus } from './status.ts';

interface SeedArgs {
  jid: string;
  dailyCron: string;
  noRss: boolean;
  noDaily: boolean;
}

function parseArgs(args: string[]): SeedArgs {
  const result: SeedArgs = {
    jid: '',
    dailyCron: '0 8 * * *',
    noRss: false,
    noDaily: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--jid':
        result.jid = args[++i] || '';
        break;
      case '--daily-cron':
        result.dailyCron = args[++i] || '0 8 * * *';
        break;
      case '--no-rss':
        result.noRss = true;
        break;
      case '--no-daily':
        result.noDaily = true;
        break;
    }
  }

  return result;
}

export async function run(args: string[]): Promise<void> {
  const parsed = parseArgs(args);

  if (!parsed.jid) {
    emitStatus('SEED_TASKS', {
      STATUS: 'failed',
      ERROR: 'missing_jid',
    });
    process.exit(4);
  }

  initDatabase();

  const seeded: string[] = [];

  // RSS scan task
  if (!parsed.noRss) {
    const existing = getTaskById('rss-scan');
    if (existing) {
      logger.info('RSS scan task already exists, skipping');
    } else {
      const interval = CronExpressionParser.parse('0 */2 * * *', {
        tz: TIMEZONE,
      });
      createTask({
        id: 'rss-scan',
        group_folder: 'discord_main',
        chat_jid: parsed.jid,
        prompt:
          'Process the RSS scan results. The script detected new articles from CTI feeds. For each critical topic group: dedup against existing summaries, then dispatch a start_research_thread IPC task with threadName "Critical: [Topic Name]". For non-critical new articles: save to investigation.md for daily compilation. NEVER post full results inline — use threads for critical items.',
        script: 'node /workspace/project/container/skills/rss-scan/scan.mjs',
        schedule_type: 'cron',
        schedule_value: '0 */2 * * *',
        context_mode: 'isolated',
        next_run: interval.next().toISOString(),
        status: 'active',
        created_at: new Date().toISOString(),
      });
      seeded.push('rss-scan');
      logger.info('Created RSS scan task (every 2 hours)');
    }
  }

  // Daily report task
  if (!parsed.noDaily) {
    const existing = getTaskById('daily-report');
    if (existing) {
      logger.info('Daily report task already exists, skipping');
    } else {
      const interval = CronExpressionParser.parse(parsed.dailyCron, {
        tz: TIMEZONE,
      });
      createTask({
        id: 'daily-report',
        group_folder: 'discord_main',
        chat_jid: parsed.jid,
        prompt:
          'Compile and deliver the daily CTI briefing. Read all summaries from ../global/summaries/ with today\'s date prefix. Create an executive summary with the top 3-5 items, full topic summaries, and an IOC table if applicable. Save the compiled report to ../global/summaries/daily/ with today\'s date. Then create a new thread to deliver it: write a start_research_thread IPC task with threadName "Daily Brief — YYYY-MM-DD", post the executive summary bullets as the opening message, and attach the full report as an .md file. If no new summaries exist for today, send: "No significant threat activity in the last 24 hours."',
        schedule_type: 'cron',
        schedule_value: parsed.dailyCron,
        context_mode: 'isolated',
        next_run: interval.next().toISOString(),
        status: 'active',
        created_at: new Date().toISOString(),
      });
      seeded.push('daily-report');
      logger.info(
        { cron: parsed.dailyCron, tz: TIMEZONE },
        'Created daily report task',
      );
    }
  }

  emitStatus('SEED_TASKS', {
    SEEDED: seeded.join(',') || 'none',
    RSS_SCAN: parsed.noRss ? 'skipped' : 'active',
    DAILY_REPORT: parsed.noDaily ? 'skipped' : 'active',
    DAILY_CRON: parsed.dailyCron,
    TIMEZONE,
    STATUS: 'success',
  });
}
