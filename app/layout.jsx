import "./globals.css";

export const metadata = {
  title: "Henry Eakes",
  description: "College Football, NFL, and NFL Draft writing by Henry Eakes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">
              <h1>
                <a href="/">Henry Eakes</a>
              </h1>
              <p>College Football · NFL · NFL Draft</p>
            </div>

            <nav className="nav">
              <a className="pill" href="/articles">Articles</a>
              <a className="pill" href="/tag/college">College Football</a>
              <a className="pill" href="/tag/nfl">NFL</a>
              <a className="pill" href="/tag/draft">Draft</a>
              <a className="pill" href="/draft/big-board">Big Board</a>
            </nav>
          </header>

          {children}

          <footer className="footer">
            © {new Date().getFullYear()} Henry Eakes ·{" "}
            <a href="mailto:henry.eakes@gmail.com">henry.eakes@gmail.com</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
