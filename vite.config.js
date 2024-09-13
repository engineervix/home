import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: process.env.NODE_ENV === 'development' ? 'index.html' : false,
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
})
