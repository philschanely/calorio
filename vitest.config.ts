import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json"],
      reportsDirectory: "coverage",
      thresholds: {
        // Conservative global minimums to avoid breaking current CI
        lines: 25,
        functions: 50,
        branches: 50,
        statements: 25,
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
