import Link from "next/link";
import BigBoardList from "../components/BigBoardList";
import { getBigBoard } from "../lib/board";
import { formatDate } from "../lib/format";
import { getAllPosts, getPostsForSection } from "../lib/posts";
import { SECTIONS, sectionForPost } from "../lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const latest = posts[0];
  const board = getBigBoard().slice(0, 5);
  const latestSection = latest ? sectionForPost(latest) : null;

  return (
    <main className="page home">
      {latest ? (
        <section className="feature">
          <div className="feature-main">
            <p className="kicker">
              Latest
              {latest.category ? (
                <>
                  <span aria-hidden="true"> · </span>
                  {latestSection ? (
                    <Link href={latestSection.href}>{latest.category}</Link>
                  ) : (
                    latest.category
                  )}
                </>
              ) : null}
            </p>
            <h1 className="feature-title">
              <Link href={`/articles/${latest.slug}`}>{latest.title}</Link>
            </h1>
            {latest.excerpt ? <p className="deck">{latest.excerpt}</p> : null}
            <p className="byline">
              By <Link href="/about">{latest.author}</Link>
              {latest.date ? (
                <>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                </>
              ) : null}
              <span aria-hidden="true"> · </span>
              {latest.readingTime}
            </p>
            <Link className="button" href={`/articles/${latest.slug}`}>
              Read the story
            </Link>
          </div>

          <aside className="board-card" aria-label="Big Board">
            <p className="kicker">Big Board</p>
            <h2>NFL Draft</h2>
            {board.length > 0 ? (
              <BigBoardList rows={board} compact />
            ) : (
              <p className="aside-note">Rankings will be posted as the board is updated.</p>
            )}
            <Link className="text-link" href="/draft/big-board">
              Full board
            </Link>
          </aside>
        </section>
      ) : (
        <header className="page-header">
          <p className="kicker">Henry Eakes</p>
          <h1>College football and NFL writing</h1>
          <p className="lede">Stories will be published here.</p>
        </header>
      )}

      {posts.length > 0 ? (
        <section className="block" aria-labelledby="stories-heading">
          <div className="block-heading">
            <h2 id="stories-heading">Stories</h2>
            <Link href="/articles">All articles</Link>
          </div>
          <ul className="story-index">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/articles/${post.slug}`}>
                  <span className="kicker">{post.category}</span>
                  <span className="story-index-title">{post.title}</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="block" aria-labelledby="sections-heading">
        <div className="block-heading">
          <h2 id="sections-heading">Sections</h2>
          <Link href="/articles">All articles</Link>
        </div>
        <div className="section-grid">
          {SECTIONS.map((section) => {
            const count = getPostsForSection(section.slug).length;
            return (
              <Link key={section.slug} href={section.href} className="section-tile">
                <span className="section-tile-title">{section.label}</span>
                <span className="meta">{count === 0 ? "Coming soon" : `${count} ${count === 1 ? "story" : "stories"}`}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
