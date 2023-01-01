import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@assets', replacement: resolve(__dirname, '/src/assets') },
      { find: '@components', replacement: resolve(__dirname, '/src/components') },
      { find: '@pages', replacement: resolve(__dirname, '/src/pages') },
      { find: '@styles', replacement: resolve(__dirname, '/src/styles') },
      { find: '@', replacement: resolve(__dirname, '/src') },
    ],
  },
})
