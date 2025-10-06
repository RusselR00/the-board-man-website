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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Professional Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Comprehensive financial solutions for your business success
            </p>
            <p className="text-lg text-blue-50 max-w-3xl mx-auto">
              From audit and assurance to business setup, we provide expert services 
              tailored to meet the unique needs of businesses in Dubai and across the UAE.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Services Overview */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card key={service.id} className="text-center hover:shadow-lg transition-shadow group">
                <CardContent className="pt-6">
                  <div className={`h-16 w-16 mx-auto mb-4 rounded-full bg-${service.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <service.icon className={`h-8 w-8 text-${service.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`#${service.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="audit" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                {services.map((service) => (
                  <TabsTrigger key={service.id} value={service.id} className="text-sm">
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {services.map((service) => (
                <TabsContent key={service.id} value={service.id} id={service.id}>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className={`h-12 w-12 rounded-lg bg-${service.color}-100 flex items-center justify-center mr-4`}>
                          <service.icon className={`h-6 w-6 text-${service.color}-600`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                      
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                            Key Features
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-center">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Award className="h-5 w-5 text-blue-600 mr-2" />
                            Benefits
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <Zap className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Clock className="h-5 w-5 text-purple-600 mr-2" />
                            Our Process
                          </CardTitle>
                          <CardDescription>
                            How we deliver exceptional {service.title.toLowerCase()} services
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {service.process.map((step, index) => (
                              <div key={index} className="flex">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-${service.color}-100 text-${service.color}-600 flex items-center justify-center text-sm font-semibold mr-3`}>
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">{step.step}</h4>
                                  <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Packages</h2>
              <p className="text-lg text-gray-600">
                Choose the package that best fits your business needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-600 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Common questions about our services
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your specific needs and discover how we can help your business thrive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/booking">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}