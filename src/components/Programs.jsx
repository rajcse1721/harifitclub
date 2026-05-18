import { useState } from "react";
import { PROGRAMS } from "../data/constants";

export default function Programs() {
  const [hov, setHov] = useState(null);

  return (
    <section className="section" style={{ background: "#111" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Training Programs</div>
          <h2 className="section-title">Built for Every Goal</h2>
          <p className="section-sub">
            Science-backed programs designed by experts to get you real,
            measurable results — fast.
          </p>
        </div>
        <div className="grid-4">
          {PROGRAMS.map((p, i) => (
            <div
              key={i}
              className="card"
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                borderColor: hov === i ? "#FF6B00" : "#2a2a2a",
                transform: hov === i ? "translateY(-4px)" : "none",
              }}
            >
              <div
                style={{
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 50,
                  background: p.bg,
                }}
              >
                {p.emoji}
              </div>
              <div style={{ padding: 18 }}>
                <span
                  style={{
                    background: p.badgeBg,
                    color: p.badgeColor,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 9px",
                    borderRadius: 4,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {p.badge}
                </span>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    margin: "10px 0 6px",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#888",
                    lineHeight: 1.6,
                    marginBottom: 14,
                  }}
                >
                  {p.desc}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    fontSize: 12,
                    color: "#888",
                  }}
                >
                  {p.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
