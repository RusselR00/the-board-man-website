import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function POST() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    
    console.log('Creating contacts table...')
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        subject VARCHAR(500),
        message TEXT,
        service VARCHAR(100),
        urgency VARCHAR(20) DEFAULT 'medium',
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    console.log('Creating bookings table...')
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        service VARCHAR(100) NOT NULL,
        preferred_date DATE,
        preferred_time TIME,
        duration VARCHAR(50),
        message TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    console.log('Inserting sample contact data...')
    const existingContacts = await sql`SELECT COUNT(*) as count FROM contacts`
    if (parseInt(existingContacts[0].count) === 0) {
      await sql`
        INSERT INTO contacts (name, email, phone, company, subject, message, service, urgency, status, created_at) VALUES
        ('Ahmed Hassan', 'ahmed@company.com', '+971 50 123 4567', 'Tech Solutions LLC', 'VAT Registration Query', 'We need assistance with VAT registration for our new business...', 'Tax Services', 'medium', 'new', '2024-10-07 14:30:00'),
        ('Fatima Al-Zahra', 'fatima@business.ae', '+971 55 987 6543', 'Green Energy DMCC', 'Audit Services Inquiry', 'Looking for comprehensive audit services for our annual review...', 'Audit & Assurance', 'high', 'replied', '2024-10-07 10:15:00'),
        ('John Smith', 'john@startup.com', '+971 54 567 8901', 'Innovation Hub', 'Business Setup Consultation', 'Need guidance on setting up a business in Dubai Free Zone...', 'Business Setup', 'low', 'in-progress', '2024-10-06 16:45:00'),
        ('Sarah Ahmed', 'sarah@consulting.ae', '+971 52 345 6789', 'Consulting Partners', 'Accounting Software Recommendation', 'We are looking for recommendations for accounting software suitable for...', 'Accounting', 'medium', 'new', '2024-10-06 09:20:00'),
        ('Mohammed Ali', 'mohammed@trading.com', '+971 56 789 0123', 'Global Trading LLC', 'Tax Compliance Review', 'Need a comprehensive review of our tax compliance procedures...', 'Tax Services', 'high', 'completed', '2024-10-05 11:30:00')
      `
    }
    
    console.log('Inserting sample booking data...')
    const existingBookings = await sql`SELECT COUNT(*) as count FROM bookings`
    if (parseInt(existingBookings[0].count) === 0) {
      await sql`
        INSERT INTO bookings (name, email, phone, company, service, preferred_date, preferred_time, duration, message, status, created_at) VALUES
        ('Omar Abdullah', 'omar@startup.ae', '+971 50 111 2222', 'Tech Startup DMCC', 'Business Setup', '2024-10-15', '10:00:00', '60 minutes', 'Looking to set up a tech company in Dubai', 'pending', '2024-10-07 09:00:00'),
        ('Layla Hassan', 'layla@finance.com', '+971 55 333 4444', 'Finance Corp', 'Audit & Assurance', '2024-10-12', '14:00:00', '90 minutes', 'Need annual audit consultation', 'confirmed', '2024-10-06 15:30:00'),
        ('Khalid Al-Mansouri', 'khalid@retail.ae', '+971 54 555 6666', 'Retail Solutions', 'Tax Services', '2024-10-10', '11:00:00', '45 minutes', 'VAT compliance consultation', 'pending', '2024-10-06 12:20:00'),
        ('Amira Zayed', 'amira@consulting.com', '+971 52 777 8888', 'Business Consulting', 'Accounting', '2024-10-14', '15:30:00', '75 minutes', 'Accounting system setup discussion', 'confirmed', '2024-10-05 16:45:00'),
        ('Hassan Al-Rashid', 'hassan@export.ae', '+971 56 999 0000', 'Export Trading', 'Business Setup', '2024-10-08', '09:30:00', '120 minutes', 'Export business licensing consultation', 'completed', '2024-10-04 14:15:00')
      `
    }
    
    // Get final counts
    const contactCount = await sql`SELECT COUNT(*) as count FROM contacts`
    const bookingCount = await sql`SELECT COUNT(*) as count FROM bookings`
    
    return NextResponse.json({
      success: true,
      message: 'Database tables created and populated successfully',
      tables_created: ['contacts', 'bookings'],
      contact_count: parseInt(contactCount[0].count),
      booking_count: parseInt(bookingCount[0].count)
    })
    
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}