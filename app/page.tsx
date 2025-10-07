import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { generateSEOMetadata, generateServiceSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'
import { Metadata } from 'next'
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Shield, Users, Calculator, FileText, Building2, Zap, Clock, Award, Globe, Star } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Premier Accounting & Auditing Services in Dubai, UAE',
  description: 'THE BOARD MAN provides professional accounting, auditing, tax services, and business setup solutions in Dubai, UAE. Expert financial advisory for businesses of all sizes.',
  keywords: ['accounting services Dubai', 'auditing UAE', 'business setup Dubai', 'tax consultancy UAE', 'VAT services Dubai', 'corporate tax UAE'],
  canonicalUrl: '/',
})

const coreServices = [
  {
    name: 'Accounting Services',
    description: 'Comprehensive bookkeeping, financial reporting, and management accounting services'
  },
  {
    name: 'Audit & Assurance',
    description: 'Professional auditing and assurance services for regulatory compliance'
  },
  {
    name: 'Tax Services',
    description: 'VAT, corporate tax, and comprehensive tax planning and compliance'
  },
  {
    name: 'Business Setup',
    description: 'Complete company formation and business registration services'
  }
]

export default function HomePage() {
  const serviceSchemas = coreServices.map(service => 
    generateServiceSchema({
      name: service.name,
      description: service.description
    })
  )

  return (
    <>
      <StructuredData data={serviceSchemas} />
      
      {/* Hero section with clean professional design */}
      <section className="relative min-h-[90vh] sm:min-h-[100vh] flex items-center bg-slate-950 overflow-hidden -mt-16 pt-16">
        {/* Dark background with multiple layers to ensure no white shows */}
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
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh] sm:min-h-[90vh]">
              {/* Left side content - spans 7 columns */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
                {/* Trust badge */}
                <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white/5 border border-white/10 text-slate-300 text-xs sm:text-sm font-medium rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  Licensed & Trusted in Dubai
                </div>
                
                {/* Main heading */}
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight">
                    <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      THE BOARD MAN
                    </span>
                  </h1>
                  
                  <p className="text-sm sm:text-base md:text-lg xl:text-xl text-slate-400 font-medium">
                    ACCOUNTING AND AUDITORS L.L.C
                  </p>
                </div>

                {/* Tagline - prominent positioning */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                      Empowering Growth,<br />
                      Beyond Borders
                    </span>
                  </h2>
                  
                  <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mx-auto lg:mx-0"></div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Dubai&apos;s most trusted accounting firm. We transform financial complexity into clarity, 
                  helping businesses thrive in the UAE&apos;s dynamic market.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
                  <Button 
                    asChild 
                    size="lg" 
                    className="h-11 sm:h-12 px-6 sm:px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 group font-semibold text-sm sm:text-base"
                  >
                    <Link href="/booking" className="flex items-center gap-2">
                      Start Your Journey
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    className="h-11 sm:h-12 px-6 sm:px-8 bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-sm sm:text-base"
                  >
                    <Link href="/services">
                      Explore Services
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
                  {[
                    { number: "500+", label: "Clients Served" },
                    { number: "5+", label: "Years Experience" },
                    { number: "100%", label: "Compliance Rate" },
                    { number: "24/7", label: "Support" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - professional visual element */}
              <div className="lg:col-span-5 relative order-first lg:order-last">
                <div className="relative h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                  {/* Clean growth chart visualization */}
                  <div className="w-64 sm:w-80 h-64 sm:h-80 relative">
                    {/* Animated growth bars */}
                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center gap-2 sm:gap-3">
                      {[40, 60, 45, 75, 55, 85, 70, 95].map((height, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm animate-pulse opacity-30"
                          style={{
                            width: '20px',
                            height: `${height}%`,
                            animationDelay: `${index * 200}ms`,
                            animationDuration: '2s'
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Overlaid trend line */}
                    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 320 320">
                      <path
                        d="M20 280 L60 240 L100 260 L140 200 L180 220 L220 160 L260 180 L300 120"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-pulse"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid with premium sophisticated design */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-950 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        {/* Subtle accent elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-emerald-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/3 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Premium section header matching "Why Industry Leaders Choose Us" */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-xs sm:text-sm font-medium rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                Comprehensive Solutions
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                Services that
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Drive Success
                </span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
                We don&apos;t just provide services, we craft strategic solutions that 
                transform your business vision into measurable success.
              </p>
            </div>
            
            {/* Premium service cards with sophisticated styling */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Audit & Assurance",
                  description: "Independent audit services ensuring compliance, transparency, and stakeholder confidence in your financial reporting.",
                  gradient: "from-blue-500 to-cyan-500",
                  shadowColor: "blue"
                },
                {
                  icon: <Calculator className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Tax Services", 
                  description: "Comprehensive VAT, corporate tax planning and compliance services tailored for UAE business requirements.",
                  gradient: "from-emerald-500 to-teal-500",
                  shadowColor: "emerald"
                },
                {
                  icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Business Setup",
                  description: "Complete business formation, licensing, and registration services to establish your presence in the UAE.",
                  gradient: "from-purple-500 to-indigo-500",
                  shadowColor: "purple"
                },
                {
                  icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Accounting Services",
                  description: "Professional bookkeeping, financial reporting, and management accounting services for informed decision-making.",
                  gradient: "from-orange-500 to-red-500",
                  shadowColor: "orange"
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                >
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon with enhanced gradient and shadow */}
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-${service.shadowColor}-500/20 group-hover:shadow-xl group-hover:shadow-${service.shadowColor}-500/30`}>
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Content with improved typography */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 group-hover:text-slate-100 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {service.description}
                  </p>
                  
                  {/* Subtle bottom accent line */}
                  <div className={`absolute bottom-0 left-6 right-6 sm:left-8 sm:right-8 h-0.5 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-50 transition-all duration-300 rounded-full`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us section with sophisticated layering */}
      <section className="py-16 sm:py-20 lg:py-24 bg-black relative overflow-hidden">
        {/* Multi-layer background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-black to-slate-950/40"></div>
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        {/* Subtle mesh gradient overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced section header with depth */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-xs sm:text-sm font-medium rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                Why Industry Leaders Choose Us
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                Why Industry Leaders
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Choose Us
                </span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
                We don&apos;t just handle your finances, we elevate your business with 
                precision, insight, and unwavering commitment to your success.
              </p>
            </div>

            {/* Enhanced feature grid with depth and layering */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Compliance Guaranteed",
                  description: "100% UAE regulatory compliance with real-time monitoring and proactive updates to keep your business ahead of regulatory changes.",
                  gradient: "from-blue-500 to-cyan-500",
                  shadowColor: "blue"
                },
                {
                  icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Expert Team",
                  description: "Certified professionals with deep UAE market knowledge, combining international standards with local expertise for optimal results.",
                  gradient: "from-emerald-500 to-teal-500", 
                  shadowColor: "emerald"
                },
                {
                  icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "24/7 Support",
                  description: "Round-the-clock assistance ensuring your business never stops. Our dedicated support team is always ready to help when you need it most.",
                  gradient: "from-purple-500 to-indigo-500",
                  shadowColor: "purple"
                },
                {
                  icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Growth Focused",
                  description: "Strategic financial insights that drive growth. We identify opportunities and optimize your financial structure for sustainable expansion.",
                  gradient: "from-orange-500 to-red-500",
                  shadowColor: "orange"
                },
                {
                  icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Award Winning",
                  description: "Recognized quality in accounting and audit services, with industry awards that reflect our commitment to innovation and results.",
                  gradient: "from-yellow-500 to-orange-500",
                  shadowColor: "yellow"
                },
                {
                  icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "Global Reach",
                  description: "International network with local presence, providing seamless cross-border financial solutions for businesses expanding globally.",
                  gradient: "from-pink-500 to-purple-500",
                  shadowColor: "pink"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                >
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon with enhanced gradient and shadow */}
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-${feature.shadowColor}-500/20 group-hover:shadow-xl group-hover:shadow-${feature.shadowColor}-500/30`}>
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Content with improved typography */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 group-hover:text-slate-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                  
                  {/* Subtle bottom accent line */}
                  <div className={`absolute bottom-0 left-6 right-6 sm:left-8 sm:right-8 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-50 transition-all duration-300 rounded-full`}></div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA section with depth */}
            <div className="text-center mt-12 sm:mt-16 lg:mt-20">
              <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/30 border border-slate-800/40 backdrop-blur-sm shadow-2xl shadow-black/20">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Ready to Experience the Difference?
                </h3>
                <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 px-4">
                  Join the ranks of successful businesses that trust us with their financial future.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button 
                    asChild 
                    size="lg" 
                    className="h-11 sm:h-12 px-6 sm:px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)] transition-all duration-200 group font-semibold text-sm sm:text-base"
                  >
                    <Link href="/contact" className="flex items-center gap-2">
                      Get Started Today
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild 
                    size="lg" 
                    className="h-11 sm:h-12 px-6 sm:px-8 border-slate-600/50 bg-slate-800/30 text-slate-300 hover:border-slate-500/50 hover:bg-slate-700/50 hover:text-white transition-all duration-200 backdrop-blur-sm text-sm sm:text-base"
                  >
                    <Link href="/about">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location info with premium sophisticated design */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Multi-layer background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-950 to-black"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        {/* Subtle mesh gradient overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Premium section header matching the style */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
                <Building2 className="w-4 h-4 text-emerald-400" />
                Strategic Positioning
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Location that
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Drives Growth
                </span>
              </h2>
              
              <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                We don&apos;t just occupy space, we strategically position ourselves at the heart of 
                Dubai&apos;s business ecosystem to deliver unparalleled access and innovation.
              </p>
            </div>

            {/* Premium location features with sophisticated styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Building2 className="w-8 h-8" />,
                  title: "Prime Address",
                  description: "12A01, DAMAC XL Tower, Business Bay, Dubai's most prestigious business district with unmatched connectivity.",
                  gradient: "from-blue-500 to-cyan-500",
                  shadowColor: "blue"
                },
                {
                  icon: <CheckCircle2 className="w-8 h-8" />,
                  title: "Licensed Authority",
                  description: "UAE Trade License No: 1486369, officially certified and recognized for professional accounting and auditing services.",
                  gradient: "from-emerald-500 to-teal-500",
                  shadowColor: "emerald"
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Global Gateway",
                  description: "Strategic positioning that bridges international business with local expertise across the UAE market.",
                  gradient: "from-purple-500 to-indigo-500",
                  shadowColor: "purple"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                >
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon with enhanced gradient and shadow */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-${feature.shadowColor}-500/20 group-hover:shadow-xl group-hover:shadow-${feature.shadowColor}-500/30`}>
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Content with improved typography */}
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-slate-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                  
                  {/* Subtle bottom accent line */}
                  <div className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-50 transition-all duration-300 rounded-full`}></div>
                </div>
              ))}
            </div>

            {/* Premium CTA section with depth */}
            <div className="text-center">
              <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-slate-900/30 border border-slate-800/40 backdrop-blur-sm shadow-2xl shadow-black/20">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-slate-400 mb-8">
                  Connect with Dubai&apos;s premier accounting professionals at the heart of business innovation.
                </p>
                <Button 
                  asChild 
                  size="lg" 
                  className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)] transition-all duration-200 group font-semibold"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    Get In Touch
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}