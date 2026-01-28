// Starter Next.js + Tailwind site scaffold
// This is a minimal project structure outline with key files.
// You will upload these files into a GitHub repo.

// =============================
// package.json
// =============================
{
  "name": "henry-eakes",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  }
}

// =============================
// app/layout.jsx
// =============================
export const metadata = {
  title: "Henry Eakes",
  description: "College Football, NFL, and NFL Draft writing by Henry Eakes"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black max-w-4xl mx-auto px-6">
        <header className="py-10 text-center">
          <h1 className="text-4xl font-semibold">Henry Eakes</h1>
          <p className="text-gray-600 mt-2">College Football · NFL · NFL Draft</p>
        </header>
        {children}
        <footer className="py-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Henry Eakes
        </footer>
      </body>
    </html>
  );
}

// =============================
// app/page.jsx (Home)
// =============================
export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <a href="/tags/college" className="border p-8 text-center hover:bg-gray-50">
        <h2 className="text-xl font-medium">College Football</h2>
      </a>
      <a href="/tags/nfl" className="border p-8 text-center hover:bg-gray-50">
        <h2 className="text-xl font-medium">NFL</h2>
      </a>
      <a href="/tags/draft" className="border p-8 text-center hover:bg-gray-50">
        <h2 className="text-xl font-medium">NFL Draft</h2>
      </a>
    </main>
  );
}

// =============================
// content/posts/sample-college.md
// =============================
---
title: "Why College Football Still Owns Saturdays"
tag: "college"
date: "2026-01-01"
---

College football works because it feels local, emotional, and chaotic in a way no other sport does.

// =============================
// content/posts/sample-nfl.md
// =============================
---
title: "The NFL Is Becoming a Year-Round League"
tag: "nfl"
date: "2026-01-01"
---

Free agency, the draft, and nonstop media cycles mean the NFL never really stops.

// =============================
// content/posts/sample-draft.md
// =============================
---
title: "Why the NFL Draft Matters More Than Ever"
tag: "draft"
date: "2026-01-01"
---

The draft has become a league-defining event, not just an offseason formality.
