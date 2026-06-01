// Landing page composition. Reads FILMS, SOUND_RECENT, TOOLS from window.

function Landing() {
  return (
    <div style={{ position: "relative" }}>
      <Nav />

      {/* HERO — full bleed reel still + play affordance */}
      <section style={{ position: "relative", height: "min(820px, 92vh)", overflow: "hidden" }}>
        <img
          src="images/feeble/3.jpg"
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%", objectFit: "cover",
            objectPosition: "center 40%",
            filter: "brightness(0.68) saturate(0.92)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.85) 100%)" }}></div>

        {/* Showreel button */}
        <button style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex", alignItems: "center", gap: 16,
          background: "transparent", border: "none",
          color: "var(--ink)", fontFamily: "var(--font)", fontSize: 14.5, letterSpacing: "0.04em",
          cursor: "pointer",
        }}>
          <span style={{
            width: 64, height: 64, borderRadius: "50%",
            border: "1px solid rgba(237,232,221,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14,
          }}>▶</span>
          <span>Showreel 2026 · 1:48</span>
        </button>

        {/* Bottom-anchored title */}
        <div style={{ position: "absolute", left: 48, right: 48, bottom: 60 }}>
          <div style={{ fontSize: 14, color: "rgba(237,232,221,0.7)", marginBottom: 22, letterSpacing: "0.04em" }}>
            A post-production studio for filmmakers. Scotland.
          </div>
          <h1 style={{
            fontSize: "clamp(64px, 11vw, 144px)",
            fontWeight: 600, letterSpacing: "-0.045em",
            lineHeight: 0.88, margin: 0, color: "var(--ink)",
          }}>The Studio.</h1>
        </div>
      </section>

      {/* TRIPTYCH — three doors, each links to its section */}
      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          <a href="#colour" className="triptych-card">
            <div className="media">
              <img src="images/feeble/3.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88)" }} />
              <span className="jump"><span>To the suite</span><span className="arrow">↓</span></span>
            </div>
            <div style={{ paddingTop: 20 }}>
              <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8 }}>Colour.</div>
              <div style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.55 }}>
                Davinci Resolve, ACES managed. From single pickups to full feature delivery. HDR-ready.
              </div>
              <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 14 }}>
                Recent — SKIN · FEEBLE · Downtown Lights
              </div>
            </div>
          </a>

          <a href="#sound" className="triptych-card">
            <div className="media">
              <img src="assets/sound-room.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88)" }} />
              <span className="jump"><span>To the room</span><span className="arrow">↓</span></span>
            </div>
            <div style={{ paddingTop: 20 }}>
              <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8 }}>Sound.</div>
              <div style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.55 }}>
                Dialogue first, music second. Mix and premix for streaming and broadcast. Stereo, 5.1, and 7.1.4 Atmos in-house.
              </div>
              <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 14 }}>
                Pro Tools · Adam Audio + Genelec · Dunkeld
              </div>
            </div>
          </a>

          <a href="#tools" className="triptych-card">
            <div className="media">
              <Placeholder src="images/sneaker/4.hd.jpg" kind="the bench" caption="Tools we build for the work we do." height={380} />
              <span className="jump"><span>To the bench</span><span className="arrow">↓</span></span>
            </div>
            <div style={{ paddingTop: 20 }}>
              <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8 }}>Tools.</div>
              <div style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.55 }}>
                Software we build for ourselves and our peers. The dailies pipeline. Timecode utilities. Open source where it helps.
              </div>
              <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 14 }}>
                github.com/imlach
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* COLOUR deep-dive — the work grid lives inside */}
      <section className="section" id="colour">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start", marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 13.5, color: "var(--dim)", marginBottom: 18, letterSpacing: "0.04em" }}>01 — the suite</div>
            <h2 style={{ fontSize: "clamp(56px, 7vw, 92px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.92, margin: 0 }}>Colour.</h2>
          </div>
          <div style={{ paddingTop: 14 }}>
            <p style={{ fontSize: 19, lineHeight: 1.65, margin: 0 }}>
              Davinci Resolve. ACES managed end-to-end. From single pickups to full feature delivery.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--dim)", margin: "20px 0 0", maxWidth: "56ch" }}>
              We grade the films we shoot, and the films our friends shoot. Look development, conform, HDR + SDR masters in every flavour. Custom LUTs and CDL workflows when the project calls for it.
            </p>
          </div>
        </div>

        {/* Selected work — the visible body of the colour section */}
        <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 40, marginBottom: 56 }}>
          <div className="section-head" style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.005em", margin: 0, color: "var(--dim)" }}>Selected work.</h3>
            <span className="meta">Hover to preview the grade reveal. Open for the full case study.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {window.FILMS.map((f) => (
              <SweepCard key={f.slug} film={f} vtName={`film-${f.slug}`} />
            ))}
          </div>
        </div>

        {/* Service rows */}
        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {[
            { t: "Grade", d: "Davinci Resolve, ACES-managed. From single pickups to full feature delivery." },
            { t: "Look development", d: "Custom LUTs, CDL workflows, on-set viewing pipelines." },
            { t: "Conform & online", d: "Sync to picture, VFX integration, final masters and deliverables." },
          ].map((s, i) => (
            <div key={s.t} style={{ display: "grid", gridTemplateColumns: "320px 1fr 120px", gap: 32, padding: "26px 0", borderBottom: "1px solid var(--rule)", alignItems: "baseline" }}>
              <span style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>{s.t}</span>
              <span style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.55 }}>{s.d}</span>
              <span style={{ fontSize: 13, color: "var(--faint)", textAlign: "right" }}>0{i + 1}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "36px 0 0" }}>
          <div style={{ fontSize: 14, color: "var(--dim)", marginBottom: 14 }}>Recent — colour</div>
          <div style={{ fontSize: 17, lineHeight: 1.7 }}>
            {window.FILMS.map(f => `${f.title} (${f.year})`).join(" · ")}
          </div>
        </div>
      </section>

      {/* SOUND deep-dive */}
      <section className="section" id="sound">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start", marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 13.5, color: "var(--dim)", marginBottom: 18, letterSpacing: "0.04em" }}>02 — the sound room</div>
            <h2 style={{ fontSize: "clamp(56px, 7vw, 92px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.92, margin: 0 }}>Sound.</h2>
          </div>
          <div style={{ paddingTop: 14 }}>
            <p style={{ fontSize: 19, lineHeight: 1.65, margin: 0 }}>
              A small, treated room in Dunkeld. Adam Audio nearfields, Genelec 7.1.4 Atmos, Pro Tools.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--dim)", margin: "20px 0 0", maxWidth: "56ch" }}>
              We mix the films we shoot, and the films our friends shoot. Dialogue editing, ADR supervision, premix for streaming and broadcast, masters in stereo, 5.1, and 7.1.4 Atmos.
            </p>
          </div>
        </div>

        {/* Real photograph of the room */}
        <div style={{ position: "relative", overflow: "hidden", height: 480 }}>
          <img
            src="assets/sound-room.png"
            alt="The mix room — Adam Audio + Genelec 7.1.4 Atmos in Dunkeld"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ padding: "44px 0 0" }}>
          {[
            { t: "Dialogue edit", d: "Cleanup, room tone, ADR conform. Per-reel or per-scene." },
            { t: "Mix", d: "Music, dialogue, FX balance. Theatrical and streaming masters." },
            { t: "Atmos & immersive", d: "7.1.4 in-house. Stereo and 5.1 fold-downs delivered alongside." },
          ].map((s, i) => (
            <div key={s.t} style={{ display: "grid", gridTemplateColumns: "320px 1fr 120px", gap: 32, padding: "26px 0", borderTop: "1px solid var(--rule)", alignItems: "baseline" }}>
              <span style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>{s.t}</span>
              <span style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.55 }}>{s.d}</span>
              <span style={{ fontSize: 13, color: "var(--faint)", textAlign: "right" }}>0{i + 1}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--rule)", padding: "36px 0 0" }}>
            <div style={{ fontSize: 14, color: "var(--dim)", marginBottom: 14 }}>Recent — sound</div>
            <div style={{ fontSize: 17, lineHeight: 1.7 }}>
              <em style={{ color: "var(--dim)", fontStyle: "normal" }}>Mix —</em> {window.SOUND_RECENT.mix.join(" · ")}<br />
              <em style={{ color: "var(--dim)", fontStyle: "normal" }}>Dialogue edit —</em> {window.SOUND_RECENT.dialogue.join(" · ")}
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS deep-dive */}
      <section className="section" id="tools">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start", marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 13.5, color: "var(--dim)", marginBottom: 18, letterSpacing: "0.04em" }}>03 — the bench</div>
            <h2 style={{ fontSize: "clamp(56px, 7vw, 92px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.92, margin: 0 }}>Tools.</h2>
          </div>
          <div style={{ paddingTop: 14 }}>
            <p style={{ fontSize: 19, lineHeight: 1.65, margin: 0 }}>
              We make software for the work we do. Open source where it helps. Internal where it has to be.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--dim)", margin: "20px 0 0", maxWidth: "56ch" }}>
              Run by a director of photography who's also a platform engineer. The tools come out of the friction of doing the work, not out of a roadmap.
            </p>
          </div>
        </div>

        {/* Featured tool */}
        <div style={{ position: "relative", height: 520, overflow: "hidden", border: "1px solid var(--rule)" }}>
          <Placeholder src="images/bynow/4.hd.jpg" kind="dailies pipeline" caption="A still from the tool itself — search interface or processing overview." height={520} />
          <div style={{ position: "absolute", top: 24, left: 28, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(237,232,221,0.85)" }}>In development</div>
          <div style={{ position: "absolute", bottom: 32, left: 28, right: 28 }}>
            <h3 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 0.95, margin: 0 }}>{window.TOOLS[0].name}.</h3>
            <p style={{ fontSize: 16.5, color: "rgba(237,232,221,0.8)", maxWidth: "60ch", margin: "18px 0 0", lineHeight: 1.55 }}>
              {window.TOOLS[0].desc}
            </p>
          </div>
        </div>

        <div style={{ padding: "48px 0 0", display: "grid", gridTemplateColumns: "240px 1fr", gap: 64 }}>
          <div style={{ fontSize: 13.5, color: "var(--dim)", paddingTop: 4 }}>Why</div>
          <p style={{ fontSize: 17.5, lineHeight: 1.65, margin: 0, maxWidth: "62ch" }}>
            Most colour and edit suites don't talk to your shoot the way they should. The work that gets lost in the dailies process is the same work that gets re-done in the grade — finding the take, finding the line, finding the look. <span style={{ color: "var(--dim)" }}>So we built something that doesn't lose it.</span>
          </p>
        </div>

        <div style={{ padding: "44px 0 0" }}>
          <div style={{ fontSize: 14, color: "var(--dim)", marginBottom: 18, borderTop: "1px solid var(--rule)", paddingTop: 28 }}>Released</div>
          {window.TOOLS.slice(1).map(t => (
            <div key={t.slug} style={{ display: "grid", gridTemplateColumns: "320px 1fr 140px", gap: 32, padding: "20px 0", borderBottom: "1px solid var(--rule)", alignItems: "baseline" }}>
              <span style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.015em" }}>{t.name}</span>
              <span style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.55 }}>{t.desc}</span>
              {t.link && <a href={t.link} style={{ fontSize: 13, color: "var(--ink)", borderBottom: "1px solid var(--faint)", paddingBottom: 2, textAlign: "right" }} target="_blank" rel="noopener">github.com/imlach ↗</a>}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Landing />);
