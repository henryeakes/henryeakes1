import { getAllPostsMeta } from "../lib/posts";

function pretty(tag) {
  if (tag === "college") return "College";
  if (tag === "nfl") return "NFL";
  if (tag === "draft") return "Draft";
  return tag;
}

export default function Home() {
  const latest = getAllPostsMeta().slice(0, 5);

  return (
    <main>
      <section className="hero">
        <strong>Welcome.</strong> Quick takes, longer breakdowns, and draft notes —
        all in one place.
      </section>

      <section className="grid">
        <a className="card" href="/tag/college">
          <h2>College Football</h2>
          <p>Game-day reactions, rankings thoughts, and big matchup previews.</p>
        </a>

        <a className="card" href="/tag/nfl">
          <h2>NFL</h2>
          <p>Weekly notes, storylines, and what matters going forward.</p>
        </a>

        <a className="card" href="/tag/draft">
          <h2>NFL Draft</h2>
          <p>Prospects, mock drafts, and big-board opinions.</p>
        </a>
      </section>

      <section style={{ marginTop: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0 }}>Latest Articles</h2>
          <a className="pill" href="/articles">View all</a>
        </div>

        <div className="list">
          {latest.map((p) => (
            <a className="item" key={p.slug} href={`/articles/${p.slug}`}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <strong>{p.title}</strong>
                <span className="badge">{pretty(p.tag)}</span>
              </div>
              <div className="meta">
                <span>{p.date}</span>
                <span>•</span>
                <span>{p.excerpt}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
