import nodemailer from "nodemailer";

/**
 * Contact form backend. Configure in .env.local (see .env.example):
 *   SMTP_USER: your Gmail address
 *   SMTP_PASS: a Gmail App Password (myaccount.google.com/apppasswords)
 *   CONTACT_TO: where messages land (defaults to SMTP_USER)
 * Any other SMTP provider works via SMTP_HOST / SMTP_PORT.
 */
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 200);
  const email = String(body.email || "").trim().slice(0, 200);
  const subject = String(body.subject || "").trim().slice(0, 300);
  const message = String(body.message || "").trim().slice(0, 5000);

  if (!name || !email || !message) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    // Not configured yet: the frontend falls back to a mailto: link.
    return Response.json({ error: "unconfigured" }, { status: 503 });
  }

  try {
    const port = Number(SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, "'")}" <${email}>`,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
      text: `${message}\n\n- ${name} (${email})`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("contact form send failed:", err?.message);
    return Response.json({ error: "send_failed" }, { status: 500 });
  }
}
