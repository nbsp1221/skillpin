import { homedir } from "node:os";
import { join, resolve } from "node:path";

export interface ResolvePathsOptions {
  readonly env?: NodeJS.ProcessEnv;
  readonly homeDir?: string;
}

export interface SkillcasePaths {
  readonly home: string;
  readonly skillsDir: string;
  readonly skillDir: (name: string) => string;
  readonly skillFile: (name: string) => string;
  readonly sidecarFile: (name: string) => string;
}

export function resolveSkillcasePaths(options: ResolvePathsOptions = {}): SkillcasePaths {
  const env = options.env ?? process.env;
  const baseHome = options.homeDir ?? homedir();
  const configuredHome = env["SKILLCASE_HOME"]?.trim();
  const home = resolve(configuredHome && configuredHome.length > 0 ? configuredHome : join(baseHome, ".skillcase"));
  const skillsDir = join(home, "skills");

  return {
    home,
    skillsDir,
    skillDir: (name: string) => join(skillsDir, name),
    skillFile: (name: string) => join(skillsDir, name, "SKILL.md"),
    sidecarFile: (name: string) => join(skillsDir, name, ".skillcase.json"),
  };
}
