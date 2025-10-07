"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ChevronRight,
  TrendingUp,
  BookOpen,
  Filter,
  Star,
  Eye,
  ArrowRight,
  ExternalLink,
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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: {
    name: string
    role: string
    avatar?: string
  }
  category: string
  publishDate: string
  readTime: string
  image: string
  tags: string[]
  featured: boolean
  views: number
  slug: string
}

interface BlogResponse {
  success: boolean
  data: {
    posts: BlogPost[]
    pagination: {
      current: number
      total: number
      perPage: number
      totalItems: number
    }
  }
  error?: string
}

// Categories for filtering
const categories = [
  "All Categories",
  "Tax & Compliance", 
  "Technology",
  "Compliance",
  "Business Setup",
  "Financial Planning",
  "Standards"
]

// Popular tags
const popularTags = [
  "Corporate Tax", "VAT", "UAE", "Compliance", "AI", "Automation", 
  "ESG", "Dubai", "Free Zone", "SME", "IFRS", "Cybersecurity"
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("newest")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    perPage: 10,
    totalItems: 0
  })

  const fetchBlogPosts = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        page: '1',
        limit: '20'
      })
      
      if (selectedCategory !== "All Categories") {
        params.append('category', selectedCategory)
      }
      
      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/blog?${params}`)
      const data: BlogResponse = await response.json()
      
      if (data.success) {
        setBlogPosts(data.data.posts)
        setPagination(data.data.pagination)
        
        // Set featured post (first post with featured: true, or first post if none featured)
        const featured = data.data.posts.find(post => post.featured) || data.data.posts[0]
        setFeaturedPost(featured || null)
      } else {
        // Handle API error gracefully
        setBlogPosts([])
        setFeaturedPost(null)
      }
    } catch (error) {
      // Handle network or other errors gracefully
      setBlogPosts([])
      setFeaturedPost(null)
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm, selectedCategory])

  useEffect(() => {
    fetchBlogPosts()
  }, [fetchBlogPosts])

  // Filter and sort posts (excluding featured post from regular list)
  const filteredPosts = blogPosts
    .filter(post => !featuredPost || post.id !== featuredPost.id)
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        case "oldest":
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
        case "popular":
          return b.views - a.views
        case "readTime":
          return parseInt(a.readTime) - parseInt(b.readTime)
        default:
          return 0
      }
    })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Insights & Updates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest insights, trends, and updates in accounting, 
            taxation, and business management from our expert team.
          </p>
        </div>
        
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading blog posts...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Insights & Updates
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Stay informed with the latest insights, trends, and updates in accounting, 
          taxation, and business management from our expert team.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-yellow-500" />
            <h2 className="text-2xl font-bold">Featured Article</h2>
          </div>
          
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
                    Featured
                  </Badge>
                </div>
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{featuredPost.category}</Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredPost.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredPost.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 leading-tight">
                  {featuredPost.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{featuredPost.author.name}</p>
                      <p className="text-xs text-muted-foreground">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  
                  <Button asChild>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles, topics, or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="readTime">Quick Read</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Main Content */}
      <div className="lg:flex lg:gap-8">
        {/* Articles Grid */}
        <div className="lg:w-2/3">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
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
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views.toLocaleString()}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-xs">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.author.role}</p>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                {blogPosts.length === 0 
                  ? "No blog posts have been published yet. Check back soon for new content!"
                  : "Try adjusting your search criteria or browse all articles."
                }
              </p>
              {blogPosts.length > 0 && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All Categories")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          {/* Popular Tags */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Popular Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSearchTerm(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>
                Get the latest insights delivered directly to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input placeholder="Enter your email address" />
                <Button className="w-full">Subscribe to Newsletter</Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Related Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link 
                href="/resources" 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium">Download Center</p>
                  <p className="text-sm text-muted-foreground">Free templates & guides</p>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
              
              <Link 
                href="/booking" 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium">Book Consultation</p>
                  <p className="text-sm text-muted-foreground">Expert advice</p>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
              
              <Link 
                href="/contact" 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium">Contact Us</p>
                  <p className="text-sm text-muted-foreground">Get in touch</p>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}