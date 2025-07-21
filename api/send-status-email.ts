// /api/send-status-email.ts (Vercel API route)

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, status, orderId } = req.body;

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.VITE_EMAILJS_SERVICE_ID,
        template_id: "template_s6tyf2f",
        user_id: process.env.VITE_EMAILJS_USER_ID,
        template_params: {
          name,
          email,
          status,
          orderId,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Failed to send EmailJS email:", data);
      return res.status(500).json({ error: "EmailJS error", detail: data });
    }

    console.log("✅ Email sent via EmailJS:", data);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
