import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content", "posts");

function ensureDir() {
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }
}

function normalizeTag(tag) {
  return String(tag || "").trim().toLowerCase();
}

export function getAllPostsMeta() {
  ensureDir();
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const full = path.join(postsDir, file);
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);

      const title = String(data.title || slug);
      const date = String(data.date || "");
      const tag = normalizeTag(data.tag);
      const excerpt =
        String(data.excerpt || "").trim() ||
        content.replace(/\s+/g, " ").trim().slice(0, 140) + "…";

      return { slug, title, date, tag, excerpt };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByTag(tag) {
  const t = normalizeTag(tag);
  return getAllPostsMeta().filter((p) => p.tag === t);
}

export async function getPostBySlug(slug) {
  ensureDir();
  const full = path.join(postsDir, `${slug}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: String(data.title || slug),
    date: String(data.date || ""),
    tag: normalizeTag(data.tag),
    excerpt: String(data.excerpt || ""),
    contentHtml,
  };
}

export function getAllSlugs() {
  return getAllPostsMeta().map((p) => p.slug);
}
