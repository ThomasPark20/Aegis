# Updating AEGIS

## Pull Latest Changes

```bash
cd aegis
git pull
npm install
npm run build
```

Restart the service if running:
```bash
launchctl kickstart -k gui/$(id -u)/com.aegis
```

## Syncing NanoClaw Upstream

AEGIS is built on NanoClaw. To pull useful upstream changes:

```bash
git fetch upstream
git log upstream/main --oneline -20   # see what's new
git cherry-pick <commit>              # pick specific commits
```

Or merge everything (may require conflict resolution):
```bash
git merge upstream/main
```

The `upstream` remote is configured during setup. If it's missing:
```bash
git remote add upstream https://github.com/qwibitai/nanoclaw.git
```
