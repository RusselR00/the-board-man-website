import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    // Test database connection
    const sql = neon(process.env.DATABASE_URL!)
    const dbTest = await sql`SELECT 1 as test`
    
    // Check environment variables
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT_SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
    }
    
    // Test admin user exists
    const adminCheck = await sql`
      SELECT id, email, name, role, created_at 
      FROM admin_users 
      WHERE role = 'admin' 
      LIMIT 1
    `
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          connected: true,
          testQuery: dbTest,
          adminUserExists: adminCheck.length > 0,
          adminUser: adminCheck.length > 0 ? {
            email: adminCheck[0].email,
            name: adminCheck[0].name,
            role: adminCheck[0].role,
            created: adminCheck[0].created_at
          } : null
        },
        environment: envCheck,
        auth: {
          nextAuthConfigured: true,
          debugMode: true
        }
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}