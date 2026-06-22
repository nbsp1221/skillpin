---
name: skillpin
description: Use when an AI agent should route a task through trusted AI agent skills managed by skillpin before doing specialized work.
---
# skillpin

Before doing specialized work, search the trusted skillpin library:

```bash
skillpin search "<task>" --json
```

Use the user's request as `<task>`. Prefer JSON output so the result can be parsed reliably.

If the user explicitly asks to use skillpin, search is mandatory.

Compare the top matches by `name`, `description`, `score`, and `why_matched`. Select a skill only when the match clearly applies to the current task.

If a match is selected, open the returned `managed_path` and follow that skill's instructions. The `managed_path` points to the managed `SKILL.md` file.

If no match is strong enough, continue normally without loading a routed skill.
