import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST method to initialize enhanced resources schema',
    endpoint: '/api/admin/init-enhanced-resources'
  })
}

export async function POST(request: NextRequest) {
  try {
    // Enhanced downloads table with proper file handling
    await sql`
      CREATE TABLE IF NOT EXISTS downloads (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        file_size BIGINT NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        download_count INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        tags TEXT[], -- Array of tags
        author VARCHAR(255),
        version VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Enhanced business_tools table
    await sql`
      CREATE TABLE IF NOT EXISTS business_tools (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        tool_type VARCHAR(100) NOT NULL, -- calculator, template, guide, etc.
        difficulty_level VARCHAR(50) DEFAULT 'beginner', -- beginner, intermediate, advanced
        estimated_time VARCHAR(100), -- e.g., "15 minutes", "1 hour"
        icon VARCHAR(100),
        color_class VARCHAR(100),
        tool_url VARCHAR(500),
        file_path VARCHAR(500), -- for downloadable tools
        file_type VARCHAR(50),
        is_available BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        tags TEXT[],
        requirements TEXT,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Enhanced industry_insights table
    await sql`
      CREATE TABLE IF NOT EXISTS industry_insights (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        author VARCHAR(255) NOT NULL,
        author_bio TEXT,
        featured_image_path VARCHAR(500),
        featured_image_alt VARCHAR(255),
        read_time INTEGER, -- in minutes
        publish_date DATE DEFAULT CURRENT_DATE,
        tags TEXT[],
        is_published BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        view_count INTEGER DEFAULT 0,
        meta_title VARCHAR(255),
        meta_description TEXT,
        slug VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Enhanced faqs table
    await sql`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question VARCHAR(500) NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        subcategory VARCHAR(100),
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        view_count INTEGER DEFAULT 0,
        helpful_count INTEGER DEFAULT 0,
        tags TEXT[],
        related_faqs INTEGER[], -- Array of related FAQ IDs
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create file_uploads table for centralized file management
    await sql`
      CREATE TABLE IF NOT EXISTS file_uploads (
        id SERIAL PRIMARY KEY,
        original_name VARCHAR(255) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        file_size BIGINT NOT NULL,
        upload_type VARCHAR(100) NOT NULL, -- download, tool, insight_image, etc.
        related_id INTEGER, -- ID of related content
        alt_text VARCHAR(255),
        caption TEXT,
        is_active BOOLEAN DEFAULT true,
        uploaded_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create categories table for better organization
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        content_type VARCHAR(50) NOT NULL, -- downloads, tools, insights, faqs
        parent_id INTEGER REFERENCES categories(id),
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_downloads_category ON downloads(category)`
    await sql`CREATE INDEX IF NOT EXISTS idx_downloads_tags ON downloads USING GIN(tags)`
    await sql`CREATE INDEX IF NOT EXISTS idx_downloads_featured ON downloads(is_featured)`
    await sql`CREATE INDEX IF NOT EXISTS idx_downloads_active ON downloads(is_active)`

    await sql`CREATE INDEX IF NOT EXISTS idx_business_tools_type ON business_tools(tool_type)`
    await sql`CREATE INDEX IF NOT EXISTS idx_business_tools_featured ON business_tools(is_featured)`
    await sql`CREATE INDEX IF NOT EXISTS idx_business_tools_tags ON business_tools USING GIN(tags)`

    await sql`CREATE INDEX IF NOT EXISTS idx_insights_category ON industry_insights(category)`
    await sql`CREATE INDEX IF NOT EXISTS idx_insights_author ON industry_insights(author)`
    await sql`CREATE INDEX IF NOT EXISTS idx_insights_slug ON industry_insights(slug)`
    await sql`CREATE INDEX IF NOT EXISTS idx_insights_published ON industry_insights(is_published)`
    await sql`CREATE INDEX IF NOT EXISTS idx_insights_tags ON industry_insights USING GIN(tags)`

    await sql`CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category)`
    await sql`CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active)`
    await sql`CREATE INDEX IF NOT EXISTS idx_faqs_tags ON faqs USING GIN(tags)`

    await sql`CREATE INDEX IF NOT EXISTS idx_files_type ON file_uploads(upload_type)`
    await sql`CREATE INDEX IF NOT EXISTS idx_files_related ON file_uploads(related_id)`

    await sql`CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(content_type)`
    await sql`CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id)`

    // Insert default categories
    await sql`
      INSERT INTO categories (name, slug, content_type, description) VALUES
      ('Tax Planning', 'tax-planning', 'downloads', 'Resources for tax planning and compliance'),
      ('Business Setup', 'business-setup', 'downloads', 'Guides for setting up new businesses'),
      ('Financial Analysis', 'financial-analysis', 'downloads', 'Tools and templates for financial analysis'),
      
      ('Calculators', 'calculators', 'tools', 'Interactive calculators and tools'),
      ('Templates', 'templates', 'tools', 'Ready-to-use business templates'),
      ('Guides', 'guides', 'tools', 'Step-by-step guides and tutorials'),
      
      ('Market Trends', 'market-trends', 'insights', 'Latest market trends and analysis'),
      ('Industry News', 'industry-news', 'insights', 'Current industry news and updates'),
      ('Best Practices', 'best-practices', 'insights', 'Industry best practices and recommendations'),
      
      ('General', 'general', 'faqs', 'General frequently asked questions'),
      ('Services', 'services', 'faqs', 'Questions about our services'),
      ('Billing', 'billing', 'faqs', 'Billing and payment related questions')
      ON CONFLICT (slug) DO NOTHING
    `

    console.log('Enhanced resources database schema created successfully')

    return NextResponse.json({
      success: true,
      message: 'Enhanced resources database schema created successfully',
      tables: ['downloads', 'business_tools', 'industry_insights', 'faqs', 'file_uploads', 'categories']
    })

  } catch (error) {
    console.error('Error creating enhanced resources schema:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create enhanced resources schema' },
      { status: 500 }
    )
  }
}