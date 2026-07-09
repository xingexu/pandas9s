import { useEffect, useRef, useState } from "react";
import heroLg from "../assets/panda-hero.jpg";
import heroSm from "../assets/panda-hero-sm.jpg";
import heroBlur from "../assets/panda-blur.jpg";
import crest from "../assets/logo.png";
import "./Hero.css";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div
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
        <img className="hero__crest" src={crest} alt="" data-reveal="" />
        <p className="eyebrow d1" data-reveal="">
          NACIVT nine-man volleyball · Canada
        </p>
        <h1 id="hero-title" className="hero__title" data-reveal="" data-d="1">
          Pandas Volleyball<em>.</em>
        </h1>
        <p className="hero__tag d2" data-reveal="">
          Established 2025.
        </p>
      </div>
    </section>
  );
}
