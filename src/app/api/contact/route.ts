
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper function for consistent email design
const generateEmailTemplate = (title: string, content: string, footerText: string = 'The Medico AI Team') => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f9; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #2563eb, #10b981); padding: 30px 20px; text-align: center; color: white; }
    .logo { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .logo span { font-weight: 400; opacity: 0.9; }
    .content { padding: 40px 30px; }
    .field { margin-bottom: 15px; border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; }
    .label { font-weight: 600; color: #555; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #333; margin-top: 5px; font-size: 1.05em; }
    .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    .button { display: inline-block; background: linear-gradient(135deg, #2563eb, #10b981); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Medico <span>AI</span></div>
      <div style="font-size: 14px; margin-top: 5px; opacity: 0.9;">Your Advanced Health Assistant</div>
    </div>
    <div class="content">
      <h2 style="color: #1e293b; margin-top: 0;">${title}</h2>
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Medico AI. All rights reserved.</p>
      <p>This is an automated message. Please do not reply directly to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, subject, message, category } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // 1. Email to Admin
    const adminContent = `
      <p>You have received a new contact form submission via the Medico AI portal.</p>
      <div class="field">
        <div class="label">Sender Name</div>
        <div class="value">${firstName} ${lastName}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Category</div>
        <div class="value">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field" style="border-bottom: none;">
        <div class="label">Message</div>
        <div class="value" style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">${message.replace(/\n/g, '<br>')}</div>
      </div>
    `;

    const adminMailOptions = {
      from: `"Medico AI Notification" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[New Inquiry] ${subject} - ${firstName} ${lastName}`,
      html: generateEmailTemplate('New Contact Submission', adminContent),
    };

    // 2. Email to User (Confirmation)
    const userContent = `
      <p>Dear ${firstName},</p>
      <p>Thank you for reaching out to Medico AI. We have received your message regarding <strong>"${subject}"</strong>.</p>
      <p>Our team is currently reviewing your inquiry and will get back to you as soon as possible, typically within 24 hours.</p>
      <p>For your records, here is a copy of your message:</p>
      <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; font-style: italic; color: #555; margin-bottom: 20px;">
        "${message.replace(/\n/g, '<br>')}"
      </div>
      <p>If you need immediate assistance, please visit our Help Center or chat with our Medico AI assistant on our website.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" class="button" style="color: white;">Return to Medico AI</a>
    `;

    const userMailOptions = {
      from: `"Medico AI Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We received your message - Medico AI`,
      html: generateEmailTemplate('Message Received', userContent),
    };

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json({ success: true, message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
