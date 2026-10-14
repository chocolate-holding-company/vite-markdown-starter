import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Handlebars from "handlebars";

export function markdownPagesPlugin() {
 const contentDir = path.resolve(import.meta.dirname, "content");
 const outputDir = path.resolve(import.meta.dirname, "src/pages");
 const layoutPath = path.resolve(
  import.meta.dirname,
  "src/templates/layout.hbs",
 );
 const partialsDir = path.resolve(
  import.meta.dirname,
  "src/templates/partials",
 );

 function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString("en-GB", {
   day: "numeric",
   month: "long",
   year: "numeric",
  });
 }

 function compilePages() {
  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  if (fs.existsSync(partialsDir)) {
   const partialFiles = fs
    .readdirSync(partialsDir)
    .filter((file) => file.endsWith(".hbs"));
   partialFiles.forEach((file) => {
    const partialName = file.replace(/\.hbs$/, "");
    const partialContent = fs.readFileSync(
     path.join(partialsDir, file),
     "utf-8",
    );
    Handlebars.registerPartial(partialName, partialContent);
   });
  }

  if (!fs.existsSync(layoutPath)) return;
  const layoutSource = fs.readFileSync(layoutPath, "utf-8");
  const layoutTemplate = Handlebars.compile(layoutSource);

  const files = fs
   .readdirSync(contentDir)
   .filter((file) => file.endsWith(".md"));

  if (files.length === 0) {
   fs.writeFileSync(
    path.join(contentDir, "index.md"),
    "---\ntitle: Home\n---\n# Welcome\nEdit this file!",
   );
   files.push("index.md");
  }

  const posts = [];
  const tagSet = new Set(); // 👈 Track unique tags globally

  files.forEach((file) => {
   const slug = file.replace(/\.md$/, "");
   if (slug === "index") return;

   const filePath = path.join(contentDir, file);
   const fileContent = fs.readFileSync(filePath, "utf-8");
   const { data } = matter(fileContent);

   if (data.type === "post") {
    // Collect unique tags
    if (data.tags && Array.isArray(data.tags)) {
     data.tags.forEach((tag) => tagSet.add(tag));
    }

    posts.push({
     slug: `/${slug}/`,
     title: data.title || "Untitled",
     date: data.date || "",
     formattedDate: formatDate(data.date),
     description: data.description || "",
     image: data.image || "/javascript.svg",
     link: data.link || "",
     tagsString: data.tags ? data.tags.join(",").toLowerCase() : "", // 👈 Helper for filtering
     ...data,
    });
   }
  });

  posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  const allTags = Array.from(tagSet).sort(); // 👈 Sorted unique tags array

  files.forEach((file) => {
   const filePath = path.join(contentDir, file);
   const fileContent = fs.readFileSync(filePath, "utf-8");

   const { data, content } = matter(fileContent);

   const pageData = {
    title: data.title || "Website",
    ...data,
    formattedDate: formatDate(data.date),
    posts,
    allTags, // 👈 Pass unique tags to templates
   };

   const preCompiledMarkdown = Handlebars.compile(content)(pageData);
   const htmlBody = marked.parse(preCompiledMarkdown);

   const finalHtml = layoutTemplate({
    ...pageData,
    content: htmlBody,
   });

   const slug = file.replace(/\.md$/, "");
   let targetFile;

   if (slug === "index") {
    targetFile = path.join(outputDir, "index.html");
   } else {
    const folderPath = path.join(outputDir, slug);
    if (!fs.existsSync(folderPath)) {
     fs.mkdirSync(folderPath, { recursive: true });
    }
    targetFile = path.join(folderPath, "index.html");
   }

   fs.writeFileSync(targetFile, finalHtml);
  });
  console.log("📄 Tag filtering data compiled successfully");
 }

 return {
  name: "markdown-pages-plugin",
  buildStart() {
   compilePages();
  },
  configureServer(server) {
   server.watcher.add(path.resolve(import.meta.dirname, "content"));
   server.watcher.add(path.resolve(import.meta.dirname, "src/templates"));

   server.watcher.on("change", (filePath) => {
    if (filePath.includes("content") || filePath.includes("src/templates")) {
     compilePages();
     server.ws.send({ type: "full-reload" });
    }
   });
  },
 };
}
