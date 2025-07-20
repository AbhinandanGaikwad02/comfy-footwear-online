export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name, status, orderId } = req.body;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Footwear Store <support@yourdomain.com>",
        to: [email],
        subject: `Order #${orderId} Status Updated`,
        html: `<p>Hi ${name}, your order status is now <strong>${status}</strong>.</p>`,
      }),
    });

    const data = await response.json();
    console.log("✅ Email sent:", data);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
