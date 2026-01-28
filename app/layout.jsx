import "./globals.css";

export const metadata = {
  title: "Henry Eakes",
  description: "Informed Football Coverage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Top Bar */}
        <div className="top-bar">
          <span>FOOTBALL WRITING · henryeakessports@gmail.com</span>
          <div className="socials">
            <a
              href="https://instagram.com/henryeakessports"
              target="_blank"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://x.com/henryeakesports"
              target="_blank"
              aria-label="X"
            >
              X
            </a>
          </div>
        </div>

        {/* Header */}
        <header className="site-header">
          <img
            src="/henryeakes logo.png"
            alt="HenryEakes.com logo"
            className="logo"
          />
          <p className="tagline">Informed Football Coverage</p>

          <nav className="nav">
            <a href="/">Home</a>
            <a href="/articles">Articles</a>
            <a href="/college-football">College Football</a>
            <a href="/nfl">NFL</a>
            <a href="/draft">Draft</a>
            <a href="/big-board">Big Board</a>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="footer">
          © 2026 Henry Eakes · henryeakessports@gmail.com
        </footer>
      </body>
    </html>
  );
}
