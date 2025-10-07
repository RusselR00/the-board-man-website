import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Shield, FileSearch, AlertTriangle, CheckCircle2, ArrowRight, Users, Eye, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Audit & Assurance Services | THE BOARD MAN',
  description: 'Professional audit and assurance services in Dubai, UAE. Independent auditing, compliance, and risk assessment.',
}

export default function AuditAssurancePage() {
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
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 text-sm font-medium rounded-full backdrop-blur-sm mb-8">
              <Shield className="w-4 h-4 text-blue-400" />
              Independent Assurance
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Audit & Assurance Services
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 mb-8 font-bold">
              Building trust through independent verification and transparency
            </p>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Independent audit and assurance services to enhance the credibility of your financial information 
              and provide stakeholders with confidence in your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 group font-semibold">
                <Link href="/contact" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="h-12 px-8 bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                <Link href="/booking">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
                <Award className="w-4 h-4 text-blue-400" />
                Professional Auditing
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                Comprehensive
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Audit Solutions
                </span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: <Eye className="w-8 h-8" />,
                  title: "External Audit",
                  description: "Independent examination of financial statements in accordance with international auditing standards, ensuring transparency and compliance.",
                  gradient: "from-blue-500 to-cyan-500",
                  features: ["IFRS compliance", "Statutory audits", "Financial statement audits", "Audit opinions"]
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Internal Audit",
                  description: "Comprehensive review of internal controls, operational processes, and governance systems to identify improvement opportunities.",
                  gradient: "from-emerald-500 to-teal-500",
                  features: ["Control testing", "Process reviews", "Operational audits", "Governance assessment"]
                },
                {
                  icon: <AlertTriangle className="w-8 h-8" />,
                  title: "Risk Assessment",
                  description: "Systematic identification and evaluation of business risks, control weaknesses, and potential fraud indicators.",
                  gradient: "from-orange-500 to-red-500",
                  features: ["Risk identification", "Control evaluation", "Fraud detection", "Mitigation strategies"]
                },
                {
                  icon: <CheckCircle2 className="w-8 h-8" />,
                  title: "Compliance Review",
                  description: "Thorough assessment of adherence to regulatory requirements, industry standards, and internal policies.",
                  gradient: "from-purple-500 to-indigo-500",
                  features: ["Regulatory compliance", "Policy adherence", "Standards verification", "Gap analysis"]
                }
              ].map((service, index) => (
                <div key={index} className="group relative p-8 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-slate-400 leading-relaxed mb-4">{service.description}</p>
                    </div>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        {/* Dark background with multiple layers */}
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
        
        {/* Elegant accent elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-2xl shadow-black/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready for Independent Assurance?</h2>
            <p className="text-xl text-slate-400 mb-8">
              Build stakeholder confidence with our comprehensive audit and assurance services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 group font-semibold">
                <Link href="/contact" className="flex items-center gap-2">
                  Start Today
                  <Users className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="h-12 px-8 bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}