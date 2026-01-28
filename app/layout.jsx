import "./globals.css";

export const metadata = {
  title: "Henry Eakes",
  description: "College & NFL Football",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">
              <h1>Henry Eakes</h1>
              <p>College Football · NFL · NFL Draft</p>
            </div>

            <nav className="nav">
              <a className="pill" href="/">Home</a>
              <a className="pill" href="/#college">College</a>
              <a className="pill" href="/#nfl">NFL</a>
              <a className="pill" href="/#draft">Draft</a>
            </nav>
          </header>

          {children}

          <footer className="footer">
            © {new Date().getFullYear()} Henry Eakes · henry.eakes@gmail.com
          </footer>
        </div>
      </body>
    </html>
  );
}
