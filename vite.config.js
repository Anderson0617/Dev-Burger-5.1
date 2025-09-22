import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Dev-Burger-5.1/',
  build: {
    outDir: 'docs',
  },
})
