import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // maplibre-gl is ~1 MB and only loaded lazily with the map section.
  build: { chunkSizeWarningLimit: 1200 },
})
