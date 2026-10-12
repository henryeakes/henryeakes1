import Link from "next/link";
import { FOOTER_LINKS, SITE } from "../lib/site";
import { IconInstagram, IconX } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">Henry Eakes</p>
          <p className="footer-blurb">
            College football and NFL writing. Sports Management student at Santa Fe College and
            founder of henryeakes.com.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="footer-label">Sections</p>
          <ul className="footer-links">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href + item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="footer-label">Follow / Contact</p>
          <ul className="footer-links">
            <li>
              <a className="social-link" href={SITE.x} target="_blank" rel="noopener noreferrer">
                <IconX />
                <span>X {SITE.xHandle}</span>
              </a>
            </li>
            <li>
              <a className="social-link" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                <IconInstagram />
                <span>Instagram {SITE.instagramHandle}</span>
              </a>
            </li>
            <li>
              <a className="social-link" href={`mailto:${SITE.email}`}>
                <span>{SITE.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-inner footer-bottom-inner">
          <p>© {new Date().getFullYear()} Henry Eakes</p>
        </div>
      </div>
    </footer>
  );
}
