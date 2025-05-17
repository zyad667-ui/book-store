import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Remove tailwindcss import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Remove tailwindcss plugin
  ],
  // Add resolve for potential file extension issues
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
})