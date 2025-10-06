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
      ? `SELECT COUNT(*) as count FROM contacts WHERE status = $1`
      : `SELECT COUNT(*) as count FROM contacts`
    
    const { rows: countRows } = await sql.query(countQuery, status && status !== 'all' ? [status] : [])
    const totalContacts = parseInt(countRows[0].count)

    // Get contacts with pagination
    const contactsQuery = `
      SELECT id, name, email, subject, message, status, created_at
      FROM contacts 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `
    
    queryParams.push(limit, offset)
    const { rows: contacts } = await sql.query(contactsQuery, queryParams)

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total: totalContacts,
          pages: Math.ceil(totalContacts / limit),
        }
      }
    })

  } catch (error) {
    console.error('Admin contacts API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

// Update contact status
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
      UPDATE contacts 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${id}
    `

    return NextResponse.json({
      success: true,
      message: 'Contact status updated successfully'
    })

  } catch (error) {
    console.error('Admin contacts PATCH error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update contact' },
      { status: 500 }
    )
  }
}