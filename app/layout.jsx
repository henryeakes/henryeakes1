import "./globals.css";

export const metadata = {
  title: "Henry Eakes",
  description: "Football writing: College Football, NFL, and the NFL Draft.",
};

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.75-.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.36 2H21l-6.45 7.38L22 22h-6.17l-4.84-6.3L5.2 22H2.56l6.89-7.88L2 2h6.33l4.37 5.7L18.36 2z" />
    </svg>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Blanca-inspired top strip */}
        <div className="topStrip">
          <div className="topStripInner">
            <div className="topLeft">
              <span className="topSmall">FOOTBALL WRITING</span>
              <span className="dot">•</span>
              <a className="topLink" href="mailto:henryeakessports@gmail.com">
                henryeakessports@gmail.com
              </a>
            </div>

            <div className="topRight">
              <a
                className="iconBtn"
                href="https://instagram.com/henryeakessports"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <IconInstagram />
              </a>

              <a
                className="iconBtn"
                href="https://x.com/henryeakesports"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                title="X"
              >
                <IconX />
              </a>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Blanca-inspired centered brand */}
          <header className="siteHeader">
            <a href="/" className="brandLogoWrap" aria-label="Home">
              <img className="brandLogo" src="/logo.png" alt="HenryEakes.com logo" />
            </a>

            <div className="brandSub">
              <div className="brandTag">PERSONAL FOOTBALL BLOG</div>

              <nav className="mainNav" aria-label="Primary">
                <a href="/">HOME</a>
                <a href="/articles">ARTICLES</a>
                <a href="/tag/college">COLLEGE FOOTBALL</a>
                <a href="/tag/nfl">NFL</a>
                <a href="/tag/draft">DRAFT</a>
                <a href="/draft/big-board">BIG BOARD</a>
              </nav>
            </div>
          </header>

          {children}

          <footer className="footer">
            © {new Date().getFullYear()} Henry Eakes ·{" "}
            <a href="mailto:henryeakessports@gmail.com">henryeakessports@gmail.com</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
