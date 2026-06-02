import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// Project Pages lives at https://sheedosa.github.io/marq-website/ (base in build),
// but dev/preview serve from root so the local preview works at localhost:4317.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/marq-website/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
}));
