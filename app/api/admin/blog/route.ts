import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  status: 'draft' | 'published'
  featured: boolean
  author_name: string
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

// Helper function to format date for display
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const category = url.searchParams.get('category')
    const status = url.searchParams.get('status')
    const search = url.searchParams.get('search')
    const offset = (page - 1) * limit

    // Get all posts first, then apply filters in JavaScript for simplicity
    let allPosts = await sql`
      SELECT 
        id, title, slug, excerpt, content, category, status, 
        featured, author_name, created_at, updated_at
      FROM blog_posts 
      ORDER BY created_at DESC
    `

    // Apply filters
    let filteredPosts = allPosts

    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category)
    }
    
    if (status && status !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.status === status)
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      )
    }

    // Apply pagination
    const total = filteredPosts.length
    const paginatedPosts = filteredPosts.slice(offset, offset + limit)

    // Format dates for frontend
    const formattedPosts = paginatedPosts.map(post => ({
      ...post,
      id: post.id.toString(),
      author: post.author_name,
      createdAt: formatDate(new Date(post.created_at)),
      updatedAt: formatDate(new Date(post.updated_at))
    }))

    return NextResponse.json({
      success: true,
      posts: formattedPosts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { title, excerpt, content, category, status, featured } = data
    
    // Generate slug from title
    const slug = createSlug(title)
    
    // Insert new blog post
    const result = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, status, featured, author_name)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${category}, ${status}, ${featured}, 'Admin User')
      RETURNING id, title, slug, excerpt, content, category, status, featured, author_name, created_at, updated_at
    `

    const newPost = result[0]
    const formattedPost = {
      ...newPost,
      id: newPost.id.toString(),
      author: newPost.author_name,
      createdAt: formatDate(new Date(newPost.created_at)),
      updatedAt: formatDate(new Date(newPost.updated_at))
    }

    return NextResponse.json({ success: true, post: formattedPost }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, title, excerpt, content, category, status, featured } = data

    // Generate new slug if title changed
    const slug = createSlug(title)

    // Update blog post
    const result = await sql`
      UPDATE blog_posts 
      SET title = ${title}, slug = ${slug}, excerpt = ${excerpt}, content = ${content}, 
          category = ${category}, status = ${status}, featured = ${featured}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)}
      RETURNING id, title, slug, excerpt, content, category, status, featured, author_name, created_at, updated_at
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }

    const updatedPost = result[0]
    const formattedPost = {
      ...updatedPost,
      id: updatedPost.id.toString(),
      author: updatedPost.author_name,
      createdAt: formatDate(new Date(updatedPost.created_at)),
      updatedAt: formatDate(new Date(updatedPost.updated_at))
    }

    return NextResponse.json({ success: true, post: formattedPost })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update blog post' },
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

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}