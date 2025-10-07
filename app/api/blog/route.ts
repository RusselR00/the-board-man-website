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
    const offset = (page - 1) * limit

    // Start with base query for published posts
    let posts
    let total = 0

    if (category && category !== 'All Categories' && search) {
      // Both category and search filters
      posts = await sql`
        SELECT 
          id, title, excerpt, author, category, status, published_date, 
          featured_image, tags, reading_time, slug, view_count, featured
        FROM blog_posts 
        WHERE status = 'published' 
          AND category = ${category}
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`} OR tags::text ILIKE ${`%${search}%`})
        ORDER BY 
          CASE WHEN featured = true THEN 0 ELSE 1 END,
          published_date DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE status = 'published' 
          AND category = ${category}
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`} OR tags::text ILIKE ${`%${search}%`})
      `
      total = parseInt(countResult[0]?.total || '0')
      
    } else if (category && category !== 'All Categories') {
      // Only category filter
      posts = await sql`
        SELECT 
          id, title, excerpt, author, category, status, published_date, 
          featured_image, tags, reading_time, slug, view_count, featured
        FROM blog_posts 
        WHERE status = 'published' AND category = ${category}
        ORDER BY 
          CASE WHEN featured = true THEN 0 ELSE 1 END,
          published_date DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE status = 'published' AND category = ${category}
      `
      total = parseInt(countResult[0]?.total || '0')
      
    } else if (search) {
      // Only search filter
      posts = await sql`
        SELECT 
          id, title, excerpt, author, category, status, published_date, 
          featured_image, tags, reading_time, slug, view_count, featured
        FROM blog_posts 
        WHERE status = 'published' 
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`} OR tags::text ILIKE ${`%${search}%`})
        ORDER BY 
          CASE WHEN featured = true THEN 0 ELSE 1 END,
          published_date DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE status = 'published' 
          AND (title ILIKE ${`%${search}%`} OR excerpt ILIKE ${`%${search}%`} OR content ILIKE ${`%${search}%`} OR tags::text ILIKE ${`%${search}%`})
      `
      total = parseInt(countResult[0]?.total || '0')
      
    } else {
      // No filters
      posts = await sql`
        SELECT 
          id, title, excerpt, author, category, status, published_date, 
          featured_image, tags, reading_time, slug, view_count, featured
        FROM blog_posts 
        WHERE status = 'published'
        ORDER BY 
          CASE WHEN featured = true THEN 0 ELSE 1 END,
          published_date DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      
      const countResult = await sql`
        SELECT COUNT(*) as total 
        FROM blog_posts 
        WHERE status = 'published'
      `
      total = parseInt(countResult[0]?.total || '0')
    }

    // Transform the data to match the expected format
    const transformedPosts = posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      author: typeof post.author === 'string' ? JSON.parse(post.author) : post.author,
      category: post.category,
      publishDate: post.published_date,
      readTime: post.reading_time || '5 min read',
      image: post.featured_image || '/images/blog/default.jpg',
      tags: Array.isArray(post.tags) ? post.tags : (post.tags ? JSON.parse(post.tags) : []),
      featured: post.featured || false,
      views: post.view_count || 0,
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

// Get featured post
export async function getFeaturedPost() {
  try {
    const result = await sql`
      SELECT 
        id,
        title,
        excerpt,
        author,
        category,
        published_date,
        featured_image,
        tags,
        reading_time,
        slug,
        view_count
      FROM blog_posts 
      WHERE status = 'published' AND featured = true
      ORDER BY published_date DESC
      LIMIT 1
    `

    if (result.length === 0) {
      // If no featured post, get the latest post
      const latestResult = await sql`
        SELECT 
          id,
          title,
          excerpt,
          author,
          category,
          published_date,
          featured_image,
          tags,
          reading_time,
          slug,
          view_count
        FROM blog_posts 
        WHERE status = 'published'
        ORDER BY published_date DESC
        LIMIT 1
      `
      
      if (latestResult.length === 0) {
        return null
      }
      
      return latestResult[0]
    }

    return result[0]
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return null
  }
}