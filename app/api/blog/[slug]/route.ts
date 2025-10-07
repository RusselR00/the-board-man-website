import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Get the blog post
    const result = await sql`
      SELECT 
        id,
        title,
        content,
        excerpt,
        author,
        category,
        status,
        published_date,
        featured_image,
        tags,
        reading_time,
        slug,
        view_count,
        featured,
        seo_title,
        seo_description
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

    // Increment view count
    await sql`
      UPDATE blog_posts 
      SET view_count = COALESCE(view_count, 0) + 1 
      WHERE id = ${post.id}
    `

    // Transform the data to match the expected format
    const transformedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: typeof post.author === 'string' ? JSON.parse(post.author) : post.author,
      category: post.category,
      publishDate: post.published_date,
      readTime: post.reading_time || '5 min read',
      image: post.featured_image || '/images/blog/default.jpg',
      tags: Array.isArray(post.tags) ? post.tags : (post.tags ? JSON.parse(post.tags) : []),
      featured: post.featured || false,
      views: (post.view_count || 0) + 1, // Include the increment
      slug: post.slug,
      seoTitle: post.seo_title,
      seoDescription: post.seo_description
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