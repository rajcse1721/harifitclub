import { TESTIMONIALS } from "../data/constants";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Success Stories</div>
          <h2 className="section-title">Real Results, Real People</h2>
        </div>
        <div className="grid-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div style={{ color: "#FF6B00", fontSize: 14, marginBottom: 14 }}>
                {"★".repeat(t.stars)}
              </div>
              <div
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "#ccc",
                  marginBottom: 20,
                }}
              >
                "{t.text}"
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: t.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#fff",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
