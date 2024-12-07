import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  server: {
    proxy: {
      // 모든 경로를 백엔드로 프록시
      '/': {
        target: process.env.VITE_API_URL, // 백엔드 URL 설정
        changeOrigin: true,
        rewrite: (path) => path, // 경로를 그대로 유지
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