import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { Resend } from 'resend'

// Initialize Resend with fallback for build time
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build')

// Validation schema for contact form
const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  serviceType: z.enum(['audit', 'tax', 'accounting', 'business-setup', 'consultation', 'other']),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']).default('email'),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validationResult = ContactFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: validationResult.error.issues 
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Save to database
    const { rows } = await sql`
      INSERT INTO contacts (name, email, phone, company, subject, message, service_type, preferred_contact, urgency)
      VALUES (${data.name}, ${data.email}, ${data.phone || ''}, ${data.company || ''}, ${data.subject}, ${data.message}, ${data.serviceType}, ${data.preferredContact}, ${data.urgency})
      RETURNING id
    `
    
    const contactId = rows[0]?.id

    console.log('Contact form submission saved to database:', {
      id: contactId,
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      subject: data.subject,
    })

    // Send emails
    await sendContactEmail(data)
    await sendAutoResponse(data)

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will contact you within 24 hours.',
      submissionId: generateSubmissionId(),
    })

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}

// Send email to admin using Resend
async function sendContactEmail(data: z.infer<typeof ContactFormSchema>) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@board-man.com'
    
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@board-man.com',
      to: [adminEmail],
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Inquiry Details</h3>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Service Type:</strong> ${data.serviceType}</p>
            <p><strong>Preferred Contact:</strong> ${data.preferredContact}</p>
            <p><strong>Urgency:</strong> 
              <span style="background: ${data.urgency === 'high' ? '#fef2f2' : data.urgency === 'medium' ? '#fefce8' : '#f0fdf4'}; 
                           color: ${data.urgency === 'high' ? '#dc2626' : data.urgency === 'medium' ? '#d97706' : '#16a34a'}; 
                           padding: 2px 8px; border-radius: 4px; font-weight: bold;">
                ${data.urgency.toUpperCase()}
              </span>
            </p>
          </div>
          
          <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Message</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; color: #6b7280; font-size: 14px;">
            Submitted at: ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} (UAE Time)
          </div>
        </div>
      `
    })
    
    console.log('✅ Admin notification email sent successfully')
    return { success: true }
  } catch (error) {
    console.error('❌ Failed to send admin notification email:', error)
    // Don't throw error - form submission should still succeed
    return { success: false, error }
  }
}

// Send auto-response to customer
async function sendAutoResponse(data: z.infer<typeof ContactFormSchema>) {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@board-man.com',
      to: [data.email],
      subject: 'Thank you for contacting THE BOARD MAN - We\'ll be in touch soon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">THE BOARD MAN</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Accounting & Auditors L.L.C</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #374151; margin-top: 0;">Thank You for Reaching Out!</h2>
            
            <p style="color: #6b7280; line-height: 1.6;">Dear ${data.name},</p>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Thank you for contacting THE BOARD MAN. We have successfully received your inquiry about 
              "<strong>${data.subject}</strong>".
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <h3 style="margin-top: 0; color: #374151;">What happens next?</h3>
              <ul style="color: #6b7280; padding-left: 20px;">
                <li>Our expert team will review your message carefully</li>
                <li>We'll respond within 24 hours during business days</li>
                <li>You'll receive a personalized response from one of our specialists</li>
              </ul>
            </div>
            
            ${data.urgency === 'high' ? `
              <div style="background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <strong>⚡ Urgent Inquiry Noted:</strong> We understand this is urgent. If you need immediate assistance, please call us directly at <a href="tel:+971557477855" style="color: #dc2626;">+971 55 747 7855</a>.
              </div>
            ` : ''}
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
              <p style="margin: 5px 0; color: #6b7280;"><strong>📍 Address:</strong> 12A01, DAMAC XL Tower, Business Bay, Dubai, UAE</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>📞 Phone:</strong> <a href="tel:+971557477855" style="color: #2563eb;">+971 55 747 7855</a></p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>📧 Email:</strong> <a href="mailto:info@board-man.com" style="color: #2563eb;">info@board-man.com</a></p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>🌐 Website:</strong> <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://board-man.com'}" style="color: #2563eb;">board-man.com</a></p>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1d4ed8;">Business Hours</h3>
              <p style="margin: 5px 0; color: #1e40af;">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p style="margin: 5px 0; color: #1e40af;">Saturday: 10:00 AM - 2:00 PM</p>
              <p style="margin: 5px 0; color: #1e40af;">Sunday: Closed</p>
              <p style="margin: 15px 0 5px 0; color: #1e40af; font-size: 14px;"><em>All times are UAE local time</em></p>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Best regards,<br>
              <strong>THE BOARD MAN Team</strong>
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
              This is an automated response. Please do not reply to this email.
            </div>
          </div>
        </div>
      `
    })
    
    console.log('✅ Auto-response email sent successfully to:', data.email)
    return { success: true }
  } catch (error) {
    console.error('❌ Failed to send auto-response email:', error)
    // Don't throw error - form submission should still succeed
    return { success: false, error }
  }
}

// Generate unique submission ID
function generateSubmissionId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `CONT-${timestamp}-${randomStr}`.toUpperCase()
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}