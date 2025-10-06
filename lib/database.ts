import { Pool } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

// Create drizzle database instance
export const db = drizzle(pool)

// Database connection helper
export async function connectDB() {
  try {
    const client = await pool.connect()
    console.log('✅ Database connected successfully')
    return client
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    console.log('✅ Database test successful:', result.rows[0])
    return true
  } catch (error) {
    console.error('❌ Database test failed:', error)
    return false
  }
}