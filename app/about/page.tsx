import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { MapPin, Phone, Mail, Calendar, Users, Award, Building2, Target, Eye, Trophy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | THE BOARD MAN - Accounting & Auditors',
  description: 'Learn about THE BOARD MAN ACCOUNTING AND AUDITORS L.L.C - our mission, vision, team, and commitment to excellence in financial services across Dubai and the UAE.',
  keywords: ['accounting firm Dubai', 'audit company UAE', 'about us', 'financial services team', 'professional accountants'],
}

const teamMembers = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    role: 'Managing Partner & Lead Auditor',
    image: '/images/team/ahmed.jpg',
    initials: 'AM',
    bio: 'Ahmed brings over 15 years of experience in audit and assurance services across the Middle East. He is a Certified Public Accountant (CPA) and holds an MBA in Finance from the American University of Dubai.',
    qualifications: ['CPA', 'MBA Finance', 'ACCA'],
    specialties: ['Financial Auditing', 'Risk Management', 'Corporate Governance'],
    experience: '15+ years'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Tax Advisory Director',
    image: '/images/team/sarah.jpg',
    initials: 'SJ',
    bio: 'Sarah specializes in UAE tax law and international tax planning. She has helped numerous multinational corporations navigate complex tax structures and ensure compliance with local regulations.',
    qualifications: ['CTA', 'LLM Tax Law', 'CA'],
    specialties: ['VAT Compliance', 'Corporate Tax', 'International Tax'],
    experience: '12+ years'
  },
  {
    id: 3,
    name: 'Raj Patel',
    role: 'Business Setup Consultant',
    image: '/images/team/raj.jpg',
    initials: 'RP',
    bio: 'Raj has extensive experience in business formation and licensing across various UAE free zones. He has successfully assisted over 200 companies in establishing their operations in the UAE.',
    qualifications: ['MBA', 'Business Setup Certified'],
    specialties: ['Free Zone Setup', 'Mainland Company Formation', 'Licensing'],
    experience: '10+ years'
  },
  {
    id: 4,
    name: 'Fatima Al-Zahra',
    role: 'Accounting Manager',
    image: '/images/team/fatima.jpg',
    initials: 'FZ',
    bio: 'Fatima oversees our accounting operations and ensures our clients maintain accurate financial records. She specializes in implementing efficient accounting systems for growing businesses.',
    qualifications: ['ACCA', 'BBA Accounting'],
    specialties: ['Bookkeeping', 'Financial Reporting', 'System Implementation'],
    experience: '8+ years'
  }
]

const companyStats = [
  { icon: Calendar, label: 'Years of Experience', value: '15+' },
  { icon: Users, label: 'Satisfied Clients', value: '500+' },
  { icon: Award, label: 'Successful Audits', value: '1000+' },
  { icon: Building2, label: 'Business Setups', value: '200+' }
]

const values = [
  {
    title: 'Integrity',
    description: 'We maintain the highest ethical standards in all our professional dealings and client relationships.'
  },
  {
    title: 'Excellence',
    description: 'We strive for excellence in every service we provide, ensuring quality and precision in our work.'
  },
  {
    title: 'Innovation',
    description: 'We embrace modern technology and innovative approaches to deliver efficient financial solutions.'
  },
  {
    title: 'Partnership',
    description: 'We build long-term partnerships with our clients, understanding their unique needs and goals.'
  }
]

