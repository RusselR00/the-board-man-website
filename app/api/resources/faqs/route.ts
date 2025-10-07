import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    
    const offset = (page - 1) * limit

    // Build query based on filters
    let faqQuery: any
    const searchPattern = search ? `%${search}%` : null

    if (!category && !search && featured !== 'true') {
      faqQuery = sql`
        SELECT 
          id, question, answer, category, subcategory, order_index,
          is_active, is_featured, view_count, helpful_count, tags,
          related_faqs, created_at, updated_at
        FROM faqs 
        WHERE is_active = true
        ORDER BY order_index ASC, created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      // Build WHERE conditions
      let whereConditions = sql`WHERE is_active = true`
      
      if (category) {
        whereConditions = sql`${whereConditions} AND category = ${category}`
      }
      
      if (search) {
        whereConditions = sql`${whereConditions} AND (question ILIKE ${searchPattern} OR answer ILIKE ${searchPattern})`
      }
      
      if (featured === 'true') {
        whereConditions = sql`${whereConditions} AND is_featured = true`
      }

      faqQuery = sql`
        SELECT 
          id, question, answer, category, subcategory, order_index,
          is_active, is_featured, view_count, helpful_count, tags,
          related_faqs, created_at, updated_at
        FROM faqs 
        ${whereConditions}
        ORDER BY order_index ASC, created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    const faqs = await faqQuery

    // Get total count for pagination
    let countQuery: any
    if (!category && !search && featured !== 'true') {
      countQuery = sql`SELECT COUNT(*) as total FROM faqs WHERE is_active = true`
    } else {
      let countWhere = sql`WHERE is_active = true`
      
      if (category) {
        countWhere = sql`${countWhere} AND category = ${category}`
      }
      
      if (search) {
        countWhere = sql`${countWhere} AND (question ILIKE ${searchPattern} OR answer ILIKE ${searchPattern})`
      }
      
      if (featured === 'true') {
        countWhere = sql`${countWhere} AND is_featured = true`
      }

      countQuery = sql`SELECT COUNT(*) as total FROM faqs ${countWhere}`
    }

    const countResult = await countQuery
    const total = parseInt(countResult[0].total)
    const totalPages = Math.ceil(total / limit)

    // Group FAQs by category for better organization
    const faqsByCategory = faqs.reduce((acc: any, faq: any) => {
      const cat = faq.category || 'General'
      if (!acc[cat]) {
        acc[cat] = []
      }
      acc[cat].push(faq)
      return acc
    }, {})

    return NextResponse.json({
      success: true,
      data: {
        faqs,
        faqsByCategory,
        pagination: {
          current_page: page,
          total_pages: totalPages,
          total_items: total,
          items_per_page: limit,
          has_next: page < totalPages,
          has_prev: page > 1
        }
      }
    })

  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      question,
      answer,
      category,
      subcategory,
      order_index = 0,
      is_active = true,
      is_featured = false,
      tags = [],
      related_faqs = []
    } = body

    // Validate required fields
    if (!question || !answer || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: question, answer, category' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO faqs (
        question, answer, category, subcategory, order_index,
        is_active, is_featured, tags, related_faqs
      ) VALUES (
        ${question}, ${answer}, ${category}, ${subcategory}, ${order_index},
        ${is_active}, ${is_featured}, ${tags}, ${related_faqs}
      ) RETURNING *
    `

    return NextResponse.json({
      success: true,
      message: 'FAQ created successfully',
      data: result[0]
    })

  } catch (error) {
    console.error('Error creating FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create FAQ' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'FAQ ID is required' },
        { status: 400 }
      )
    }

    const {
      question, answer, category, subcategory, order_index,
      is_active, is_featured, tags, related_faqs
    } = updateData

    const result = await sql`
      UPDATE faqs 
      SET 
        question = COALESCE(${question}, question),
        answer = COALESCE(${answer}, answer),
        category = COALESCE(${category}, category),
        subcategory = COALESCE(${subcategory}, subcategory),
        order_index = COALESCE(${order_index}, order_index),
        is_active = COALESCE(${is_active}, is_active),
        is_featured = COALESCE(${is_featured}, is_featured),
        tags = COALESCE(${tags}, tags),
        related_faqs = COALESCE(${related_faqs}, related_faqs),
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ updated successfully',
      data: result[0]
    })

  } catch (error) {
    console.error('Error updating FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update FAQ' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'FAQ ID is required' },
        { status: 400 }
      )
    }

    // Soft delete
    const result = await sql`
      UPDATE faqs 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete FAQ' },
      { status: 500 }
    )
  }
}

// Special endpoint to increment view count
export async function PATCH(request: NextRequest) {
  let action = 'unknown' // Define action outside try block for error handling
  
  try {
    const body = await request.json()
    const { id } = body
    action = body.action // Assign to outer scope variable

    if (!id || !action) {
      return NextResponse.json(
        { success: false, error: 'FAQ ID and action are required' },
        { status: 400 }
      )
    }

    let result: any

    if (action === 'view') {
      result = await sql`
        UPDATE faqs 
        SET view_count = view_count + 1 
        WHERE id = ${parseInt(id)} AND is_active = true
        RETURNING view_count
      `
    } else if (action === 'helpful') {
      result = await sql`
        UPDATE faqs 
        SET helpful_count = helpful_count + 1 
        WHERE id = ${parseInt(id)} AND is_active = true
        RETURNING helpful_count
      `
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use "view" or "helpful"' },
        { status: 400 }
      )
    }

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `FAQ ${action} count updated successfully`,
      data: result[0]
    })

  } catch (error) {
    console.error(`Error updating FAQ ${action} count:`, error)
    return NextResponse.json(
      { success: false, error: `Failed to update FAQ ${action} count` },
      { status: 500 }
    )
  }
}