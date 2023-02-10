import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://platform.fatsecret.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
    },
  },
  resolve: {
    alias: [
      { find: '@api', replacement: '/src/api' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@store', replacement: '/src/store' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@layout', replacement: '/src/layout' },
      { find: '@', replacement: '/src' },
    ],
  },
})
