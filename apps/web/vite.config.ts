import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(rootDir, "../..");

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true
  },
  resolve: {
    alias: {
      "@vivido/ui": resolve(workspaceRoot, "packages/ui/src/index.ts"),
      "@vivido/ui/styles.css": resolve(workspaceRoot, "packages/ui/src/styles.css")
    }
  }
});
