import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const offset = (page - 1) * limit

    // Get bookings with optional status filter
    let bookings
    let totalResult
    
    if (status && status !== 'all') {
      bookings = await sql`
        SELECT * FROM bookings 
        WHERE status = ${status}
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      totalResult = await sql`
        SELECT COUNT(*) as total FROM bookings WHERE status = ${status}
      `
    } else {
      bookings = await sql`
        SELECT * FROM bookings 
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      totalResult = await sql`
        SELECT COUNT(*) as total FROM bookings
      `
    }

    const totalBookings = parseInt(totalResult[0].total)

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total: totalBookings,
          pages: Math.ceil(totalBookings / limit),
        }
      }
    })

  } catch (error) {
    console.error('Admin bookings API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

// Update booking status
export async function PATCH(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID and status are required' },
        { status: 400 }
      )
    }

    await sql`
      UPDATE bookings 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${id}
    `

    return NextResponse.json({
      success: true,
      message: 'Booking status updated successfully'
    })

  } catch (error) {
    console.error('Admin bookings PATCH error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    )
  }
}