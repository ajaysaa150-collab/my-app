import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isDev = process.env.NODE_ENV !== 'production';

// Persistent storage file for inquiries
const DATA_FILE = path.resolve(process.cwd(), 'inquiries_db.json');

interface InquiryPayload {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  timestamp: string;
  destinationEmail: string;
  deliveryStatus: 'sent_smtp' | 'queued_server' | 'simulated';
  deliveryNote: string;
}

function loadInquiries(): InquiryPayload[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading inquiries_db.json:', err);
  }
  return [];
}

function saveInquiries(inquiries: InquiryPayload[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing inquiries_db.json:', err);
  }
}

app.use(express.json());

// API: Get current email forwarding configuration
app.get('/api/config', (_req, res) => {
  const targetEmail = process.env.TARGET_NOTIFICATION_EMAIL || 'ajaysaaa150@gmail.com';
  const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);

  res.json({
    targetEmail,
    smtpConfigured,
    agencyName: 'Nexora Digital Agency',
    agencyEmail: 'hello@nexoradigital.in',
  });
});

// API: Get all received inquiries
app.get('/api/inquiries', (_req, res) => {
  const inquiries = loadInquiries();
  res.json({ success: true, inquiries });
});

// API: Submit new inquiry & forward to destination email
app.post('/api/inquiries', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone = 'Not provided',
      company = 'Not provided',
      service,
      budget,
      message,
      targetEmail: customTargetEmail,
    } = req.body;

    if (!fullName || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required inquiry fields (fullName, email, service, message).',
      });
    }

    // Strictly server-enforced target recipient email (cannot be modified by visitors)
    const destinationEmail = process.env.TARGET_NOTIFICATION_EMAIL || 'ajaysaaa150@gmail.com';

    let deliveryStatus: 'sent_smtp' | 'queued_server' | 'simulated' = 'simulated';
    let deliveryNote = `Inquiry recorded and routed to ${destinationEmail}`;

    // If SMTP is configured, attempt real SMTP transmission
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

        const mailSubject = `[Nexora New Lead] ${fullName} - ${service}`;
        const mailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <div style="background-color: #4f46e5; padding: 16px; border-radius: 6px; color: white; text-align: center; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 20px;">New Project Inquiry</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Nexora Digital Agency Lead Notification</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563; width: 140px;">Client Name:</td>
                <td style="padding: 10px 0; color: #111827;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Email Address:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #4f46e5;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Phone Number:</td>
                <td style="padding: 10px 0; color: #111827;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Company / Brand:</td>
                <td style="padding: 10px 0; color: #111827;">${company}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Service Required:</td>
                <td style="padding: 10px 0; font-weight: bold; color: #4f46e5;">${service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Estimated Budget:</td>
                <td style="padding: 10px 0; color: #111827;">${budget}</td>
              </tr>
            </table>

            <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #4f46e5; margin-bottom: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #374151; font-size: 14px;">Project Details / Message:</h4>
              <p style="margin: 0; color: #1f2937; line-height: 1.5; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #f3f4f6; padding-top: 16px;">
              This notification was automatically routed to <strong>${destinationEmail}</strong> from Nexora Digital Agency website.
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Nexora Inquiries" <${process.env.SMTP_USER}>`,
          to: destinationEmail,
          replyTo: email,
          subject: mailSubject,
          html: mailHtml,
        });

        deliveryStatus = 'sent_smtp';
        deliveryNote = `Email successfully dispatched via SMTP to ${destinationEmail}`;
      } catch (smtpErr: any) {
        console.warn('SMTP dispatch failed, fell back to server store:', smtpErr.message);
        deliveryStatus = 'queued_server';
        deliveryNote = `Saved to server database. Forwarding target: ${destinationEmail}`;
      }
    } else {
      deliveryStatus = 'simulated';
      deliveryNote = `Recorded on server & directed to target inbox: ${destinationEmail}`;
    }

    const newInquiry: InquiryPayload = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      service,
      budget,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      destinationEmail,
      deliveryStatus,
      deliveryNote,
    };

    const existing = loadInquiries();
    existing.unshift(newInquiry);
    saveInquiries(existing);

    console.log(`[INQUIRY ROUTED] -> To: ${destinationEmail} | From: ${fullName} (${email}) | Service: ${service}`);

    return res.status(200).json({
      success: true,
      inquiry: newInquiry,
      destinationEmail,
      message: 'Thank You! Your inquiry has been received. Our team will contact you within 24 hours.',
    });
  } catch (error: any) {
    console.error('Error handling inquiry submission:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process inquiry. Please try again.',
    });
  }
});

// API: Delete single inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const existing = loadInquiries();
  const updated = existing.filter((item) => item.id !== id);
  saveInquiries(updated);
  res.json({ success: true, count: updated.length });
});

// API: Clear all inquiries
app.delete('/api/inquiries', (_req, res) => {
  saveInquiries([]);
  res.json({ success: true, count: 0 });
});

// Start dev or production server
async function startServer() {
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
