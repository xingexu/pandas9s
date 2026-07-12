import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import jerseyBlack from "../assets/jersey-black.png";
import jerseyBlue from "../assets/jersey-blue.png";
import jerseyWhite from "../assets/jersey-white.png";
import "./JerseyViewer.css";

type Jersey = { src: string; name: string };

const JERSEYS: ReadonlyArray<Jersey> = [
  { src: jerseyBlack, name: "Black" },
  { src: jerseyBlue, name: "Blue on grey" },
  { src: jerseyWhite, name: "White" },
];

const MIN_SCALE = 1;
const MAX_SCALE = 6;

export default function JerseyViewer() {
  const [open, setOpen] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const reset = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    reset();
  }, [reset]);

  const zoomBy = useCallback((factor: number) => {
    setScale((s) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * factor));
      if (next === 1) setPos({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // keyboard: escape closes, arrows switch kit, +/- zoom
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") { setOpen((i) => (i === null ? i : (i + 1) % JERSEYS.length)); reset(); }
      else if (e.key === "ArrowLeft") { setOpen((i) => (i === null ? i : (i + JERSEYS.length - 1) % JERSEYS.length)); reset(); }
      else if (e.key === "+" || e.key === "=") zoomBy(1.25);
      else if (e.key === "-") zoomBy(1 / 1.25);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, reset, zoomBy]);

  // lock page scroll while the viewer is open
  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // wheel zoom needs a non-passive native listener
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || open === null) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.18 : 1 / 1.18);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [open, zoomBy]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale === 1) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startY: e.clientY, baseX: pos.x, baseY: pos.y };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setPos({
      x: drag.current.baseX + (e.clientX - drag.current.startX),
      y: drag.current.baseY + (e.clientY - drag.current.startY),
    });
  };

  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const jersey = open === null ? null : JERSEYS[open];

  // pointer-tracking 3D tilt on the kit cards (mouse only)
  const handleTilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tilt-x", `${(py * -7).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(px * 9).toFixed(2)}deg`);
    el.style.setProperty("--shine-x", `${((px + 0.5) * 100).toFixed(1)}%`);
  };

  const resetTilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <>
      <div className="jerseys" data-reveal="">
        {JERSEYS.map((j, i) => (
          <button
            key={j.name}
            type="button"
            className="jerseys__card"
            onClick={() => { setOpen(i); reset(); }}
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
          >
            <img src={j.src} alt={`${j.name} Pandas jersey, front and back`} loading="lazy" />
            <span className="jerseys__name">
              {j.name} <em>+</em>
            </span>
          </button>
        ))}
      </div>

      {jersey && createPortal(
        <div
          className="jviewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${jersey.name} jersey — zoomable view`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="jviewer__bar jviewer__fade-up">
            <span className="jviewer__title">
              {jersey.name} · Konno × Pandas
            </span>
            <button ref={closeRef} type="button" className="jviewer__btn" onClick={close} aria-label="Close viewer">
              ×
            </button>
          </div>

          <div
            ref={stageRef}
            className={dragging ? "jviewer__stage jviewer__fade-up is-dragging" : "jviewer__stage jviewer__fade-up"}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onDoubleClick={() => (scale > 1 ? reset() : setScale(2.4))}
          >
            <img
              src={jersey.src}
              alt=""
              draggable={false}
              style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
              className={dragging ? "is-dragging" : undefined}
            />
          </div>

          <div className="jviewer__controls jviewer__fade-up">
            <button
              type="button"
              className="jviewer__btn"
              onClick={() => { setOpen((i) => (i === null ? i : (i + JERSEYS.length - 1) % JERSEYS.length)); reset(); }}
              aria-label="Previous kit"
            >
              ‹
            </button>
            <button type="button" className="jviewer__btn" onClick={() => zoomBy(1 / 1.4)} aria-label="Zoom out">
              −
            </button>
            <button type="button" className="jviewer__btn jviewer__btn--reset" onClick={reset}>
              {Math.round(scale * 100)}%
            </button>
            <button type="button" className="jviewer__btn" onClick={() => zoomBy(1.4)} aria-label="Zoom in">
              +
            </button>
            <button
              type="button"
              className="jviewer__btn"
              onClick={() => { setOpen((i) => (i === null ? i : (i + 1) % JERSEYS.length)); reset(); }}
              aria-label="Next kit"
            >
              ›
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
