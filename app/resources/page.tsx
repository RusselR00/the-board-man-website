"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Download, 
  FileText, 
  Calculator, 
  BookOpen, 
  Shield, 
  TrendingUp,
  Search,
  ExternalLink,
  ChevronRight,
  Clock,
  Users,
  Award,
  Lightbulb,
  HelpCircle,
  CheckCircle2,
  Globe,
  Building,
  CreditCard,
  PieChart
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Downloadable resources data
const downloadableResources = [
  {
    category: "Tax & Compliance",
    icon: FileText,
    color: "text-blue-600",
    resources: [
      {
        title: "UAE Corporate Tax Guide 2025",
        description: "Complete guide to corporate tax requirements and deadlines",
        fileType: "PDF",
        fileSize: "2.3 MB",
        downloadCount: "1,247",
        isNew: true,
        href: "/downloads/uae-corporate-tax-guide-2025.pdf"
      },
      {
        title: "VAT Return Template",
        description: "Ready-to-use VAT return template with calculations",
        fileType: "Excel",
        fileSize: "156 KB",
        downloadCount: "892",
        isNew: false,
        href: "/downloads/vat-return-template.xlsx"
      },
      {
        title: "Tax Calendar 2025",
        description: "Important tax dates and deadlines for UAE businesses",
        fileType: "PDF",
        fileSize: "445 KB",
        downloadCount: "2,156",
        isNew: false,
        href: "/downloads/tax-calendar-2025.pdf"
      }
    ]
  },
  {
    category: "Business Setup",
    icon: Building,
    color: "text-green-600",
    resources: [
      {
        title: "Business Setup Checklist",
        description: "Step-by-step checklist for setting up business in UAE",
        fileType: "PDF",
        fileSize: "1.1 MB",
        downloadCount: "1,543",
        isNew: false,
        href: "/downloads/business-setup-checklist.pdf"
      },
      {
        title: "License Types Comparison",
        description: "Detailed comparison of different business license types",
        fileType: "PDF",
        fileSize: "987 KB",
        downloadCount: "756",
        isNew: false,
        href: "/downloads/license-types-comparison.pdf"
      },
      {
        title: "Free Zone vs Mainland Guide",
        description: "Comprehensive comparison of setup options",
        fileType: "PDF",
        fileSize: "1.8 MB",
        downloadCount: "1,098",
        isNew: true,
        href: "/downloads/freezone-vs-mainland.pdf"
      }
    ]
  },
  {
    category: "Financial Templates",
    icon: PieChart,
    color: "text-purple-600",
    resources: [
      {
        title: "Cash Flow Projection Template",
        description: "12-month cash flow projection spreadsheet",
        fileType: "Excel",
        fileSize: "234 KB",
        downloadCount: "1,876",
        isNew: false,
        href: "/downloads/cash-flow-template.xlsx"
      },
      {
        title: "Financial Dashboard Template",
        description: "Interactive KPI dashboard for small businesses",
        fileType: "Excel",
        fileSize: "445 KB",
        downloadCount: "1,234",
        isNew: true,
        href: "/downloads/financial-dashboard.xlsx"
      },
      {
        title: "Budget Planning Worksheet",
        description: "Annual budget planning template with variance analysis",
        fileType: "Excel",
        fileSize: "198 KB",
        downloadCount: "967",
        isNew: false,
        href: "/downloads/budget-planning.xlsx"
      }
    ]
  }
]

// FAQ data
const faqData = [
  {
    question: "What documents do I need to start a business in UAE?",
    answer: "To start a business in UAE, you typically need: passport copies of shareholders and directors, no-objection certificate (NOC) if you're employed, educational certificates (attested), business plan, and initial approval from relevant authorities. The specific requirements vary depending on the business type and location (mainland vs free zone). We can provide a detailed checklist based on your specific business needs."
  },
  {
    question: "How often should I file VAT returns in UAE?",
    answer: "VAT returns in UAE must be filed quarterly by businesses with annual turnover below AED 150 million, and monthly for businesses above this threshold. The deadline is 28 days after the end of each tax period. However, voluntary registration thresholds and filing frequencies may vary, so it's essential to understand your specific obligations."
  },
  {
    question: "What is the corporate tax rate in UAE?",
    answer: "The UAE introduced federal corporate tax effective from June 1, 2023. The rate is 0% for taxable income up to AED 375,000, and 9% for taxable income above AED 375,000. Certain businesses and activities may be subject to different rates or exemptions. Free zone companies may qualify for 0% rate under specific conditions."
  },
  {
    question: "Do I need an auditor for my business?",
    answer: "Audit requirements in UAE depend on your business type, size, and legal form. Limited liability companies (LLCs) with share capital above AED 2 million, or companies meeting certain size criteria, require mandatory annual audits. Free zone companies and branches of foreign companies also have specific audit requirements. We can help determine your specific audit obligations."
  },
  {
    question: "What bookkeeping records must I maintain?",
    answer: "UAE businesses must maintain proper books of accounts including general ledger, cash book, bank records, invoices, contracts, and supporting documents. Records must be kept in Arabic or English, and maintained for at least 5 years. Digital records are acceptable if they meet regulatory requirements for authenticity and accessibility."
  },
  {
    question: "How can I optimize my tax position legally?",
    answer: "Tax optimization strategies include proper business structure planning, utilizing available exemptions and reliefs, timing of income and expenses, transfer pricing optimization for group companies, and staying compliant with international tax treaties. Our tax advisory team can develop customized strategies based on your business model and growth plans."
  },
  {
    question: "What are the penalties for late VAT filing?",
    answer: "Late VAT filing penalties in UAE include: AED 500 for returns filed up to 15 days late, AED 1,000 for 16-30 days late, AED 2,000 for 31-70 days late, and AED 3,000 for more than 70 days late. Additional penalties may apply for repeated violations or significant delays. Prompt filing is crucial to avoid accumulating penalties."
  },
  {
    question: "Can I handle accounting myself or do I need professional help?",
    answer: "While small businesses can handle basic bookkeeping, professional accounting services become essential as your business grows. Consider professional help if you have complex transactions, multiple revenue streams, international operations, or simply want to focus on your core business. Professional accountants ensure compliance and can provide valuable business insights."
  }
]

