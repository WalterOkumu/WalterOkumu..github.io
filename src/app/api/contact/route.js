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
      jobTitle,
      inquiryType,
      subject,
      message,
      timeline,
      budget,
      urgency,
      referralSource,
      _priority,
      _executiveInquiry,
      _requiresImmedateResponse
    } = body;

    // Validation
    if (!name || !email || !subject || !message || !inquiryType) {
      return NextResponse.json(
        { error: 'Required fields are missing.' },
        { status: 400 }
      );
    }

    // Sanitize inputs with enhanced executive fields
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: sanitizeInput(company) || 'Not provided',
      jobTitle: sanitizeInput(jobTitle) || 'Not provided',
      inquiryType: sanitizeInput(inquiryType),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
      timeline: sanitizeInput(timeline) || 'Not specified',
      budget: sanitizeInput(budget) || 'Not specified',
      urgency: sanitizeInput(urgency) || 'normal',
      referralSource: sanitizeInput(referralSource) || 'Not specified',
      priority: _priority || 'normal',
      isExecutiveInquiry: _executiveInquiry || false,
      requiresImmedateResponse: _requiresImmedateResponse || false
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

    // Enhanced email content with customer success leadership focus
    const priorityIndicator = sanitizedData.priority === 'critical' ? '🔴 URGENT - ' :
                             sanitizedData.priority === 'high' ? '🟠 HIGH PRIORITY - ' : '';

    const emailContent = `
${priorityIndicator}${sanitizedData.isExecutiveInquiry ? 'EXECUTIVE INQUIRY' : 'Professional Inquiry'} from Walter Oriaro Portfolio

=== CONTACT INFORMATION ===
From: ${sanitizedData.name} (${sanitizedData.email})
Current Role: ${sanitizedData.jobTitle}
Company: ${sanitizedData.company}
Referral Source: ${sanitizedData.referralSource}

=== INQUIRY DETAILS ===
Type: ${sanitizedData.inquiryType}
Subject: ${sanitizedData.subject}
Urgency: ${sanitizedData.urgency}
Priority Level: ${sanitizedData.priority}
Timeline: ${sanitizedData.timeline}
Budget: ${sanitizedData.budget}

=== EXECUTIVE ROUTING ===
Executive Inquiry: ${sanitizedData.isExecutiveInquiry ? 'YES - Requires priority response' : 'NO'}
Immediate Response Required: ${sanitizedData.requiresImmedateResponse ? 'YES - Within 4 hours' : 'NO'}

=== MESSAGE ===
${sanitizedData.message}

=== METADATA ===
        Sent from: Walter Oriaro Customer Success & Technical Architecture Portfolio
IP Address: ${clientIp}
Timestamp: ${new Date().toISOString()}
User Agent: ${request.headers.get('user-agent') || 'Unknown'}
`;

    const htmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
  <div style="background-color: white; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
    <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
              ${priorityIndicator}${sanitizedData.isExecutiveInquiry ? '🎯 EXECUTIVE INQUIRY' : 'Professional Inquiry'} from Customer Success & Technical Architecture Portfolio
    </h2>

    ${sanitizedData.priority === 'critical' ?
      '<div style="background-color: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-weight: bold;">⚡ CRITICAL PRIORITY - Immediate attention required</div>' :
      sanitizedData.priority === 'high' ?
      '<div style="background-color: #fef3c7; border: 1px solid #fbbf24; color: #92400e; padding: 12px; border-radius: 6px; margin-bottom: 20px; font-weight: bold;">⭐ HIGH PRIORITY - Expedited response needed</div>' :
      ''
    }

    <div style="margin-bottom: 20px;">
      <h3 style="color: #374151; margin-bottom: 10px;">Contact Information</h3>
      <p style="margin: 5px 0;"><strong>Name:</strong> ${sanitizedData.name}</p>
      <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
      <p style="margin: 5px 0;"><strong>Current Role:</strong> ${sanitizedData.jobTitle}</p>
      <p style="margin: 5px 0;"><strong>Company:</strong> ${sanitizedData.company}</p>
      <p style="margin: 5px 0;"><strong>How they found me:</strong> ${sanitizedData.referralSource}</p>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="color: #374151; margin-bottom: 10px;">Inquiry Details</h3>
      <p style="margin: 5px 0;"><strong>Type:</strong> <span style="background-color: ${sanitizedData.isExecutiveInquiry ? '#dc2626' : '#3b82f6'}; color: white; padding: 4px 12px; border-radius: 6px; font-size: 14px; font-weight: bold;">${sanitizedData.inquiryType}</span></p>
      <p style="margin: 5px 0;"><strong>Subject:</strong> ${sanitizedData.subject}</p>
      <p style="margin: 5px 0;"><strong>Urgency:</strong> <span style="background-color: ${sanitizedData.urgency === 'urgent' ? '#ef4444' : sanitizedData.urgency === 'high' ? '#f59e0b' : '#10b981'}; color: white; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; font-size: 12px;">${sanitizedData.urgency}</span></p>
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
      subject: `${priorityIndicator}[${sanitizedData.isExecutiveInquiry ? 'EXECUTIVE' : 'Portfolio'}] ${sanitizedData.inquiryType}: ${sanitizedData.subject}`,
      text: emailContent,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    // Enhanced auto-reply with executive routing
    const getResponseTime = (inquiryType, urgency, isExecutive) => {
      if (urgency === 'urgent' || inquiryType.includes('opportunity')) return '4 hours';
      if (isExecutive) return '12 hours';
      if (inquiryType.includes('ai-strategy') || inquiryType.includes('consulting')) return '24 hours';
      if (inquiryType.includes('speaking')) return '1 week';
      return '48 hours';
    };

    const responseTime = getResponseTime(sanitizedData.inquiryType, sanitizedData.urgency, sanitizedData.isExecutiveInquiry);

    const autoReplyContent = `
Dear ${sanitizedData.name},

Thank you for your ${sanitizedData.isExecutiveInquiry ? 'executive' : 'professional'} inquiry regarding "${sanitizedData.subject}".

I have received your message and ${sanitizedData.priority === 'critical' ? 'will prioritize it for immediate review' : 'will review it carefully'}. Based on your inquiry type "${sanitizedData.inquiryType}" and urgency level, you can expect a response within ${responseTime}.

${sanitizedData.isExecutiveInquiry ?
  'As this is flagged as an executive inquiry, it has been routed to my priority queue for expedited handling.' :
  'Your inquiry has been received and will be processed in my standard workflow.'
}

=== INQUIRY SUMMARY ===
• Type: ${sanitizedData.inquiryType}
• Priority: ${sanitizedData.priority.toUpperCase()}
• Expected Response: Within ${responseTime}
• Your Reference: #${Date.now().toString().slice(-6)}

${sanitizedData.requiresImmedateResponse ?
  '⚡ URGENT: This inquiry has been flagged for immediate attention due to its critical nature.' :
  'I appreciate your interest and look forward to discussing how we can work together.'
}

Best regards,
Walter Oriaro
        Head of Customer Success & Technical Architecture

---
This is an automated response. Please do not reply to this email.
For urgent matters, please mark your inquiry as "urgent" in the contact form.
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

    <div style="background-color: ${sanitizedData.isExecutiveInquiry ? '#fee2e2' : '#f0f9ff'}; border: 1px solid ${sanitizedData.isExecutiveInquiry ? '#fca5a5' : '#7dd3fc'}; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <h4 style="color: ${sanitizedData.isExecutiveInquiry ? '#991b1b' : '#0c4a6e'}; margin: 0 0 10px 0; font-size: 16px;">
        ${sanitizedData.isExecutiveInquiry ? '🎯 Executive Priority Response' : '📬 Standard Response Timeline'}
      </h4>
      <p style="color: ${sanitizedData.isExecutiveInquiry ? '#991b1b' : '#0c4a6e'}; margin: 0; font-size: 14px; font-weight: bold;">
        Expected Response: Within ${responseTime}
      </p>
      <p style="color: ${sanitizedData.isExecutiveInquiry ? '#7f1d1d' : '#075985'}; margin: 5px 0 0 0; font-size: 12px;">
        Reference: #${Date.now().toString().slice(-6)} | Priority: ${sanitizedData.priority.toUpperCase()}
      </p>
    </div>

    ${sanitizedData.requiresImmedateResponse ?
      '<div style="background-color: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 16px; margin: 15px 0;"><p style="color: #dc2626; margin: 0; font-weight: bold; text-align: center;">⚡ URGENT INQUIRY - Immediate attention requested</p></div>' :
      ''
    }

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