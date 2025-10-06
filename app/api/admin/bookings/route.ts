import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const offset = (page - 1) * limit

    // Build the query based on filters
    let whereClause = ''
    let queryParams = []
    
    if (status && status !== 'all') {
      whereClause = 'WHERE status = $1'
      queryParams.push(status)
    }

    // Get total count
    const countQuery = status && status !== 'all' 
      ? `SELECT COUNT(*) as count FROM bookings WHERE status = $1`
      : `SELECT COUNT(*) as count FROM bookings`
    
    const { rows: countRows } = await sql.query(countQuery, status && status !== 'all' ? [status] : [])
    const totalBookings = parseInt(countRows[0].count)

    // Get bookings with pagination
    const bookingsQuery = `
      SELECT id, name, email, phone, company, service_type, 
             preferred_date, preferred_time, budget_range, 
             description, status, created_at
      FROM bookings 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `
    
    queryParams.push(limit, offset)
    const { rows: bookings } = await sql.query(bookingsQuery, queryParams)

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