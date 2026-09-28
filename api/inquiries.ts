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
    const hasSmtp = Boolean(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.WEB3FORMS_ACCESS_KEY);
    return res.status(200).json({ 
      success: true, 
      smtpConfigured: hasSmtp,
      targetEmail: process.env.TARGET_NOTIFICATION_EMAIL || 'ajaysaaa150@gmail.com'
    });
  }

  if (req.method === 'POST') {
    const { 
      fullName, 
      email, 
      phone = 'Not provided', 
      company = 'Not provided', 
      service, 
      budget, 
      message 
    } = req.body || {};

    if (!fullName || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required inquiry fields (Name, Email, Service, Message).',
      });
    }

    const destinationEmail = process.env.TARGET_NOTIFICATION_EMAIL || 'ajaysaaa150@gmail.com';
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || 'ajaysaaa150@gmail.com';
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '';
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || '';

    let emailDelivered = false;
    let deliveryMessage = '';

    // Strategy 1: Direct SMTP (e.g. Gmail SMTP with App Password)
    if (smtpPass) {
      try {
        const isSecure = smtpPort === 465;
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: isSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Nexora Leads" <${smtpUser}>`,
          to: destinationEmail,
          replyTo: email,
          subject: `⚡ [New Client Inquiry] ${fullName} - ${service}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
              <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">🚀 New Project Inquiry Received</h1>
                <p style="color: #e0e7ff; margin: 4px 0 0 0; font-size: 13px;">Submitted via Nexora Digital Agency Website</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; width: 140px; font-weight: 600;">Client Name:</td>
                  <td style="padding: 10px 0; color: #0f172a; font-weight: 700;">${fullName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Email Address:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; font-weight: 600;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                  <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Company / Brand:</td>
                  <td style="padding: 10px 0; color: #0f172a;">${company}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Service Required:</td>
                  <td style="padding: 10px 0; color: #4f46e5; font-weight: 700;">${service}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Estimated Budget:</td>
                  <td style="padding: 10px 0; color: #059669; font-weight: 700;">${budget}</td>
                </tr>
              </table>

              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569;">Project Brief / Message:</h3>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
                <p style="margin: 0;">Click 'Reply' in your email client to directly reply to ${fullName} (${email}).</p>
              </div>
            </div>
          `,
        });

        emailDelivered = true;
        deliveryMessage = `Delivered directly to ${destinationEmail} via SMTP.`;
      } catch (err: any) {
        console.error('Vercel SMTP delivery failed:', err.message);
        deliveryMessage = `SMTP error: ${err.message}`;
      }
    }

    // Strategy 2: Web3Forms fallback if key provided
    if (!emailDelivered && web3formsKey) {
      try {
        const w3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `[New Inquiry] ${fullName} - ${service}`,
            from_name: fullName,
            email: email,
            phone: phone,
            company: company,
            service: service,
            budget: budget,
            message: message,
          }),
        });

        if (w3Res.ok) {
          emailDelivered = true;
          deliveryMessage = `Delivered to ${destinationEmail} via Web3Forms.`;
        }
      } catch (err: any) {
        console.error('Web3Forms delivery failed:', err.message);
      }
    }

    return res.status(200).json({
      success: true,
      emailDelivered,
      deliveryMessage,
      targetEmail: destinationEmail,
      message: 'Thank You! Your inquiry has been received. Our team will contact you within 24 hours.',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
