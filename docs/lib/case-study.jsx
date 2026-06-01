// Case study page — parameterized by `slug` read from data-slug on the
// page's <div id="root">. Drives the entire page from window.FILMS.

function CaseStudy({ slug }) {
  const film = window.getFilm(slug);
  if (!film) {
    return <div style={{ padding: 80, color: "var(--ink)" }}>No film found for slug: {slug}</div>;
  }

  // Find the next case study in FILMS order, wrapping at the end.
  const allFilms = window.FILMS;
  const idx = allFilms.findIndex(f => f.slug === slug);
  const next = allFilms[(idx + 1) % allFilms.length];

  return (
    <div style={{ position: "relative" }}>
      <Nav crumb={film.title} />

      {/* HERO — full-bleed wipe slider so the grade reveal lands the moment the page loads */}
      <section style={{ position: "relative", height: "min(720px, 86vh)" }}>
        <WipeSlider
          src={film.hero}
          height="100%"
          vtName={`film-${film.slug}`}
        />
        {/* title overlay — bottom-left, doesn't block the wipe */}
        <div style={{ position: "absolute", left: 48, bottom: 48, right: 48, pointerEvents: "none" }}>
          <div style={{ fontSize: 13.5, color: "rgba(237,232,221,0.75)", marginBottom: 18, letterSpacing: "0.04em" }}>
            {film.kind} · Directed by {film.director} · {film.year}
          </div>
          <h1 style={{ fontSize: "clamp(64px, 10vw, 132px)", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 0.88, margin: 0, color: "var(--ink)" }}>
            {film.title}.
          </h1>
        </div>
      </section>

      {/* META BAR — what the studio did, at a glance */}
      <section className="section" style={{ padding: "56px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, paddingTop: 4 }}>
          {[
            ["Studio role", film.studioRole],
            ["Format", film.studioMeta],
            ["Schedule", film.days],
            ["Capture", film.capture],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", marginBottom: 10 }}>{k}</div>
              <div style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.45 }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NOTE — colourist's note, two columns: heading + prose */}
      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 64 }}>
          <div style={{ fontSize: 13.5, color: "var(--dim)", paddingTop: 4 }}>Note</div>
          <p style={{ fontSize: 21, lineHeight: 1.6, margin: 0, maxWidth: "60ch", color: "var(--ink)" }}>
            {film.note}
          </p>
        </div>
      </section>

      {/* COMPARISON FRAMES — additional stills, each as a wipe slider */}
      <section className="section">
        <div className="section-head">
          <h2>Frames.</h2>
          <span className="meta">Drag the line on any frame.</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {film.stills.map((src, i) => (
            <div key={src}>
              <WipeSlider src={src} aspectRatio="16 / 9" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--dim)" }}>
                <span>Frame {String(i + 1).padStart(2, "0")}</span>
                <span>{film.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERABLES — quiet list */}
      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 64 }}>
          <div style={{ fontSize: 13.5, color: "var(--dim)", paddingTop: 4 }}>Deliverables</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {film.deliverables.map((d, i) => (
              <li key={d} style={{ fontSize: 18, lineHeight: 1.7, color: "var(--ink)", paddingBottom: 10, borderBottom: i < film.deliverables.length - 1 ? "1px dashed var(--rule)" : "none", marginBottom: 10 }}>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEXT CASE STUDY — cinematic teaser */}
      <section style={{ borderTop: "1px solid var(--rule)" }}>
        <a href={next.href} style={{ display: "block" }}>
          <div style={{ position: "relative", height: 380, overflow: "hidden" }}>
            <img
              src={next.hero}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.85)", transition: "filter 0.6s, transform 0.6s" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}></div>
            <div style={{ position: "absolute", left: 48, bottom: 36, right: 48 }}>
              <div style={{ fontSize: 13.5, color: "rgba(237,232,221,0.7)", marginBottom: 14, letterSpacing: "0.04em" }}>Next case study —</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
                <span style={{ fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1.0, color: "var(--ink)" }}>{next.title}.</span>
                <span style={{ fontSize: 14, color: "var(--ink)", borderBottom: "1px solid var(--faint)", paddingBottom: 2 }}>Open →</span>
              </div>
            </div>
          </div>
        </a>
      </section>

      <Footer />
    </div>
  );
}

// Read slug off the root element's data-slug, default to "skin".
const rootEl = document.getElementById("root");
const slug = rootEl.dataset.slug || "skin";
ReactDOM.createRoot(rootEl).render(<CaseStudy slug={slug} />);
