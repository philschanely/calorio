import { spawnSync } from "node:child_process";
import { loadEnvFile } from "./load-env.mjs";

loadEnvFile(".env");

const [, , command, ...args] = process.argv;
if (!command) {
  console.error("Usage: node scripts/run-with-env.mjs <command> [...args]");
  process.exit(1);
}

const result = spawnSync(command, args, {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
