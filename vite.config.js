import { resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';

// Dynamically discover all generated HTML pages
const pagesDir = resolve(__dirname, 'src/pages');
const htmlFiles = fs.existsSync(pagesDir) 
  ? fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'))
  : ['index.html'];

const input = {};
htmlFiles.forEach(file => {
  const name = file.replace(/\.html$/, '');
  input[name] = resolve(pagesDir, file);
});

export default defineConfig({
  root: 'src/pages',
  publicDir: '../../public',
  plugins: [tailwindcss()],
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: input.index ? input : { index: resolve(__dirname, 'src/pages/index.html') }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});