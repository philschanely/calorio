import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

export function loadEnvFile(envPath = ".env") {
  const resolved = resolve(process.cwd(), envPath);
  if (!existsSync(resolved)) return {};

  const content = readFileSync(resolved, "utf8");
  const entries = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) process.env[key] = value;
    entries[key] = value;
  }

  return entries;
}
