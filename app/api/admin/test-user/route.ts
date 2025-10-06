import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const result = await sql`
      SELECT id, email, name, role, created_at 
      FROM admin_users 
      WHERE email = 'admin@board-man.com'
    `
    
    return NextResponse.json({
      success: true,
      user: result[0] || null,
      userExists: result.length > 0,
      totalAdminUsers: result.length
    })
  } catch (error) {
    console.error('Test user error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}