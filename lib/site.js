import { normalizeKey } from "./format";

export const SITE = {
  name: "Henry Eakes",
  url: "https://henryeakes.com",
  description:
    "College football and NFL writing from Henry Eakes, including mock drafts and draft rankings.",
  email: "henry.eakes@gmail.com",
  instagram: "https://instagram.com/henryeakessports",
  instagramHandle: "@henryeakessports",
  x: "https://x.com/henryeakesports",
  xHandle: "@henryeakesports",
  ogImage: "/og.png",
};

export const SECTIONS = [
  {
    slug: "draft",
    href: "/draft",
    label: "NFL Draft",
    title: "NFL Draft",
    description: "Mock drafts and draft rankings from Henry Eakes.",
    empty: "Mock drafts will be published here.",
    tags: ["draft", "mock-draft", "mock-drafts", "nfl-draft"],
  },
  {
    slug: "nfl",
    href: "/nfl",
    label: "NFL",
    title: "NFL",
    description: "NFL writing from Henry Eakes.",
    empty: "No NFL stories published yet.",
    tags: ["nfl"],
  },
  {
    slug: "college-football",
    href: "/college-football",
    label: "College Football",
    title: "College Football",
    description: "College football writing from Henry Eakes.",
    empty: "No college football stories published yet.",
    tags: ["college", "college-football"],
  },
  {
    slug: "franchise-rebuilds",
    href: "/franchise-rebuilds",
    label: "Franchise Rebuilds",
    title: "Franchise Rebuilds",
    description: "Franchise rebuild writing from Henry Eakes.",
    empty: "No franchise rebuild stories published yet.",
    tags: ["franchise", "franchise-rebuilds", "rebuilds"],
  },
];

export const NAV = [
  { href: "/", label: "Home" },
  {
    href: "/draft",
    label: "NFL Draft",
    children: [
      { href: "/draft", label: "Mock Drafts" },
      { href: "/draft/big-board", label: "Big Board" },
    ],
  },
  { href: "/nfl", label: "NFL" },
  { href: "/college-football", label: "College Football" },
  { href: "/franchise-rebuilds", label: "Franchise Rebuilds" },
  { href: "/listen", label: "Listen" },
  { href: "/about", label: "About" },
];

export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/draft", label: "Mock Drafts" },
  { href: "/draft/big-board", label: "Big Board" },
  { href: "/nfl", label: "NFL" },
  { href: "/college-football", label: "College Football" },
  { href: "/franchise-rebuilds", label: "Franchise Rebuilds" },
  { href: "/listen", label: "Listen" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

export function findSection(tag) {
  const key = normalizeKey(tag);
  if (!key) return null;
  return SECTIONS.find((section) => section.slug === key || section.tags.includes(key)) || null;
}

export function sectionForPost(post) {
  const keys = [normalizeKey(post?.category), ...(post?.tags || []).map(normalizeKey)].filter(Boolean);
  return SECTIONS.find((section) => keys.some((key) => section.tags.includes(key))) || null;
}

export function formatTag(tag) {
  const section = findSection(tag);
  if (section) return section.title;
  return String(tag || "Topic")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function pageMeta({ title, description, path = "/", absolute = false }) {
  const desc = description || SITE.description;
  const socialTitle = !title || absolute ? title || SITE.name : `${title} · ${SITE.name}`;

  return {
    title: absolute ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description: desc,
      url: path,
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.xHandle,
      title: socialTitle,
      description: desc,
      images: [SITE.ogImage],
    },
  };
}
