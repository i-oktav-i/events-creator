import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import postcssNested from "postcss-nested";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postcssNested],
    },
  },
});
