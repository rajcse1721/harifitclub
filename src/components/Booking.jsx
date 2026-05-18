import { useState } from "react";
import { TIME_SLOTS } from "../data/constants";

export default function Booking({ selectedClass, setSelectedClass }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [success, setSuccess] = useState("");

  const dateOptions = Array.from({ length: 14 }, (_, index) => {
    const optionDate = new Date();
    optionDate.setDate(optionDate.getDate() + index);

    const value = `${optionDate.getFullYear()}-${String(
      optionDate.getMonth() + 1,
    ).padStart(2, "0")}-${String(optionDate.getDate()).padStart(2, "0")}`;

    const label = optionDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return {
      value,
      label: index === 0 ? `Today - ${label}` : label,
    };
  });

  const confirm = () => {
    if (!name || !phone || !selectedClass || !date || !slot) {
      alert("Please fill all fields and pick a time slot.");
      return;
    }
    setSuccess(
      `Confirmed! ${name} - ${selectedClass} on ${date} at ${slot}. SMS sent to ${phone}.`,
    );
    setTimeout(() => setSuccess(""), 6000);
  };

  return (
    <section className="section" style={{ background: "#111" }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <div className="section-header">
          <div className="section-tag">Book a Class</div>
          <h2 className="section-title">Reserve Your Spot</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Pick your class, choose a date and time, and confirm instantly.
          </p>
        </div>

        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 16,
            padding: 32,
          }}
        >
          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "#888",
                  marginBottom: 7,
                }}
              >
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "#888",
                  marginBottom: 7,
                }}
              >
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: 20 }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "#888",
                  marginBottom: 7,
                }}
              >
                Class Type
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select class type</option>
                {["Personal Training", "Live Online Class", "Home Visit"].map(
                  (o) => (
                    <option key={o}>{o}</option>
                  ),
                )}
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "#888",
                  marginBottom: 7,
                }}
              >
                Date
              </label>
              <select value={date} onChange={(e) => setDate(e.target.value)}>
                <option value="">Select date</option>
                {dateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label
            style={{
              display: "block",
              fontSize: 13,
              color: "#888",
              marginBottom: 10,
            }}
          >
            Time Slot
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(88px,1fr))",
              gap: 8,
              marginBottom: 24,
            }}
          >
            {TIME_SLOTS.map(({ time, full }) => (
              <div
                key={time}
                onClick={() => !full && setSlot(time)}
                style={{
                  padding: "9px 6px",
                  borderRadius: 6,
                  border: `1px solid ${slot === time ? "#FF6B00" : "#2a2a2a"}`,
                  textAlign: "center",
                  fontSize: full ? 11 : 13,
                  cursor: full ? "not-allowed" : "pointer",
                  background:
                    slot === time
                      ? "#FF6B00"
                      : full
                        ? "#161616"
                        : "transparent",
                  color: full ? "#333" : slot === time ? "#fff" : "#888",
                  transition: "all .2s",
                }}
              >
                {time}
                {full && <div style={{ fontSize: 10 }}>Full</div>}
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "14px 0",
            }}
            onClick={confirm}
          >
            Confirm Booking
          </button>

          {success && (
            <div
              style={{
                marginTop: 14,
                background: "#002200",
                border: "1px solid #004400",
                color: "#44ff44",
                padding: 13,
                borderRadius: 7,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {success}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
