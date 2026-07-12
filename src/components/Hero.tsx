import { useEffect, useRef, useState } from "react";
import heroLg from "../assets/panda-hero.jpg";
import heroSm from "../assets/panda-hero-sm.jpg";
import heroBlur from "../assets/panda-blur.jpg";
import crest from "../assets/logo.png";
import "./Hero.css";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  // scroll parallax on the photo — the panda recedes slower than the page
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const media = mediaRef.current;
    if (!media) return;
    let last = -1;
    const onScroll = () => {
      const vh =
        window.innerHeight || document.documentElement.clientHeight || 800;
      const y = window.scrollY;
      if (y > vh * 1.3) return; // hero is off screen
      const offset = Math.round(Math.min(y * 0.18, vh * 0.18));
      if (offset === last) return;
      last = offset;
      media.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div
        ref={mediaRef}
        className="hero__media"
        style={{ backgroundImage: `url(${heroBlur})` }}
      >
        <picture>
          <source media="(max-width: 720px)" srcSet={heroSm} />
          <img
            ref={imgRef}
            src={heroLg}
            alt="A giant panda standing tall on a fallen log, facing the camera among dark green leaves"
            className={loaded ? "is-loaded" : undefined}
            onLoad={() => setLoaded(true)}
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      {/* ghosted vertical glyphs over the dark foliage, right edge */}
      <p className="hero__glyphs" lang="zh-Hans" aria-hidden="true">
        熊猫
      </p>

      <div className="hero__inner">
        <img className="hero__crest" src={crest} alt="" />
        <p className="eyebrow hero__eyebrow">
          NACIVT nine-man volleyball · Canada
        </p>
        <h1 id="hero-title" className="hero__title">
          Pandas Volleyball<em>.</em>
        </h1>
        <p className="hero__est">Established 2025</p>
      </div>
    </section>
  );
}
