import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { 
  CheckCircle2, 
  FileSearch, 
  Calculator, 
  Building2, 
  Shield, 
  TrendingUp, 
  Users, 
  Globe,
  Clock,
  Award,
  Zap
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services | THE BOARD MAN - Accounting & Auditors',
  description: 'Comprehensive accounting, auditing, tax services, and business setup solutions in Dubai, UAE. Professional financial services for individuals and businesses.',
  keywords: ['accounting services Dubai', 'audit services UAE', 'tax advisory', 'business setup Dubai', 'financial consulting'],
}

const services = [
  {
    id: 'audit',
    title: 'Audit & Assurance',
    description: 'Independent audit services ensuring compliance and transparency',
    icon: FileSearch,
    color: 'blue',
    features: [
      'External Audits',
      'Internal Audits', 
      'Risk Assessment',
      'Compliance Reviews',
      'Due Diligence',
      'Forensic Auditing'
    ],
    benefits: [
      'Enhanced credibility with stakeholders',
      'Improved internal controls',
      'Risk identification and mitigation',
      'Regulatory compliance assurance'
    ],
    process: [
      {
        step: 'Planning & Risk Assessment',
        description: 'Understanding your business and identifying key risk areas'
      },
      {
        step: 'Fieldwork & Testing',
        description: 'Detailed examination of financial records and processes'
      },
      {
        step: 'Review & Analysis',
        description: 'Comprehensive review of findings and analysis'
      },
      {
        step: 'Reporting & Recommendations',
        description: 'Detailed audit report with actionable recommendations'
      }
    ]
  },
  {
    id: 'tax',
    title: 'Tax Services',
    description: 'Comprehensive tax planning, preparation, and advisory services',
    icon: Calculator,
    color: 'green',
    features: [
      'VAT Registration & Filing',
      'Corporate Tax Advisory',
      'Tax Planning',
      'Tax Compliance',
      'International Tax',
      'Tax Dispute Resolution'
    ],
    benefits: [
      'Minimized tax liability',
      'Ensured compliance with local regulations',
      'Strategic tax planning for growth',
      'Expert handling of tax disputes'
    ],
    process: [
      {
        step: 'Tax Assessment',
        description: 'Analysis of current tax position and obligations'
      },
      {
        step: 'Strategy Development',
        description: 'Creation of tax-efficient strategies'
      },
      {
        step: 'Implementation',
        description: 'Execution of tax plans and filings'
      },
      {
        step: 'Ongoing Support',
        description: 'Continuous monitoring and advisory'
      }
    ]
  },
  {
    id: 'accounting',
    title: 'Accounting Services',
    description: 'Complete bookkeeping and financial management solutions',
    icon: TrendingUp,
    color: 'purple',
    features: [
      'Bookkeeping',
      'Financial Reporting',
      'Management Accounting',
      'Payroll Services',
      'Cash Flow Management',
      'Financial Analysis'
    ],
    benefits: [
      'Accurate financial records',
      'Timely financial reporting',
      'Better financial decision making',
      'Streamlined accounting processes'
    ],
    process: [
      {
        step: 'System Setup',
        description: 'Implementation of accounting systems and processes'
      },
      {
        step: 'Data Processing',
        description: 'Regular recording and processing of transactions'
      },
      {
        step: 'Monthly Reporting',
        description: 'Preparation of monthly financial statements'
      },
      {
        step: 'Analysis & Insights',
        description: 'Financial analysis and business insights'
      }
    ]
  },
  {
    id: 'business-setup',
    title: 'Business Setup',
    description: 'Complete business formation and licensing services in UAE',
    icon: Building2,
    color: 'orange',
    features: [
      'Company Formation',
      'License Applications',
      'Bank Account Opening',
      'Visa Processing',
      'Office Setup',
      'Ongoing Compliance'
    ],
    benefits: [
      'Fast and efficient setup process',
      'Full legal compliance',
      'Expert guidance on business structure',
      'Ongoing support for business operations'
    ],
    process: [
      {
        step: 'Consultation',
        description: 'Understanding your business needs and objectives'
      },
      {
        step: 'Documentation',
        description: 'Preparation and submission of required documents'
      },
      {
        step: 'Licensing',
        description: 'Obtaining necessary licenses and approvals'
      },
      {
        step: 'Setup Completion',
        description: 'Final setup and handover of business operations'
      }
    ]
  }
]

const pricingPlans = [
  {
    name: 'Startup Package',
    price: 'AED 2,500',
    period: '/month',
    description: 'Perfect for small businesses and startups',
    features: [
      'Basic bookkeeping',
      'Monthly financial statements',
      'VAT filing',
      'Email support',
      'Up to 50 transactions/month'
    ],
    popular: false
  },
  {
    name: 'Growth Package',
    price: 'AED 4,500',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      'Complete bookkeeping',
      'Monthly & quarterly reports',
      'VAT & tax planning',
      'Phone & email support',
      'Up to 150 transactions/month',
      'Management reporting'
    ],
    popular: true
  },
  {
    name: 'Enterprise Package',
    price: 'Custom',
    period: '',
    description: 'Comprehensive solution for large businesses',
    features: [
      'Full accounting services',
      'Audit & assurance',
      'Tax advisory',
      'Dedicated account manager',
      'Unlimited transactions',
      'Strategic consulting'
    ],
    popular: false
  }
]

