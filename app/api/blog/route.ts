import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Function to get a consistent placeholder image based on post ID
function getPlaceholderImage(postId: number): string {
  const placeholderImages = [
    '/images/blog/placeholder-1.jpg',
    '/images/blog/placeholder-2.jpg',
    '/images/blog/placeholder-3.jpg',
    '/images/blog/placeholder-4.jpg',
    '/images/blog/placeholder-5.jpg'
  ]
  
  // Use post ID to consistently assign the same image to the same post
  const imageIndex = postId % placeholderImages.length
  return placeholderImages[imageIndex]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const offset = (page - 1) * limit

    // Start with base conditions for published posts
    let posts
    let total = 0

    if (category && category !== 'All Categories' && search) {
      // Both category and search filters
      const dbCategory = category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').trim()
      
      posts = await sql`
        SELECT 
          id, title, slug, excerpt, content, featured_image, author_name, author_role,
          category, tags, is_published, is_featured, read_time, views, publish_date, 
          created_at, updated_at
        FROM blog_posts 
        WHERE is_published = true
          AND category = ${dbCategory}
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`})
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          COALESCE(publish_date, created_at) DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE is_published = true
          AND category = ${dbCategory}
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`})
      `
      total = parseInt(countResult[0]?.total || '0')
      
    } else if (category && category !== 'All Categories') {
      // Only category filter
      const dbCategory = category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').trim()
      
      posts = await sql`
        SELECT 
          id, title, slug, excerpt, content, featured_image, author_name, author_role,
          category, tags, is_published, is_featured, read_time, views, publish_date, 
          created_at, updated_at
        FROM blog_posts 
        WHERE is_published = true AND category = ${dbCategory}
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          COALESCE(publish_date, created_at) DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE is_published = true AND category = ${dbCategory}
      `
      total = parseInt(countResult[0]?.total || '0')
      
    } else if (search) {
      // Only search filter
      posts = await sql`
        SELECT 
          id, title, slug, excerpt, content, featured_image, author_name, author_role,
          category, tags, is_published, is_featured, read_time, views, publish_date, 
          created_at, updated_at
        FROM blog_posts 
        WHERE is_published = true
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`})
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          COALESCE(publish_date, created_at) DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE is_published = true
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`})
      `
      total = parseInt(countResult[0]?.total || '0')
      
    } else {
      // No filters - just published posts
      posts = await sql`
        SELECT 
          id, title, slug, excerpt, content, featured_image, author_name, author_role,
          category, tags, is_published, is_featured, read_time, views, publish_date, 
          created_at, updated_at
        FROM blog_posts 
        WHERE is_published = true
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          COALESCE(publish_date, created_at) DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts
        WHERE is_published = true
      `
      total = parseInt(countResult[0]?.total || '0')
    }

    // Transform the data to match the expected frontend format
    const transformedPosts = posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || '',
      author: {
        name: post.author_name || 'Admin User',
        role: post.author_role || 'Team Member',
        avatar: undefined
      },
      category: post.category ? post.category.split('-').map((word: string) => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ') : 'General',
      publishDate: post.publish_date || post.created_at,
      readTime: post.read_time ? `${post.read_time} min read` : '5 min read',
      image: post.featured_image || getPlaceholderImage(post.id),
      tags: Array.isArray(post.tags) ? post.tags : (post.tags ? [post.tags] : []),
      featured: post.is_featured || false,
      views: post.views || 0,
      slug: post.slug
    }))

    return NextResponse.json({
      success: true,
      data: {
        posts: transformedPosts,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          perPage: limit,
          totalItems: total
        }
      }
    })

  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch blog posts',
        data: { posts: [], pagination: { current: 1, total: 0, perPage: 10, totalItems: 0 } }
      },
      { status: 500 }
    )
  }
}