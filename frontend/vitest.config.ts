import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    css: true,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
      include: ["src/lib/projects/**/*"],
      exclude: ["src/lib/projects/__tests__/**/*"],
    },
  },
});
