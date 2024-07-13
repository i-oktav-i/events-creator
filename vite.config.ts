import { join } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  base: "/events-creator/",
  resolve: {
    alias: {
      "@components": join(import.meta.dirname, "src/components/"),
      "@theme": join(import.meta.dirname, "src/theme"),
      "@shared": join(import.meta.dirname, "src/shared/"),
    },
  },
});
