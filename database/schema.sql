-- THE BOARD MAN Database Schema
-- Run this SQL in your Vercel Postgres database

-- Create contacts table
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
);

-- Create bookings table
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
);

-- Create admin users table
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
);

-- Create blog posts table (optional - for dynamic content)
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
    tags TEXT[], -- Array of tags
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    read_time INTEGER, -- in minutes
    views INTEGER DEFAULT 0,
    publish_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_contacts_status ON contacts(status);

CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_date ON bookings(preferred_date);
CREATE INDEX idx_bookings_reference ON bookings(reference);
CREATE INDEX idx_bookings_status ON bookings(status);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

-- Insert default admin user (change email and generate proper hash)
-- Password should be hashed with bcrypt before inserting
-- This is just an example - you'll set this up through your admin interface
INSERT INTO admin_users (email, password_hash, name, role) VALUES 
('admin@board-man.com', '$2a$12$example_hash_here', 'Admin User', 'admin');