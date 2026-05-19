import { useState } from "react";
import { BOOKING_PRICES, TIME_SLOTS } from "../data/constants";

const ONLINE_CLASS = "Live Online Class";
const HOME_VISIT_CLASS = "Home Visit";
const MEETING_PROVIDERS = ["Zoom", "Teams"];

const getClassDates = (date, slot) => {
  const [time, meridiem] = slot.split(" ");
  const [hourText, minuteText] = time.split(":");
  let hour = Number(hourText);
  const minute = Number(minuteText);

  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  const start = new Date(`${date}T00:00:00`);
  start.setHours(hour, minute, 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 60);

  return { start, end };
};

const toCalendarStamp = (date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const buildCalendarUrl = ({ name, selectedClass, date, slot, provider, joinUrl }) => {
  const { start, end } = getClassDates(date, slot);
  const details = [
    `Booking name: ${name}`,
    provider ? `Meeting platform: ${provider}` : null,
    joinUrl ? `Join link: ${joinUrl}` : "Meeting link will be shared after confirmation.",
  ]
    .filter(Boolean)
    .join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${selectedClass} with Hari Fit Club`,
    dates: `${toCalendarStamp(start)}/${toCalendarStamp(end)}`,
    details,
    location: joinUrl || provider || "Hari Fit Club",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const buildBookingMessage = ({
  name,
  phone,
  email,
  selectedClass,
  date,
  slot,
  homeLocation,
  meetingProvider,
  meetingUrl,
  paymentStatus,
}) =>
  [
    "Hari Fit Club booking confirmed",
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    `Class: ${selectedClass}`,
    `Date: ${date}`,
    `Time: ${slot}`,
    paymentStatus ? `Payment: ${paymentStatus}` : null,
    homeLocation ? `Home location: ${homeLocation}` : null,
    meetingProvider ? `Meeting platform: ${meetingProvider}` : null,
    meetingUrl ? `Meeting link: ${meetingUrl}` : null,
  ]
    .filter(Boolean)
    .join("\n");

const loadRazorpayCheckout = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Unable to load Razorpay Checkout"));
    document.body.appendChild(script);
  });

const requestJson = async (url, payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

const createOnlineMeeting = async (booking) => {
  try {
    return await requestJson("/.netlify/functions/create-online-meeting", booking);
  } catch {
    return {
      status: "pending",
      joinUrl: "",
      message: "Meeting request saved. The trainer will share the joining link shortly.",
    };
  }
};

const saveBooking = (booking) => {
  const existing = JSON.parse(localStorage.getItem("hariFitBookings") || "[]");
  localStorage.setItem(
    "hariFitBookings",
    JSON.stringify([{ ...booking, createdAt: new Date().toISOString() }, ...existing]),
  );
};

export default function Booking({ selectedClass, setSelectedClass }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [memberCode, setMemberCode] = useState("");
  const [memberStatus, setMemberStatus] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [homeLocation, setHomeLocation] = useState("");
  const [meetingProvider, setMeetingProvider] = useState("Zoom");
  const [calendarUrl, setCalendarUrl] = useState("");
  const [adminNotice, setAdminNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const isOnlineClass = selectedClass === ONLINE_CLASS;
  const isHomeVisit = selectedClass === HOME_VISIT_CLASS;
  const isVerifiedMember = memberStatus === "active";
  const bookingPrice = BOOKING_PRICES[selectedClass] || 0;

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

    return { value, label: index === 0 ? `Today - ${label}` : label };
  });

  const validateBooking = () => {
    if (!name || !phone || !selectedClass || !date || !slot) {
      alert("Please fill all fields and pick a time slot.");
      return false;
    }

    if (email && !email.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (isHomeVisit && !homeLocation.trim()) {
      alert("Please share your home location for the home visit.");
      return false;
    }

    if (!bookingPrice) {
      alert("Please select a valid class type.");
      return false;
    }

    return true;
  };

  const getBookingDetails = () => ({
    name,
    phone,
    email,
    selectedClass,
    date,
    slot,
    homeLocation: isHomeVisit ? homeLocation.trim() : "",
    meetingProvider: isOnlineClass ? meetingProvider : "",
  });

  const resetConfirmationActions = () => {
    setCalendarUrl("");
    setAdminNotice("");
  };

  const verifyMember = async () => {
    if (!phone && !memberCode) {
      alert("Enter phone number or member code to verify membership.");
      return;
    }

    setMemberStatus("checking");

    try {
      const result = await requestJson("/.netlify/functions/verify-member", {
        phone,
        memberCode,
      });
      setMemberStatus(result.active ? "active" : "inactive");
      setSuccess(result.message);
    } catch (error) {
      setMemberStatus("inactive");
      alert(error.message);
    }
  };

  const finalizeBooking = async (booking, paymentInfo) => {
    setLoading(true);
    resetConfirmationActions();

    const meeting = isOnlineClass
      ? await createOnlineMeeting(booking)
      : { status: "confirmed", joinUrl: "", message: "" };

    const bookingRecord = {
      ...booking,
      meetingStatus: meeting.status,
      meetingUrl: meeting.joinUrl,
      paymentStatus: paymentInfo.status,
      razorpayPaymentId: paymentInfo.razorpayPaymentId || "",
      razorpayOrderId: paymentInfo.razorpayOrderId || "",
    };

    saveBooking(bookingRecord);

    try {
      await requestJson("/.netlify/functions/send-booking-email", {
        booking: bookingRecord,
        message: buildBookingMessage(bookingRecord),
      });
      setAdminNotice("Admin/trainer has been notified by email.");
    } catch (error) {
      setAdminNotice(`Booking saved, but admin email failed: ${error.message}`);
    }

    setSuccess(
      `${booking.selectedClass} booked for ${booking.name} on ${booking.date} at ${booking.slot}. Payment status: ${paymentInfo.status}.`,
    );
    setCalendarUrl(
      isOnlineClass
        ? buildCalendarUrl({
            ...booking,
            provider: booking.meetingProvider,
            joinUrl: meeting.joinUrl,
          })
        : "",
    );
    setLoading(false);
  };

  const startRazorpayPayment = async (booking) => {
    setLoading(true);

    try {
      await loadRazorpayCheckout();
      const { keyId, order } = await requestJson(
        "/.netlify/functions/create-razorpay-order",
        { booking },
      );

      const checkout = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Hari Fit Club",
        description: `${booking.selectedClass} booking`,
        order_id: order.id,
        prefill: {
          name: booking.name,
          email: booking.email,
          contact: booking.phone,
        },
        notes: {
          classType: booking.selectedClass,
          date: booking.date,
          slot: booking.slot,
        },
        handler: async (payment) => {
          try {
            await requestJson("/.netlify/functions/verify-razorpay-payment", {
              ...payment,
              order_id: order.id,
            });
            await finalizeBooking(booking, {
              status: "paid",
              razorpayPaymentId: payment.razorpay_payment_id,
              razorpayOrderId: payment.razorpay_order_id,
            });
          } catch (error) {
            setLoading(false);
            alert(error.message);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: { color: "#FF6B00" },
      });

      checkout.open();
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const confirm = async () => {
    if (!validateBooking()) return;

    const booking = getBookingDetails();

    if (isVerifiedMember) {
      await finalizeBooking(booking, { status: "member" });
      return;
    }

    await startRazorpayPayment(booking);
  };

  const fillCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Location sharing is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setHomeLocation(
          `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
        );
      },
      () => alert("Unable to access location. Please type your address manually."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <section className="section" style={{ background: "#111" }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <div className="section-header">
          <div className="section-tag">Book a Class</div>
          <h2 className="section-title">Reserve Your Spot</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Verify your membership or pay online to confirm your session.
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
              <label style={labelStyle}>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setMemberStatus("");
                }}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@example.com"
              />
            </div>
            <div>
              <label style={labelStyle}>Member Code</label>
              <input
                value={memberCode}
                onChange={(e) => {
                  setMemberCode(e.target.value);
                  setMemberStatus("");
                }}
                placeholder="Optional for paid members"
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <button
              className="btn btn-outline"
              type="button"
              onClick={verifyMember}
              disabled={memberStatus === "checking"}
              style={{ justifyContent: "center" }}
            >
              {memberStatus === "checking" ? "Checking..." : "Verify Member"}
            </button>
            <div
              style={{
                border: "1px solid #2a2a2a",
                borderRadius: 7,
                padding: "11px 13px",
                color:
                  memberStatus === "active"
                    ? "#44ff44"
                    : memberStatus === "inactive"
                      ? "#ffb044"
                      : "#888",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {memberStatus === "active"
                ? "Active member: payment not required."
                : memberStatus === "inactive"
                  ? `Not active: pay Rs. ${bookingPrice || 0} to book.`
                  : "Paid members can verify before booking."}
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>Class Type</label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setMemberStatus("");
                  setSuccess("");
                  resetConfirmationActions();
                }}
              >
                <option value="">Select class type</option>
                {[
                  "Personal Training",
                  ONLINE_CLASS,
                  HOME_VISIT_CLASS,
                  "Strength",
                  "HIIT",
                  "Yoga",
                ].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Date</label>
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

          {selectedClass && (
            <div style={noticeStyle}>
              {isVerifiedMember
                ? "Your active membership covers this booking."
                : `Session price: Rs. ${bookingPrice}. Active members can verify and skip payment.`}
            </div>
          )}

          {isOnlineClass && (
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Meeting Platform</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
                  gap: 10,
                }}
              >
                {MEETING_PROVIDERS.map((provider) => (
                  <button
                    key={provider}
                    type="button"
                    onClick={() => setMeetingProvider(provider)}
                    style={{
                      border: `1px solid ${
                        meetingProvider === provider ? "#FF6B00" : "#2a2a2a"
                      }`,
                      background:
                        meetingProvider === provider ? "#2a1000" : "#111",
                      color: meetingProvider === provider ? "#fff" : "#888",
                      borderRadius: 7,
                      padding: "12px 14px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    {provider}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isHomeVisit && (
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Home Location</label>
              <textarea
                value={homeLocation}
                onChange={(e) => setHomeLocation(e.target.value)}
                placeholder="Enter full address, landmark, or Google Maps link"
                rows={3}
              />
              <button
                className="btn btn-outline"
                type="button"
                onClick={fillCurrentLocation}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                Use Current Location
              </button>
            </div>
          )}

          <label style={{ ...labelStyle, marginBottom: 10 }}>Time Slot</label>
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
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isVerifiedMember
                ? "Confirm Member Booking"
                : `Pay & Book Rs. ${bookingPrice || 0}`}
          </button>

          {success && <div style={successStyle}>{success}</div>}
          {adminNotice && <div style={noticeStyle}>{adminNotice}</div>}

          {calendarUrl && (
            <a
              className="btn btn-outline"
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              Add Online Class to Calendar
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 13,
  color: "#888",
  marginBottom: 7,
};

const noticeStyle = {
  background: "#111",
  border: "1px solid #2a2a2a",
  borderRadius: 7,
  padding: 13,
  marginBottom: 20,
  color: "#ccc",
  fontSize: 14,
  lineHeight: 1.5,
};

const successStyle = {
  marginTop: 14,
  background: "#002200",
  border: "1px solid #004400",
  color: "#44ff44",
  padding: 13,
  borderRadius: 7,
  fontSize: 14,
  textAlign: "center",
};
