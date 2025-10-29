import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite' // Make sure this is imported

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss() // ✅ ADD THIS LINE - This is the main fix!
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})