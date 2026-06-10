# Release QA

## Deterministic Local Gate

Run the deterministic release gate before considering a local release candidate:

```bash
pnpm test:release
```

This command is local-only. It typechecks, runs the durable test suite, runs e2e through the built CLI artifact, validates package contents with `npm pack --dry-run --json`, and runs a built CLI version smoke.

It must not publish and must not query npm package name availability.

## Evidence-Only Manual QA

The 100-skill corpus flow is evidence-only. It validates search usefulness against a large temporary corpus, but it is not a committed regression test because the corpus contents, public-source availability, and relevance judgments are release evidence rather than stable unit contracts.

Use `/tmp` for the corpus and home:

```bash
export SKILLROUTER_HOME="$(mktemp -d /tmp/skillrouter-home.XXXXXX)"
export SKILLROUTER_CORPUS="/tmp/skillrouter-corpus"
pnpm build
node dist/cli.js init --json
node dist/cli.js add "$SKILLROUTER_CORPUS" --json
node dist/cli.js status --json
node dist/cli.js search "react performance review" --json
```

Record evidence outside committed tests, for example under `.omo/evidence` or `/tmp`. Do not commit the corpus.
