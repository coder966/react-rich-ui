import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// @ts-expect-error no declaration file
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['src'] }), excludeDependenciesFromBundle()],
  build: {
    rollupOptions: {
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
