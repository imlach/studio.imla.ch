// Shared components — nav, footer, wipe slider, placeholder, hover-swap card.
// Every component is attached to window at the bottom of the file so other
// scripts in the babel scope can reach them.

const { useState, useCallback, useEffect, useRef } = React;

/* ----- NAV ----- */
function Nav({ crumb }) {
  return (
    <div className="nav">
      <a href="index.html" className="wordmark">The Studio</a>
      {crumb ? (
        <div className="crumb">
          <a href="index.html">All work</a>
          <span className="sep">/</span>
          <span style={{ color: "var(--ink)" }}>{crumb}</span>
        </div>
      ) : (
        <nav className="links">
          <a href="#colour">Colour</a>
          <a href="#sound">Sound</a>
          <a href="#tools">Tools</a>
          <a href="mailto:studio@imla.ch">Contact</a>
          <span className="back-sep">/</span>
          <a href="https://imla.ch/" className="back" title="Back to imla.ch">imla.ch ↗</a>
        </nav>
      )}
    </div>
  );
}

/* ----- FOOTER ----- */
function Footer() {
  return (
    <footer className="footer">
      <a href="mailto:studio@imla.ch" className="email">studio@imla.ch</a>
      <div className="colophon">
        The Studio &nbsp;·&nbsp; Dunkeld &nbsp;·&nbsp; {new Date().getFullYear()}<br />
        <span className="faint">An imla.ch property</span>
      </div>
    </footer>
  );
}

/* ----- PLACEHOLDER ----- */
// Used where real photographs are pending (sound room, dailies pipeline UI).
function Placeholder({ src, kind, caption, height = 360, style = {} }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", height, background: "#0c0c0d", ...style }}>
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.32) saturate(0.4) blur(2px)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(20,20,22,0.7) 0%, rgba(0,0,0,0.85) 100%)" }}></div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(237,232,221,0.45)", textAlign: "center", padding: 28 }}>
        <div style={{ width: 22, height: 22, border: "1px solid rgba(237,232,221,0.3)", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>+</div>
        <div style={{ fontSize: 12, letterSpacing: "0.08em", marginBottom: 4 }}>Photograph — {kind}</div>
        <div style={{ fontSize: 11.5, color: "rgba(237,232,221,0.3)" }}>{caption}</div>
      </div>
    </div>
  );
}

/* ----- SWEEP CARD (landing grid) ----- */
// Uses the wipe-slider's visual vocabulary, auto-animated on hover.
// Same line, same logic as WipeSlider — but no interaction required.
// Class names match selectors in studio.css.
function SweepCard({ film, vtName }) {
  return (
    <a href={film.href} className="sweep-card">
      <div className="frame">
        <img className="before" src={film.hero} alt="" />
        <img
          className="after"
          src={film.hero}
          alt=""
          style={vtName ? { viewTransitionName: vtName } : undefined}
        />
        <div className="sweep-line"></div>
        <div className="badge">Before · After</div>
      </div>
      <div className="meta-row">
        <span className="title">{film.title}</span>
        <span className="year">{film.year}</span>
      </div>
      <div className="sub">
        <span>{film.studioRole}</span>
        <span className="meta">{film.studioMeta}</span>
      </div>
    </a>
  );
}

/* ----- HOVER-SWAP CARD (legacy — kept for the options.jsx canvas) ----- */
// Default state: graded final. Hover: crossfade to log/ungraded plate.
function HoverSwapCard({ film, vtName }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={film.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block", color: "inherit" }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", background: "var(--bg-3)" }}>
        <img
          src={film.hero}
          alt=""
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: hovered ? window.BEFORE_FILTER : window.AFTER_FILTER,
            transition: "filter 0.35s ease",
            viewTransitionName: vtName,
          }}
        />
        <div style={{ position: "absolute", top: 16, left: 18, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)", background: "rgba(0,0,0,0.55)", padding: "4px 10px", backdropFilter: "blur(6px)" }}>
          {hovered ? "Before · log" : "After · graded"}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
        <span style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.015em" }}>{film.title}</span>
        <span style={{ fontSize: 14, color: "var(--dim)" }}>{film.year}</span>
      </div>
      <div style={{ fontSize: 14, color: "var(--dim)", marginTop: 4, display: "flex", justifyContent: "space-between" }}>
        <span>{film.studioRole}</span>
        <span style={{ color: "var(--faint)" }}>{film.studioMeta}</span>
      </div>
    </a>
  );
}

/* ----- WIPE SLIDER (case-study hero + comparison frames) ----- */
// Mouse / touch drives the wipe position. Resolve-style.
// Renders both images, clip-paths the "after" so it reveals from the wipe right-ward.
function WipeSlider({ src, alt = "", aspectRatio = "16 / 9", height = null, vtName = null }) {
  const ref = useRef(null);
  const [pct, setPct] = useState(50);
  const [active, setActive] = useState(false);

  const update = useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPct(p * 100);
  }, []);

  // Pointer Events unify mouse/touch/pen. setPointerCapture keeps the drag
  // alive once it leaves the element (and on fast flicks); preventDefault
  // kills the browser's native image-drag + text-selection, which is what
  // makes a naive wipe feel like it "sticks" mid-drag.
  const onPointerDown = (e) => {
    e.preventDefault();
    if (e.pointerId != null) ref.current && ref.current.setPointerCapture(e.pointerId);
    setActive(true);
    update(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!active) return;
    update(e.clientX);
  };
  const endDrag = (e) => {
    const el = ref.current;
    if (el && e.pointerId != null && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    setActive(false);
  };

  const boxStyle = {
    position: "relative",
    overflow: "hidden",
    background: "var(--bg-3)",
    cursor: "ew-resize",
    userSelect: "none",
    touchAction: "none",
  };
  if (height) boxStyle.height = height;
  else boxStyle.aspectRatio = aspectRatio;

  return (
    <div
      ref={ref}
      style={boxStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* Before (full layer) */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover",
          filter: window.BEFORE_FILTER,
          viewTransitionName: vtName,
        }}
      />
      {/* After clipped by wipe */}
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover",
          filter: window.AFTER_FILTER,
          clipPath: `inset(0 0 0 ${pct}%)`,
          transition: active ? "none" : "clip-path 0.5s cubic-bezier(.2,.7,.3,1)",
        }}
      />
      {/* Wipe line + handle — Resolve-style white */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: `${pct}%`,
        width: 1, background: "rgba(237,232,221,0.85)",
        boxShadow: "0 0 16px rgba(0,0,0,0.5)",
        transition: active ? "none" : "left 0.5s cubic-bezier(.2,.7,.3,1)",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: -18,
          width: 36, height: 36, marginTop: -18,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(237,232,221,0.6)",
          backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, color: "var(--ink)",
        }}>↔</div>
      </div>
      {/* Corner labels */}
      <div style={{ position: "absolute", top: 18, left: 20, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(237,232,221,0.85)", pointerEvents: "none" }}>Log</div>
      <div style={{ position: "absolute", top: 18, right: 20, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)", pointerEvents: "none" }}>Graded</div>
    </div>
  );
}

// Export to window so other scripts can use them.
Object.assign(window, { Nav, Footer, Placeholder, SweepCard, HoverSwapCard, WipeSlider });
