import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Validation schema for booking form
const BookingFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  
  // Service Details
  serviceType: z.enum(['audit', 'tax', 'accounting', 'business-setup', 'consultation', 'other']),
  serviceDescription: z.string().min(10, 'Please provide more details about your service needs'),
  
  // Meeting Preferences
  meetingType: z.enum(['in-person', 'virtual', 'phone']),
  preferredDate: z.string().refine((date) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today
  }, 'Please select a future date'),
  preferredTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time'),
  
  // Additional Information
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  estimatedDuration: z.enum(['30-mins', '1-hour', '2-hours', 'half-day', 'full-day']).default('1-hour'),
  additionalNotes: z.string().optional(),
  
  // Communication Preferences
  preferredContact: z.enum(['email', 'phone', 'whatsapp']).default('email'),
  sendReminders: z.boolean().default(true),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validationResult = BookingFormSchema.safeParse(body)
    
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

    // Check if the requested time slot is available
    const isAvailable = await checkTimeSlotAvailability(data.preferredDate, data.preferredTime)
    
    if (!isAvailable) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'The requested time slot is no longer available. Please choose a different time.',
          suggestedTimes: await getSuggestedTimeSlots(data.preferredDate)
        },
        { status: 409 }
      )
    }

    // Generate booking reference
    const bookingReference = generateBookingReference()

    // Save to database
    try {
      const fullName = `${data.firstName} ${data.lastName}`
      await sql`
        INSERT INTO bookings (
          reference, name, email, phone, company, service_type, service_description,
          meeting_type, preferred_date, preferred_time, urgency, estimated_duration,
          additional_notes, preferred_contact, send_reminders
        ) VALUES (
          ${bookingReference}, ${fullName}, ${data.email}, ${data.phone}, 
          ${data.company || null}, ${data.serviceType}, ${data.serviceDescription},
          ${data.meetingType}, ${data.preferredDate}, ${data.preferredTime},
          ${data.urgency}, ${data.estimatedDuration}, ${data.additionalNotes || null},
          ${data.preferredContact}, ${data.sendReminders}
        )
      `

      console.log('Booking saved to database:', {
        reference: bookingReference,
        name: fullName,
        email: data.email,
        serviceType: data.serviceType,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        meetingType: data.meetingType,
        urgency: data.urgency,
      })

    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to save booking. Please try again or contact us directly.' 
        },
        { status: 500 }
      )
    }

    // Send confirmation email and notifications
    await sendBookingConfirmation(data, bookingReference)
    await notifyTeam(data, bookingReference)

    return NextResponse.json({
      success: true,
      message: 'Your appointment has been successfully booked. You will receive a confirmation email shortly.',
      bookingReference,
      appointmentDetails: {
        date: data.preferredDate,
        time: data.preferredTime,
        type: data.meetingType,
        service: data.serviceType,
        duration: data.estimatedDuration,
      }
    })

  } catch (error) {
    console.error('Booking form submission error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}

// Check if time slot is available
async function checkTimeSlotAvailability(date: string, time: string): Promise<boolean> {
  // In production, check against your calendar/booking system
  // For now, simulate availability check
  
  const selectedDateTime = new Date(`${date}T${time}`)
  const now = new Date()
  
  // Basic checks
  if (selectedDateTime <= now) {
    return false
  }
  
  // Check business hours (9 AM to 6 PM, Sunday to Thursday)
  const dayOfWeek = selectedDateTime.getDay()
  const hour = selectedDateTime.getHours()
  
  // Friday and Saturday are weekends in UAE
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    return false
  }
  
  // Business hours check
  if (hour < 9 || hour >= 18) {
    return false
  }
  
  // Time slot is available
  return true
}

// Get suggested time slots if preferred time is not available
async function getSuggestedTimeSlots(date: string): Promise<string[]> {
  const suggestions = []
  const baseDate = new Date(date)
  
  // Suggest next 3 available time slots
  for (let i = 0; i < 7; i++) {
    const suggestedDate = new Date(baseDate)
    suggestedDate.setDate(baseDate.getDate() + i)
    
    // Skip weekends
    if (suggestedDate.getDay() === 5 || suggestedDate.getDay() === 6) {
      continue
    }
    
    // Add some sample time slots
    const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    for (const time of times) {
      const isAvailable = await checkTimeSlotAvailability(
        suggestedDate.toISOString().split('T')[0], 
        time
      )
      if (isAvailable) {
        suggestions.push(`${suggestedDate.toISOString().split('T')[0]} ${time}`)
        if (suggestions.length >= 5) break
      }
    }
    
    if (suggestions.length >= 5) break
  }
  
  return suggestions
}

// Process the booking
async function processBooking(data: z.infer<typeof BookingFormSchema>, reference: string) {
  // In production, this would:
  // 1. Save to database
  // 2. Create calendar event
  // 3. Block time slot
  // 4. Set up automated reminders
  
  const fullName = `${data.firstName} ${data.lastName}`
  console.log('📅 Processing booking:', {
    reference,
    client: fullName,
    datetime: `${data.preferredDate} ${data.preferredTime}`,
    service: data.serviceType,
    type: data.meetingType
  })
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return { success: true }
}

// Send booking confirmation to client
async function sendBookingConfirmation(data: z.infer<typeof BookingFormSchema>, reference: string) {
  const fullName = `${data.firstName} ${data.lastName}`
  const confirmationContent = `
    Dear ${fullName},
    
    Your appointment has been successfully booked with THE BOARD MAN!
    
    BOOKING DETAILS:
    ==================
    Reference: ${reference}
    Date: ${new Date(data.preferredDate).toLocaleDateString('en-AE')}
    Time: ${data.preferredTime} (UAE Time)
    Duration: ${data.estimatedDuration}
    Service: ${data.serviceType}
    Meeting Type: ${data.meetingType}
    
    NEXT STEPS:
    ==================
    ${data.meetingType === 'in-person' ? 
      '📍 Our office address: 12A01, DAMAC XL Tower, Business Bay, Dubai, UAE' :
      data.meetingType === 'virtual' ?
      '💻 We will send you a video call link 30 minutes before the meeting' :
      '📞 We will call you on the provided number: ' + data.phone
    }
    
    ${data.sendReminders ? '🔔 You will receive email reminders 24 hours and 1 hour before your appointment.' : ''}
    
    If you need to reschedule or cancel, please contact us at least 24 hours in advance.
    
    We look forward to meeting with you!
    
    Best regards,
    THE BOARD MAN Team
    
    ---
    THE BOARD MAN ACCOUNTING AND AUDITORS L.L.C
    Phone: +971 55 747 7855
    Email: appointments@board-man.com
    Website: https://board-man.com
  `
  
  console.log('📧 Booking confirmation sent to client:', confirmationContent)
  
  // Simulate email delivery
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return { success: true }
}

// Notify team about new booking
async function notifyTeam(data: z.infer<typeof BookingFormSchema>, reference: string) {
  const fullName = `${data.firstName} ${data.lastName}`
  const teamNotification = `
    🆕 NEW APPOINTMENT BOOKED
    
    Reference: ${reference}
    Client: ${fullName}
    Email: ${data.email}
    Phone: ${data.phone}
    Company: ${data.company || 'Not provided'}
    
    Service: ${data.serviceType}
    Date: ${data.preferredDate}
    Time: ${data.preferredTime}
    Type: ${data.meetingType}
    Duration: ${data.estimatedDuration}
    Urgency: ${data.urgency}
    
    Service Description:
    ${data.serviceDescription}
    
    ${data.additionalNotes ? `Additional Notes:\n${data.additionalNotes}` : ''}
    
    Please prepare for this appointment and add it to the team calendar.
  `
  
  console.log('📧 Team notification:', teamNotification)
  
  // Simulate notification delivery
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return { success: true }
}

// Generate unique booking reference
function generateBookingReference(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `BM-${timestamp}-${randomStr}`.toUpperCase()
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