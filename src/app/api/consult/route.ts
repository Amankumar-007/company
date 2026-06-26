import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, phone, email } = await request.json();

    if (!name || !phone || !email) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    if (!process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'amanr3388@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(120deg,#E8521A,#F97316);padding:32px 28px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">📅 New Consultation Request</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Submitted via flowW website</p>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#6b7280;font-size:13px;font-weight:600;width:90px;border-bottom:1px solid #f3f4f6;">Name</td><td style="padding:10px 0;color:#111827;font-size:15px;font-weight:700;border-bottom:1px solid #f3f4f6;">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#6b7280;font-size:13px;font-weight:600;border-bottom:1px solid #f3f4f6;">Phone</td><td style="padding:10px 0;color:#111827;font-size:15px;border-bottom:1px solid #f3f4f6;">${phone}</td></tr>
            <tr><td style="padding:10px 0;color:#6b7280;font-size:13px;font-weight:600;">Email</td><td style="padding:10px 0;color:#111827;font-size:15px;">${email}</td></tr>
          </table>
          <p style="margin:24px 0 0;padding:16px;background:#fff7ed;border-left:4px solid #F97316;border-radius:6px;color:#92400e;font-size:13px;">
            <strong>Action needed:</strong> Reply to <a href="mailto:${email}" style="color:#E8521A;">${email}</a> or call ${phone} to schedule their free 30-min consultation.
          </p>
          <p style="margin:20px 0 0;color:#9ca3af;font-size:12px;text-align:center;">
            ${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: 'amanr3388@gmail.com',
      to: 'amanr3388@gmail.com',
      replyTo: email,
      subject: `📅 Consultation Request from ${name}`,
      html,
    });

    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (err) {
    console.error('consult route error:', err);
    return NextResponse.json({ message: 'Failed to send. Please try again.' }, { status: 500 });
  }
}
