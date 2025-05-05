export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Load SMTP credentials from environment variables
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM,
} = process.env;

// POST /api/sendBookingEmail
export async function POST(request: Request) {
  try {
    // Parse JSON body
    const {
      name,
      email,
      phone,
      serviceType,
      selectedDate,
      selectedTime,
      location,
      details,
    } = await request.json();

    // Validate environment variables
    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
      throw new Error('SMTP configuration is incomplete');
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: Number(EMAIL_PORT) === 465, // true for port 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Compose email
    const subject = `🛠️ New booking from ${name}`;
    const html = `
      <h2>New Booking Request</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Service:</strong> ${serviceType}</li>
        <li><strong>Date:</strong> ${selectedDate}</li>
        <li><strong>Time:</strong> ${selectedTime}</li>
        <li><strong>Location:</strong> ${location}</li>
        <li><strong>Details:</strong> ${details}</li>
      </ul>
    `;

    // Send the email
    await transporter.sendMail({
      from: EMAIL_FROM || EMAIL_USER,
      to: 'plantandtruckrepairs@gmail.com',
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('sendBookingEmail error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 