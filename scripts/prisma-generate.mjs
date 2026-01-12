import { spawnSync } from "node:child_process";
import { loadEnvFile } from "./load-env.mjs";

loadEnvFile(".env");

const result = spawnSync("npx", ["prisma", "generate"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
