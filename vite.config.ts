import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['dividers-culinary-unending.ngrok-free.dev'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'ax-arc-prototyping/styles': path.resolve(__dirname, 'node_modules/ax-arc-prototyping/dist/ax-arc-prototyping.css'),
    },
  },
})
