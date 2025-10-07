import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const toolType = searchParams.get('type')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    
    const offset = (page - 1) * limit

    // Build query based on filters
    let toolsQuery: any
    const searchPattern = search ? `%${search}%` : null

    if (!toolType && !search && featured !== 'true') {
      toolsQuery = sql`
        SELECT 
          id, title, description, tool_type, difficulty_level, estimated_time,
          icon, color_class, tool_url, file_path, file_type, is_available,
          is_featured, tags, requirements, order_index, created_at, updated_at
        FROM business_tools 
        WHERE is_available = true
        ORDER BY order_index ASC, created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (toolType && !search && featured !== 'true') {
      toolsQuery = sql`
        SELECT 
          id, title, description, tool_type, difficulty_level, estimated_time,
          icon, color_class, tool_url, file_path, file_type, is_available,
          is_featured, tags, requirements, order_index, created_at, updated_at
        FROM business_tools 
        WHERE is_available = true AND tool_type = ${toolType}
        ORDER BY order_index ASC, created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (!toolType && search && featured !== 'true') {
      toolsQuery = sql`
        SELECT 
          id, title, description, tool_type, difficulty_level, estimated_time,
          icon, color_class, tool_url, file_path, file_type, is_available,
          is_featured, tags, requirements, order_index, created_at, updated_at
        FROM business_tools 
        WHERE is_available = true AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})
        ORDER BY order_index ASC, created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (toolType && search && featured !== 'true') {
      toolsQuery = sql`
        SELECT 
          id, title, description, tool_type, difficulty_level, estimated_time,
          icon, color_class, tool_url, file_path, file_type, is_available,
          is_featured, tags, requirements, order_index, created_at, updated_at
        FROM business_tools 
        WHERE is_available = true AND tool_type = ${toolType} AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})
        ORDER BY order_index ASC, created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (featured === 'true') {
      toolsQuery = sql`
        SELECT 
          id, title, description, tool_type, difficulty_level, estimated_time,
          icon, color_class, tool_url, file_path, file_type, is_available,
          is_featured, tags, requirements, order_index, created_at, updated_at
        FROM business_tools 
        WHERE is_available = true AND is_featured = true
        ${toolType ? sql`AND tool_type = ${toolType}` : sql``}
        ${search ? sql`AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})` : sql``}
        ORDER BY order_index ASC, created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    const tools = await toolsQuery

    // Get total count for pagination
    let countQuery: any
    if (!toolType && !search && featured !== 'true') {
      countQuery = sql`SELECT COUNT(*) as total FROM business_tools WHERE is_available = true`
    } else if (toolType && !search && featured !== 'true') {
      countQuery = sql`SELECT COUNT(*) as total FROM business_tools WHERE is_available = true AND tool_type = ${toolType}`
    } else if (!toolType && search && featured !== 'true') {
      countQuery = sql`SELECT COUNT(*) as total FROM business_tools WHERE is_available = true AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})`
    } else if (toolType && search && featured !== 'true') {
      countQuery = sql`SELECT COUNT(*) as total FROM business_tools WHERE is_available = true AND tool_type = ${toolType} AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})`
    } else if (featured === 'true') {
      countQuery = sql`
        SELECT COUNT(*) as total FROM business_tools 
        WHERE is_available = true AND is_featured = true
        ${toolType ? sql`AND tool_type = ${toolType}` : sql``}
        ${search ? sql`AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern})` : sql``}
      `
    }

    const countResult = await countQuery
    const total = parseInt(countResult[0].total)
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        tools,
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
    console.error('Error fetching business tools:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch business tools' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      tool_type,
      difficulty_level = 'beginner',
      estimated_time,
      icon,
      color_class,
      tool_url,
      file_path,
      file_type,
      is_available = true,
      is_featured = false,
      tags = [],
      requirements,
      order_index = 0
    } = body

    // Validate required fields
    if (!title || !tool_type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, tool_type' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO business_tools (
        title, description, tool_type, difficulty_level, estimated_time,
        icon, color_class, tool_url, file_path, file_type, is_available,
        is_featured, tags, requirements, order_index
      ) VALUES (
        ${title}, ${description}, ${tool_type}, ${difficulty_level}, ${estimated_time},
        ${icon}, ${color_class}, ${tool_url}, ${file_path}, ${file_type}, ${is_available},
        ${is_featured}, ${tags}, ${requirements}, ${order_index}
      ) RETURNING *
    `

    return NextResponse.json({
      success: true,
      message: 'Business tool created successfully',
      data: result[0]
    })

  } catch (error) {
    console.error('Error creating business tool:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create business tool' },
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
        { success: false, error: 'Tool ID is required' },
        { status: 400 }
      )
    }

    const {
      title, description, tool_type, difficulty_level, estimated_time,
      icon, color_class, tool_url, file_path, file_type, is_available,
      is_featured, tags, requirements, order_index
    } = updateData

    const result = await sql`
      UPDATE business_tools 
      SET 
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        tool_type = COALESCE(${tool_type}, tool_type),
        difficulty_level = COALESCE(${difficulty_level}, difficulty_level),
        estimated_time = COALESCE(${estimated_time}, estimated_time),
        icon = COALESCE(${icon}, icon),
        color_class = COALESCE(${color_class}, color_class),
        tool_url = COALESCE(${tool_url}, tool_url),
        file_path = COALESCE(${file_path}, file_path),
        file_type = COALESCE(${file_type}, file_type),
        is_available = COALESCE(${is_available}, is_available),
        is_featured = COALESCE(${is_featured}, is_featured),
        tags = COALESCE(${tags}, tags),
        requirements = COALESCE(${requirements}, requirements),
        order_index = COALESCE(${order_index}, order_index),
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Business tool not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Business tool updated successfully',
      data: result[0]
    })

  } catch (error) {
    console.error('Error updating business tool:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update business tool' },
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
        { success: false, error: 'Tool ID is required' },
        { status: 400 }
      )
    }

    // Soft delete
    const result = await sql`
      UPDATE business_tools 
      SET is_available = false, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Business tool not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Business tool deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting business tool:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete business tool' },
      { status: 500 }
    )
  }
}