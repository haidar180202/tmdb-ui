import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.hook.ts', 'src/**/*.api.ts'],
      exclude: [
        'src/**/*.test.{ts,tsx}', 
        'src/test/setup.ts', 
        'src/main.tsx', 
        'src/types/*',
        '**/*.d.ts'
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90
      }
    },
  },
})
