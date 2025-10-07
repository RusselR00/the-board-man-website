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
    
    const offset = (page - 1) * limit

    let whereClause = 'WHERE is_active = true'
    const params: any[] = []
    let paramIndex = 1

    if (category) {
      whereClause += ` AND category = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    if (search) {
      whereClause += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (featured === 'true') {
      whereClause += ` AND is_featured = true`
    }

    // Get total count
    let countQuery: any
    if (params.length === 0) {
      countQuery = sql`SELECT COUNT(*) as total FROM downloads WHERE is_active = true`
    } else if (params.length === 1) {
      if (category) {
        countQuery = sql`SELECT COUNT(*) as total FROM downloads WHERE is_active = true AND category = ${params[0]}`
      } else {
        countQuery = sql`SELECT COUNT(*) as total FROM downloads WHERE is_active = true AND (title ILIKE ${params[0]} OR description ILIKE ${params[0]})`
      }
    } else {
      countQuery = sql`SELECT COUNT(*) as total FROM downloads WHERE is_active = true AND category = ${params[0]} AND (title ILIKE ${params[1]} OR description ILIKE ${params[1]})`
    }
    
    const countResult = await countQuery
    const total = parseInt(countResult[0].total)

    // Get downloads with pagination
    let downloadsQuery: any
    if (params.length === 0) {
      downloadsQuery = sql`
        SELECT 
          id, title, description, category, file_name, file_path, file_type, 
          file_size, mime_type, download_count, is_featured, tags, author, 
          version, created_at, updated_at
        FROM downloads 
        WHERE is_active = true
        ${featured === 'true' ? sql`AND is_featured = true` : sql``}
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else if (params.length === 1) {
      if (category) {
        downloadsQuery = sql`
          SELECT 
            id, title, description, category, file_name, file_path, file_type, 
            file_size, mime_type, download_count, is_featured, tags, author, 
            version, created_at, updated_at
          FROM downloads 
          WHERE is_active = true AND category = ${params[0]}
          ${featured === 'true' ? sql`AND is_featured = true` : sql``}
          ORDER BY 
            CASE WHEN is_featured = true THEN 0 ELSE 1 END,
            created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `
      } else {
        downloadsQuery = sql`
          SELECT 
            id, title, description, category, file_name, file_path, file_type, 
            file_size, mime_type, download_count, is_featured, tags, author, 
            version, created_at, updated_at
          FROM downloads 
          WHERE is_active = true AND (title ILIKE ${params[0]} OR description ILIKE ${params[0]})
          ${featured === 'true' ? sql`AND is_featured = true` : sql``}
          ORDER BY 
            CASE WHEN is_featured = true THEN 0 ELSE 1 END,
            created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `
      }
    } else {
      downloadsQuery = sql`
        SELECT 
          id, title, description, category, file_name, file_path, file_type, 
          file_size, mime_type, download_count, is_featured, tags, author, 
          version, created_at, updated_at
        FROM downloads 
        WHERE is_active = true AND category = ${params[0]} AND (title ILIKE ${params[1]} OR description ILIKE ${params[1]})
        ${featured === 'true' ? sql`AND is_featured = true` : sql``}
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }
    
    const downloads = await downloadsQuery

    // Format downloads with additional data
    const formattedDownloads = downloads.map((download: any) => ({
      ...download,
      file_size_formatted: formatFileSize(download.file_size),
      download_url: download.file_path,
      created_at_formatted: new Date(download.created_at).toLocaleDateString(),
    }))

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        downloads: formattedDownloads,
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
    console.error('Error fetching downloads:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch downloads' },
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
      category,
      file_name,
      file_path,
      file_type,
      file_size,
      mime_type,
      is_featured = false,
      tags = [],
      author,
      version
    } = body

    // Validate required fields
    if (!title || !file_path || !file_type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, file_path, file_type' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO downloads (
        title, description, category, file_name, file_path, file_type,
        file_size, mime_type, is_featured, tags, author, version
      ) VALUES (
        ${title}, ${description}, ${category}, ${file_name}, ${file_path}, 
        ${file_type}, ${file_size}, ${mime_type}, ${is_featured}, ${tags}, 
        ${author}, ${version}
      ) RETURNING *
    `

    return NextResponse.json({
      success: true,
      message: 'Download created successfully',
      data: result[0]
    })

  } catch (error) {
    console.error('Error creating download:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create download' },
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
        { success: false, error: 'Download ID is required' },
        { status: 400 }
      )
    }

    const {
      title, description, category, file_name, file_path, file_type,
      file_size, mime_type, is_featured, tags, author, version
    } = updateData

    const result = await sql`
      UPDATE downloads 
      SET 
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        category = COALESCE(${category}, category),
        file_name = COALESCE(${file_name}, file_name),
        file_path = COALESCE(${file_path}, file_path),
        file_type = COALESCE(${file_type}, file_type),
        file_size = COALESCE(${file_size}, file_size),
        mime_type = COALESCE(${mime_type}, mime_type),
        is_featured = COALESCE(${is_featured}, is_featured),
        tags = COALESCE(${tags}, tags),
        author = COALESCE(${author}, author),
        version = COALESCE(${version}, version),
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)} AND is_active = true
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Download not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Download updated successfully',
      data: result[0]
    })

  } catch (error) {
    console.error('Error updating download:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update download' },
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
        { success: false, error: 'Download ID is required' },
        { status: 400 }
      )
    }

    // Soft delete
    const result = await sql`
      UPDATE downloads 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Download not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Download deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting download:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete download' },
      { status: 500 }
    )
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}