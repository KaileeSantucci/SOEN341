
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // ✅ critical for DOM-based tests
    globals: true,         // optional: allows using `test`, `expect`, etc. without importing
    // setupFiles: './tests/setup.js' // optional if you want a centralized setup
  },
});
