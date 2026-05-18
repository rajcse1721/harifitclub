import { CLASSES } from "../data/constants";

export default function Classes({ onBook }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Class Types</div>
          <h2 className="section-title">Train Your Way</h2>
          <p className="section-sub">
            Choose the format that fits your lifestyle — in-person, online, or
            at your doorstep.
          </p>
        </div>
        <div className="grid-3">
          {CLASSES.map((c, i) => (
            <div
              key={i}
              style={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                padding: 26,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  background: c.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 18,
                }}
              >
                {c.icon}
              </div>
              <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 8 }}>
                {c.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#888",
                  lineHeight: 1.6,
                  marginBottom: 18,
                }}
              >
                {c.desc}
              </div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 22 }}>
                {c.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 13,
                      color: "#888",
                      padding: "5px 0",
                      borderBottom: "1px solid #1f1f1f",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#FF6B00", fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-primary"
                onClick={() => onBook(c.type)}
              >
                Book Session →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
