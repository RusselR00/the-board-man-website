"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  User, 
  Building2, 
  Rocket, 
  Factory,
  CheckCircle2,
  ArrowRight,
  Phone,
  Calendar,
  Users,
  TrendingUp,
  Shield,
  FileText
} from "lucide-react"

export default function ClientsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Our Client Categories
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We serve diverse clients with tailored accounting solutions for every business stage and size. 
          From individuals to large enterprises, we provide specialized services to meet your unique needs.
        </p>
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="individuals" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="individuals" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Individuals</span>
            </TabsTrigger>
            <TabsTrigger value="msmes" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">MSMEs</span>
            </TabsTrigger>
            <TabsTrigger value="startups" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              <span className="hidden sm:inline">Startups</span>
            </TabsTrigger>
            <TabsTrigger value="large-firms" className="flex items-center gap-2">
              <Factory className="h-4 w-4" />
              <span className="hidden sm:inline">Large Firms</span>
            </TabsTrigger>
          </TabsList>

          {/* Individuals Tab */}
          <TabsContent value="individuals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Individual Clients</CardTitle>
                    <CardDescription className="text-lg">
                      Personal tax and financial services for individuals and families
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit">
                  Personal Finance Experts
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Services Included
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Personal Income Tax Filing",
                        "Capital Gains Tax Assistance",
                        "Estate Planning Support",
                        "Retirement Planning Consultation",
                        "Investment Advisory Services",
                        "Personal Financial Statements"
                      ].map((service, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Why Choose Us
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Personalized attention to your unique situation",
                        "Expert knowledge of tax optimization strategies",
                        "Year-round support, not just during tax season",
                        "Confidential and secure handling of information",
                        "Proactive planning for future financial goals",
                        "Affordable rates with transparent pricing"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Phone className="mr-2 h-4 w-4" />
                      Free Consultation
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MSMEs Tab */}
          <TabsContent value="msmes" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Building2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">MSMEs (Micro, Small & Medium Enterprises)</CardTitle>
                    <CardDescription className="text-lg">
                      Comprehensive business accounting for growing enterprises
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit">
                  Small Business Specialists
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      Core Services
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Monthly Bookkeeping & Financial Statements",
                        "VAT Registration & Compliance",
                        "BIR Tax Filing & Annual ITR",
                        "Payroll Processing & SSS/PhilHealth",
                        "Business Registration Assistance",
                        "Cash Flow Management"
                      ].map((service, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Growth Support
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Business expansion financial planning",
                        "Loan application support & documentation",
                        "Government incentive program guidance",
                        "Financial analysis & performance reports",
                        "Cost optimization strategies",
                        "Digital transformation consulting"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Special MSME Package Benefits:</h4>
                  <p className="text-green-700">
                    Discounted rates for comprehensive packages, flexible payment terms, 
                    and dedicated account manager for businesses with consistent monthly revenue.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Start Your Business Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Assessment
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Startups Tab */}
          <TabsContent value="startups" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Rocket className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Startups & Tech Companies</CardTitle>
                    <CardDescription className="text-lg">
                      Modern accounting solutions for innovative businesses
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit">
                  Innovation Partners
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-purple-600" />
                      Startup Essentials
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Company Incorporation & SEC Registration",
                        "Equity Structure & Cap Table Management",
                        "Monthly Financial Reporting",
                        "Investor-Ready Financial Statements",
                        "R&D Tax Incentive Applications",
                        "International Transaction Support"
                      ].map((service, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      Scaling Support
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Fundraising preparation & due diligence",
                        "Employee stock option plan setup",
                        "Multi-currency transaction handling",
                        "Cloud-based accounting system integration",
                        "KPI dashboard & metrics tracking",
                        "Exit strategy financial planning"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Startup-Friendly Features:</h4>
                  <p className="text-purple-700">
                    Deferred payment options for early-stage startups, equity-based payment arrangements considered, 
                    and specialized knowledge of tech industry regulations and compliance requirements.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Launch with Confidence
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Rocket className="mr-2 h-4 w-4" />
                      Free Startup Consultation
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Large Firms Tab */}
          <TabsContent value="large-firms" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Factory className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Large Corporations & Enterprises</CardTitle>
                    <CardDescription className="text-lg">
                      Enterprise-grade accounting and financial management services
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit">
                  Enterprise Solutions
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Factory className="h-5 w-5 text-red-600" />
                      Enterprise Services
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Consolidated Financial Statements",
                        "Internal Audit & Risk Management",
                        "Tax Strategy & Compliance",
                        "Management Reporting & Analytics",
                        "M&A Financial Due Diligence",
                        "International Tax & Transfer Pricing"
                      ].map((service, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      Strategic Advisory
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Corporate restructuring & optimization",
                        "Treasury management solutions",
                        "Regulatory compliance oversight",
                        "ESG reporting & sustainability metrics",
                        "Digital transformation planning",
                        "Board-level financial reporting"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Enterprise Advantages:</h4>
                  <p className="text-red-700">
                    Dedicated team of senior professionals, customized reporting solutions, 
                    priority support with guaranteed response times, and regular strategic review meetings.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Partner with Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">
                      <Users className="mr-2 h-4 w-4" />
                      Enterprise Consultation
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom CTA Section */}
      <div className="text-center mt-16 p-8 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Not Sure Which Category Fits Your Needs?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Contact us for a free consultation where we&apos;ll assess your specific situation 
          and recommend the best service package for your business or personal needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">
              <Phone className="mr-2 h-4 w-4" />
              Get Free Assessment
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">
              View All Services
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}