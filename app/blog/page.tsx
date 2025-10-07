"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("newest")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [perPage] = useState(10)
  
  const paginationParams = useMemo(() => ({
    page: currentPage,
    limit: perPage
  }), [currentPage, perPage])

  const fetchBlogPosts = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: perPage.toString()
      })
      
      if (selectedCategory !== "All Categories") {
        params.append('category', selectedCategory)
      }
      
      if (debouncedSearchTerm) {
        params.append('search', debouncedSearchTerm)
      }

      const response = await fetch(`/api/blog?${params}`)
      const data: BlogResponse = await response.json()
      
      if (data.success) {
        setBlogPosts(data.data.posts)
        setCurrentPage(data.data.pagination.current)
        setTotalPages(data.data.pagination.total)
        
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
  }, [debouncedSearchTerm, selectedCategory, currentPage, perPage])

  useEffect(() => {
    fetchBlogPosts()
  }, [fetchBlogPosts])

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Handle pagination changes
  useEffect(() => {
    if (currentPage > 1) {
      fetchBlogPosts()
    }
  }, [currentPage, fetchBlogPosts])

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
          // Parse readTime safely - extract number from string like "5 min read"
          const aMinutes = parseInt(a.readTime.replace(/\D/g, '')) || 0
          const bMinutes = parseInt(b.readTime.replace(/\D/g, '')) || 0
          return aMinutes - bMinutes
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
      <div className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 bg-slate-950 text-white -mt-16 pt-32">
          {/* Dark background with multiple layers */}
          <div className="absolute inset-0 bg-slate-950"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black"></div>
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '48px 48px'
            }}></div>
          </div>
          
          {/* Elegant accent elements */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium rounded-full backdrop-blur-sm mb-8">
                <BookOpen className="w-4 h-4 text-blue-400" />
                Knowledge Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Insights & Updates
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-8 font-bold">
                Expert insights for business success
              </p>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Stay informed with the latest insights, trends, and updates in accounting, 
                taxation, and business management from our expert team.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
              <span className="ml-2 text-slate-300">Loading blog posts...</span>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Premium Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-slate-950 text-white -mt-16 pt-24 sm:pt-32 overflow-hidden">
        {/* Animated background with multiple layers */}
        <div className="absolute inset-0 bg-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-black"></div>
        
        {/* Premium dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Premium floating elements with animation */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-emerald-500/8 to-teal-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 sm:w-80 sm:h-80 lg:w-[32rem] lg:h-[32rem] bg-gradient-to-br from-blue-500/8 to-indigo-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-slate-200 text-xs sm:text-sm font-medium rounded-full backdrop-blur-md mb-6 sm:mb-8 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              Knowledge Hub • Expert Insights
            </div>
            
            {/* Premium heading with advanced gradients */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-b from-white via-slate-50 to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
                Expert Insights
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                & Business Intelligence
              </span>
            </h1>
            
            {/* Premium subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 font-light">
              Stay ahead with cutting-edge insights, industry trends, and expert guidance. 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-medium"> 
                Unlock your business potential.
              </span>
            </p>
            
            {/* Premium action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
              <Button 
                asChild 
                size="lg" 
                className="h-12 sm:h-14 px-8 sm:px-10 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 border-0"
              >
                <Link href="#featured">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Insights
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="h-12 sm:h-14 px-8 sm:px-10 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link href="#latest">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Latest Updates
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Main Content */}
      <section id="featured" className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950"></div>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        {/* Premium floating elements */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-emerald-500/8 to-teal-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-500/8 to-indigo-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Premium Featured Post */}
          {featuredPost && (
            <div className="mb-16 sm:mb-24">
              {/* Premium section header */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-slate-200 text-sm font-medium rounded-full backdrop-blur-md mb-6 shadow-xl">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Featured Excellence
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Editor&apos;s Choice
                  </span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  Our most impactful insight, handpicked for maximum business value
                </p>
              </div>
              
              <Card className="group overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-800/20 border-slate-700/50 backdrop-blur-xl hover:bg-gradient-to-br hover:from-slate-800/50 hover:to-slate-700/30 hover:border-slate-600/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 shadow-2xl hover:shadow-yellow-500/20 relative">
                {/* Premium glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.03] via-yellow-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="md:flex relative z-10">
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-full group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover rounded-l-lg"
                      />
                      {/* Premium overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                      {/* Premium engagement indicator */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                        <Eye className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">{featuredPost.views}</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40 px-3 py-1">{featuredPost.category}</Badge>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-emerald-400" />
                          <span className="text-slate-300">{formatDate(featuredPost.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-emerald-400" />
                          <span className="text-slate-300">{featuredPost.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-emerald-400" />
                          <span className="text-slate-300">{featuredPost.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-white">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 text-lg leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                            <User className="h-5 w-5 text-emerald-400" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-white">{featuredPost.author.name}</p>
                          <p className="text-xs text-slate-400">{featuredPost.author.role}</p>
                        </div>
                      </div>
                      
                      <Button asChild className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
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

          {/* Popular Tags Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-slate-300 mr-2">Popular topics:</span>
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="cursor-pointer bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-emerald-600/20 hover:text-emerald-300 hover:border-emerald-500/40 transition-all duration-200 px-3 py-1"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Premium Search and Filters */}
          <div className="mb-12">
            <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-800/50">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-blue-500/5 rounded-2xl"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
                  <Input
                    placeholder="Search articles, topics, or authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl text-lg"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="md:w-56 py-3 bg-slate-800/50 border-slate-700/50 text-white focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl">
                    <Filter className="mr-2 h-5 w-5 text-emerald-400" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white hover:bg-slate-700">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="md:w-52 py-3 bg-slate-800/50 border-slate-700/50 text-white focus:border-emerald-500/50 focus:ring-emerald-500/20 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                    <SelectItem value="newest" className="text-white hover:bg-slate-700">Newest First</SelectItem>
                    <SelectItem value="oldest" className="text-white hover:bg-slate-700">Oldest First</SelectItem>
                    <SelectItem value="popular" className="text-white hover:bg-slate-700">Most Popular</SelectItem>
                    <SelectItem value="readTime" className="text-white hover:bg-slate-700">Quick Read</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Premium results count */}
              <div className="relative z-10 flex items-center justify-between">
                <p className="text-sm text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                </p>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-emerald-500/30 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-teal-500/30 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-blue-500/30 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:flex lg:gap-8">
            {/* Articles Grid */}
            <div className="lg:w-2/3">
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden bg-slate-900/30 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/50 hover:border-slate-700/50 transition-all duration-500 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10">
                    {/* Premium inner glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/[0.03] via-teal-500/[0.02] to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Premium overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <Badge 
                        variant="outline" 
                        className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm text-emerald-300 border-emerald-500/40 px-3 py-1"
                      >
                        {post.category}
                      </Badge>
                      {/* Premium views indicator */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                        <Eye className="w-3 h-3 text-white" />
                        <span className="text-white text-xs">{post.views}</span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 sm:p-8 relative z-10">
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-emerald-400" />
                          <span className="text-slate-300">{formatDate(post.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-emerald-400" />
                          <span className="text-slate-300">{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-xl sm:text-2xl mb-3 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-white group-hover:from-emerald-200 group-hover:via-white group-hover:to-teal-200 transition-all duration-500">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-slate-300 text-base mb-6 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                              <User className="h-4 w-4 text-emerald-400" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-white">{post.author.name}</p>
                            <p className="text-xs text-slate-400">{post.author.role}</p>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild 
                          className="text-emerald-400 hover:text-white hover:bg-emerald-600/20 transition-all duration-300 group-hover:scale-105"
                        >
                          <Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && !isLoading && (
                <div className="text-center py-16 px-4">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-slate-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                      <Search className="h-3 w-3 text-slate-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">No articles found</h3>
                  <p className="text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
                    {blogPosts.length === 0
                      ? "No blog posts have been published yet. Check back soon for new content!"
                      : "Try adjusting your search criteria, selecting a different category, or browse all articles."
                    }
                  </p>
                  {blogPosts.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm("")
                          setSelectedCategory("All Categories")
                          setSortBy("newest")
                        }}
                        className="bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50"
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Clear All Filters
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setSearchTerm("")}
                        className="text-emerald-400 hover:text-white hover:bg-emerald-600/20"
                      >
                        View All Articles
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 mb-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(prev => prev - 1)
                      }
                    }}
                    disabled={currentPage === 1}
                    className="bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50 disabled:opacity-50"
                  >
                    Previous
                  </Button>

                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setCurrentPage(pageNum)
                        }}
                        className={
                          currentPage === pageNum
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50"
                        }
                      >
                        {pageNum}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(prev => prev + 1)
                      }
                    }}
                    disabled={currentPage === totalPages}
                    className="bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50 disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Sidebar */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              {/* Popular Tags */}
              <Card className="mb-6 bg-slate-900/20 border-slate-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Tag className="h-5 w-5 text-blue-400" />
                    Popular Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="cursor-pointer bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-blue-600 hover:text-white transition-colors"
                        onClick={() => setSearchTerm(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="mb-6 bg-slate-900/20 border-slate-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Stay Updated</CardTitle>
                  <CardDescription className="text-slate-400">
                    Get the latest insights delivered directly to your inbox.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Input 
                      placeholder="Enter your email address" 
                      className="bg-slate-800/30 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                      Subscribe to Newsletter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Resources */}
              <Card className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Related Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link 
                    href="/resources" 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors text-white"
                  >
                    <div>
                      <p className="font-medium">Download Center</p>
                      <p className="text-sm text-slate-400">Free templates & guides</p>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  
                  <Link 
                    href="/booking" 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors text-white"
                  >
                    <div>
                      <p className="font-medium">Book Consultation</p>
                      <p className="text-sm text-slate-400">Expert advice</p>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors text-white"
                  >
                    <div>
                      <p className="font-medium">Contact Us</p>
                      <p className="text-sm text-slate-400">Get in touch</p>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}