import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    console.log('Testing database connection and environment variables...')
    
    // Check if DATABASE_URL exists
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not found')
      return NextResponse.json({ 
        success: false, 
        error: 'DATABASE_URL not configured',
        env_vars: {
          database_url: !!process.env.DATABASE_URL,
          nextauth_secret: !!process.env.NEXTAUTH_SECRET,
          nextauth_url: process.env.NEXTAUTH_URL || 'not set'
        }
      })
    }

    const sql = neon(process.env.DATABASE_URL)
    
    // Test basic connectivity
    const result = await sql`SELECT 1 as test`
    console.log('Database connection successful')
    
    // Test user table
    const users = await sql`
      SELECT id, email, name, role 
      FROM admin_users 
      WHERE email = 'admin@board-man.com'
      LIMIT 1
    `
    
    return NextResponse.json({ 
      success: true, 
      database_connected: true,
      user_exists: users.length > 0,
      user: users.length > 0 ? users[0] : null,
      env_vars: {
        database_url: !!process.env.DATABASE_URL,
        nextauth_secret: !!process.env.NEXTAUTH_SECRET,
        nextauth_url: process.env.NEXTAUTH_URL || 'not set',
        node_env: process.env.NODE_ENV
      }
    })
    
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      env_vars: {
        database_url: !!process.env.DATABASE_URL,
        nextauth_secret: !!process.env.NEXTAUTH_SECRET,
        nextauth_url: process.env.NEXTAUTH_URL || 'not set',
        node_env: process.env.NODE_ENV
      }
    })
  }
}