# Henry Eakes

College football and NFL writing site for [henryeakes.com](https://henryeakes.com). Next.js on Vercel. Stories are Markdown files.

## Develop

```bash
npm install
npm run dev
```

Production check:

```bash
npm run lint
npm run build
```

## Add a post

1. Create a new file in `app/articles/`. The filename is the URL slug. `app/articles/week-1-notes.md` is published at `/articles/week-1-notes`.
2. Start the file with frontmatter:

```md
---
title: "Story title"
date: "2026-03-19"
excerpt: "One or two sentences for the homepage, cards, and link previews."
category: "Mock Draft"
tags:
  - draft
coverImage: "/optional-image.png"
---

The story, in Markdown.
```

3. `date` is `YYYY-MM-DD`. The site prints it as March 19, 2026.
4. `category` is the label on the card (for example `Mock Draft`, `NFL`, `College Football`, `Franchise Rebuilds`).
5. `tags` decide which section lists the story:

| Tag | Page |
| --- | --- |
| `draft` | `/draft` and `/tag/draft` |
| `nfl` | `/nfl` and `/tag/nfl` |
| `college` | `/college-football` and `/tag/college` |
| `franchise` | `/franchise-rebuilds` |

A story can have more than one tag. Only files in `app/articles/` that end in `.md` are published. Markdown files elsewhere in the repo are not.

Headings (`##`), lists, links, and emphasis work. A short single line on its own, such as a round label, is also rendered as a heading.

## Update the Big Board

Edit `data/big-board.js`. A row appears on `/draft/big-board` only when `player` has a name. Leave `player` as an empty string to hide that row.

```js
{ rank: 1, player: "Prospect Name", position: "QB", school: "School", note: "One-line note." },
```

`rank` is optional. If you omit it, visible rows are numbered in order. The homepage sidebar shows the first five published rows.

## About photo

Put a portrait at one of these paths and the About page will use it:

- `public/henry.jpg`
- `public/henry.jpeg`
- `public/henry.png`
- `public/henry.webp`

Until then, the page shows a monogram.
