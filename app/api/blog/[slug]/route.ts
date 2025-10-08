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

    // Get the blog post by slug (only published posts)
    const result = await sql`
      SELECT 
        id, title, slug, excerpt, content, featured_image, author_name, author_role,
        category, tags, is_published, is_featured, read_time, views, publish_date, 
        created_at, updated_at
      FROM blog_posts 
      WHERE slug = ${slug} AND is_published = true
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
      SET views = COALESCE(views, 0) + 1, updated_at = NOW()
      WHERE id = ${post.id}
    `

    // Get related posts (same category, excluding current post)
    const relatedPosts = await sql`
      SELECT 
        id, title, slug, excerpt, featured_image, author_name, category,
        is_featured, read_time, views, publish_date, created_at
      FROM blog_posts 
      WHERE category = ${post.category} 
        AND id != ${post.id} 
        AND is_published = true
      ORDER BY 
        CASE WHEN is_featured = true THEN 0 ELSE 1 END,
        COALESCE(publish_date, created_at) DESC
      LIMIT 3
    `

    // Transform the main post data to match frontend expectations
    const transformedPost = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
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
      views: (post.views || 0) + 1, // Include the incremented view
      likes: 0, // Default value for now
      comments: 0, // Default value for now
      seoTitle: post.title,
      seoDescription: post.excerpt || ''
    }

    // Transform related posts
    const transformedRelatedPosts = relatedPosts.map((relatedPost: any) => ({
      id: relatedPost.id,
      title: relatedPost.title,
      slug: relatedPost.slug,
      excerpt: relatedPost.excerpt || '',
      author: {
        name: relatedPost.author_name || 'Admin User',
        role: 'Team Member'
      },
      category: relatedPost.category ? relatedPost.category.split('-').map((word: string) => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ') : 'General',
      publishDate: relatedPost.publish_date || relatedPost.created_at,
      readTime: relatedPost.read_time ? `${relatedPost.read_time} min read` : '5 min read',
      image: relatedPost.featured_image || getPlaceholderImage(relatedPost.id),
      featured: relatedPost.is_featured || false,
      views: relatedPost.views || 0
    }))

    return NextResponse.json({
      success: true,
      data: {
        post: transformedPost,
        relatedPosts: transformedRelatedPosts
      }
    })

  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}