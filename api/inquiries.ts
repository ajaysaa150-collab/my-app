import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, inquiries: [] });
  }

  if (req.method === 'POST') {
    const { fullName, email, phone = 'Not provided', company = 'Not provided', service, budget, message } = req.body || {};

    if (!fullName || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required inquiry fields.',
      });
    }

    const destinationEmail = process.env.TARGET_NOTIFICATION_EMAIL || 'ajaysaaa150@gmail.com';

    // Send email if SMTP is configured on Vercel environment variables
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Nexora Inquiries" <${process.env.SMTP_USER}>`,
          to: destinationEmail,
          replyTo: email,
          subject: `[Nexora New Lead] ${fullName} - ${service}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #4f46e5; margin-top: 0;">New Project Inquiry</h2>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Budget:</strong> ${budget}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; background: #f9fafb; padding: 12px; border-radius: 6px;">${message}</p>
            </div>
          `,
        });
      } catch (err: any) {
        console.warn('Vercel SMTP delivery failed:', err.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Thank You! Your inquiry has been received. Our team will contact you within 24 hours.',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
