import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { markdownPagesPlugin } from "./markdown-plugin.js";

const pagesDir = path.resolve(import.meta.dirname, "src/pages");

// Recursively find all index.html files for nested nice URLs
function getHtmlInputs(dir, base = "") {
 let inputs = {};
 if (!fs.existsSync(dir)) return inputs;

 const list = fs.readdirSync(dir);
 list.forEach((file) => {
  const filePath = path.join(dir, file);
  const stat = fs.statSync(filePath);

  if (stat && stat.isDirectory()) {
   const subInputs = getHtmlInputs(filePath, path.join(base, file));
   inputs = { ...inputs, ...subInputs };
  } else if (file === "index.html") {
   const name = base === "" ? "index" : base;
   inputs[name] = filePath;
  }
 });
 return inputs;
}

const input = getHtmlInputs(pagesDir);

export default defineConfig({
 root: "src/pages",
 publicDir: "../../public",
 plugins: [tailwindcss(), markdownPagesPlugin()],
 build: {
  outDir: "../../dist",
  emptyOutDir: true,
  rollupOptions: {
   input:
    Object.keys(input).length > 0
     ? input
     : { index: path.join(pagesDir, "index.html") },
  },
 },
 server: {
  port: 3000,
  open: true,
 },
});
