import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { generateSEOMetadata, generateServiceSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'
import { Metadata } from 'next'

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
      <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              THE BOARD MAN
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              ACCOUNTING AND AUDITORS L.L.C
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Empowering Growth, Beyond Borders.
            </p>
            <p className="text-base text-gray-600 mb-12 max-w-3xl mx-auto">
              Professional accounting and auditing services in Dubai, UAE. 
              We provide comprehensive financial solutions for individuals and businesses of all sizes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/booking">Book Free Consultation</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial services tailored for your business success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Audit & Assurance
                </h3>
                <p className="text-gray-600 mb-4">
                  Independent audit services ensuring compliance and transparency
                </p>
                <Button variant="outline" asChild>
                  <Link href="/services/audit-assurance">Learn More</Link>
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Tax Services
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive tax planning, preparation, and advisory services
                </p>
                <Button variant="outline" asChild>
                  <Link href="/services/tax">Learn More</Link>
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Business Setup
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete business formation and licensing services in UAE
                </p>
                <Button variant="outline" asChild>
                  <Link href="/services/business-setup">Learn More</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Professional Services in Dubai
              </h3>
              <p className="text-gray-700 mb-6">
                Located in the heart of Business Bay, we serve clients across the UAE 
                with professional accounting, auditing, and business advisory services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-900">Address:</p>
                  <p>12A01, DAMAC XL Tower, Business Bay, Dubai</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Registration:</p>
                  <p>License No: 1486369</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}