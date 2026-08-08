import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
   build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('recharts') ||
            id.includes('d3-') ||
            id.includes('victory-vendor')
          ) {
            return 'recharts-vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['recharts'],
  },
  plugins: [react(), tailwindcss()],
})
