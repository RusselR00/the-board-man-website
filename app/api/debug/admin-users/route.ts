import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    console.log('Checking admin users...')
    
    const users = await sql`
      SELECT id, email, name, role, created_at
      FROM admin_users
      ORDER BY created_at DESC
    `
    
    console.log('Admin users found:', users.length)
    
    return NextResponse.json({
      success: true,
      count: users.length,
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        created_at: user.created_at
      }))
    })
    
  } catch (error) {
    console.error('Error checking admin users:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}