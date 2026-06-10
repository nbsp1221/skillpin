# Test Policy

## Durable Test Rule

Committed tests must protect product behavior or a release contract. A retained test must have a concrete failure mode: if the test failed or disappeared, the project could ship a broken CLI behavior, parser contract, import/search behavior, trust boundary, or package artifact.

One-off verification belongs in local evidence, not committed tests. Disposable corpus runs, npm name availability checks, and manual QA transcripts may be recorded under ignored evidence paths such as `.omo/evidence` or `/tmp`, but they must not become `test/**/*.test.ts`.

## Evidence-Only Work

- 100-skill corpus validation is evidence-only. It may use `/tmp/skillrouter-corpus`, public skill sources, and manual top-match judgments, but the corpus and process assertions are not committed tests.
- npm package name availability checks such as `npm view skillrouter` are release evidence only, not regression tests.
- tmux transcripts and local QA logs are evidence only unless they become deterministic product checks run through package scripts.

## Taxonomy

### Unit Tests

| File | Classification | Failure mode / action |
| --- | --- | --- |
| `test/unit/audit.test.ts` | KEEP | Catches regressions in suspicious content and fatal audit reporting. |
| `test/unit/discovery.test.ts` | KEEP | Catches broken `SKILL.md` discovery and generated-folder ignore behavior. |
| `test/unit/frontmatter.test.ts` | KEEP | Catches malformed frontmatter handling and YAML/body parsing regressions. |
| `test/unit/manual-qa.test.ts` | REMOVE | Process-only document string check for disposable QA; does not test product behavior. Follow-up: Task 2. |
| `test/unit/paths.test.ts` | KEEP | Catches `$SKILLROUTER_HOME` and managed path resolution regressions. |
| `test/unit/router-skill.test.ts` | KEEP | Router skill text is a product surface for LLM agents; catches unsupported routing contract changes. |
| `test/unit/scaffold.test.ts` | REPLACE | Command-name-only assertion is lower value than built CLI metadata/e2e checks. Follow-up: Task 2. |
| `test/unit/search-output.test.ts` | KEEP | Catches search result body/content leakage and `why_matched` contract regressions. |
| `test/unit/search.test.ts` | KEEP | Catches ranking, limit, and managed-path propagation regressions. |
| `test/unit/skill.test.ts` | KEEP | Catches required metadata, unsafe names, body, and heading parsing regressions. |

### Integration Tests

| File | Classification | Failure mode / action |
| --- | --- | --- |
| `test/integration/add.test.ts` | KEEP | Catches import, duplicate handling, replacement, bundled file, and no-skill failure regressions. |
| `test/integration/init.test.ts` | KEEP | Catches library initialization and idempotency regressions. |
| `test/integration/managed-scan.test.ts` | KEEP | Catches managed edit reflection and malformed managed skill reporting regressions. |

### E2E Tests

| File | Classification | Failure mode / action |
| --- | --- | --- |
| `test/e2e/cli-artifact.test.ts` | KEEP | Catches missing or invalid built CLI artifact and verifies the visible version surface through `dist/cli.js`. |
| `test/e2e/cli-flow.test.ts` | KEEP | Catches real CLI workflow regressions through the built `dist/cli.js` artifact. |
| `test/e2e/cli-helpers.ts` | KEEP | Centralizes built-artifact validation and executes e2e commands through `dist/cli.js`. |
| `test/e2e/cli-init-add-list-status.test.ts` | KEEP | Catches built CLI regressions for init, add, list, and status workflows. |
| `test/e2e/cli-search.test.ts` | KEEP | Catches built CLI search output, ranking, and managed-path regressions. |
| `test/e2e/cli-unknown.test.ts` | KEEP | Catches built CLI behavior for unsupported commands. |

### Package Scripts

| Script | Classification | Failure mode / action |
| --- | --- | --- |
| `build` | KEEP | Builds the shipped CLI artifact through `tsup`. |
| `dev` | KEEP | Local source-mode development command; not a release/test gate. |
| `skillrouter` | KEEP | Runs the built CLI artifact and exposes the local smoke surface. |
| `test` | KEEP | Builds the shipped CLI artifact before running the full Vitest suite, including e2e tests that execute `dist/cli.js`. |
| `test:e2e` | KEEP | Builds first, then runs e2e tests through the shipped `dist/cli.js` artifact. |
| `test:integration` | KEEP | Runs filesystem integration contracts. |
| `test:package` | KEEP | Validates package contents against the release allowlist. |
| `test:release` | KEEP | Runs the deterministic local release gate without publishing or network name checks. |
| `test:unit` | KEEP | Runs unit contracts after removing process-only tests. |
| `typecheck` | KEEP | Runs TypeScript compile-time checks. |

### Committed Scripts

| File | Classification | Failure mode / action |
| --- | --- | --- |
| `scripts/check-package.mjs` | KEEP | Catches accidental package inclusion of development files and missing release files before publish. |
