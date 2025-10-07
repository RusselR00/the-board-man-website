import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    console.log('Fixing admin password...')
    
    const body = await request.json()
    const newPassword = body.password || 'admin123'
    
    // Hash the new password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
    
    console.log('New password hashed successfully')
    
    const sql = neon(process.env.DATABASE_URL!)
    
    // Update the admin user's password
    const result = await sql`
      UPDATE admin_users 
      SET password_hash = ${hashedPassword}
      WHERE email = 'admin@board-man.com'
      RETURNING id, email, name, role
    `
    
    console.log('Password updated for user:', result[0]?.email)
    
    // Test the new password immediately
    const testResult = await bcrypt.compare(newPassword, hashedPassword)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Password updated successfully',
      user: result[0],
      passwordTest: testResult,
      newPassword: newPassword
    })
    
  } catch (error) {
    console.error('Fix password error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}