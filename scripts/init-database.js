#!/usr/bin/env node
/**
 * Database Initialization Script for Neon Database
 * This script creates the necessary tables for THE BOARD MAN website
 */

const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function initializeDatabase() {
  console.log('🚀 Initializing THE BOARD MAN database...');
  
  try {
    // Drop existing tables if they exist (for clean initialization)
    console.log('🗑️  Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS contacts CASCADE`;
    await sql`DROP TABLE IF EXISTS bookings CASCADE`;
    await sql`DROP TABLE IF EXISTS admin_users CASCADE`;
    await sql`DROP TABLE IF EXISTS blog_posts CASCADE`;
    
    // Create contacts table
    console.log('📝 Creating contacts table...');
    await sql`
      CREATE TABLE contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        preferred_contact VARCHAR(50) DEFAULT 'email',
        urgency VARCHAR(20) DEFAULT 'medium',
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create bookings table
    console.log('📅 Creating bookings table...');
    await sql`
      CREATE TABLE bookings (
        id SERIAL PRIMARY KEY,
        reference VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        service_type VARCHAR(100) NOT NULL,
        service_description TEXT NOT NULL,
        meeting_type VARCHAR(50) NOT NULL,
        preferred_date DATE NOT NULL,
        preferred_time TIME NOT NULL,
        alternative_date DATE,
        alternative_time TIME,
        urgency VARCHAR(20) DEFAULT 'medium',
        estimated_duration VARCHAR(50) DEFAULT '1-hour',
        additional_notes TEXT,
        preferred_contact VARCHAR(50) DEFAULT 'email',
        send_reminders BOOLEAN DEFAULT true,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create admin users table
    console.log('👤 Creating admin_users table...');
    await sql`
      CREATE TABLE admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        is_active BOOLEAN DEFAULT true,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create blog posts table
    console.log('📖 Creating blog_posts table...');
    await sql`
      CREATE TABLE blog_posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        featured_image VARCHAR(500),
        author_name VARCHAR(255) NOT NULL,
        author_role VARCHAR(255),
        category VARCHAR(100) NOT NULL,
        tags TEXT[],
        is_published BOOLEAN DEFAULT false,
        is_featured BOOLEAN DEFAULT false,
        read_time INTEGER,
        views INTEGER DEFAULT 0,
        publish_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes for better performance
    console.log('📊 Creating indexes...');
    
    // Contacts indexes
    await sql`CREATE INDEX idx_contacts_email ON contacts(email)`;
    await sql`CREATE INDEX idx_contacts_created_at ON contacts(created_at)`;
    await sql`CREATE INDEX idx_contacts_status ON contacts(status)`;

    // Bookings indexes
    await sql`CREATE INDEX idx_bookings_email ON bookings(email)`;
    await sql`CREATE INDEX idx_bookings_date ON bookings(preferred_date)`;
    await sql`CREATE INDEX idx_bookings_reference ON bookings(reference)`;
    await sql`CREATE INDEX idx_bookings_status ON bookings(status)`;

    // Blog posts indexes
    await sql`CREATE INDEX idx_blog_posts_slug ON blog_posts(slug)`;
    await sql`CREATE INDEX idx_blog_posts_published ON blog_posts(is_published)`;
    await sql`CREATE INDEX idx_blog_posts_category ON blog_posts(category)`;

    // Insert default admin user (with a temporary password)
    console.log('👨‍💼 Creating default admin user...');
    await sql`
      INSERT INTO admin_users (email, password_hash, name, role) VALUES 
      ('admin@board-man.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBdXzn4BG/JEW2', 'Admin User', 'admin')
    `;
    // Note: The password hash above is for 'admin123'

    // Insert some sample blog posts if needed
    console.log('📝 Creating sample blog posts...');
    await sql`
      INSERT INTO blog_posts (
        slug, title, excerpt, content, featured_image, author_name, author_role, 
        category, tags, is_published, is_featured, read_time, publish_date
      ) VALUES 
      (
        'uae-business-setup-guide-2024',
        'Complete Guide to Setting Up Your Business in UAE 2024',
        'Everything you need to know about establishing your business in the United Arab Emirates, from licensing to bank accounts.',
        'Setting up a business in the UAE has never been more streamlined...',
        '/images/blog/placeholder-1.jpg',
        'Ahmed Al-Mansouri',
        'Senior Business Consultant',
        'Business Setup',
        ARRAY['UAE', 'Business Setup', 'Licensing', 'Banking'],
        true,
        true,
        8,
        CURRENT_TIMESTAMP - INTERVAL '2 days'
      ),
      (
        'vat-compliance-tips-dubai',
        'VAT Compliance Best Practices for Dubai Businesses',
        'Navigate VAT requirements in Dubai with confidence. Learn about filing deadlines, documentation, and common mistakes to avoid.',
        'VAT compliance is crucial for businesses operating in Dubai...',
        '/images/blog/placeholder-2.jpg',
        'Sarah Johnson',
        'Tax Specialist',
        'Tax & VAT',
        ARRAY['VAT', 'Tax', 'Dubai', 'Compliance'],
        true,
        false,
        6,
        CURRENT_TIMESTAMP - INTERVAL '5 days'
      ),
      (
        'accounting-software-comparison-2024',
        'Best Accounting Software for UAE Businesses in 2024',
        'Compare the top accounting software solutions tailored for UAE businesses, including local compliance features.',
        'Choosing the right accounting software is essential...',
        '/images/blog/placeholder-3.jpg',
        'Michael Brown',
        'Senior Accountant',
        'Technology',
        ARRAY['Accounting Software', 'Technology', 'UAE', 'Business Tools'],
        true,
        false,
        12,
        CURRENT_TIMESTAMP - INTERVAL '1 week'
      )
    `;

    console.log('✅ Database initialization completed successfully!');
    console.log('\n📋 Summary:');
    console.log('- ✅ Contacts table created');
    console.log('- ✅ Bookings table created');
    console.log('- ✅ Admin users table created');
    console.log('- ✅ Blog posts table created');
    console.log('- ✅ Indexes created');
    console.log('- ✅ Default admin user created (admin@board-man.com / admin123)');
    console.log('- ✅ Sample blog posts added');
    console.log('\n🎉 Your database is ready for use!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase().then(() => {
    console.log('🏁 Script completed');
    process.exit(0);
  }).catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
}

module.exports = { initializeDatabase };