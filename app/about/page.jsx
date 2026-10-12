import fs from "fs";
import path from "path";
import { pageMeta, SITE } from "../../lib/site";

export const metadata = pageMeta({
  title: "About",
  description:
    "Henry Eakes is a Sports Management student at Santa Fe College in Gainesville, Florida, a former sports writer for Tennessee Prep Weekly, and the founder of henryeakes.com.",
  path: "/about",
});

function portraitSrc() {
  const candidates = ["henry.jpg", "henry.jpeg", "henry.png", "henry.webp"];
  for (const name of candidates) {
    if (fs.existsSync(path.join(process.cwd(), "public", name))) return `/${name}`;
  }
  return null;
}

export default function AboutPage() {
  const photo = portraitSrc();

  return (
    <main className="page">
      <div className="about-grid">
        <figure className="portrait">
          {photo ? (
            <img src={photo} alt="Henry Eakes" />
          ) : (
            <div className="monogram" aria-hidden="true">
              HE
            </div>
          )}
        </figure>
        <div>
          <header className="page-header about-header">
            <p className="kicker">About</p>
            <h1>Henry Eakes</h1>
          </header>
          <div className="about-copy">
            <p>
              Henry Eakes is a Sports Management student at Santa Fe College in Gainesville, Florida.
            </p>
            <p>
              From 2022 to 2026 he was a sports writer for Tennessee Prep Weekly, where he created the
              Williamson County Stock Report.
            </p>
            <p>He is the founder of henryeakes.com.</p>
            <p className="contact-line">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
