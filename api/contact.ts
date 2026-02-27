import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const REQUIRED_FIELDS = ["name", "email", "message"] as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, service, message } = req.body ?? {};

  const missing = REQUIRED_FIELDS.filter((f) => !req.body?.[f]?.trim());
  if (missing.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${missing.join(", ")}` });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const recipient =
    process.env.CONTACT_RECIPIENT_EMAIL || "machariashadie@gmail.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  const resend = new Resend(apiKey);

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${escapeHtml(email)}</td></tr>
      ${phone ? `<tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${escapeHtml(phone)}</td></tr>` : ""}
      ${service ? `<tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${escapeHtml(service)}</td></tr>` : ""}
      <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${escapeHtml(message)}</td></tr>
    </table>
  `;

  try {
    await resend.emails.send({
      from: `Mashdata Contact <${fromEmail}>`,
      to: recipient,
      replyTo: email,
      subject: `Contact Form: ${name}`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to send email:", err);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
