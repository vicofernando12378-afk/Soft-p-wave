import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        'wave-stack-geo-latam-2026': resolve(__dirname, 'blog/posts/wave-stack-geo-latam-2026.html'),
        'retorno-inversion-ia-medible': resolve(__dirname, 'blog/posts/retorno-inversion-ia-medible.html'),
        'por-que-fallan-erps-genericos': resolve(__dirname, 'blog/posts/por-que-fallan-erps-genericos.html'),
        'growth-marketing-geo-sintonia-peru': resolve(__dirname, 'blog/posts/growth-marketing-geo-sintonia-peru.html'),
        'china-sourcing-dropshipping-ia-2026': resolve(__dirname, 'blog/posts/china-sourcing-dropshipping-ia-2026.html'),
      }
    }
  }
});
