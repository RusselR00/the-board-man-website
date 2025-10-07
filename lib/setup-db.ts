import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function setupDatabase() {
  try {
    console.log('🔧 Setting up database tables...')

    // Create contacts table
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        preferred_contact VARCHAR(50) DEFAULT 'email',
        urgency VARCHAR(20) DEFAULT 'medium',
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('✅ Contacts table created')

    // Create bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        reference VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        service_type VARCHAR(100) NOT NULL,
        service_description TEXT NOT NULL,
        meeting_type VARCHAR(50) NOT NULL,
        preferred_date DATE NOT NULL,
        preferred_time TIME NOT NULL,
        alternative_date DATE,
        alternative_time TIME,
        urgency VARCHAR(20) DEFAULT 'medium',
        estimated_duration VARCHAR(50) DEFAULT '1-hour',
        additional_notes TEXT,
        preferred_contact VARCHAR(50) DEFAULT 'email',
        send_reminders BOOLEAN DEFAULT true,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('✅ Bookings table created')

    // Create admin users table
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        is_active BOOLEAN DEFAULT true,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('✅ Admin users table created')

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at)`
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(reference)`
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(preferred_date)`
    
    console.log('✅ Database indexes created')
    console.log('🎉 Database setup completed successfully!')

    return { success: true }
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    return { success: false, error }
  }
}

export async function createAdminUser(email: string, password: string, name: string) {
  try {
    const bcrypt = require('bcryptjs')
    const hashedPassword = await bcrypt.hash(password, 12)

    await sql`
      INSERT INTO admin_users (email, password_hash, name, role)
      VALUES (${email}, ${hashedPassword}, ${name}, 'admin')
      ON CONFLICT (email) 
      DO UPDATE SET 
        password_hash = ${hashedPassword},
        name = ${name},
        updated_at = CURRENT_TIMESTAMP
    `

    console.log('✅ Admin user created/updated:', email)
    return { success: true }
  } catch (error) {
    console.error('❌ Failed to create admin user:', error)
    return { success: false, error }
  }
}