import { STATS } from "../data/constants";

export default function Home({ onBook, onPrograms }) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "56px 24px 32px",
        background: "radial-gradient(ellipse at 50% 0%,#2a1000 0%,#0f0f0f 65%)",
      }}
    >
      <img
        src="/logo.png"
        alt="HariFitClub"
        style={{
          width: "min(210px, 58vw)",
          height: "auto",
          display: "block",
          marginBottom: 40,
          filter: "drop-shadow(0 14px 24px rgba(255, 107, 0, 0.14))",
        }}
      />

      <h1
        style={{
          fontSize: "clamp(42px,5.8vw,78px)",
          fontWeight: 900,
          lineHeight: 1.08,
          marginBottom: 18,
          color: "#fff",
        }}
      >
        Train Hard.
        <br />
        Live <span style={{ color: "#FF6B00" }}>Strong.</span>
      </h1>

      <p
        style={{
          fontSize: 17,
          color: "#888",
          maxWidth: 480,
          lineHeight: 1.7,
          marginBottom: 34,
        }}
      >
        Elite fitness coaching, personalized programs, and a community that
        pushes you beyond your limits.
      </p>

      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button className="btn btn-primary" onClick={onBook}>
          Start Free Trial
        </button>
        <button className="btn btn-outline" onClick={onPrograms}>
          View Programs
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 48,
          marginTop: 56,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {STATS.map(({ num, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#FF6B00" }}>
              {num}
            </div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
