"use client"

import { useState } from "react"
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
  ArrowRight
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

// This would typically come from a CMS or API
const blogPost = {
  id: 1,
  title: "UAE Corporate Tax: Complete Guide for 2025",
  excerpt: "Everything you need to know about the new UAE corporate tax regulations, compliance requirements, and how they affect your business operations.",
  content: `
# Introduction

The UAE introduced federal corporate tax effective from June 1, 2023, marking a significant shift in the country's tax landscape. This comprehensive guide covers everything businesses need to know about UAE corporate tax compliance, rates, and planning strategies for 2025.

## Key Changes for 2025

The corporate tax regime has been in effect for over a year now, and several clarifications and updates have been issued by the Federal Tax Authority (FTA). Here are the most important developments:

### Tax Rates Structure

- **Small Business Relief**: 0% tax rate for taxable income up to AED 375,000
- **Standard Rate**: 9% tax rate for taxable income above AED 375,000
- **Qualifying Free Zone Persons**: May benefit from 0% rate under specific conditions

### Filing Requirements

All UAE businesses subject to corporate tax must:

1. Register with the Federal Tax Authority
2. Maintain proper books and records
3. File annual corporate tax returns
4. Pay any tax due within specified deadlines

## Compliance Checklist for 2025

### Registration Process

Every UAE business must determine if they are subject to corporate tax and register accordingly. The registration process includes:

- **Online Registration**: Through the FTA portal
- **Documentation**: Providing trade license, memorandum of association, and other required documents
- **Tax Group Registration**: For qualifying group companies

### Record Keeping Requirements

Businesses must maintain comprehensive records including:

- Financial statements prepared in accordance with applicable accounting standards
- General ledger and supporting books of account
- Bank statements and cash records
- Invoices, receipts, and supporting documentation
- Transfer pricing documentation (where applicable)

### Annual Return Filing

The corporate tax return must be filed within 9 months from the end of the tax period. Key requirements include:

1. **Financial Information**: Audited financial statements or management accounts
2. **Tax Computation**: Detailed calculation of taxable income
3. **Supporting Schedules**: Additional forms and schedules as required
4. **Payment**: Any tax due must be paid by the filing deadline

## Strategic Tax Planning

### Business Structure Optimization

Consider the following strategies to optimize your tax position:

- **Entity Selection**: Choose the most tax-efficient business structure
- **Free Zone Benefits**: Evaluate eligibility for free zone tax incentives
- **Group Structure**: Implement tax-efficient group structures where appropriate

### Transfer Pricing Compliance

For businesses with related party transactions, transfer pricing compliance is crucial:

- **Documentation**: Maintain contemporaneous transfer pricing documentation
- **Economic Analysis**: Ensure transactions are at arm's length
- **Country-by-Country Reporting**: For qualifying multinational groups

## Common Compliance Pitfalls

### Avoid These Mistakes

1. **Late Registration**: Failing to register within required timeframes
2. **Inadequate Records**: Not maintaining sufficient supporting documentation
3. **Missed Deadlines**: Late filing of returns or payment of tax
4. **Transfer Pricing Errors**: Incorrect pricing of related party transactions

### Best Practices

- **Professional Advice**: Engage qualified tax advisors
- **Regular Reviews**: Conduct periodic compliance reviews
- **System Implementation**: Use appropriate accounting and tax software
- **Staff Training**: Ensure your team understands compliance requirements

## Looking Ahead: 2025 Developments

### Expected Changes

The FTA continues to issue guidance and clarifications. Key areas to watch include:

- **Additional Guidance**: Further clarifications on specific provisions
- **Digital Services**: Potential developments in digital services taxation
- **International Coordination**: Enhanced cooperation with other tax jurisdictions

### Preparation Strategies

To stay ahead of developments:

1. **Regular Updates**: Subscribe to FTA updates and guidance
2. **Professional Development**: Invest in ongoing tax training
3. **System Upgrades**: Ensure your systems can handle evolving requirements
4. **Advisory Relationships**: Maintain relationships with qualified tax advisors

## Conclusion

UAE corporate tax compliance requires careful planning and attention to detail. By understanding the requirements, maintaining proper records, and seeking professional advice when needed, businesses can ensure compliance while optimizing their tax position.

The tax landscape continues to evolve, making it essential to stay informed about developments and maintain robust compliance procedures. For personalized advice on your specific situation, consider consulting with qualified tax professionals who can help navigate the complexities of UAE corporate tax.
  `,
  author: {
    name: "Ahmed Al-Mansouri",
    role: "Senior Tax Consultant",
    avatar: "/images/authors/ahmed.jpg",
    bio: "Ahmed is a senior tax consultant with over 15 years of experience in UAE taxation and corporate compliance. He specializes in helping businesses navigate complex tax regulations and optimize their tax strategies."
  },
  category: "Tax & Compliance",
  publishDate: "2024-12-15",
  readTime: "12 min read",
  image: "/images/blog/uae-corporate-tax-2025.jpg",
  tags: ["Corporate Tax", "UAE", "Compliance", "Business"],
  featured: true,
  views: 3247,
  likes: 89,
  slug: "uae-corporate-tax-complete-guide-2025"
}

const relatedPosts = [
  {
    id: 2,
    title: "VAT Compliance Best Practices for UAE Businesses",
    excerpt: "Essential VAT compliance strategies and common mistakes to avoid.",
    category: "Tax & Compliance",
    readTime: "7 min read",
    image: "/images/blog/vat-compliance-best-practices.jpg",
    slug: "vat-compliance-best-practices-uae"
  },
  {
    id: 3,
    title: "Business Setup in Dubai: Free Zone vs Mainland",
    excerpt: "Detailed comparison of setup options in Dubai.",
    category: "Business Setup",
    readTime: "15 min read",
    image: "/images/blog/dubai-business-setup.jpg",
    slug: "dubai-business-setup-freezone-vs-mainland"
  },
  {
    id: 4,
    title: "ESG Reporting Requirements in the UAE",
    excerpt: "Understanding Environmental, Social, and Governance reporting obligations.",
    category: "Compliance", 
    readTime: "10 min read",
    image: "/images/blog/esg-reporting-uae.jpg",
    slug: "esg-reporting-requirements-uae-overview"
  }
]

export default function BlogPostPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = blogPost.title
    
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
          <div dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br />') }} />
        </div>

        {/* Tags */}
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
                <p className="text-sm">{blogPost.author.bio}</p>
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
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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