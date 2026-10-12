"use client";

import { useState } from "react";
import PostList from "./PostList";

export default function SearchClient({ posts, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const needle = query.trim().toLowerCase();
  const results = needle ? posts.filter((post) => post.haystack.includes(needle)) : posts;

  let status = `${results.length} ${results.length === 1 ? "story" : "stories"}`;
  if (!posts.length) status = "No stories published yet.";
  else if (needle && results.length === 0) status = "No stories matched that search.";

  return (
    <main className="page">
      <header className="page-header">
        <p className="kicker">Archive</p>
        <h1>Search</h1>
        <p className="lede">Find a story by title, team, or topic.</p>
      </header>
      <form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="site-search">
          Search articles
        </label>
        <input
          id="site-search"
          type="search"
          className="search-input"
          placeholder="Search articles"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          enterKeyHint="search"
        />
      </form>
      <p className="result-count" aria-live="polite">
        {status}
      </p>
      {results.length > 0 ? <PostList posts={results} /> : null}
    </main>
  );
}
