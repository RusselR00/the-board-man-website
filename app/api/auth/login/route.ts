import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import bcrypt from 'bcryptjs'

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = LoginSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { email, password } = validationResult.data

    // For initial setup, create default admin if no users exist
    await ensureDefaultAdmin()

    // Find user in database
    const { rows } = await sql`
      SELECT id, email, password_hash, name, role, is_active 
      FROM admin_users 
      WHERE email = ${email} AND is_active = true
      LIMIT 1
    `

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const user = rows[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Update last login
    await sql`
      UPDATE admin_users 
      SET last_login = CURRENT_TIMESTAMP 
      WHERE id = ${user.id}
    `

    // Return user data (without password)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }

    return NextResponse.json({
      success: true,
      user: userData,
      message: 'Login successful'
    })

  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Ensure default admin user exists
async function ensureDefaultAdmin() {
  try {
    // Check if any admin users exist
    const { rows } = await sql`SELECT COUNT(*) as count FROM admin_users`
    
    if (parseInt(rows[0].count) === 0) {
      // Create default admin
      const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@board-man.com'
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'
      const hashedPassword = await bcrypt.hash(defaultPassword, 12)

      await sql`
        INSERT INTO admin_users (email, password_hash, name, role)
        VALUES (${defaultEmail}, ${hashedPassword}, 'Admin User', 'admin')
      `

      console.log('✅ Default admin user created:', defaultEmail)
    }
  } catch (error) {
    console.error('Error ensuring default admin:', error)
  }
}