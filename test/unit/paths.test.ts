import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { resolveSkillpinPaths } from "../../src/core/paths.js";

describe("skillpin paths", () => {
  it("resolves SKILLPIN_HOME before default home", () => {
    const paths = resolveSkillpinPaths({
      env: { SKILLPIN_HOME: "/tmp/skillpin-test-home" },
      homeDir: "/home/example",
    });

    expect(paths.home).toBe("/tmp/skillpin-test-home");
    expect(paths.skillsDir).toBe("/tmp/skillpin-test-home/skills");
  });

  it("builds managed paths without treating sidecar as authority", () => {
    const paths = resolveSkillpinPaths({
      env: { SKILLPIN_HOME: "/tmp/skillpin-test-home" },
      homeDir: "/home/example",
    });

    expect(paths.skillDir("react-performance-review")).toBe(
      join("/tmp/skillpin-test-home", "skills", "react-performance-review"),
    );
    expect(paths.skillFile("react-performance-review")).toBe(
      join("/tmp/skillpin-test-home", "skills", "react-performance-review", "SKILL.md"),
    );
    expect(paths.sidecarFile("react-performance-review")).toBe(
      join("/tmp/skillpin-test-home", "skills", "react-performance-review", ".skillpin.json"),
    );
  });
});
