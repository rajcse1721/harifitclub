const BOOKING_PRICES = {
  "Personal Training": 799,
  "Live Online Class": 299,
  "Home Visit": 999,
  Strength: 399,
  HIIT: 399,
  Yoga: 299,
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const { booking } = JSON.parse(event.body || "{}");
    const selectedClass = booking?.selectedClass;
    const amount = BOOKING_PRICES[selectedClass];

    if (!booking?.name || !booking?.phone || !selectedClass || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Valid booking details are required" }),
      };
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return {
        statusCode: 503,
        body: JSON.stringify({
          message:
            "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Netlify.",
        }),
      };
    }

    const receipt = `hari_${Date.now()}`;
    const auth = Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
    ).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: "INR",
        receipt,
        notes: {
          classType: selectedClass,
          date: booking.date,
          slot: booking.slot,
          phone: booking.phone,
        },
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          message: order.error?.description || "Unable to create Razorpay order",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        keyId: process.env.RAZORPAY_KEY_ID,
        order,
      }),
    };
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid Razorpay order request" }),
    };
  }
};
