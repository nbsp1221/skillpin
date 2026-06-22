# skillpin

Pin trusted AI agent skills from GitHub or local folders.

skillpin is a trusted dependency manager for AI agent skills. It lets you register, pin, audit, and route skills from local directories or GitHub repositories, so agents use only approved skill versions instead of arbitrary instructions discovered at runtime.

AI agent skills are reusable workflow dependencies. Like code dependencies, they need provenance, version pinning, review, and repeatable installation. skillpin gives you a local trust boundary for managing those skills before exposing them to Codex, Claude Code, Cursor, or other agent runtimes.

## Status

Early PoC. The current implementation imports local skill directories and routes agents through the managed library. GitHub source pinning and lockfile workflows are the next product direction.

## Install

```bash
npm install -g skillpin
```

## Usage

```bash
skillpin init
skillpin add ./path/to/skill-or-skill-library
skillpin search "review this React component for render performance" --json
```

The managed library stores reviewed `SKILL.md` directories and exposes stable JSON output for agent workflows. Search results return managed file paths, so agents can load selected skill instructions directly from the filesystem.
