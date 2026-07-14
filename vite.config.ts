import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    cssMinify: true,
    // Single-page site: keep the bundle lean and predictable for Cloudflare Pages.
    assetsInlineLimit: 4096,
  },
})
