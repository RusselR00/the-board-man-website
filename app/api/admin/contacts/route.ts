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

    // Get contacts with optional status filter
    let contacts
    let totalResult
    
    if (status && status !== 'all') {
      contacts = await sql`
        SELECT * FROM contacts 
        WHERE status = ${status}
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      totalResult = await sql`
        SELECT COUNT(*) as total FROM contacts WHERE status = ${status}
      `
    } else {
      contacts = await sql`
        SELECT * FROM contacts 
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      totalResult = await sql`
        SELECT COUNT(*) as total FROM contacts
      `
    }

    const totalContacts = parseInt(totalResult[0].total)

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