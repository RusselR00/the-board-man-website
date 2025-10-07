import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    const { email, password, name, role = 'admin' } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({
        success: false,
        error: 'Email, password, and name are required'
      }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM admin_users WHERE email = ${email.toLowerCase()}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'User with this email already exists'
      }, { status: 400 })
    }

    // Generate password hash
    const passwordHash = await bcrypt.hash(password, 12)

    // Insert new user
    const result = await sql`
      INSERT INTO admin_users (email, password_hash, name, role, created_at)
      VALUES (${email.toLowerCase()}, ${passwordHash}, ${name}, ${role}, NOW())
      RETURNING id, email, name, role, created_at
    `

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: result[0].id,
        email: result[0].email,
        name: result[0].name,
        role: result[0].role,
        created_at: result[0].created_at
      },
      passwordHash: passwordHash // For reference
    })

  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'POST to this endpoint to create a new admin user',
    example: {
      email: 'newadmin@board-man.com',
      password: 'your-secure-password',
      name: 'New Admin User',
      role: 'admin'
    }
  })
}