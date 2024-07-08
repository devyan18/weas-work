import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import path from "node:path";

// https://vitejs.dev/config/

console.log("\n", path.resolve(__dirname, "./src"));

export default defineConfig({
  plugins: [react(), tsconfigPaths(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@icons": path.resolve(__dirname, "./src/components/icons"),
      "@layouts": path.resolve(__dirname, "./src/components/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
});
