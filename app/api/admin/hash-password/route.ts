import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({
        success: false,
        error: 'Password is required'
      }, { status: 400 })
    }

    // Generate password hash
    const passwordHash = await bcrypt.hash(password, 12)

    return NextResponse.json({
      success: true,
      password: password,
      hash: passwordHash,
      sqlInsert: `INSERT INTO admin_users (email, password_hash, name, role, created_at) 
VALUES ('your-email@board-man.com', '${passwordHash}', 'Your Name', 'admin', NOW());`
    })

  } catch (error) {
    console.error('Hash generation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'POST to this endpoint with {"password": "your-password"} to generate a hash',
    example: {
      password: 'your-secure-password'
    }
  })
}