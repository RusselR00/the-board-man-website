import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Get all bookings with their statuses
    const allBookings = await sql`
      SELECT id, name, email, status, created_at
      FROM bookings
      ORDER BY created_at DESC
    `

    // Get booking counts by status
    const statusCounts = await sql`
      SELECT 
        status,
        COUNT(*) as count
      FROM bookings
      GROUP BY status
      ORDER BY status
    `

    // Get overall stats (same as admin stats API)
    const bookingStats = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled,
        COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as this_week
      FROM bookings
    `

    // Get distinct status values
    const distinctStatuses = await sql`
      SELECT DISTINCT status
      FROM bookings
      ORDER BY status
    `

    return NextResponse.json({
      success: true,
      debug: {
        totalBookings: allBookings.length,
        allBookings: allBookings,
        statusCounts: statusCounts,
        distinctStatuses: distinctStatuses.map(row => row.status),
        computedStats: {
          total: parseInt(bookingStats[0].total) || 0,
          pending: parseInt(bookingStats[0].pending) || 0,
          confirmed: parseInt(bookingStats[0].confirmed) || 0,
          completed: parseInt(bookingStats[0].completed) || 0,
          cancelled: parseInt(bookingStats[0].cancelled) || 0,
          thisWeek: parseInt(bookingStats[0].this_week) || 0,
        }
      }
    })

  } catch (error) {
    console.error('Debug booking stats API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking debug stats', details: error },
      { status: 500 }
    )
  }
}