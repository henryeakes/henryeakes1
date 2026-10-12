import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formatDate, normalizeKey, plainText, readingTime } from "./format";
import { findSection } from "./site";

const postsDirectory = path.join(process.cwd(), "app/articles");

function asDateString(value) {
  if (!value) return "";
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

function asTags(value) {
  if (Array.isArray(value)) return value.map((tag) => String(tag).trim()).filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function categoryLabel(category, tags) {
  if (category) return String(category);
  if (tags.length) {
    const section = findSection(tags[0]);
    if (section) return section.title;
    return String(tags[0]);
  }
  return "Story";
}

export function getAllSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getPostBySlug(slug) {
  if (!slug || slug.includes("/") || slug.includes("\\") || slug.includes("..")) return null;
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const tags = asTags(data.tags);
  const date = asDateString(data.date);

  return {
    slug,
    title: data.title || slug,
    date,
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "",
    category: categoryLabel(data.category, tags),
    tags,
    author: data.author || "Henry Eakes",
    content,
    readingTime: readingTime(content),
  };
}

export function getAllPosts() {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => {
      const left = new Date(`${a.date}T00:00:00`).getTime() || 0;
      const right = new Date(`${b.date}T00:00:00`).getTime() || 0;
      return right - left;
    });
}

export function getPostsForSection(tag) {
  const section = findSection(tag);
  const keys = section ? section.tags : [normalizeKey(tag)].filter(Boolean);

  return getAllPosts().filter((post) => {
    const postKeys = [normalizeKey(post.category), ...post.tags.map(normalizeKey)];
    return postKeys.some((key) => keys.includes(key));
  });
}

export function getSearchIndex() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
    author: post.author,
    readingTime: post.readingTime,
    haystack: [post.title, post.excerpt, post.category, post.tags.join(" "), plainText(post.content)]
      .join(" ")
      .toLowerCase(),
  }));
}

export function formattedDate(value) {
  return formatDate(value);
}
