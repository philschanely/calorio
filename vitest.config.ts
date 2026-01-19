import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      exclude: [
        ".next",
        "scripts/**",
        "src/app/**",
        "**/index.{ts,tsx}",
        "**/mock/**",
        "**/*.client.{ts,tsx}",
        "**/*.config.{js,ts,tsx}",
        "**/*.d.ts",
        "**/*.mjs",
        "**/*.mock.{ts,tsx}",
        "**/*.server.{ts,tsx}",
        "**/*.styles.ts",
        "**/*.test.{ts,tsx}",
        "**/*.types.ts",
      ],
      provider: "v8",
      reporter: ["text", "lcov", "json"],
      reportsDirectory: "coverage",
      thresholds: {
        // Conservative global minimums to avoid breaking current CI
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
        perFile: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
