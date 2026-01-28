import { getAllPostsMeta } from "../../lib/posts";

function pretty(tag) {
  if (tag === "college") return "College";
  if (tag === "nfl") return "NFL";
  if (tag === "draft") return "Draft";
  return tag;
}

export const metadata = { title: "Articles | Henry Eakes" };

export default function ArticlesPage() {
  const posts = getAllPostsMeta();

  return (
    <main>
      <h2 style={{ margin: "0 0 12px" }}>Articles</h2>
      <p style={{ color: "var(--muted)", marginTop: 0 }}>
        All posts across College Football, NFL, and the NFL Draft.
      </p>

      <div className="list">
        {posts.map((p) => (
          <a className="item" key={p.slug} href={`/articles/${p.slug}`}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <strong>{p.title}</strong>
              <span className="badge">{pretty(p.tag)}</span>
            </div>
            <div className="meta">
              <span>{p.date}</span>
              <span>•</span>
              <a href={`/tag/${p.tag}`} onClick={(e) => e.stopPropagation()}>
                {p.tag}
              </a>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
