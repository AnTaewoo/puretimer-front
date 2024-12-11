import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "http://127.0.0.1:8080/", //process.env.VITE_API_URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // path
      },
    },
  },
  optimizeDeps: {
    include: ['crypto-js']
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});