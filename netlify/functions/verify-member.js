const normalizePhone = (phone = "") =>
  phone.replace(/\D/g, "").replace(/^0+/, "").replace(/^91/, "");

const splitEnvList = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const { phone = "", memberCode = "" } = JSON.parse(event.body || "{}");
    const activePhones = splitEnvList(process.env.ACTIVE_MEMBER_PHONES).map(
      normalizePhone,
    );
    const activeCodes = splitEnvList(process.env.ACTIVE_MEMBER_CODES).map((code) =>
      code.toLowerCase(),
    );

    const normalizedPhone = normalizePhone(phone);
    const normalizedCode = memberCode.trim().toLowerCase();
    const activeByPhone =
      normalizedPhone && activePhones.includes(normalizedPhone);
    const activeByCode = normalizedCode && activeCodes.includes(normalizedCode);

    return {
      statusCode: 200,
      body: JSON.stringify({
        active: Boolean(activeByPhone || activeByCode),
        message:
          activeByPhone || activeByCode
            ? "Membership verified."
            : "No active membership found. Please pay to book this session.",
      }),
    };
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ active: false, message: "Invalid member request" }),
    };
  }
};
