"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "../lib/site";
import { IconCaret, IconClose, IconMenu, IconSearch } from "./Icons";

function isCurrent(href, pathname, exact) {
  if (href === "/") return pathname === "/";
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.classList.toggle("menu-open", open);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="" width={42} height={36} className="brand-logo" />
          <span className="brand-name">Henry Eakes</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          {NAV.map((item) =>
            item.children ? (
              <div className="nav-dropdown" key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link"
                  aria-current={isCurrent(item.href, pathname, false) ? "page" : undefined}
                  aria-haspopup="true"
                >
                  {item.label}
                  <IconCaret />
                </Link>
                <div className="submenu" role="group" aria-label={item.label}>
                  {item.children.map((child) => (
                    <Link
                      key={child.href + child.label}
                      href={child.href}
                      aria-current={isCurrent(child.href, pathname, true) ? "page" : undefined}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isCurrent(item.href, pathname, true) ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="header-tools">
          <Link href="/search" className="icon-button" aria-label="Search articles">
            <IconSearch />
          </Link>
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile">
          {NAV.map((item) =>
            item.children ? (
              <div className="mobile-group" key={item.href}>
                <Link href={item.href} aria-current={isCurrent(item.href, pathname, false) ? "page" : undefined}>
                  {item.label}
                </Link>
                {item.children.map((child) => (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    className="mobile-sub"
                    aria-current={isCurrent(child.href, pathname, true) ? "page" : undefined}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href, pathname, true) ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          )}
          <Link href="/search">Search</Link>
        </nav>
      ) : null}
    </header>
  );
}
