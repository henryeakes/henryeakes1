export default function HomePage() {
  return (
    <section className="hero">
      <h1>College Football, NFL, and Draft Notes</h1>
      <p>
        Weekly analysis, film notes, and draft coverage — all focused on football.
      </p>

      <div className="buttons">
        <a className="primary" href="/articles">
          Read Articles
        </a>
        <a className="secondary" href="/big-board">
          Draft Big Board
        </a>
      </div>
    </section>
  );
}
