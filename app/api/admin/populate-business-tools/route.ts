import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function POST() {
  try {
    // Business calculators to insert (matching actual schema)
    const businessTools = [
      {
        title: "VAT Calculator",
        description: "Calculate VAT amounts and inclusive/exclusive prices for UAE tax rates. Add or remove VAT from any amount with support for different VAT rates including the standard 5% UAE rate.",
        tool_type: "calculator",
        difficulty_level: "beginner",
        estimated_time: "5 minutes",
        icon: "Calculator",
        color_class: "bg-blue-100 text-blue-600",
        tool_url: "/tools/vat-calculator",
        requirements: "Basic math understanding, Knowledge of VAT concepts",
        tags: ["vat", "tax", "calculator", "uae", "finance"],
        is_available: true,
        is_featured: true,
        order_index: 1
      },
      {
        title: "Corporate Tax Calculator",
        description: "Estimate your UAE corporate tax liability based on current tax rates and regulations. Calculate tax for mainland and free zone companies with small business relief considerations.",
        tool_type: "calculator",
        difficulty_level: "intermediate",
        estimated_time: "10 minutes",
        icon: "CreditCard",
        color_class: "bg-green-100 text-green-600",
        tool_url: "/tools/corporate-tax-calculator",
        requirements: "Business financials, Understanding of UAE corporate tax",
        tags: ["corporate-tax", "business", "uae", "mainland", "freezone"],
        is_available: true,
        is_featured: true,
        order_index: 2
      },
      {
        title: "Business Setup Cost Calculator",
        description: "Estimate costs for setting up your business in the UAE across different emirates and business types. Include license fees, visa costs, office setup, and additional services.",
        tool_type: "calculator",
        difficulty_level: "intermediate",
        estimated_time: "15 minutes",
        icon: "Building",
        color_class: "bg-purple-100 text-purple-600",
        tool_url: "/tools/setup-cost-calculator",
        requirements: "Business plan knowledge, Emirate preferences",
        tags: ["business-setup", "license", "visa", "emirates", "startup"],
        is_available: true,
        is_featured: true,
        order_index: 3
      },
      {
        title: "Cash Flow Projector",
        description: "Project your business cash flow scenarios and plan for future financial needs. Create detailed monthly projections with income and expense tracking, export to CSV.",
        tool_type: "projector",
        difficulty_level: "advanced",
        estimated_time: "20 minutes",
        icon: "TrendingUp",
        color_class: "bg-orange-100 text-orange-600",
        tool_url: "/tools/cash-flow-projector",
        requirements: "Financial data, Business cash flow understanding",
        tags: ["cash-flow", "projection", "planning", "finance", "budgeting"],
        is_available: true,
        is_featured: true,
        order_index: 4
      },
      {
        title: "ROI Calculator",
        description: "Calculate Return on Investment for business projects, marketing campaigns, and investment opportunities. Includes simple ROI, annualized returns, and payback period analysis.",
        tool_type: "calculator",
        difficulty_level: "intermediate",
        estimated_time: "10 minutes",
        icon: "TrendingUp",
        color_class: "bg-emerald-100 text-emerald-600",
        tool_url: "/tools/roi-calculator",
        requirements: "Investment amounts, Time horizon, Basic finance knowledge",
        tags: ["roi", "investment", "return", "analysis", "finance"],
        is_available: true,
        is_featured: true,
        order_index: 5
      }
    ]

    // Insert business tools
    for (const tool of businessTools) {
      // Check if tool already exists
      const existing = await sql`
        SELECT id FROM business_tools WHERE title = ${tool.title}
      `
      
      if (existing.length === 0) {
        // Insert new tool
        await sql`
          INSERT INTO business_tools (
            title, description, tool_type, difficulty_level, estimated_time,
            icon, color_class, tool_url, requirements, tags,
            is_available, is_featured, order_index, created_at, updated_at
          ) VALUES (
            ${tool.title}, ${tool.description}, ${tool.tool_type}, ${tool.difficulty_level}, 
            ${tool.estimated_time}, ${tool.icon}, ${tool.color_class}, ${tool.tool_url},
            ${tool.requirements}, ${tool.tags},
            ${tool.is_available}, ${tool.is_featured}, ${tool.order_index}, 
            NOW(), NOW()
          )
        `
      } else {
        // Update existing tool
        await sql`
          UPDATE business_tools SET
            description = ${tool.description},
            tool_type = ${tool.tool_type},
            difficulty_level = ${tool.difficulty_level},
            estimated_time = ${tool.estimated_time},
            icon = ${tool.icon},
            color_class = ${tool.color_class},
            tool_url = ${tool.tool_url},
            requirements = ${tool.requirements},
            tags = ${tool.tags},
            is_available = ${tool.is_available},
            is_featured = ${tool.is_featured},
            order_index = ${tool.order_index},
            updated_at = NOW()
          WHERE title = ${tool.title}
        `
      }
    }

    // Get count of inserted tools
    const result = await sql`SELECT COUNT(*) as count FROM business_tools`
    const toolCount = result[0].count

    return NextResponse.json({ 
      message: 'Business tools populated successfully',
      toolCount: toolCount,
      tools: businessTools.map(t => t.title)
    })

  } catch (error) {
    console.error('Error populating business tools:', error)
    return NextResponse.json(
      { error: 'Failed to populate business tools' },
      { status: 500 }
    )
  }
}