const faqs = [
  {
    question: 'What documents do I need for VAT registration?',
    answer: 'You will need your trade license, tenancy contract, bank statements, and financial records for the past 12 months. We can guide you through the complete documentation process.'
  },
  {
    question: 'How long does a typical audit take?',
    answer: 'The duration depends on the size and complexity of your business. Small to medium enterprises typically take 2-4 weeks, while larger organizations may require 4-8 weeks.'
  },
  {
    question: 'Do you provide services for free zone companies?',
    answer: 'Yes, we provide comprehensive services for both mainland and free zone companies across all emirates in the UAE.'
  },
  {
    question: 'What is included in your business setup service?',
    answer: 'Our business setup service includes company formation, license application, bank account opening assistance, visa processing, and ongoing compliance support.'
  },
  {
    question: 'Can you handle international tax matters?',
    answer: 'Yes, our team has expertise in international tax planning and can assist with cross-border transactions and compliance requirements.'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-slate-950 text-white -mt-16 pt-24 sm:pt-32">
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
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-white/5 border border-white/10 text-slate-300 text-xs sm:text-sm font-medium rounded-full backdrop-blur-sm mb-6 sm:mb-8">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              Professional Services
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Our Professional Services
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 mb-6 sm:mb-8 font-bold">
              Comprehensive financial solutions for your business success
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              From audit and assurance to business setup, we provide expert services 
              tailored to meet the unique needs of businesses in Dubai and across the UAE.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 sm:py-16 -mt-6 sm:-mt-10 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="group relative p-4 sm:p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/30 hover:bg-slate-800/60 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-center">
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className={`h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br ${
                    service.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                    service.color === 'green' ? 'from-emerald-500 to-teal-500' :
                    service.color === 'purple' ? 'from-purple-500 to-indigo-500' :
                    'from-orange-500 to-red-500'
                  } flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">{service.description}</p>
                  <Button variant="outline" size="sm" asChild className="bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 text-xs sm:text-sm">
                    <Link href={`#${service.id}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-12 sm:py-16 bg-slate-950 relative overflow-hidden">
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-xs sm:text-sm font-medium rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                Service Details
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                Detailed
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Services
                </span>
              </h2>
            </div>
            
            <Tabs defaultValue="audit" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8 bg-slate-900/50 border border-slate-800/50 h-auto p-1">
                {services.map((service) => (
                  <TabsTrigger 
                    key={service.id} 
                    value={service.id} 
                    className="text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400 whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">{service.title}</span>
                    <span className="sm:hidden">{service.title.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {services.map((service) => (
                <TabsContent key={service.id} value={service.id} id={service.id}>
                  <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${
                          service.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                          service.color === 'green' ? 'from-emerald-500 to-teal-500' :
                          service.color === 'purple' ? 'from-purple-500 to-indigo-500' :
                          'from-orange-500 to-red-500'
                        } flex items-center justify-center mr-3 sm:mr-4`}>
                          <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h2>
                          <p className="text-sm sm:text-base text-slate-400">{service.description}</p>
                        </div>
                      </div>
                      
                      <div className="group relative p-4 sm:p-6 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm mb-4 sm:mb-6">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-2">
                              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-white">Key Features</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-center">
                                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400 mr-2 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-slate-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="group relative p-4 sm:p-6 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-2">
                              <Award className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-white">Benefits</h3>
                          </div>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-slate-300">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="group relative p-4 sm:p-6 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm h-full">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mr-2">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-white">Our Process</h3>
                          </div>
                          <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">
                            How we deliver exceptional {service.title.toLowerCase()} services
                          </p>
                          <div className="space-y-3 sm:space-y-4">
                            {service.process.map((step, index) => (
                              <div key={index} className="flex">
                                <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${
                                  service.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                                  service.color === 'green' ? 'from-emerald-500 to-teal-500' :
                                  service.color === 'purple' ? 'from-purple-500 to-indigo-500' :
                                  'from-orange-500 to-red-500'
                                } text-white flex items-center justify-center text-xs sm:text-sm font-semibold mr-2 sm:mr-3`}>
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{step.step}</h4>
                                  <p className="text-xs sm:text-sm text-slate-400">{step.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                Pricing Plans
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                Service
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Packages
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                Choose the package that best fits your business needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`group relative p-8 rounded-2xl ${plan.popular ? 'bg-slate-800/40 border-2 border-emerald-500/50' : 'bg-slate-900/20 border border-slate-800/30'} backdrop-blur-sm hover:bg-slate-800/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6 text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50'}`} variant={plan.popular ? 'default' : 'outline'} asChild>
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-950 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        {/* Subtle accent elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <FileSearch className="w-4 h-4 text-white" />
                </div>
                Questions & Answers
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                Frequently Asked
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Questions
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                Common questions about our services
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-slate-800/50">
                  <AccordionTrigger className="text-left text-white hover:text-emerald-400 transition-colors">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-slate-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-2xl shadow-black/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
            <p className="text-xl text-slate-400 mb-8">
              Contact us today to discuss your specific needs and discover how we can help your business thrive
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 group font-semibold">
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Us
                  <Users className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="h-12 px-8 bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                <Link href="/booking">Book Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}