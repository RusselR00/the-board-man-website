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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params

    // Get the blog post
    const result = await sql`
      SELECT 
        id,
        title,
        content,
        excerpt,
        author_name as author,
        category,
        status,
        created_at as published_date,
        slug,
        featured
      FROM blog_posts 
      WHERE slug = ${slug} AND status = 'published'
      LIMIT 1
    `

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }

    const post = result[0]

    // Increment view count (skip for now since view_count column doesn't exist)
    // await sql`
    //   UPDATE blog_posts 
    //   SET view_count = COALESCE(view_count, 0) + 1 
    //   WHERE id = ${post.id}
    // `

    // Transform the data to match the expected format
    const transformedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author || 'Admin User',
      category: post.category,
      publishDate: post.published_date,
      readTime: '5 min read', // Default value since reading_time doesn't exist
      image: getPlaceholderImage(post.id), // Assign placeholder image based on post ID
      tags: [], // Default value since tags doesn't exist
      featured: post.featured || false,
      views: 0, // Default value since view_count doesn't exist
      slug: post.slug,
      seoTitle: post.title, // Use title as fallback since seo_title doesn't exist
      seoDescription: post.excerpt // Use excerpt as fallback since seo_description doesn't exist
    }

    return NextResponse.json({
      success: true,
      data: transformedPost
    })

  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}