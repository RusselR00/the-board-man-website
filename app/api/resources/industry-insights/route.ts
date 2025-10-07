import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const author = searchParams.get('author')
    
    const offset = (page - 1) * limit

    // Build query based on filters
    let insightsQuery: any
    const searchPattern = search ? `%${search}%` : null

    if (!category && !search && featured !== 'true' && !author) {
      insightsQuery = sql`
        SELECT 
          id, title, description, content, category, author, author_bio,
          featured_image_path, featured_image_alt, read_time, publish_date,
          tags, is_published, is_featured, view_count, meta_title,
          meta_description, slug, created_at, updated_at
        FROM industry_insights 
        WHERE is_published = true
        ORDER BY is_featured DESC, publish_date DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      // Build WHERE conditions
      let whereConditions = sql`WHERE is_published = true`
      
      if (category) {
        whereConditions = sql`${whereConditions} AND category = ${category}`
      }
      
      if (search) {
        whereConditions = sql`${whereConditions} AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern} OR content ILIKE ${searchPattern})`
      }
      
      if (featured === 'true') {
        whereConditions = sql`${whereConditions} AND is_featured = true`
      }
      
      if (author) {
        whereConditions = sql`${whereConditions} AND author ILIKE ${`%${author}%`}`
      }

      insightsQuery = sql`
        SELECT 
          id, title, description, content, category, author, author_bio,
          featured_image_path, featured_image_alt, read_time, publish_date,
          tags, is_published, is_featured, view_count, meta_title,
          meta_description, slug, created_at, updated_at
        FROM industry_insights 
        ${whereConditions}
        ORDER BY is_featured DESC, publish_date DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    const insights = await insightsQuery

    // Format insights data
    const formattedInsights = insights.map((insight: any) => ({
      ...insight,
      publish_date_formatted: new Date(insight.publish_date).toLocaleDateString(),
      excerpt: insight.description || (insight.content ? insight.content.substring(0, 200) + '...' : ''),
      reading_time: insight.read_time ? `${insight.read_time} min read` : 'Quick read'
    }))

    // Get total count for pagination
    let countQuery: any
    if (!category && !search && featured !== 'true' && !author) {
      countQuery = sql`SELECT COUNT(*) as total FROM industry_insights WHERE is_published = true`
    } else {
      let countWhere = sql`WHERE is_published = true`
      
      if (category) {
        countWhere = sql`${countWhere} AND category = ${category}`
      }
      
      if (search) {
        countWhere = sql`${countWhere} AND (title ILIKE ${searchPattern} OR description ILIKE ${searchPattern} OR content ILIKE ${searchPattern})`
      }
      
      if (featured === 'true') {
        countWhere = sql`${countWhere} AND is_featured = true`
      }
      
      if (author) {
        countWhere = sql`${countWhere} AND author ILIKE ${`%${author}%`}`
      }

      countQuery = sql`SELECT COUNT(*) as total FROM industry_insights ${countWhere}`
    }

    const countResult = await countQuery
    const total = parseInt(countResult[0].total)
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        insights: formattedInsights,
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
    console.error('Error fetching industry insights:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch industry insights' },
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
      content,
      category,
      author,
      author_bio,
      featured_image_path,
      featured_image_alt,
      read_time,
      publish_date,
      tags = [],
      is_published = true,
      is_featured = false,
      meta_title,
      meta_description,
      slug
    } = body

    // Validate required fields
    if (!title || !content || !category || !author) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, content, category, author' },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const result = await sql`
      INSERT INTO industry_insights (
        title, description, content, category, author, author_bio,
        featured_image_path, featured_image_alt, read_time, publish_date,
        tags, is_published, is_featured, meta_title, meta_description, slug
      ) VALUES (
        ${title}, ${description}, ${content}, ${category}, ${author}, ${author_bio},
        ${featured_image_path}, ${featured_image_alt}, ${read_time}, ${publish_date || new Date().toISOString().split('T')[0]},
        ${tags}, ${is_published}, ${is_featured}, ${meta_title || title}, ${meta_description || description}, ${finalSlug}
      ) RETURNING *
    `

    return NextResponse.json({
      success: true,
      message: 'Industry insight created successfully',
      data: result[0]
    })

  } catch (error) {
    console.error('Error creating industry insight:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create industry insight' },
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
        { success: false, error: 'Insight ID is required' },
        { status: 400 }
      )
    }

    const {
      title, description, content, category, author, author_bio,
      featured_image_path, featured_image_alt, read_time, publish_date,
      tags, is_published, is_featured, meta_title, meta_description, slug
    } = updateData

    const result = await sql`
      UPDATE industry_insights 
      SET 
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        content = COALESCE(${content}, content),
        category = COALESCE(${category}, category),
        author = COALESCE(${author}, author),
        author_bio = COALESCE(${author_bio}, author_bio),
        featured_image_path = COALESCE(${featured_image_path}, featured_image_path),
        featured_image_alt = COALESCE(${featured_image_alt}, featured_image_alt),
        read_time = COALESCE(${read_time}, read_time),
        publish_date = COALESCE(${publish_date}, publish_date),
        tags = COALESCE(${tags}, tags),
        is_published = COALESCE(${is_published}, is_published),
        is_featured = COALESCE(${is_featured}, is_featured),
        meta_title = COALESCE(${meta_title}, meta_title),
        meta_description = COALESCE(${meta_description}, meta_description),
        slug = COALESCE(${slug}, slug),
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Industry insight not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Industry insight updated successfully',
      data: result[0]
    })

  } catch (error) {
    console.error('Error updating industry insight:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update industry insight' },
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
        { success: false, error: 'Insight ID is required' },
        { status: 400 }
      )
    }

    // Soft delete by unpublishing
    const result = await sql`
      UPDATE industry_insights 
      SET is_published = false, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Industry insight not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Industry insight deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting industry insight:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete industry insight' },
      { status: 500 }
    )
  }
}