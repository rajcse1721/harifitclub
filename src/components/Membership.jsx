import { PLANS } from "../data/constants";

export default function Membership({ onBook }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Membership Plans</div>
          <h2 className="section-title">Pick Your Plan</h2>
          <p className="section-sub">
            Transparent pricing, no hidden fees. Cancel anytime.
          </p>
        </div>
        <div className="grid-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              style={{
                background: "#1a1a1a",
                border: `1px solid ${p.popular ? "#FF6B00" : "#2a2a2a"}`,
                borderRadius: 14,
                padding: 28,
                position: "relative",
              }}
            >
              {p.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#FF6B00",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "3px 14px",
                    borderRadius: 50,
                    whiteSpace: "nowrap",
                  }}
                >
                  ⭐ Most Popular
                </div>
              )}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 14,
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                <sup
                  style={{
                    fontSize: 18,
                    verticalAlign: "top",
                    marginTop: 8,
                    display: "inline-block",
                  }}
                >
                  ₹
                </sup>
                {p.price}
                <sub style={{ fontSize: 14, fontWeight: 400, color: "#888" }}>
                  /mo
                </sub>
              </div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>
                {p.desc}
              </div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                {p.features.map((f) => (
                  <li
                    key={f.t}
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #1f1f1f",
                      fontSize: 13,
                      color: f.y ? "#ddd" : "#555",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        color: f.y ? "#FF6B00" : "#333",
                        fontWeight: 700,
                      }}
                    >
                      {f.y ? "✓" : "✗"}
                    </span>
                    {f.t}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${p.popular ? "btn-primary" : "btn-outline"}`}
                style={{ width: "100%", justifyContent: "center" }}
                onClick={onBook}
              >
                {p.name === "Pro"
                  ? "Get Pro"
                  : p.name === "Elite"
                    ? "Go Elite"
                    : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
