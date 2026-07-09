import { useEffect } from "react";
import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
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

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <TeamSection />
        <GallerySection />
        <JerseysSection />
        <ResultsSection />
      </main>
      <Footer />
    </>
  );
}
