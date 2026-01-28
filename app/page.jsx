export default function Home() {
  return (
    <main>
      <section className="hero">
        <strong>Welcome.</strong>{" "}
        Here’s where I post quick takes, longer breakdowns, and draft notes.
      </section>

      <section className="grid">
        <a className="card" href="#college" id="college">
          <h2>College Football</h2>
          <p>Game-day reactions, rankings thoughts, and big matchup previews.</p>
        </a>

        <a className="card" href="#nfl" id="nfl">
          <h2>NFL</h2>
          <p>Weekly notes, storylines, and what matters going forward.</p>
        </a>

        <a className="card" href="#draft" id="draft">
          <h2>NFL Draft</h2>
          <p>Draft analysis, big board, and player breakdowns coming soon.</p>
        </a>
      </section>
    </main>
  );
}
