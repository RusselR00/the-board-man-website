import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    console.log('Testing login flow directly...')
    
    const body = await request.json()
    console.log('Request body received:', { email: body.email, hasPassword: !!body.password })
    
    if (!body.email || !body.password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing email or password' 
      })
    }

    const sql = neon(process.env.DATABASE_URL!)
    
    // Query the database for the user
    console.log('Querying database for user:', body.email)
    const users = await sql`
      SELECT id, email, password_hash, name, role
      FROM admin_users 
      WHERE email = ${body.email.toLowerCase()}
      LIMIT 1
    `
    
    console.log('Database query result:', users.length > 0 ? 'User found' : 'No user found')

    if (users.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      })
    }

    const user = users[0]
    console.log('Found user:', user.email, 'with role:', user.role)

    // Test password verification
    console.log('Testing password verification...')
    const isPasswordValid = await bcrypt.compare(body.password, user.password_hash)
    console.log('Password validation result:', isPasswordValid)

    if (!isPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid password' 
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Authentication successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
    
  } catch (error) {
    console.error('Test login error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
  }
}