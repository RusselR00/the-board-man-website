"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  ChevronLeft,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  CheckCircle2,
  Eye,
  Tag,
  ArrowRight,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    role: string
    avatar?: string
    bio?: string
  }
  category: string
  publishDate: string
  readTime: string
  image: string
  tags: string[]
  featured: boolean
  views: number
  likes: number
  comments?: number
  seoTitle?: string
  seoDescription?: string
}

interface RelatedPost {
  id: number
  title: string
  excerpt: string
  category: string
  readTime: string
  image: string
  slug: string
  featured: boolean
  views: number
  author: {
    name: string
    role: string
  }
  publishDate: string
}

interface BlogPostResponse {
  success: boolean
  data: {
    post: BlogPost
    relatedPosts: RelatedPost[]
  }
  error?: string
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchBlogPost = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(`/api/blog/${slug}`)
        const data: BlogPostResponse = await response.json()
        
        if (data.success && data.data) {
          setBlogPost(data.data.post)
          setRelatedPosts(data.data.relatedPosts || [])
        } else {
          setError(data.error || 'Blog post not found')
        }
      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError('Failed to load blog post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPost()
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = blogPost?.title || ''
    
    let shareUrl = ''
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
        return
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-3 text-lg text-muted-foreground">Loading article...</span>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !blogPost) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || 'The article you are looking for could not be found.'}
          </p>
          <Button asChild>
            <Link href="/blog">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4">
            {blogPost.category}
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
            {blogPost.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            {blogPost.excerpt}
          </p>
          
          {/* Article Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                <AvatarFallback>
                  {blogPost.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blogPost.author.name}</p>
                <p className="text-sm text-muted-foreground">{blogPost.author.role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(blogPost.publishDate)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {blogPost.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {blogPost.views.toLocaleString()} views
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Social Actions */}
          <div className="flex items-center justify-between mb-8 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className={isLiked ? "text-red-500" : ""}
                    >
                      <ThumbsUp className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {blogPost.likes + (isLiked ? 1 : 0)}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Like this article</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={isBookmarked ? "text-blue-500" : ""}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                      Save
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bookmark for later</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Share:</span>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('twitter')}>
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share on Twitter</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('linkedin')}>
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share on LinkedIn</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('copy')}>
                      {isCopied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isCopied ? 'Copied!' : 'Copy link'}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: blogPost.content
                .replace(/\n/g, '<br />')
                .replace(/^# (.+)/gm, '<h1>$1</h1>')
                .replace(/^## (.+)/gm, '<h2>$1</h2>')
                .replace(/^### (.+)/gm, '<h3>$1</h3>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/^\- (.+)/gm, '<li>$1</li>')
                .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
                .replace(/^\d+\. (.+)/gm, '<li>$1</li>')
            }} 
          />
        </div>

        {/* Tags */}
        {blogPost.tags && blogPost.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Article Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator className="mb-8" />

        {/* Author Bio */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                <AvatarFallback>
                  {blogPost.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{blogPost.author.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{blogPost.author.role}</p>
                <p className="text-sm">
                  {blogPost.author.bio || `${blogPost.author.name} is a member of our expert team with extensive experience in ${blogPost.category.toLowerCase()}.`}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Contact {blogPost.author.name.split(' ')[0]}</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/booking">Book Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge 
                      variant="outline" 
                      className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm"
                    >
                      {post.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                    
                    <h3 className="font-semibold mb-2 leading-tight group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <Button variant="ghost" size="sm" asChild className="p-0">
                      <Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-muted">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Professional Advice?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              While our articles provide valuable insights, every business situation is unique. 
              Get personalized advice from our expert team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Our Team
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}