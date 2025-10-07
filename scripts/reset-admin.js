const { neon } = require('@neondatabase/serverless')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)

async function resetAdminUser() {
  try {
    console.log('🔧 Resetting admin user...')

    const email = 'admin@board-man.com'
    const password = 'admin123'
    const name = 'Admin User'

    // Hash the password properly
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log('✅ Password hashed successfully')

    // Insert or update admin user
    await sql`
      INSERT INTO admin_users (email, password_hash, name, role)
      VALUES (${email}, ${hashedPassword}, ${name}, 'admin')
      ON CONFLICT (email) 
      DO UPDATE SET 
        password_hash = ${hashedPassword},
        name = ${name},
        updated_at = CURRENT_TIMESTAMP
    `

    console.log('✅ Admin user created/updated successfully!')
    console.log('📧 Email:', email)
    console.log('🔑 Password:', password)

    // Verify the user was created properly
    const users = await sql`SELECT email, name, role FROM admin_users WHERE email = ${email}`
    if (users.length > 0) {
      console.log('✅ Verification successful - User found in database:', users[0])
    } else {
      console.log('❌ Verification failed - User not found in database')
    }

  } catch (error) {
    console.error('❌ Failed to reset admin user:', error)
  } finally {
    process.exit(0)
  }
}

resetAdminUser()