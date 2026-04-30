import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(rootDir, "../..");

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true
  },
  resolve: {
    alias: {
      "@vivido/ui": resolve(workspaceRoot, "packages/ui/src/index.ts"),
      "@vivido/ui/styles.css": resolve(workspaceRoot, "packages/ui/src/styles.css"),
      "@vivido/ipc": resolve(workspaceRoot, "packages/ipc/src/index.ts"),
      "@vivido/project": resolve(workspaceRoot, "packages/project/src/index.ts"),
      "@vivido/style-model": resolve(workspaceRoot, "packages/style-model/src/index.ts")
    }
  },
  build: {
    outDir: "dist-renderer"
  }
});
