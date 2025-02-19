import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname, 
    }
  },
})