// Business calculators data
const businessCalculators = [
  {
    title: "VAT Calculator",
    description: "Calculate VAT amounts and inclusive/exclusive prices",
    icon: Calculator,
    color: "bg-blue-100 text-blue-600",
    available: true,
    href: "/tools/vat-calculator"
  },
  {
    title: "Corporate Tax Calculator",
    description: "Estimate your UAE corporate tax liability",
    icon: CreditCard,
    color: "bg-green-100 text-green-600",
    available: true,
    href: "/tools/corporate-tax-calculator"
  },
  {
    title: "Business Setup Cost Calculator",
    description: "Estimate costs for different business setup options",
    icon: Building,
    color: "bg-purple-100 text-purple-600",
    available: true,
    href: "/tools/setup-cost-calculator"
  },
  {
    title: "Cash Flow Projector",
    description: "Project your business cash flow scenarios",
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-600",
    available: true,
    href: "/tools/cash-flow-projector"
  },
  {
    title: "ROI Calculator",
    description: "Calculate return on investment for projects and campaigns",
    icon: TrendingUp,
    color: "bg-emerald-100 text-emerald-600",
    available: true,
    href: "/tools/roi-calculator"
  }
]

// Industry insights data
const industryInsights = [
  {
    title: "UAE Economic Outlook 2025",
    description: "Analysis of economic trends and business opportunities in the UAE for the coming year.",
    category: "Economic Trends",
    readTime: "8 min read",
    publishDate: "2024-12-15",
    isNew: true,
    href: "/insights/uae-economic-outlook-2025"
  },
  {
    title: "Digital Transformation in Accounting",
    description: "How automation and AI are reshaping financial services and what it means for businesses.",
    category: "Technology",
    readTime: "6 min read",
    publishDate: "2024-12-10",
    isNew: true,
    href: "/insights/digital-transformation-accounting"
  },
  {
    title: "ESG Reporting Requirements",
    description: "Understanding Environmental, Social, and Governance reporting obligations in the UAE.",
    category: "Compliance",
    readTime: "10 min read",
    publishDate: "2024-12-05",
    isNew: false,
    href: "/insights/esg-reporting-requirements"
  },
  {
    title: "IFRS Updates and Implications",
    description: "Latest International Financial Reporting Standards updates and their impact on UAE businesses.",
    category: "Standards",
    readTime: "7 min read",
    publishDate: "2024-11-28",
    isNew: false,
    href: "/insights/ifrs-updates-implications"
  }
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")

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
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium rounded-full backdrop-blur-sm mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              Resource Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Business Resources
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 mb-8 font-bold">
              Tools, insights, and templates for your success
            </p>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Access valuable resources, tools, and insights to support your business success. 
              Download templates, use our calculators, and stay informed with industry updates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-slate-950 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        {/* Subtle accent elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search resources, guides, or FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/30 border-slate-800/50 text-white placeholder:text-slate-500 focus:border-slate-700"
              />
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="downloads" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-900/30 border-slate-800/30 backdrop-blur-sm">
              <TabsTrigger 
                value="downloads" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Downloads</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tools" 
                className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
              >
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Business Tools</span>
              </TabsTrigger>
              <TabsTrigger 
                value="insights" 
                className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
              >
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Industry Insights</span>
              </TabsTrigger>
              <TabsTrigger 
                value="faq" 
                className="flex items-center gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">FAQ</span>
              </TabsTrigger>
            </TabsList>

        {/* Downloads Tab */}
        <TabsContent value="downloads" className="space-y-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
              Downloadable Resources
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business Templates & Guides</h2>
            <p className="text-slate-400 text-lg">
              Free templates, guides, and checklists to help streamline your business operations
            </p>
          </div>

          {downloadableResources.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{category.category}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {category.resources.map((resource, resourceIndex) => (
                  <Card key={resourceIndex} className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm group hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                    {/* Subtle inner glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg leading-tight text-white">
                          {resource.title}
                        </CardTitle>
                        {resource.isNew && (
                          <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-300 border-blue-500/30">New</Badge>
                        )}
                      </div>
                      <CardDescription className="text-slate-400">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                        <span>{resource.fileType} • {resource.fileSize}</span>
                        <span>{resource.downloadCount} downloads</span>
                      </div>
                      <Button asChild className="w-full bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                        <Link href={resource.href}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Business Tools Tab */}
        <TabsContent value="tools" className="space-y-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              Business Tools
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Calculators & Planning Tools</h2>
            <p className="text-slate-400 text-lg">
              Interactive tools to help you make informed business decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {businessCalculators.map((tool, index) => (
              <Card key={index} className={`bg-slate-900/20 border-slate-800/30 backdrop-blur-sm group hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${!tool.available ? 'opacity-75' : ''}`}>
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">{tool.title}</CardTitle>
                      <CardDescription className="text-slate-400">{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  {tool.available ? (
                    <Button asChild className="w-full bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                      <Link href={tool.href}>
                        Use Calculator
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-slate-800/50 text-slate-400">
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm shadow-lg">
            <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-green-400" />
              Request a Custom Tool
            </h4>
            <p className="text-green-200/90 leading-relaxed mb-4">
              Need a specific calculator or tool for your business? Let us know and we&apos;ll consider adding it to our resource center.
            </p>
            <Button variant="outline" asChild className="bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50">
              <Link href="/contact">
                <ExternalLink className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
          </div>
        </TabsContent>

        {/* Industry Insights Tab */}
        <TabsContent value="insights" className="space-y-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              Industry Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Updates & Trends</h2>
            <p className="text-slate-400 text-lg">
              Stay informed with the latest trends, regulations, and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {industryInsights.map((insight, index) => (
              <Card key={index} className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm group hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {insight.category}
                      </Badge>
                      <CardTitle className="text-xl mb-2 text-white">{insight.title}</CardTitle>
                      <CardDescription className="text-slate-400">{insight.description}</CardDescription>
                    </div>
                    {insight.isNew && (
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">New</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {insight.readTime}
                    </div>
                    <span>{new Date(insight.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <Button variant="outline" asChild className="w-full bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50">
                    <Link href={insight.href}>
                      Read Article
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm shadow-lg">
            <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-400" />
              Stay Updated
            </h4>
            <p className="text-purple-200/90 leading-relaxed mb-4">
              Subscribe to our newsletter to receive the latest industry insights and updates directly in your inbox.
            </p>
            <div className="flex gap-4">
              <Input placeholder="Enter your email address" className="flex-1 bg-slate-900/30 border-slate-800/50 text-white placeholder:text-slate-500 focus:border-slate-700" />
              <Button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold">Subscribe</Button>
            </div>
          </div>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Common Questions</h2>
            <p className="text-slate-400 text-lg">
              Find answers to common questions about accounting, taxation, and business setup in the UAE
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`} className="border-slate-800/50">
                  <AccordionTrigger className="text-left text-white hover:text-orange-400 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm shadow-lg">
            <h4 className="font-semibold text-orange-300 mb-3 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-orange-400" />
              Still Have Questions?
            </h4>
            <p className="text-orange-200/90 leading-relaxed mb-4">
              Can&apos;t find the answer you&apos;re looking for? Our expert team is here to help with personalized advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                <Link href="/contact">
                  Contact Our Experts
                </Link>
              </Button>
              <Button variant="outline" asChild className="bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50">
                <Link href="/booking">
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </section>

  {/* Bottom CTA Section */}
  <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
    {/* Dark background with multiple layers */}
    <div className="absolute inset-0 bg-slate-900"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
    
    {/* Elegant accent elements */}
    <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
    
    <div className="container mx-auto px-4 text-center relative z-10">
      <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-2xl shadow-black/20">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to Get Professional Support?
        </h2>
        <p className="text-slate-400 mb-6">
          While our resources provide valuable guidance, nothing replaces personalized professional advice. 
          Let our experts help you navigate your specific business challenges.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
            <Link href="/booking">
              <Clock className="mr-2 h-4 w-4" />
              Book Free Consultation
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="h-12 px-8 bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50 font-semibold">
            <Link href="/contact">
              <Users className="mr-2 h-4 w-4" />
              Contact Our Team
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
</div>
  )
}