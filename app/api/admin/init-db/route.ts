import { NextRequest, NextResponse } from 'next/server'
import { initializeDatabase } from '@/scripts/init-db'

export async function POST(request: NextRequest) {
  try {
    // Add basic security check
    const { password } = await request.json()
    
    // Simple password check for initialization
    if (password !== 'initialize-board-man-db-2024') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    await initializeDatabase()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully! Admin user created: admin@board-man.com / admin123' 
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to initialize database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}