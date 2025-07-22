import type { VercelRequest, VercelResponse } from '@vercel/node';
import emailjs from '@emailjs/nodejs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { email, name, status, orderId } = req.body;

  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log("📨 Sending EmailJS with:", {
    email, name, status, orderId, time: now,
  });

  console.log("🔐 ENV:", {
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
  });

  try {
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        to_email: email,
        user_name: name,
        order_status: status,
        order_id: orderId,
        email,
        name,
        time: now,
        message: `Your order was marked as ${status}.`,
      },
      {
        publicKey: process.env.EMAILJS_USER_ID!,
      }
    );

    console.log('✅ Email sent:', result.status);
    return res.status(200).json({ success: true, status: result.status });
  } catch (err: any) {
    console.error('❌ EmailJS error:', err);
    return res.status(500).json({ error: 'Email sending failed', detail: err });
  }
}
