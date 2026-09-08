import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://my911webservice.runasp.net',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
