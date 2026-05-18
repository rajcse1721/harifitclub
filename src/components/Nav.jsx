import { useState } from "react";
import { NAV_LINKS } from "../data/constants";

export default function Nav({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(8,8,8,0.97)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #1f1f1f",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontWeight: 900,
              fontSize: 20,
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => setActive("home")}
            aria-label="Go to HariFitClub home"
          >
            <img
              src="/logo.png"
              alt="HariFitClub"
              style={{
                width: 44,
                height: 44,
                objectFit: "contain",
                display: "block",
              }}
            />
            <span>
              HARI<span style={{ color: "#FF6B00" }}>FIT</span>CLUB
            </span>
          </div>

          {/* Desktop Links */}
          <ul
            style={{
              display: "flex",
              gap: 28,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="hide-mobile"
          >
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <span
                  onClick={() => setActive(link)}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    color: active === link ? "#fff" : "#888",
                    textTransform: "capitalize",
                    transition: "color 0.2s",
                  }}
                >
                  {link}
                </span>
              </li>
            ))}
          </ul>

          <button
            className="btn btn-primary hide-mobile"
            onClick={() => setActive("booking")}
          >
            Book a Class
          </button>

          {/* Hamburger */}
          <div
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
            className="show-mobile"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 22,
                  height: 2,
                  background: "#fff",
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            background: "rgba(8,8,8,0.98)",
            zIndex: 99,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            borderBottom: "1px solid #1f1f1f",
          }}
        >
          {NAV_LINKS.map((link) => (
            <span
              key={link}
              onClick={() => {
                setActive(link);
                setMenuOpen(false);
              }}
              style={{
                padding: "12px 16px",
                fontSize: 15,
                color: "#888",
                cursor: "pointer",
                borderRadius: 6,
                textTransform: "capitalize",
              }}
            >
              {link}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
