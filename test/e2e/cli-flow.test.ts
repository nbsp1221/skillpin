import { readFile, readdir } from "node:fs/promises";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

import { buildCli, cleanupCliHome, makeCliHome, runSkillpin } from "./cli-helpers.js";

const homes: string[] = [];

async function makeTrackedHome(): Promise<string> {
  const home = makeCliHome("skillpin-cli-flow");
  homes.push(home);
  return home;
}

beforeAll(async () => {
  await buildCli();
});

afterEach(async () => {
  await Promise.all(homes.splice(0).map((home) => cleanupCliHome(home)));
});

describe("skillpin CLI flow", () => {
  it("init add search read managed path through shell", async () => {
    const home = await makeTrackedHome();

    const init = await runSkillpin(["init", "--json"], home);
    const add = await runSkillpin(["add", "test/fixtures/skills/search-library", "--json"], home);
    const search = await runSkillpin(["search", "react rerender performance", "--json"], home);
    const managedPath = JSON.parse(search.stdout).matches[0].managed_path;

    expect(init.exitCode).toBe(0);
    expect(add.exitCode).toBe(0);
    expect(search.exitCode).toBe(0);
    await expect(readFile(managedPath, "utf8")).resolves.toContain("react-performance-review");
  });

  it("duplicate import leaves no partial managed import", async () => {
    const home = await makeTrackedHome();

    const init = await runSkillpin(["init", "--json"], home);
    const add = await runSkillpin(["add", "test/fixtures/skills/duplicate-library", "--json"], home);

    expect(init.exitCode).toBe(0);
    expect(add.exitCode).not.toBe(0);
    expect(JSON.parse(add.stdout)).toMatchObject({
      ok: false,
      imported: 0,
      skills: [],
    });
    await expect(readdir(`${home}/skills`)).resolves.toEqual([]);
  });
});