export default function AboutPage() {
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
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Licensed & Trusted in Dubai
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                About THE BOARD MAN
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 mb-6 sm:mb-8 font-bold">
              Empowering Growth, Beyond Borders
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              Since our establishment, we have been dedicated to providing exceptional accounting, 
              auditing, and business advisory services to clients across Dubai and the UAE.
            </p>
            
            {/* Company Stats - Inline with Hero */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
              {companyStats.map((stat, index) => (
                <div key={index} className="text-center bg-slate-900/60 backdrop-blur-md border border-slate-700/30 rounded-xl p-4 sm:p-6 hover:bg-slate-800/60 transition-all duration-300">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-emerald-400 mb-2 sm:mb-3" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
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
                <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                Our Foundation
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Mission & Vision
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
                We are committed to quality in financial services and building lasting partnerships with our clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="group relative p-6 sm:p-8 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 mb-3 sm:mb-4">
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white">
                        <Target className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Our Mission</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    To provide comprehensive, reliable, and innovative accounting and auditing services 
                    that enable our clients to achieve their business objectives while maintaining the 
                    highest standards of compliance and financial transparency.
                  </p>
                </div>
              </div>
              
              <div className="group relative p-6 sm:p-8 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Subtle inner glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-0.5 mb-3 sm:mb-4">
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white">
                        <Eye className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Our Vision</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    To be the leading accounting and auditing firm in the UAE, recognized for our 
                    expertise, integrity, and commitment to helping businesses thrive in the dynamic 
                    Middle Eastern market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
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
                <Award className="w-4 h-4 text-emerald-400" />
                Core Principles
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Our Core Values
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="group relative p-6 rounded-2xl bg-slate-800/20 border border-slate-700/30 backdrop-blur-sm hover:bg-slate-800/40 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-center">
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
                <Users className="w-4 h-4 text-purple-400" />
                Expert Professionals
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Meet Our Team
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                Experienced professionals dedicated to your success
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="group relative p-6 rounded-2xl bg-slate-900/20 border border-slate-800/30 backdrop-blur-sm hover:bg-slate-900/40 hover:border-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-center">
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg text-white mb-1">{member.name}</h3>
                    <p className="text-emerald-400 text-sm mb-3">{member.role}</p>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {member.qualifications.map((qual) => (
                        <Badge key={qual} className="text-xs bg-slate-800/50 text-slate-300 border-slate-700/50">
                          {qual}
                        </Badge>
                      ))}
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50">View Profile</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md bg-slate-900 border-slate-800">
                        <DialogHeader>
                          <div className="flex items-center space-x-4 mb-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={member.image} alt={member.name} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <DialogTitle className="text-xl text-white">{member.name}</DialogTitle>
                              <DialogDescription className="text-emerald-400">
                                {member.role}
                              </DialogDescription>
                            </div>
                          </div>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm text-white mb-2">About</h4>
                            <p className="text-sm text-slate-300">{member.bio}</p>
                          </div>
                          
                          <Separator className="bg-slate-700" />
                          
                          <div>
                            <h4 className="font-semibold text-sm text-white mb-2">Experience</h4>
                            <p className="text-sm text-slate-300">{member.experience}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm text-white mb-2">Specialties</h4>
                            <div className="flex flex-wrap gap-1">
                              {member.specialties.map((specialty) => (
                                <Badge key={specialty} className="text-xs bg-slate-800 text-slate-300 border-slate-700">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 text-slate-400 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
                <Building2 className="w-4 h-4 text-blue-400" />
                Company Details
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                  Our Company
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                Licensed and regulated financial services provider in Dubai, UAE
              </p>
            </div>
            
            <div className="group relative p-8 rounded-2xl bg-slate-800/20 border border-slate-700/30 backdrop-blur-sm hover:bg-slate-800/40 hover:border-slate-600/50 transition-all duration-300">
              {/* Subtle inner glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Company Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Building2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-white">THE BOARD MAN ACCOUNTING AND AUDITORS L.L.C</p>
                          <p className="text-sm text-slate-400">License No: 1486369</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-slate-300">12A01, DAMAC XL Tower</p>
                          <p className="text-slate-300">Business Bay, Dubai, UAE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-emerald-400" />
                        <div>
                          <Link href="tel:+971557477855" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                            +971 55 747 7855
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-emerald-400" />
                        <div>
                          <Link href="tel:+9710523985587" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                            +971 052 398 5587
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <div>
                          <Link href="mailto:info@board-man.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                            info@board-man.com
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        {/* Dark background with multiple layers */}
        <div className="absolute inset-0 bg-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black"></div>
        
        {/* Elegant accent elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-slate-900/30 border border-slate-800/40 backdrop-blur-sm shadow-2xl shadow-black/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Work With Us?</h2>
            <p className="text-xl text-slate-400 mb-8">
              Let&apos;s discuss how we can help your business achieve its financial goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 group font-semibold">
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Us
                  <MapPin className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="h-12 px-8 bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold">
                <Link href="/booking">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}