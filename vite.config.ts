import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5130,
  },
   // Очистка кэша при запуске
  optimizeDeps: {
    force: true, // принудительная оптимизация зависимостей
  },
  build: {
    // Очистка перед сборкой
    emptyOutDir: true,
  },
})
 