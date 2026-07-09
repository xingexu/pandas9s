import crest from "../assets/logo.png";
import "./Footer.css";

const INSTAGRAM = "https://www.instagram.com/pandas9manvball/";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">
            <img src={crest} alt="" width="24" height="27" />
            <span>
              Pandas <span lang="zh-Hans">熊猫</span>
            </span>
          </p>
          <p className="site-footer__line">
            NACIVT nine-man men&rsquo;s volleyball · Canada · Est. 2025
          </p>
        </div>
        <ul className="site-footer__links">
          <li>
            <a href="#team">The Team</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#jerseys">Jerseys</a>
          </li>
          <li>
            <a href="#results">Results</a>
          </li>
          <li>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
          </li>
          <li>
            <a href="#top">Back to top</a>
          </li>
        </ul>
        <p className="site-footer__legal">
          © 2026 Pandas 9-Man Volleyball Club
        </p>
      </div>
    </footer>
  );
}
