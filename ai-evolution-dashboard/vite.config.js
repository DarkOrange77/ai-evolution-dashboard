import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['react-globe.gl']
  },
  resolve: {
    alias: {}
  },
  build: {
    rollupOptions: {
      external: [],
    }
  },
  ssr: {
    noExternal: []
  }
})