export default function TagPage({ params }) {
  const tag = String(params.tag || "").toLowerCase();

  const title =
    tag === "nfl" ? "NFL" :
    tag === "college" ? "College Football" :
    tag === "draft" ? "NFL Draft" :
    tag;

  return (
    <main>
      <h2 style={{ margin: "0 0 12px" }}>{title}</h2>
      <p style={{ color: "#6b7280", marginTop: 0 }}>
        This page is live. Next we’ll show articles tagged: <strong>{tag}</strong>.
      </p>

      <p>
        Go to <a href="/articles">Articles</a> to read posts.
      </p>
    </main>
  );
}
