import { beforeAll, describe, expect, it } from "vitest";

import { buildCli, makeCliHome, runSkillcase } from "./cli-helpers.js";

beforeAll(async () => {
  await buildCli();
});

describe("skillcase CLI unavailable commands", () => {
  it("read command is unavailable", async () => {
    const result = await runSkillcase(["read", "react-performance-review"], makeCliHome("skillcase-cli-read"));

    expect(result.exitCode).not.toBe(0);
    expect(`${result.stdout}\n${result.stderr}`).toContain("unknown command");
  });
});
