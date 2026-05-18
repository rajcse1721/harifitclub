import { NUTRITION_CARDS } from "../data/constants";

export default function Nutrition({ onBook }) {
  return (
    <section className="section" style={{ background: "#111" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <div className="section-tag">Nutrition</div>
            <h2 className="section-title">Fuel Your Performance</h2>
            <p className="section-sub" style={{ marginBottom: 32 }}>
              Fitness is 30% gym, 70% kitchen. Our nutrition experts craft
              personalized meal plans that work with your body and your goals.
            </p>
            <button className="btn btn-primary" onClick={onBook}>
              Get My Nutrition Plan →
            </button>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {NUTRITION_CARDS.map(({ icon, title, text }) => (
              <div
                key={title}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
                  {title}
                </div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
