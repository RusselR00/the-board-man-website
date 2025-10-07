import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    // Create downloads table
    await sql`
      CREATE TABLE IF NOT EXISTS downloads (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        file_size VARCHAR(50),
        file_url VARCHAR(500) NOT NULL,
        download_count INTEGER DEFAULT 0,
        is_new BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create business_tools table
    await sql`
      CREATE TABLE IF NOT EXISTS business_tools (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        color_class VARCHAR(100),
        tool_url VARCHAR(500),
        is_available BOOLEAN DEFAULT true,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create industry_insights table
    await sql`
      CREATE TABLE IF NOT EXISTS industry_insights (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        read_time VARCHAR(50),
        publish_date DATE,
        content TEXT,
        insight_url VARCHAR(500),
        is_new BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create faqs table
    await sql`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question VARCHAR(500) NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100),
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log('Resources database tables created successfully')

    return NextResponse.json({
      success: true,
      message: 'Resources database tables created successfully'
    })

  } catch (error) {
    console.error('Error creating resources tables:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create resources tables' },
      { status: 500 }
    )
  }
}