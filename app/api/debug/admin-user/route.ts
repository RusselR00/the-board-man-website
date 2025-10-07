import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Check if admin user exists
    const users = await sql`
      SELECT id, email, name, role, created_at, password_hash 
      FROM admin_users 
      ORDER BY created_at DESC
    `
    
    // Test password hash for the admin user
    let passwordTest = null
    const adminUser = users.find(u => u.email === 'admin@board-man.com')
    if (adminUser) {
      const isValidPassword = await bcrypt.compare('admin123', adminUser.password_hash)
      passwordTest = {
        email: adminUser.email,
        passwordMatches: isValidPassword,
        hashLength: adminUser.password_hash.length
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        totalUsers: users.length,
        users: users.map(u => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          created_at: u.created_at,
          hasPassword: !!u.password_hash
        })),
        passwordTest,
        adminUserExists: !!adminUser
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Create default admin user if it doesn't exist
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const result = await sql`
      INSERT INTO admin_users (email, password_hash, name, role, created_at)
      VALUES ('admin@board-man.com', ${hashedPassword}, 'Admin User', 'admin', NOW())
      ON CONFLICT (email) DO UPDATE SET
        password_hash = ${hashedPassword},
        name = 'Admin User',
        role = 'admin'
      RETURNING id, email, name, role, created_at
    `

    return NextResponse.json({
      success: true,
      message: 'Admin user created/updated successfully',
      user: result[0]
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}