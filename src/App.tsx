import { useEffect } from "react";
import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import {
  TeamSection,
  GallerySection,
  JerseysSection,
  ResultsSection,
} from "./components/Sections";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    // reveal anything already on screen immediately — first paint
    // should never wait on the observer's first tick
    const bootstrap = () => {
      const vh =
        window.innerHeight || document.documentElement.clientHeight || 800;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("is-visible");
      });
    };
    bootstrap();

    els.forEach((el) => io.observe(el));

    // …and once more after the observer's initial pass settles, in case
    // that first delivery ran against a mid-load layout
    const t = window.setTimeout(bootstrap, 300);

    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <Ticker />
        <TeamSection />
        <GallerySection />
        <JerseysSection />
        <ResultsSection />
      </main>
      <Footer />
    </>
  );
}
