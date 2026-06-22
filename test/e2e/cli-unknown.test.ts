import { beforeAll, describe, expect, it } from "vitest";

import { buildCli, makeCliHome, runSkillpin } from "./cli-helpers.js";

beforeAll(async () => {
  await buildCli();
});

describe("skillpin CLI unavailable commands", () => {
  it("read command is unavailable", async () => {
    const result = await runSkillpin(["read", "react-performance-review"], makeCliHome("skillpin-cli-read"));

    expect(result.exitCode).not.toBe(0);
    expect(`${result.stdout}\n${result.stderr}`).toContain("unknown command");
  });
});
