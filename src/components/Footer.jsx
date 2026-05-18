export default function Footer({ setActive }) {
  const cols = [
    [
      "Programs",
      [
        ["Strength Training", "programs"],
        ["HIIT & Cardio", "programs"],
        ["Yoga & Mobility", "programs"],
        ["Fat Burn", "programs"],
      ],
    ],
    [
      "Classes",
      [
        ["Personal Training", "classes"],
        ["Live Online", "classes"],
        ["Home Visits", "classes"],
        ["Book a Class", "booking"],
      ],
    ],
    [
      "Info",
      [
        ["Membership", "membership"],
        ["Nutrition", "nutrition"],
        ["About Us", "home"],
        ["Contact", "home"],
      ],
    ],
  ];

  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid #1a1a1a",
        padding: "48px 24px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontWeight: 900,
                fontSize: 22,
                marginBottom: 12,
              }}
            >
              <img
                src="/logo.png"
                alt="HariFitClub"
                style={{
                  width: 54,
                  height: 54,
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <span>
                HARI<span style={{ color: "#FF6B00" }}>FIT</span>CLUB
              </span>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#888",
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              Bengaluru's premier fitness club combining elite training,
              nutrition science, and a community of champions.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["in", "fb", "ig", "yt"].map((s) => (
                <div
                  key={s}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 6,
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: "#888",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          {cols.map(([heading, links]) => (
            <div key={heading}>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#888",
                  marginBottom: 16,
                }}
              >
                {heading}
              </h4>
              {links.map(([label, section]) => (
                <div
                  key={label}
                  onClick={() => setActive(section)}
                  style={{
                    fontSize: 14,
                    color: "#888",
                    padding: "5px 0",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid #1a1a1a",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <p style={{ fontSize: 13, color: "#888" }}>
            &copy; 2025 HariFitClub. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: "#888" }}>
            Privacy Policy &middot; Terms of Service
          </p>
        </div>
        <p
          style={{
            color: "#888",
            fontSize: 13,
            marginTop: 18,
            textAlign: "center",
          }}
        >
          Made with <span style={{ color: "#FF6B00" }}>♥</span> by{" "}
          <a
            href="https://www.linkedin.com/in/rajesh-singh1721/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#fff", fontWeight: 700 }}
          >
            Rajesh Singh
          </a>
        </p>
      </div>
    </footer>
  );
}
