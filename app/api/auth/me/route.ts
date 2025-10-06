import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(request: NextRequest) {
  try {
    // In a production app, you'd get user ID from JWT token or session
    // For now, we'll implement a simple check based on request headers
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'No authorization header' },
        { status: 401 }
      )
    }

    // Extract user email from auth header (this is simplified)
    const userEmail = authHeader.replace('Bearer ', '')
    
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user from database
    const { rows } = await sql`
      SELECT id, email, name, role, created_at, last_login
      FROM admin_users 
      WHERE email = ${userEmail} AND is_active = true
      LIMIT 1
    `

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 401 }
      )
    }

    const user = rows[0]

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at,
        lastLogin: user.last_login,
      }
    })

  } catch (error) {
    console.error('Me API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}