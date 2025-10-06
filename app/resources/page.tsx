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
    available: false,
    href: "/tools/cash-flow-projector"
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
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Resource Center
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Access valuable resources, tools, and insights to support your business success. 
          Download templates, use our calculators, and stay informed with industry updates.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources, guides, or FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="downloads" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="downloads" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Downloads
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Business Tools
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Industry Insights
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
        </TabsList>

        {/* Downloads Tab */}
        <TabsContent value="downloads" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Downloadable Resources</h2>
            <p className="text-muted-foreground">
              Free templates, guides, and checklists to help streamline your business operations
            </p>
          </div>

          {downloadableResources.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-muted`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {category.resources.map((resource, resourceIndex) => (
                  <Card key={resourceIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg leading-tight">
                          {resource.title}
                        </CardTitle>
                        {resource.isNew && (
                          <Badge variant="secondary" className="ml-2">New</Badge>
                        )}
                      </div>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{resource.fileType} • {resource.fileSize}</span>
                        <span>{resource.downloadCount} downloads</span>
                      </div>
                      <Button asChild className="w-full">
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
            <h2 className="text-2xl font-bold mb-4">Business Calculators & Tools</h2>
            <p className="text-muted-foreground">
              Interactive tools to help you make informed business decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {businessCalculators.map((tool, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow ${!tool.available ? 'opacity-75' : ''}`}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${tool.color}`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {tool.available ? (
                    <Button asChild className="w-full">
                      <Link href={tool.href}>
                        Use Calculator
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request a Custom Tool</CardTitle>
              <CardDescription>
                Need a specific calculator or tool for your business? Let us know and we&apos;ll consider adding it to our resource center.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Industry Insights Tab */}
        <TabsContent value="insights" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Industry Insights & Updates</h2>
            <p className="text-muted-foreground">
              Stay informed with the latest trends, regulations, and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {industryInsights.map((insight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {insight.category}
                      </Badge>
                      <CardTitle className="text-xl mb-2">{insight.title}</CardTitle>
                      <CardDescription>{insight.description}</CardDescription>
                    </div>
                    {insight.isNew && (
                      <Badge variant="secondary">New</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
                  <Button variant="outline" asChild className="w-full">
                    <Link href={insight.href}>
                      Read Article
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>
                Subscribe to our newsletter to receive the latest industry insights and updates directly in your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input placeholder="Enter your email address" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Find answers to common questions about accounting, taxation, and business setup in the UAE
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-balance">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Still Have Questions?
              </CardTitle>
              <CardDescription>
                Can&apos;t find the answer you&apos;re looking for? Our expert team is here to help with personalized advice.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="/contact">
                    Contact Our Experts
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/booking">
                    Book a Consultation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom CTA Section */}
      <div className="mt-16 text-center p-8 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Get Professional Support?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          While our resources provide valuable guidance, nothing replaces personalized professional advice. 
          Let our experts help you navigate your specific business challenges.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/booking">
              <Clock className="mr-2 h-4 w-4" />
              Book Free Consultation
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              <Users className="mr-2 h-4 w-4" />
              Contact Our Team
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}