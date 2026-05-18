const PROVIDER_LINKS = {
  Zoom: process.env.ZOOM_MEETING_URL,
  Teams: process.env.TEAMS_MEETING_URL,
};

const requiredFields = ["name", "phone", "selectedClass", "date", "slot", "meetingProvider"];

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const booking = JSON.parse(event.body || "{}");
    const missingField = requiredFields.find((field) => !booking[field]);

    if (missingField) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `${missingField} is required` }),
      };
    }

    const joinUrl = PROVIDER_LINKS[booking.meetingProvider] || "";

    if (joinUrl) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "confirmed",
          joinUrl,
          message: `${booking.meetingProvider} meeting link created for ${booking.date} at ${booking.slot}.`,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "pending",
        joinUrl: "",
        message:
          "Add ZOOM_MEETING_URL or TEAMS_MEETING_URL in Netlify environment variables to return a live joining link automatically.",
      }),
    };
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid booking request" }),
    };
  }
};
