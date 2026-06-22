import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export interface CliRunResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

export function makeCliHome(prefix: string): string {
  return join(tmpdir(), `${prefix}-${randomUUID()}`);
}

export async function cleanupCliHome(home: string): Promise<void> {
  await rm(home, { recursive: true, force: true });
}

export async function buildCli(): Promise<void> {
  try {
    const artifact = await readFile("dist/cli.js", "utf8");
    if (!artifact.startsWith("#!/usr/bin/env node")) {
      throw new Error("Built CLI artifact is missing the node shebang.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Built CLI artifact is unavailable. Run pnpm build before e2e tests.\n${error.message}`);
    }
    throw error;
  }
}

export function runSkillpin(args: readonly string[], home: string): Promise<CliRunResult> {
  return runProcess("node", ["dist/cli.js", ...args], { SKILLPIN_HOME: home });
}

function runProcess(command: string, args: readonly string[], env: Readonly<Record<string, string>>): Promise<CliRunResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      env: { ...process.env, ...env },
    });
    let stdout = "";
    let stderr = "";

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      resolve({
        stdout,
        stderr,
        exitCode: code ?? -1,
      });
    });
  });
}
