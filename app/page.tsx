import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { generateSEOMetadata, generateServiceSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'
import { Metadata } from 'next'
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, Sparkles, Building2, Calculator, FileText, Globe } from 'lucide-react'

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
      
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="space-y-0">
        {/* Hero Section with Glass Morphism */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-200 rounded-lg rotate-45 animate-float"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-green-200 rounded-full animate-bounce-slow"></div>
            <div className="absolute bottom-20 right-40 w-24 h-24 border border-yellow-200 rotate-12 animate-pulse-slow"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              {/* Main headline with gradient text */}
              <div className="mb-8 animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 mb-4 tracking-tight">
                  THE BOARD MAN
                </h1>
                <div className="relative">
                  <p className="text-2xl md:text-3xl text-slate-600 font-medium mb-2">
                    ACCOUNTING AND AUDITORS L.L.C
                  </p>
                  <div className="absolute -top-2 -right-4">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Tagline with typewriter effect */}
              <div className="mb-12 animate-fade-in-up animation-delay-300">
                <p className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">
                  Empowering Growth, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Beyond Borders</span>
                </p>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Transform your business with Dubai&apos;s most innovative accounting and auditing firm. 
                  Where precision meets vision, and your success becomes our mission.
                </p>
              </div>

              {/* CTA Buttons with hover effects */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-600">
                <Button asChild size="lg" className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  <Link href="/booking" className="flex items-center gap-2">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="group border-2 border-slate-300 hover:border-slate-400 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  <Link href="/services" className="flex items-center gap-2">
                    Explore Services
                    <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animation-delay-900">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">500+</div>
                  <div className="text-sm text-slate-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">5</div>
                  <div className="text-sm text-slate-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">100%</div>
                  <div className="text-sm text-slate-600">Compliance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-800">24/7</div>
                  <div className="text-sm text-slate-600">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-ping"></div>
            </div>
          </div>
        </section>

        {/* Services Section with Cards Animation */}
        <section className="py-32 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Expertise</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Discover our comprehensive suite of financial services designed to elevate your business to new heights
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Service Card 1 */}
              <Card className="group relative p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    Audit & Assurance
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Independent audit services ensuring compliance, transparency, and stakeholder confidence
                  </p>
                  <Button variant="ghost" asChild className="group-hover:bg-blue-50 transition-colors p-0">
                    <Link href="/services/audit-assurance" className="flex items-center gap-2 text-blue-600 font-semibold">
                      Discover More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Service Card 2 */}
              <Card className="group relative p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-green-600 transition-colors">
                    Tax Services
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Comprehensive tax planning, VAT compliance, and strategic advisory services
                  </p>
                  <Button variant="ghost" asChild className="group-hover:bg-green-50 transition-colors p-0">
                    <Link href="/services/tax" className="flex items-center gap-2 text-green-600 font-semibold">
                      Discover More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Service Card 3 */}
              <Card className="group relative p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">
                    Business Setup
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Complete business formation, licensing, and registration services in UAE
                  </p>
                  <Button variant="ghost" asChild className="group-hover:bg-purple-50 transition-colors p-0">
                    <Link href="/services/business-setup" className="flex items-center gap-2 text-purple-600 font-semibold">
                      Discover More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Service Card 4 */}
              <Card className="group relative p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">
                    Accounting
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Professional bookkeeping, financial reporting, and management accounting
                  </p>
                  <Button variant="ghost" asChild className="group-hover:bg-orange-50 transition-colors p-0">
                    <Link href="/services/accounting" className="flex items-center gap-2 text-orange-600 font-semibold">
                      Discover More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-20 left-20 w-2 h-32 bg-white rotate-45 animate-float"></div>
              <div className="absolute top-40 right-40 w-2 h-24 bg-white rotate-12 animate-float-delayed"></div>
              <div className="absolute bottom-40 left-40 w-2 h-20 bg-white -rotate-45 animate-bounce-slow"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">The Board Man</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Experience the difference of working with Dubai&apos;s most innovative accounting firm
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Trusted Expertise</h3>
                <p className="text-slate-300 leading-relaxed">
                  Licensed professionals with deep knowledge of UAE regulations and international standards
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Client-Centric</h3>
                <p className="text-slate-300 leading-relaxed">
                  Personalized service tailored to your unique business needs and growth objectives
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Proven Results</h3>
                <p className="text-slate-300 leading-relaxed">
                  Track record of helping businesses achieve compliance and sustainable growth
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info Section with Glass Card */}
        <section className="py-32 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-12 bg-white/70 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                {/* Card background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)`,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}></div>
                </div>

                <div className="relative z-10 text-center">
                  <div className="mb-8">
                    <h3 className="text-4xl font-bold text-slate-900 mb-4">
                      Your Trusted Partner in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dubai</span>
                    </h3>
                    <p className="text-xl text-slate-700 leading-relaxed">
                      Strategically located in the heart of Business Bay, we serve clients across the UAE 
                      with world-class accounting, auditing, and business advisory services.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        <Building2 className="w-6 h-6 text-blue-600" />
                        <p className="font-bold text-slate-900">Premium Location</p>
                      </div>
                      <p className="text-slate-700">12A01, DAMAC XL Tower, Business Bay, Dubai</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-6 h-6 text-green-600" />
                        <p className="font-bold text-slate-900">Licensed & Certified</p>
                      </div>
                      <p className="text-slate-700">License No: 1486369</p>
                    </div>
                  </div>

                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Link href="/contact" className="flex items-center gap-2">
                      Get In Touch
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}