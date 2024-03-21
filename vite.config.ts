import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['src'], exclude: ['src/__tests__/**'] })],
  build: {
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      formats: ['es'],
    },
  },
});
