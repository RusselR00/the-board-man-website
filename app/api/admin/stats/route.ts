import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Get contacts stats
    const contactStats = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'responded' THEN 1 END) as responded,
        COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as this_week
      FROM contacts
    `

    // Get bookings stats
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

    // Get recent activity (last 10 items)
    const recentContacts = await sql`
      SELECT 'contact' as type, name, email, created_at, status
      FROM contacts
      ORDER BY created_at DESC
      LIMIT 5
    `

    const recentBookings = await sql`
      SELECT 'booking' as type, name, email, created_at, status
      FROM bookings
      ORDER BY created_at DESC
      LIMIT 5
    `

    // Combine and sort recent activity
    const recentActivity = [...recentContacts, ...recentBookings]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)

    // Get monthly trends (last 6 months)
    const monthlyTrends = await sql`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(CASE WHEN table_name = 'contacts' THEN 1 END) as contacts,
        COUNT(CASE WHEN table_name = 'bookings' THEN 1 END) as bookings
      FROM (
        SELECT created_at, 'contacts' as table_name FROM contacts
        WHERE created_at >= CURRENT_DATE - INTERVAL '6 months'
        UNION ALL
        SELECT created_at, 'bookings' as table_name FROM bookings
        WHERE created_at >= CURRENT_DATE - INTERVAL '6 months'
      ) combined
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month DESC
      LIMIT 6
    `

    return NextResponse.json({
      success: true,
      data: {
        contacts: {
          total: parseInt(contactStats[0].total) || 0,
          pending: parseInt(contactStats[0].pending) || 0,
          responded: parseInt(contactStats[0].responded) || 0,
          thisWeek: parseInt(contactStats[0].this_week) || 0,
        },
        bookings: {
          total: parseInt(bookingStats[0].total) || 0,
          pending: parseInt(bookingStats[0].pending) || 0,
          confirmed: parseInt(bookingStats[0].confirmed) || 0,
          completed: parseInt(bookingStats[0].completed) || 0,
          cancelled: parseInt(bookingStats[0].cancelled) || 0,
          thisWeek: parseInt(bookingStats[0].this_week) || 0,
        },
        recentActivity,
        monthlyTrends,
      }
    })

  } catch (error) {
    console.error('Admin stats API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}