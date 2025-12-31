import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Membuat alias /api/magma
      "/api/magma": {
        target: "https://magma-api.biz.id",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/magma/, ""),
        timeout: 60000,
      },
    },
  },
});
