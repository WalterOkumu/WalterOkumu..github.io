import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function rateLimit(identifier) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, []);
  }
  
  const requests = rateLimitStore.get(identifier);
  // Clean old requests
  const validRequests = requests.filter(time => time > windowStart);
  rateLimitStore.set(identifier, validRequests);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  validRequests.push(now);
  return true;
}

function sanitizeInput(str) {
  if (!str || typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting
    if (!rateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      company,
      inquiryType,
      subject,
      message,
      timeline,
      budget
    } = body;

    // Validation
    if (!name || !email || !subject || !message || !inquiryType) {
      return NextResponse.json(
        { error: 'Required fields are missing.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: sanitizeInput(company) || 'Not provided',
      inquiryType: sanitizeInput(inquiryType),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
      timeline: sanitizeInput(timeline) || 'Not specified',
      budget: sanitizeInput(budget) || 'Not specified'
    };

    // Validate email format
    if (!validateEmail(sanitizedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Validate message length
    if (sanitizedData.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email content
    const emailContent = `
Professional Inquiry from Walter Okumu Portfolio

From: ${sanitizedData.name} (${sanitizedData.email})
Company: ${sanitizedData.company}
Inquiry Type: ${sanitizedData.inquiryType}
Subject: ${sanitizedData.subject}

Timeline: ${sanitizedData.timeline}
Budget: ${sanitizedData.budget}

Message:
${sanitizedData.message}

---
Sent from Walter Okumu Portfolio Contact Form
IP Address: ${clientIp}
Timestamp: ${new Date().toISOString()}
`;

    const htmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
  <div style="background-color: white; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
    <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
      Professional Inquiry from Portfolio
    </h2>
    
    <div style="margin-bottom: 20px;">
      <h3 style="color: #374151; margin-bottom: 10px;">Contact Information</h3>
      <p style="margin: 5px 0;"><strong>Name:</strong> ${sanitizedData.name}</p>
      <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
      <p style="margin: 5px 0;"><strong>Company:</strong> ${sanitizedData.company}</p>
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3 style="color: #374151; margin-bottom: 10px;">Inquiry Details</h3>
      <p style="margin: 5px 0;"><strong>Type:</strong> <span style="background-color: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-size: 14px;">${sanitizedData.inquiryType}</span></p>
      <p style="margin: 5px 0;"><strong>Subject:</strong> ${sanitizedData.subject}</p>
      <p style="margin: 5px 0;"><strong>Timeline:</strong> ${sanitizedData.timeline}</p>
      <p style="margin: 5px 0;"><strong>Budget:</strong> ${sanitizedData.budget}</p>
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3 style="color: #374151; margin-bottom: 10px;">Message</h3>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
        ${sanitizedData.message.replace(/\n/g, '<br>')}
      </div>
    </div>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
      <p>Sent from Walter Okumu Portfolio Contact Form</p>
      <p>Timestamp: ${new Date().toLocaleString()}</p>
    </div>
  </div>
</div>
`;

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: sanitizedData.email,
      subject: `[Portfolio] ${sanitizedData.inquiryType}: ${sanitizedData.subject}`,
      text: emailContent,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    // Send auto-reply to the sender
    const autoReplyContent = `
Dear ${sanitizedData.name},

Thank you for your professional inquiry regarding "${sanitizedData.subject}".

I have received your message and will review it carefully. Based on the inquiry type "${sanitizedData.inquiryType}", you can expect a response within:

• Executive Opportunity: 24 hours
• Consulting & Advisory: 48 hours  
• Speaking Engagement: 1 week
• Technical Collaboration: 48 hours
• Other inquiries: 72 hours

I appreciate your interest and look forward to discussing how we can work together.

Best regards,
Walter Okumu Oriaro

---
This is an automated response. Please do not reply to this email.
`;

    const autoReplyHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: white; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
    <h2 style="color: #1f2937; margin-bottom: 20px;">Thank You for Your Inquiry</h2>
    
    <p style="color: #374151; line-height: 1.6;">Dear ${sanitizedData.name},</p>
    
    <p style="color: #374151; line-height: 1.6;">
      Thank you for your professional inquiry regarding "<strong>${sanitizedData.subject}</strong>".
    </p>
    
    <p style="color: #374151; line-height: 1.6;">
      I have received your message and will review it carefully. Based on the inquiry type 
      "<strong>${sanitizedData.inquiryType}</strong>", you can expect a response within:
    </p>
    
    <ul style="color: #374151; line-height: 1.8; margin: 20px 0;">
      <li><strong>Executive Opportunity:</strong> 24 hours</li>
      <li><strong>Consulting & Advisory:</strong> 48 hours</li>
      <li><strong>Speaking Engagement:</strong> 1 week</li>
      <li><strong>Technical Collaboration:</strong> 48 hours</li>
      <li><strong>Other inquiries:</strong> 72 hours</li>
    </ul>
    
    <p style="color: #374151; line-height: 1.6;">
      I appreciate your interest and look forward to discussing how we can work together.
    </p>
    
    <p style="color: #374151; line-height: 1.6;">
      Best regards,<br>
      <strong>Walter Okumu Oriaro</strong>
    </p>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
      <p>This is an automated response. Please do not reply to this email.</p>
    </div>
  </div>
</div>
`;

    try {
      await transporter.sendMail({
        from: `"Walter Okumu Oriaro" <${process.env.SMTP_USER}>`,
        to: sanitizedData.email,
        subject: `Re: ${sanitizedData.subject} - Inquiry Received`,
        text: autoReplyContent,
        html: autoReplyHtml,
      });
    } catch (autoReplyError) {
      // Don't fail the main request if auto-reply fails
      console.error('Auto-reply failed:', autoReplyError);
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully!',
        inquiryType: sanitizedData.inquiryType
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}