import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    'process.env': {
      VITE_API_KEY: 'http://52.79.201.20:8080/',
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