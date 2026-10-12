import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="kicker">404</p>
        <h1>Page not found</h1>
        <p className="lede">That page is not on the site.</p>
      </header>
      <Link className="button" href="/">
        Back home
      </Link>
    </main>
  );
}
