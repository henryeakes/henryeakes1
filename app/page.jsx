export default function Home() {
  return (
    <main>
      {/* Blanca-inspired “big image” area — stationary logo hero */}
      <section className="heroFrame">
        <div className="heroLogoStage">
          <img className="heroLogo" src="/logo.png" alt="HenryEakes.com logo" />
        </div>
      </section>

      {/* Simple intro below like the template’s post header area */}
      <section className="homeIntro">
        <div className="homeDate">FOOTBALL</div>
        <h2 className="homeTitle">College Football, NFL, and Draft Notes</h2>
        <p className="homeText">
          Weekly takeaways, previews, and draft coverage — all focused on football.
        </p>

        <div className="homeActions">
          <a className="btn" href="/articles">Read Articles</a>
          <a className="btn ghost" href="/draft/big-board">Draft Big Board</a>
        </div>
      </section>
    </main>
  );
}
