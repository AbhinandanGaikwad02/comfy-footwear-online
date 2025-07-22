import type { VercelRequest, VercelResponse } from '@vercel/node';
import emailjs from '@emailjs/nodejs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { email, name, status, orderId } = req.body;

  try {
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        to_email: email,
        user_name: name,
        order_status: status,
        order_id: orderId,
      },
      {
        publicKey: process.env.EMAILJS_USER_ID!,
      }
    );

    console.log('✅ Email sent:', result.status);
    return res.status(200).json({ success: true, status: result.status });
  } catch (err: any) {
    console.error('❌ EmailJS error:', err.text || err.message);
    return res.status(500).json({ error: 'Email sending failed' });
  }
}
