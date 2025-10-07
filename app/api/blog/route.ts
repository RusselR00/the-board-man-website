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

    // Start with base query for published posts
    let posts
    let total = 0

    if (category && category !== 'All Categories' && search) {
      // Both category and search filters
      posts = await sql`
        SELECT 
          id, title, excerpt, author_name as author, category, created_at as published_date, 
          slug, is_featured as featured
        FROM blog_posts 
        WHERE category = ${category}
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`})
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE category = ${category}
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`})
      `
      total = parseInt(countResult[0]?.total || '0')
      
    } else if (category && category !== 'All Categories') {
      // Only category filter
      posts = await sql`
        SELECT 
          id, title, excerpt, author_name as author, category, created_at as published_date, 
          slug, is_featured as featured
        FROM blog_posts 
        WHERE category = ${category}
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE category = ${category}
      `
      total = parseInt(countResult[0]?.total || '0')
      
    } else if (search) {
      // Only search filter
      posts = await sql`
        SELECT 
          id, title, excerpt, author_name as author, category, created_at as published_date, 
          slug, is_featured as featured
        FROM blog_posts 
        WHERE (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`})
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`})
      `
      total = parseInt(countResult[0]?.total || '0')
      
    } else {
      // No filters
      posts = await sql`
        SELECT 
          id, title, excerpt, author_name as author, category, created_at as published_date, 
          slug, is_featured as featured
        FROM blog_posts 
        ORDER BY 
          CASE WHEN is_featured = true THEN 0 ELSE 1 END,
          created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts
      `
      total = parseInt(countResult[0]?.total || '0')
    }

    // Transform the data to match the expected format
    const transformedPosts = posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author || 'Admin User',
      category: post.category,
      publishDate: post.published_date,
      readTime: '5 min read', // Default value since reading_time doesn't exist
      image: getPlaceholderImage(post.id), // Assign different placeholder images based on post ID
      tags: [], // Default value since tags doesn't exist
      featured: post.featured || false,
      views: 0, // Default value since view_count doesn't exist
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