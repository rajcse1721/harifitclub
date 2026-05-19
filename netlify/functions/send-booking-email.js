const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const bookingRows = (booking) =>
  [
    ["Name", booking.name],
    ["Phone", booking.phone],
    ["Email", booking.email],
    ["Class", booking.selectedClass],
    ["Date", booking.date],
    ["Time", booking.slot],
    ["Payment", booking.paymentStatus],
    ["Home Location", booking.homeLocation],
    ["Meeting Platform", booking.meetingProvider],
    ["Meeting Status", booking.meetingStatus],
    ["Meeting Link", booking.meetingUrl],
    ["Razorpay Payment ID", booking.razorpayPaymentId],
    ["Razorpay Order ID", booking.razorpayOrderId],
  ].filter(([, value]) => value);

const buildHtml = (booking) => `
  <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
    <h2 style="margin:0 0 16px">New Hari Fit Club Booking</h2>
    <table style="border-collapse:collapse;width:100%;max-width:620px">
      <tbody>
        ${bookingRows(booking)
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;background:#f7f7f7">${escapeHtml(label)}</td>
                <td style="border:1px solid #ddd;padding:8px">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const { booking, message } = JSON.parse(event.body || "{}");

    if (!booking?.name || !booking?.phone || !booking?.selectedClass) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Valid booking details are required" }),
      };
    }

    if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
      return {
        statusCode: 503,
        body: JSON.stringify({
          message: "Add RESEND_API_KEY and ADMIN_EMAIL in Netlify environment variables.",
        }),
      };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.FROM_EMAIL ||
          "Hari Fit Club <onboarding@resend.dev>",
        to: [process.env.ADMIN_EMAIL],
        reply_to: booking.email || undefined,
        subject: `New booking: ${booking.selectedClass} - ${booking.name}`,
        text: message,
        html: buildHtml(booking),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          message: result.message || "Unable to send booking email",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Admin email sent.", id: result.id }),
    };
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid email request" }),
    };
  }
};
