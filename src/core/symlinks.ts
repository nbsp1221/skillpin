import { lstat, readdir } from "node:fs/promises";
import { join } from "node:path";

export async function findSymlinks(root: string): Promise<readonly string[]> {
  const links: string[] = [];
  await collectSymlinks(root, links);
  return links.sort();
}

async function collectSymlinks(path: string, links: string[]): Promise<void> {
  const stats = await lstat(path);
  if (stats.isSymbolicLink()) {
    links.push(path);
    return;
  }

  if (!stats.isDirectory()) {
    return;
  }

  const entries = await readdir(path, { withFileTypes: true });
  for (const entry of entries) {
    await collectSymlinks(join(path, entry.name), links);
  }
}
