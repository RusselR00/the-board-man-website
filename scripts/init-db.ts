import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

// Load environment variables
config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database tables...')

    // Create admin_users table
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create contacts table
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        subject VARCHAR(500),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        service VARCHAR(255) NOT NULL,
        consultation_mode VARCHAR(50) NOT NULL,
        preferred_date DATE NOT NULL,
        preferred_time VARCHAR(50) NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create blog_posts table
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) UNIQUE NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'draft',
        featured BOOLEAN DEFAULT FALSE,
        author_id INTEGER,
        author_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at)`
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_preferred_date ON bookings(preferred_date)`
    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)`
    await sql`CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category)`

    console.log('📊 Creating indexes...')

    // Insert default admin user (password: admin123)
    await sql`
      INSERT INTO admin_users (email, password_hash, name, role) 
      VALUES (
        'admin@board-man.com', 
        '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBjbg9b8OMF0.2', 
        'Admin User', 
        'admin'
      ) ON CONFLICT (email) DO NOTHING
    `

    console.log('👤 Default admin user created')

    // Insert sample blog posts
    await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, status, featured, author_id, author_name) 
      VALUES (
        'UAE Corporate Tax: Complete Guide for 2025',
        'uae-corporate-tax-guide-2025',
        'Everything you need to know about UAE corporate tax regulations and compliance requirements for businesses operating in the UAE.',
        '# UAE Corporate Tax: Complete Guide for 2025

The United Arab Emirates introduced corporate tax effective from June 1, 2023, marking a significant shift in the country''s fiscal landscape. This comprehensive guide covers everything businesses need to know about UAE corporate tax compliance.

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

For assistance with UAE corporate tax compliance, contact THE BOARD MAN for expert guidance.',
        'Tax & Compliance',
        'published',
        true,
        1,
        'Admin User'
      ) ON CONFLICT (slug) DO NOTHING
    `

    await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, status, featured, author_id, author_name) 
      VALUES (
        'Business Setup in Dubai: Step-by-Step Process',
        'business-setup-dubai-guide',
        'A comprehensive guide to starting your business in Dubai with all the legal requirements and procedures.',
        '# Business Setup in Dubai: Step-by-Step Process

Starting a business in Dubai offers numerous opportunities for entrepreneurs and investors. This guide outlines the complete process of setting up a business in one of the world''s most dynamic business hubs.

## Types of Business Setup

### 1. Mainland Company
- 100% foreign ownership allowed
- No restrictions on business activities
- Can trade anywhere in the UAE
- Requires local office address

### 2. Free Zone Company
- 100% foreign ownership
- Tax exemptions and incentives
- Restrictions on trading in UAE market
- Simplified setup process

### 3. Offshore Company
- No local presence required
- Cannot conduct business in UAE
- Ideal for holding and investment activities
- Tax optimization benefits

## Required Documents

- Passport copies of shareholders and directors
- No-objection certificate from sponsor (if applicable)
- Proof of address
- Bank statements
- Business plan
- Memorandum of Association

## Setup Process

1. **Choose Business Activity**
2. **Select Company Type**
3. **Reserve Trade Name**
4. **Prepare Documentation**
5. **Submit Application**
6. **Obtain License**
7. **Open Bank Account**

Contact THE BOARD MAN for personalized guidance on your business setup journey in Dubai.',
        'Business Setup',
        'published',
        false,
        1,
        'Admin User'
      ) ON CONFLICT (slug) DO NOTHING
    `

    await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, status, featured, author_id, author_name) 
      VALUES (
        'VAT Registration Requirements in UAE',
        'vat-registration-uae-requirements',
        'Understanding when and how to register for VAT in the United Arab Emirates with complete compliance guide.',
        '# VAT Registration Requirements in UAE

Value Added Tax (VAT) was introduced in the UAE on January 1, 2018, at a standard rate of 5%. Understanding VAT registration requirements is crucial for business compliance.

## When to Register

### Mandatory Registration
- Annual taxable supplies exceed AED 375,000
- Must register within 30 days of exceeding threshold

### Voluntary Registration
- Annual taxable supplies between AED 187,500 and AED 375,000
- Can choose to register voluntarily for business benefits

## Registration Process

1. **Determine Eligibility**
2. **Gather Required Documents**
3. **Submit Online Application**
4. **Await Approval**
5. **Receive TRN (Tax Registration Number)**

## Required Documents

- Trade license
- Memorandum of Association
- Passport copies of signatory
- Bank account details
- Lease agreement

## VAT Rates

- **Standard Rate:** 5%
- **Zero Rate:** 0% (exports, international transport)
- **Exempt:** No VAT (residential rent, local transport)

## Filing Requirements

- Quarterly VAT returns
- Due within 28 days of period end
- Maintain proper records for 5 years

Contact THE BOARD MAN for comprehensive VAT registration and compliance services.',
        'Tax & Compliance',
        'draft',
        false,
        1,
        'Admin User'
      ) ON CONFLICT (slug) DO NOTHING
    `

    console.log('📝 Sample blog posts inserted')
    console.log('✅ Database initialized successfully!')
    
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    throw error
  }
}

// Export for use as API route or script
export { initializeDatabase }

// Run if called directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('🎉 Database setup complete!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Database setup failed:', error)
      process.exit(1)
    })
}