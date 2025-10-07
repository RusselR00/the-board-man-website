'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2,
  Globe,
  MessageSquare,
  Users,
  Calendar,
  AlertCircle
} from 'lucide-react'

// Contact form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  serviceType: z.string().min(1, 'Please select a service type'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContact: z.string().min(1, 'Please select preferred contact method'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

const serviceTypes = [
  { value: 'audit', label: 'Audit & Assurance' },
  { value: 'tax', label: 'Tax Services' },
  { value: 'accounting', label: 'Accounting Services' },
  { value: 'business-setup', label: 'Business Setup' },
  { value: 'consultation', label: 'General Consultation' },
  { value: 'other', label: 'Other Services' }
]

const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'meeting', label: 'In-Person Meeting' }
]

const contactInfo = {
  address: {
    line1: '12A01, DAMAC XL Tower',
    line2: 'Business Bay, Dubai, UAE',
    coordinates: { lat: 25.1895, lng: 55.2707 }
  },
  phones: [
    { number: '+971 55 747 7855', type: 'Mobile', primary: true },
    { number: '+971 052 398 5587', type: 'Office' }
  ],
  email: 'info@board-man.com',
  website: 'www.board-man.com',
  businessHours: {
    weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
    weekend: 'Saturday: 10:00 AM - 2:00 PM',
    closed: 'Sunday: Closed'
  },
  socialMedia: [
    { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
    { platform: 'Instagram', url: '#', icon: 'instagram' },
    { platform: 'Facebook', url: '#', icon: 'facebook' },
    { platform: 'Twitter', url: '#', icon: 'twitter' }
  ]
}

const quickContact = [
  {
    title: 'General Inquiries',
    description: 'For general questions about our services',
    contact: contactInfo.email,
    type: 'email',
    icon: Mail
  },
  {
    title: 'Urgent Matters',
    description: 'For time-sensitive business matters',
    contact: contactInfo.phones[0].number,
    type: 'phone',
    icon: Phone
  },
  {
    title: 'New Client Setup',
    description: 'For new business registrations and setups',
    contact: 'setup@board-man.com',
    type: 'email',
    icon: Building2
  },
  {
    title: 'Existing Clients',
    description: 'For current client support and queries',
    contact: 'support@board-man.com',
    type: 'email',
    icon: Users
  }
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      serviceType: '',
      subject: '',
      message: '',
      preferredContact: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Transform the form data to match the API expectations
      const apiData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        company: data.company || '',
        subject: data.subject,
        message: data.message,
        serviceType: data.serviceType,
        preferredContact: data.preferredContact,
        urgency: 'medium' // Default urgency
      }

      console.log('Submitting contact form:', apiData)
      
      // Send data to the contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      })

      const result = await response.json()

      if (result.success) {
        console.log('Contact form submitted successfully:', result)
        setIsSubmitted(true)
        form.reset()
      } else {
        console.error('Contact form submission failed:', result)
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center bg-slate-900/30 border-slate-800/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h2>
            <p className="text-slate-400 mb-6">
              Thank you for contacting us. We&apos;ll get back to you within 24 hours.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)} 
              className="w-full bg-white text-slate-900 hover:bg-slate-100"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-slate-950 text-white -mt-16 pt-24 sm:pt-32 overflow-hidden">
        {/* Animated background with multiple layers */}
        <div className="absolute inset-0 bg-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-black"></div>
        
        {/* Premium dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Premium floating elements with animation */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 sm:w-80 sm:h-80 lg:w-[32rem] lg:h-[32rem] bg-gradient-to-br from-indigo-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-slate-200 text-xs sm:text-sm font-medium rounded-full backdrop-blur-md mb-6 sm:mb-8 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              Professional Support • Available 24/7
            </div>
            
            {/* Premium heading with advanced gradients */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-b from-white via-slate-50 to-slate-200 bg-clip-text text-transparent drop-shadow-2xl">
                Get In Touch
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                Transform Your Business
              </span>
            </h1>
            
            {/* Premium subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 font-light">
              Connect with our expert team of certified accountants and auditors. 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-medium"> 
                We&apos;re here to elevate your financial success.
              </span>
            </p>
            
            {/* Premium action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
              <Button 
                asChild 
                size="lg" 
                className="h-12 sm:h-14 px-8 sm:px-10 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 border-0"
              >
                <Link href="#contact-form">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Conversation
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="h-12 sm:h-14 px-8 sm:px-10 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link href="tel:+971501234567">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Quick Contact Cards */}
      <section className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden">
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        {/* Premium floating elements */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Premium section header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-slate-200 text-sm font-medium rounded-full backdrop-blur-md mb-6 shadow-xl">
              <Phone className="w-4 h-4 text-emerald-400" />
              Multiple Ways to Connect
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Reach Out Today
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Choose your preferred method of communication and let&apos;s start building your financial future
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {quickContact.map((item, index) => (
              <Card key={index} className="group text-center bg-gradient-to-br from-slate-900/30 to-slate-800/20 border-slate-700/40 backdrop-blur-xl hover:bg-gradient-to-br hover:from-slate-800/40 hover:to-slate-700/30 hover:border-slate-600/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden">
                {/* Premium glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.03] via-blue-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="pt-8 sm:pt-10 pb-6 sm:pb-8 relative z-10">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-2xl group-hover:shadow-blue-500/50 transform group-hover:scale-110 transition-all duration-300`}>
                    <item.icon className="h-7 w-7 sm:h-9 sm:w-9 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg sm:text-xl group-hover:text-blue-300 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-5 leading-relaxed">{item.description}</p>
                  {item.type === 'email' ? (
                    <Link href={`mailto:${item.contact}`} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm sm:text-base transition-colors font-medium break-all group-hover:underline">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      {item.contact}
                    </Link>
                  ) : (
                    <Link href={`tel:${item.contact}`} className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm sm:text-base transition-colors font-medium group-hover:underline">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      {item.contact}
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Main Content */}
      <section id="contact-form" className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950"></div>
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-br from-emerald-500/6 to-teal-500/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/6 to-indigo-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
            {/* Premium Contact Form */}
            <div className="order-2 lg:order-1">
              <Card className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 border-slate-700/50 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden">
                {/* Premium card glow */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.02] via-blue-500/[0.01] to-transparent"></div>
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
                
                <CardHeader className="pb-6 sm:pb-8 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                      <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl sm:text-2xl font-bold">
                        Let&apos;s Start a Conversation
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-sm sm:text-base mt-1">
                        Your success story begins with a simple message
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Premium benefits list */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      24h Response
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      Free Consultation
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      Expert Guidance
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      Confidential
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200 text-sm font-medium">First Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John" 
                                  className="bg-slate-800/40 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 sm:h-13 transition-all duration-300 hover:border-slate-500/80 shadow-inner"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200 text-sm font-medium">Last Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Doe" 
                                  className="bg-slate-800/40 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 sm:h-13 transition-all duration-300 hover:border-slate-500/80 shadow-inner"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200 text-sm font-medium">Email Address *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="john@example.com" 
                                  className="bg-slate-800/40 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 sm:h-13 transition-all duration-300 hover:border-slate-500/80 shadow-inner"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200 text-sm font-medium">Phone Number *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+971 50 123 4567" 
                                  className="bg-slate-800/40 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 sm:h-13 transition-all duration-300 hover:border-slate-500/80 shadow-inner"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200 text-sm font-medium">Company Name (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your Company Ltd." 
                                className="bg-slate-800/40 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 sm:h-13 transition-all duration-300 hover:border-slate-500/80 shadow-inner"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200 text-sm font-medium">Service Interest *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-slate-800/40 border-slate-600/60 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 sm:h-13 transition-all duration-300 hover:border-slate-500/80 shadow-inner">
                                    <SelectValue placeholder="Select a service" className="text-slate-400" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-slate-800 border-slate-600 shadow-2xl">
                                  {serviceTypes.map((service) => (
                                    <SelectItem key={service.value} value={service.value} className="text-white hover:bg-slate-700 focus:bg-slate-700">
                                      {service.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="preferredContact"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200 text-sm font-medium">Preferred Contact *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-slate-800/40 border-slate-600/60 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 sm:h-13 transition-all duration-300 hover:border-slate-500/80 shadow-inner">
                                    <SelectValue placeholder="How should we contact you?" className="text-slate-400" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-slate-800 border-slate-600 shadow-2xl">
                                  {contactMethods.map((method) => (
                                    <SelectItem key={method.value} value={method.value} className="text-white hover:bg-slate-700 focus:bg-slate-700">
                                      {method.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200 text-sm font-medium">Subject *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="How can we help you?" 
                                className="bg-slate-800/40 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-12 sm:h-13 transition-all duration-300 hover:border-slate-500/80 shadow-inner"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200 text-sm font-medium">Message *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please describe your inquiry in detail..."
                                className="min-h-[120px] sm:min-h-[140px] bg-slate-800/40 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none transition-all duration-300 hover:border-slate-500/80 shadow-inner"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white font-semibold text-base sm:text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] border-0 relative overflow-hidden group" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
              {/* Office Location */}
              <Card className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex items-center text-white text-lg sm:text-xl">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mr-2" />
                    Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Address</h4>
                      <p className="text-slate-400 text-sm">{contactInfo.address.line1}</p>
                      <p className="text-slate-400 text-sm">{contactInfo.address.line2}</p>
                    </div>
                    <Separator className="bg-slate-700/50" />
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Phone Numbers</h4>
                      {contactInfo.phones.map((phone, index) => (
                        <div key={index} className="flex items-center justify-between py-1">
                          <span className="text-slate-400 text-xs sm:text-sm">{phone.type}:</span>
                          <Link href={`tel:${phone.number}`} className="text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm">
                            {phone.number}
                          </Link>
                        </div>
                      ))}
                    </div>
                    <Separator className="bg-slate-700/50" />
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Email</h4>
                      <Link href={`mailto:${contactInfo.email}`} className="text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm break-all">
                        {contactInfo.email}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="flex items-center text-white text-lg sm:text-xl">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mr-2" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs sm:text-sm">Monday - Friday</span>
                      <span className="font-medium text-white text-xs sm:text-sm">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs sm:text-sm">Saturday</span>
                      <span className="font-medium text-white text-xs sm:text-sm">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs sm:text-sm">Sunday</span>
                      <span className="font-medium text-red-400 text-xs sm:text-sm">Closed</span>
                    </div>
                  </div>
                  <Separator className="my-3 sm:my-4 bg-slate-700/50" />
                  <div className="bg-blue-500/10 border border-blue-500/20 p-3 sm:p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm text-blue-300">
                          <strong>Emergency Support:</strong> Available 24/7 for existing clients with urgent matters.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-900/20 border-slate-800/30 backdrop-blur-sm">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-white text-lg sm:text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    <Button asChild variant="outline" className="w-full justify-start bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50 h-10 sm:h-11 text-sm">
                      <Link href="/booking">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Book Free Consultation
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50 h-10 sm:h-11 text-sm">
                      <Link href="/services">
                        <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        View Our Services
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-slate-800/30 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600/50 h-10 sm:h-11 text-sm">
                      <Link href="/about">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Meet Our Team
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-12 sm:py-16 bg-slate-900 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-indigo-500/3 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Find Us</h2>
            <p className="text-base sm:text-lg text-slate-400 mb-6 sm:mb-8 px-4">
              Located in the heart of Business Bay, Dubai
            </p>
            <Card className="bg-slate-800/30 border-slate-700/40 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-6 sm:p-8 lg:p-12 text-center border border-slate-600/30">
                  <MapPin className="h-12 w-12 sm:h-16 sm:w-16 text-blue-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Interactive Map</h3>
                  <p className="text-slate-400 mb-3 sm:mb-4 text-sm sm:text-base">
                    {contactInfo.address.line1}<br />
                    {contactInfo.address.line2}
                  </p>
                  <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs sm:text-sm">
                    Map integration coming soon
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-slate-950 text-white relative overflow-hidden">
        {/* Dark background with multiple layers */}
        <div className="absolute inset-0 bg-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black"></div>
        
        {/* Elegant accent elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-2xl shadow-black/20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
            <p className="text-lg sm:text-xl text-slate-400 mb-6 sm:mb-8">
              Take the first step towards better financial management for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild size="lg" className="h-10 sm:h-12 px-6 sm:px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-sm sm:text-base">
                <Link href="/booking">Book Free Consultation</Link>
              </Button>
              <Button asChild size="lg" className="h-10 sm:h-12 px-6 sm:px-8 bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-sm sm:text-base">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}