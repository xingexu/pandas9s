import "./Ticker.css";

const ITEMS = ["Pandas", "熊猫", "Est. 2025", "家庭"];

const isCjk = (s: string) => /[一-鿿]/.test(s);

function TickerGroup() {
  return (
    <div className="ticker__group">
      {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
        <span
          key={i}
          className={
            i % 2 === 1 ? "ticker__item ticker__item--ghost" : "ticker__item"
          }
          lang={isCjk(item) ? "zh-Hans" : undefined}
        >
          {item}
          <i aria-hidden="true">·</i>
        </span>
      ))}
    </div>
  );
}

/* Infinite marquee strip — decorative, hidden from assistive tech. */
export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  );
}
