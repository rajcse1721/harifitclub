const crypto = require("crypto");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const {
      order_id: serverOrderId,
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = JSON.parse(event.body || "{}");

    if (!serverOrderId || !orderId || !paymentId || !signature) {
      return {
        statusCode: 400,
        body: JSON.stringify({ verified: false, message: "Payment details missing" }),
      };
    }

    if (serverOrderId !== orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ verified: false, message: "Order mismatch" }),
      };
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return {
        statusCode: 503,
        body: JSON.stringify({
          verified: false,
          message: "Razorpay secret is not configured.",
        }),
      };
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const verified = expectedSignature === signature;

    return {
      statusCode: verified ? 200 : 400,
      body: JSON.stringify({
        verified,
        message: verified ? "Payment verified." : "Payment verification failed.",
      }),
    };
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ verified: false, message: "Invalid payment request" }),
    };
  }
};
