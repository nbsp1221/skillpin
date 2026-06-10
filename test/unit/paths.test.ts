import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { resolveSkillcasePaths } from "../../src/core/paths.js";

describe("skillcase paths", () => {
  it("resolves SKILLCASE_HOME before default home", () => {
    const paths = resolveSkillcasePaths({
      env: { SKILLCASE_HOME: "/tmp/skillcase-test-home" },
      homeDir: "/home/example",
    });

    expect(paths.home).toBe("/tmp/skillcase-test-home");
    expect(paths.skillsDir).toBe("/tmp/skillcase-test-home/skills");
  });

  it("builds managed paths without treating sidecar as authority", () => {
    const paths = resolveSkillcasePaths({
      env: { SKILLCASE_HOME: "/tmp/skillcase-test-home" },
      homeDir: "/home/example",
    });

    expect(paths.skillDir("react-performance-review")).toBe(
      join("/tmp/skillcase-test-home", "skills", "react-performance-review"),
    );
    expect(paths.skillFile("react-performance-review")).toBe(
      join("/tmp/skillcase-test-home", "skills", "react-performance-review", "SKILL.md"),
    );
    expect(paths.sidecarFile("react-performance-review")).toBe(
      join("/tmp/skillcase-test-home", "skills", "react-performance-review", ".skillcase.json"),
    );
  });
});
