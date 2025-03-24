import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Enable usage of process.env in your client code for compatibility
    'process.env': {}
  },
  // This ensures our app can work correctly when deployed on Vercel
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})