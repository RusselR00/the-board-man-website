import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt?: string
  content: string
  featured_image?: string
  author_name: string
  author_role?: string
  category: string
  tags: string[]
  is_published: boolean
  is_featured: boolean
  read_time?: number
  views: number
  publish_date?: string
  created_at: string
  updated_at: string
}

// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const category = url.searchParams.get('category')
    const status = url.searchParams.get('status') // 'published' or 'draft'
    const search = url.searchParams.get('search')
    const offset = (page - 1) * limit

    // Start with base query
    let whereConditions = []
    
    if (category && category !== 'all') {
      whereConditions.push(`category = '${category}'`)
    }
    
    if (status === 'published') {
      whereConditions.push(`is_published = true`)
    } else if (status === 'draft') {
      whereConditions.push(`is_published = false`)
    }
    
    if (search) {
      const searchEscaped = search.replace(/'/g, "''") // Basic SQL injection protection
      whereConditions.push(`(title ILIKE '%${searchEscaped}%' OR excerpt ILIKE '%${searchEscaped}%' OR content ILIKE '%${searchEscaped}%')`)
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : ''
    
    // Get total count and posts
    const posts = await sql`
      SELECT 
        id, slug, title, excerpt, content, featured_image, author_name, author_role,
        category, tags, is_published, is_featured, read_time, views, publish_date,
        created_at, updated_at
      FROM blog_posts 
      ORDER BY created_at DESC
    `

    // Apply filters in JavaScript for simplicity
    let filteredPosts = posts

    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category)
    }
    
    if (status === 'published') {
      filteredPosts = filteredPosts.filter(post => post.is_published)
    } else if (status === 'draft') {
      filteredPosts = filteredPosts.filter(post => !post.is_published)
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchLower)) ||
        post.content.toLowerCase().includes(searchLower)
      )
    }

    const total = filteredPosts.length
    const paginatedPosts = filteredPosts.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      posts: paginatedPosts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { 
      title, slug, excerpt, content, featured_image, author_name, author_role,
      category, tags, is_published, is_featured, read_time, publish_date
    } = data
    
    // Generate slug if not provided
    const finalSlug = slug || createSlug(title)
    
    // Insert new blog post
    const result = await sql`
      INSERT INTO blog_posts (
        slug, title, excerpt, content, featured_image, author_name, author_role,
        category, tags, is_published, is_featured, read_time, publish_date
      )
      VALUES (
        ${finalSlug}, ${title}, ${excerpt || null}, ${content}, ${featured_image || null}, 
        ${author_name}, ${author_role || null}, ${category}, ${tags || []}, 
        ${is_published}, ${is_featured}, ${read_time || null}, ${publish_date || null}
      )
      RETURNING *
    `

    const newPost = result[0]

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post created successfully',
      post: newPost 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    
    // Handle unique constraint violation
    if (error instanceof Error && error.message.includes('duplicate key value violates unique constraint')) {
      return NextResponse.json(
        { success: false, message: 'A blog post with this slug already exists. Please use a different title or slug.' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { 
      id, title, slug, excerpt, content, featured_image, author_name, author_role,
      category, tags, is_published, is_featured, read_time, publish_date
    } = data

    // Generate new slug if title changed and no custom slug provided
    const finalSlug = slug || createSlug(title)

    // Update blog post
    const result = await sql`
      UPDATE blog_posts 
      SET 
        slug = ${finalSlug}, title = ${title}, excerpt = ${excerpt || null}, 
        content = ${content}, featured_image = ${featured_image || null}, 
        author_name = ${author_name}, author_role = ${author_role || null},
        category = ${category}, tags = ${tags || []}, is_published = ${is_published}, 
        is_featured = ${is_featured}, read_time = ${read_time || null}, 
        publish_date = ${publish_date || null}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }

    const updatedPost = result[0]

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post updated successfully',
      post: updatedPost 
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    
    // Handle unique constraint violation
    if (error instanceof Error && error.message.includes('duplicate key value violates unique constraint')) {
      return NextResponse.json(
        { success: false, message: 'A blog post with this slug already exists. Please use a different slug.' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to update blog post', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Delete blog post
    const result = await sql`
      DELETE FROM blog_posts 
      WHERE id = ${parseInt(id)}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}