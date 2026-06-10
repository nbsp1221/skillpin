import { lstat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { glob } from "tinyglobby";

const ignoredDirectories = [
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  "tmp",
  "temp",
  ".cache",
  "cache",
] as const;

export async function discoverSkillFiles(candidatePath: string): Promise<readonly string[]> {
  const root = resolve(candidatePath);

  if (await isFile(root)) {
    return root.endsWith("/SKILL.md") ? [root] : [];
  }

  const directSkillFile = join(root, "SKILL.md");
  if (await isFile(directSkillFile)) {
    return [directSkillFile];
  }

  const files = await glob("**/SKILL.md", {
    absolute: true,
    cwd: root,
    ignore: ignoredDirectories.map((directory) => `**/${directory}/**`),
    onlyFiles: true,
  });

  const regularFiles = await Promise.all(files.map(async (file) => ((await isFile(file)) ? file : null)));
  return regularFiles.filter((file) => file !== null).sort();
}

async function isFile(path: string): Promise<boolean> {
  try {
    const stats = await lstat(path);
    return stats.isFile();
  } catch (error: unknown) {
    if (hasFileSystemCode(error, "ENOENT")) {
      return false;
    }
    throw error;
  }
}

function hasFileSystemCode(error: unknown, code: string): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === code;
}
