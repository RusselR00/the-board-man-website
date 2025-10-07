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
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium rounded-full backdrop-blur-sm mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              Diverse Client Portfolio
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Our Client Categories
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 mb-8 font-bold">
              Tailored solutions for every business stage
            </p>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We serve diverse clients with tailored accounting solutions for every business stage and size. 
              From individuals to large enterprises, we provide specialized services to meet your unique needs.
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
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="individuals" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-900/30 border-slate-800/30 backdrop-blur-sm">
                <TabsTrigger 
                  value="individuals" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Individuals</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="msmes" 
                  className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
                >
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">MSMEs</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="startups" 
                  className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
                >
                  <Rocket className="h-4 w-4" />
                  <span className="hidden sm:inline">Startups</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="large-firms" 
                  className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white text-slate-400 hover:text-slate-200"
                >
                  <Factory className="h-4 w-4" />
                  <span className="hidden sm:inline">Large Firms</span>
                </TabsTrigger>
              </TabsList>

          {/* Individuals Tab */}
          <TabsContent value="individuals" className="space-y-6">
            <Card className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm group hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300">
              {/* Subtle inner glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Individual Clients</CardTitle>
                    <CardDescription className="text-lg text-slate-400">
                      Personal tax and financial services for individuals and families
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Personal Finance Experts
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                      <FileText className="h-5 w-5 text-blue-400" />
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
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                      <Shield className="h-5 w-5 text-blue-400" />
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
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Separator className="bg-slate-700/50" />
                
                <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm shadow-lg">
                  <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-400" />
                    Individual Benefits:
                  </h4>
                  <p className="text-blue-200/90 leading-relaxed">
                    Flexible appointment scheduling including evenings and weekends, multilingual support, 
                    family package discounts, and comprehensive financial education resources.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                    <Link href="/contact">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50">
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
            <Card className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm group hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300">
              {/* Subtle inner glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">MSMEs (Micro, Small & Medium Enterprises)</CardTitle>
                    <CardDescription className="text-lg text-slate-400">
                      Comprehensive business accounting for growing enterprises
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit bg-green-500/20 text-green-300 border-green-500/30">
                  Small Business Specialists
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                      <FileText className="h-5 w-5 text-green-400" />
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
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                      <TrendingUp className="h-5 w-5 text-green-400" />
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
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Separator className="bg-slate-700/50" />
                
                <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm shadow-lg">
                  <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Special MSME Package Benefits:
                  </h4>
                  <p className="text-green-200/90 leading-relaxed">
                    Discounted rates for comprehensive packages, flexible payment terms, 
                    and dedicated account manager for businesses with consistent monthly revenue.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                    <Link href="/contact">
                      Start Your Business Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50">
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
            <Card className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm group hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300">
              {/* Subtle inner glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Startups & Tech Companies</CardTitle>
                    <CardDescription className="text-lg text-slate-400">
                      Modern accounting solutions for innovative businesses
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Innovation Partners
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                      <Rocket className="h-5 w-5 text-purple-400" />
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
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                      <Users className="h-5 w-5 text-purple-400" />
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
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Separator className="bg-slate-700/50" />
                
                <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm shadow-lg">
                  <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    Startup-Friendly Features:
                  </h4>
                  <p className="text-purple-200/90 leading-relaxed">
                    Deferred payment options for early-stage startups, equity-based payment arrangements considered, 
                    and specialized knowledge of tech industry regulations and compliance requirements.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                    <Link href="/contact">
                      Launch with Confidence
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50">
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
            <Card className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm group hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300">
              {/* Subtle inner glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                    <Factory className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">Large Corporations & Enterprises</CardTitle>
                    <CardDescription className="text-lg text-slate-400">
                      Enterprise-grade accounting and financial management services
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit bg-red-500/20 text-red-300 border-red-500/30">
                  Enterprise Solutions
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                      <Factory className="h-5 w-5 text-red-400" />
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
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                      <Shield className="h-5 w-5 text-red-400" />
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
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Separator className="bg-slate-700/50" />
                
                <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm shadow-lg">
                  <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-400" />
                    Enterprise Advantages:
                  </h4>
                  <p className="text-red-200/90 leading-relaxed">
                    Dedicated team of senior professionals, customized reporting solutions, 
                    priority support with guaranteed response times, and regular strategic review meetings.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                    <Link href="/contact">
                      Partner with Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50">
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
    </div>
    </section>

    {/* Bottom CTA Section */}
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Dark background with multiple layers */}
      <div className="absolute inset-0 bg-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
      
      {/* Elegant accent elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-2xl shadow-black/20">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Not Sure Which Category Fits Your Needs?
          </h2>
          <p className="text-slate-400 mb-6">
            Contact us for a free consultation where we&apos;ll assess your specific situation 
            and recommend the best service package for your business or personal needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
              <Link href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Get Free Assessment
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-12 px-8 bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50 font-semibold">
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}