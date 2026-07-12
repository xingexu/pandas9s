import teamPhoto from "../assets/team-photo.jpg";
import galSpike from "../assets/gal-spike.jpg";
import galChamps from "../assets/gal-champs.jpg";
import galHype from "../assets/gal-hype.jpg";
import galBlock from "../assets/gal-block.jpg";
import galJoust from "../assets/gal-joust.jpg";
import JerseyViewer from "./JerseyViewer";
import "./Sections.css";

const INSTAGRAM = "https://www.instagram.com/pandas9manvball/";

const GALLERY: ReadonlyArray<{
  src: string;
  alt: string;
  className: string;
}> = [
  {
    src: galSpike,
    alt: "A Panda rising above the net mid-spike at the Canada Day tournament",
    className: "gallery__tile--wide",
  },
  {
    src: galChamps,
    alt: "The team gathered on court after winning the inaugural nine-man title",
    className: "gallery__tile--tall",
  },
  {
    src: galHype,
    alt: "Courtside celebration in Pit Viper sunglasses",
    className: "gallery__tile--tall",
  },
  {
    src: galBlock,
    alt: "Three Pandas up together for a triple block",
    className: "gallery__tile--tall",
  },
  {
    src: galJoust,
    alt: "A joust above the net",
    className: "gallery__tile--half",
  },
];

const RESULTS: ReadonlyArray<{
  order: string;
  name: string;
  placing: string;
  win?: boolean;
}> = [
  {
    order: "01",
    name: "Toronto Flying Tigers Invitational",
    placing: "4th place",
  },
  {
    order: "02",
    name: "Core X Lucky Lion Invitational",
    placing: "Champions",
    win: true,
  },
  {
    order: "03",
    name: "Canada Day Tournament",
    placing: "5th place",
  },
];

export function TeamSection() {
  return (
    <section className="section" id="team" aria-label="Team photo">
      <div className="section__inner">
        <figure className="team__photo" data-reveal="">
          <img
            src={teamPhoto}
            alt="The 2025 Pandas roster in black jerseys, posed on a gym bench"
            loading="lazy"
          />
          <figcaption>Pandas 2025</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section
      className="section section--tinted"
      id="gallery"
      aria-labelledby="gallery-title"
    >
      <div className="section__inner">
        <p className="eyebrow" data-reveal="">
          Gallery
          <span className="kicker" lang="zh-Hans" aria-hidden="true">
            相册
          </span>
        </p>
        <h2 className="section-title" id="gallery-title" data-reveal="wipe">
          From the court<em>.</em>
        </h2>
        <div className="gallery" data-reveal="">
          {GALLERY.map((shot) => (
            <figure key={shot.src} className={`gallery__tile ${shot.className}`}>
              <img src={shot.src} alt={shot.alt} loading="lazy" />
            </figure>
          ))}
          <a
            className="gallery__tile gallery__more"
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              More on Instagram
              <br />
              @pandas9manvball <em>↗</em>
            </span>
          </a>
        </div>
        <p className="gallery__credit d1" data-reveal="">
          Photos · @leo_chu_photos
        </p>
      </div>
    </section>
  );
}

export function JerseysSection() {
  return (
    <section className="section" id="jerseys" aria-labelledby="jerseys-title">
      <div className="section__inner">
        <p className="eyebrow" data-reveal="">
          Jerseys
          <span className="kicker" lang="zh-Hans" aria-hidden="true">
            球衣
          </span>
        </p>
        <h2 className="section-title" id="jerseys-title" data-reveal="wipe">
          The kits<em>.</em>
        </h2>
        <p className="jerseys__intro d2" data-reveal="">
          Sumi-ink panda, bamboo, and 功夫不负有心人 down the back — in three
          colourways. Tap a kit to zoom in.
        </p>
        <JerseyViewer />
      </div>
    </section>
  );
}

export function ResultsSection() {
  return (
    <section
      className="section section--tinted"
      id="results"
      aria-labelledby="results-title"
    >
      <div className="section__inner">
        <p className="eyebrow" data-reveal="">
          Tournaments
        </p>
        <h2 className="section-title" id="results-title" data-reveal="wipe">
          Results<em>.</em>
        </h2>
        <ol className="results__list" data-reveal="">
          {RESULTS.map((r) => (
            <li className="results__row" key={r.name}>
              <span className="results__order">{r.order}</span>
              <div className="results__event">
                <h3>{r.name}</h3>
              </div>
              <span
                className={
                  r.win ? "results__placing results__placing--win" : "results__placing"
                }
              >
                {r.placing}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
