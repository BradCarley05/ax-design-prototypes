import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['dividers-culinary-unending.ngrok-free.dev'],
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
