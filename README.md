# skillcase

Local trusted Agent Skill routing for LLM agents.

skillcase lets an agent import reviewed local `SKILL.md` directories into a managed library, search only that trusted library, and read selected managed skills directly from the filesystem.

## Status

Early PoC. The package is local-first and currently targets Codex workflows.

## Install

```bash
npm install -g skillcase
```

## Usage

```bash
skillcase init
skillcase add ./path/to/skill-or-skill-library
skillcase search "review this React component for render performance" --json
```

skillcase does not search the internet or fetch public skills. External discovery is the agent's responsibility; skillcase starts at trusted local import.
