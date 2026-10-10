import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Handlebars from 'handlebars';

const contentDir = path.resolve('content');
const outputDir = path.resolve('src/pages'); // Vite will read pages from here
const templateSource = fs.readFileSync(path.resolve('src/templates/layout.hbs'), 'utf-8');
const template = Handlebars.compile(templateSource);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all markdown files
const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(contentDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Parse frontmatter and markdown content
  const { data, content } = matter(fileContent);
  const htmlBody = marked.parse(content);

  // Combine into template context
  const pageData = {
    ...data,
    content: htmlBody
  };

  const finalHtml = template(pageData);

  // Output as .html file
  const outputFileName = file.replace(/\.md$/, '.html');
  fs.writeFileSync(path.join(outputDir, outputFileName), finalHtml);
  console.log(`Compiled: ${file} -> ${outputFileName}`);
});