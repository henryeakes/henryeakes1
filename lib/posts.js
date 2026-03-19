import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "app/articles");

export function getAllSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data,
    content,
  };
}

export function getAllPosts() {
  const slugs = getAllSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function markdownToHtml(markdown) {
  return markdown
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/^\- (.*$)/gim, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(.*)$/gim, (match) => {
      if (
        match.startsWith("<h2>") ||
        match.startsWith("<h3>") ||
        match.startsWith("<ul>") ||
        match.startsWith("<li>") ||
        match.trim() === ""
      ) {
        return match;
      }
      return match;
    });
}
