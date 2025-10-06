import { NextRequest, NextResponse } from 'next/server'

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  status: 'draft' | 'published'
  featured: boolean
  author: string
  createdAt: string
  updatedAt: string
}

// In production, this would come from your database
let blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'UAE Corporate Tax: Complete Guide for 2025',
    slug: 'uae-corporate-tax-guide-2025',
    excerpt: 'Everything you need to know about UAE corporate tax regulations and compliance requirements.',
    content: `# UAE Corporate Tax: Complete Guide for 2025

The United Arab Emirates introduced corporate tax effective from June 1, 2023, marking a significant shift in the country's fiscal landscape. This comprehensive guide covers everything businesses need to know about UAE corporate tax compliance.

## Key Points

### Tax Rate Structure
- **0%** on taxable income up to AED 375,000
- **9%** on taxable income exceeding AED 375,000
- **Special rates** may apply to certain types of income

### Who Needs to Pay?
- UAE resident companies
- Foreign companies with a permanent establishment in the UAE
- Individuals conducting business activities in the UAE

### Registration Requirements
Businesses must register for corporate tax if their annual revenue exceeds AED 1 million or if they elect to register voluntarily.

### Filing Deadlines
- Tax returns must be filed within 9 months of the end of the tax period
- Tax payments are due at the time of filing

## Compliance Steps

1. **Determine Tax Residency Status**
2. **Register with Federal Tax Authority**
3. **Maintain Proper Records**
4. **File Annual Tax Returns**
5. **Make Timely Payments**

For assistance with UAE corporate tax compliance, contact THE BOARD MAN for expert guidance.`,
    category: 'Tax & Compliance',
    status: 'published',
    featured: true,
    author: 'Admin User',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Business Setup in Dubai: Step-by-Step Process',
    slug: 'business-setup-dubai-guide',
    excerpt: 'A comprehensive guide to starting your business in Dubai with all the requirements.',
    content: `# Business Setup in Dubai: Step-by-Step Process

Starting a business in Dubai offers numerous opportunities for entrepreneurs and investors. This guide outlines the complete process of setting up a business in one of the world's most dynamic business hubs.

## Types of Business Setup

### 1. Mainland Company
- 100% foreign ownership allowed
- No restrictions on business activities
- Can trade anywhere in the UAE

### 2. Free Zone Company
- 100% foreign ownership
- Tax exemptions and incentives
- Restrictions on trading in UAE market

### 3. Offshore Company
- No local presence required
- Cannot conduct business in UAE
- Ideal for holding and investment activities

## Step-by-Step Process

### Step 1: Choose Business Activity
Select your business activities from the approved list provided by the Department of Economic Development (DED).

### Step 2: Select Company Name
- Choose 3 alternative names
- Ensure name complies with naming guidelines
- Get name approval from DED

### Step 3: Prepare Documents
Required documents include:
- Passport copies of shareholders
- No objection certificate from sponsor (if applicable)
- Educational certificates (for certain activities)

### Step 4: Submit Application
Submit your application with all required documents and fees to the relevant authority.

### Step 5: Get License Approval
Upon review and approval, you'll receive your trade license.

### Step 6: Complete Setup
- Open bank account
- Register with relevant authorities
- Obtain necessary permits

## Cost Considerations

Setup costs vary depending on:
- Type of license
- Business activity
- Office space requirements
- Additional services needed

Contact THE BOARD MAN for personalized guidance on your business setup journey in Dubai.`,
    category: 'Business Setup',
    status: 'published',
    featured: false,
    author: 'Admin User',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'VAT Registration Requirements in UAE',
    slug: 'vat-registration-uae-requirements',
    excerpt: 'Understanding when and how to register for VAT in the United Arab Emirates.',
    content: `# VAT Registration Requirements in UAE

Value Added Tax (VAT) was introduced in the UAE on January 1, 2018, at a standard rate of 5%. Understanding VAT registration requirements is crucial for business compliance.

## When to Register

### Mandatory Registration
- Annual taxable supplies exceed AED 375,000
- Must register within 30 days of exceeding threshold

### Voluntary Registration
- Annual taxable supplies between AED 187,500 and AED 375,000
- Can choose to register voluntarily

## Registration Process

### Required Documents
- Trade license copy
- Memorandum and Articles of Association
- Passport copies of authorized signatories
- Bank account details
- Lease agreement for business premises

### Steps to Register
1. Create account on FTA portal
2. Complete online application
3. Upload required documents
4. Pay registration fees
5. Receive VAT registration certificate

## Compliance Obligations

### Record Keeping
- Maintain detailed records of all transactions
- Keep records for 5 years
- Records must be in Arabic or English

### VAT Returns
- File quarterly VAT returns
- Due 28 days after end of tax period
- Late filing penalties apply

### Tax Invoices
- Issue tax invoices for taxable supplies
- Include all mandatory information
- Maintain proper invoice numbering

Contact THE BOARD MAN for comprehensive VAT registration and compliance services.`,
    category: 'Tax & Compliance',
    status: 'draft',
    featured: false,
    author: 'Admin User',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  }
]

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const category = url.searchParams.get('category')
    const status = url.searchParams.get('status')
    const search = url.searchParams.get('search')

    let filteredPosts = [...blogPosts]

    // Apply filters
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category)
    }
    
    if (status && status !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.status === status)
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      )
    }

    // Sort by creation date (newest first)
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      posts: paginatedPosts,
      total: filteredPosts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredPosts.length / limit)
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const newPost: BlogPost = {
      id: Date.now().toString(),
      ...data,
      author: 'Admin User',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    blogPosts.unshift(newPost)

    return NextResponse.json({ success: true, post: newPost }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    const postIndex = blogPosts.findIndex(post => post.id === id)
    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }

    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      ...updateData,
      updatedAt: new Date().toISOString().split('T')[0]
    }

    return NextResponse.json({ success: true, post: blogPosts[postIndex] })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Post ID is required' },
        { status: 400 }
      )
    }

    const postIndex = blogPosts.findIndex(post => post.id === id)
    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }

    blogPosts.splice(postIndex, 1)

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}