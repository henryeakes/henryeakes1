import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { publicSrc } from "./format";
import { SITE } from "./site";

const episodesDirectory = path.join(process.cwd(), "content/episodes");

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

export function resolveAudioSrc(audio) {
  const value = String(audio || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  const withSlash = value.startsWith("/") ? value : `/${value}`;
  return publicSrc(withSlash);
}

export function absoluteAudioUrl(audio) {
  const src = resolveAudioSrc(audio);
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE.url}${src}`;
}

export function audioMime(audio) {
  const clean = absoluteAudioUrl(audio).split("?")[0].toLowerCase();
  if (clean.endsWith(".m4a") || clean.endsWith(".mp4")) return "audio/mp4";
  if (clean.endsWith(".wav")) return "audio/wav";
  if (clean.endsWith(".ogg") || clean.endsWith(".oga")) return "audio/ogg";
  if (clean.endsWith(".aac")) return "audio/aac";
  return "audio/mpeg";
}

function localAudioBytes(audio) {
  const src = resolveAudioSrc(audio);
  if (!src || /^https?:\/\//i.test(src)) return 0;
  let relative = src;
  try {
    relative = decodeURIComponent(src);
  } catch {
    return 0;
  }
  relative = relative.replace(/^\/+/, "");
  if (!relative || relative.includes("..")) return 0;
  const root = path.join(process.cwd(), "public");
  const full = path.resolve(root, relative);
  if (!full.startsWith(root + path.sep) && full !== root) return 0;
  if (!fs.existsSync(full)) return 0;
  const stat = fs.statSync(full);
  return stat.isFile() ? stat.size : 0;
}

export function getAllEpisodeSlugs() {
  if (!fs.existsSync(episodesDirectory)) return [];
  return fs
    .readdirSync(episodesDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getEpisodeBySlug(slug) {
  if (!slug || slug.includes("/") || slug.includes("\\") || slug.includes("..")) return null;
  const fullPath = path.join(episodesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const audio = String(data.audio || "").trim();

  return {
    slug,
    title: data.title || slug,
    date: asDateString(data.date),
    description: data.description || "",
    audio,
    audioSrc: resolveAudioSrc(audio),
    tags: asTags(data.tags),
    bytes: localAudioBytes(audio),
    mime: audio ? audioMime(audio) : "",
    content,
  };
}

export function getAllEpisodes() {
  return getAllEpisodeSlugs()
    .map((slug) => getEpisodeBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => {
      const left = new Date(`${a.date}T00:00:00`).getTime() || 0;
      const right = new Date(`${b.date}T00:00:00`).getTime() || 0;
      return right - left;
    });
}
