import { useEffect, useState } from "react";
import crest from "../assets/logo.png";
import "./SiteNav.css";

const INSTAGRAM = "https://www.instagram.com/pandas9manvball/";

const LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "The Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Jerseys", href: "#jerseys" },
  { label: "Results", href: "#results" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-nav is-scrolled" : "site-nav"}>
      <a className="site-nav__brand" href="#top">
        <img src={crest} alt="" width="30" height="33" />
        <span>Pandas Volleyball</span>
      </a>
      <nav className="site-nav__nav" aria-label="Primary">
        <ul className="site-nav__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a
          className="site-nav__join"
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow us on Instagram ↗
        </a>
      </nav>
    </header>
  );
}
