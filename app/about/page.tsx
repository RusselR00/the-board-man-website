import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { MapPin, Phone, Mail, Calendar, Users, Trophy, Building2 } from 'lucide-react'

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
  { icon: Trophy, label: 'Successful Audits', value: '1000+' },
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About THE BOARD MAN
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Empowering Growth, Beyond Borders
            </p>
            <p className="text-lg text-blue-50 max-w-3xl mx-auto">
              Since our establishment, we have been dedicated to providing exceptional accounting, 
              auditing, and business advisory services to clients across Dubai and the UAE.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Company Stats */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {companyStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are committed to excellence in financial services and building lasting partnerships with our clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To provide comprehensive, reliable, and innovative accounting and auditing services 
                    that enable our clients to achieve their business objectives while maintaining the 
                    highest standards of compliance and financial transparency.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-600">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To be the leading accounting and auditing firm in the UAE, recognized for our 
                    expertise, integrity, and commitment to helping businesses thrive in the dynamic 
                    Middle Eastern market.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600">
                Experienced professionals dedicated to your success
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {member.qualifications.map((qual) => (
                        <Badge key={qual} variant="secondary" className="text-xs">
                          {qual}
                        </Badge>
                      ))}
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <div className="flex items-center space-x-4 mb-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={member.image} alt={member.name} />
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <DialogTitle className="text-xl">{member.name}</DialogTitle>
                              <DialogDescription className="text-blue-600">
                                {member.role}
                              </DialogDescription>
                            </div>
                          </div>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">About</h4>
                            <p className="text-sm text-gray-700">{member.bio}</p>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Experience</h4>
                            <p className="text-sm text-gray-700">{member.experience}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Specialties</h4>
                            <div className="flex flex-wrap gap-1">
                              {member.specialties.map((specialty) => (
                                <Badge key={specialty} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Company</h2>
              <p className="text-lg text-gray-600">
                Licensed and regulated financial services provider in Dubai, UAE
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">THE BOARD MAN ACCOUNTING AND AUDITORS L.L.C</p>
                          <p className="text-sm text-gray-600">License No: 1486369</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-gray-700">12A01, DAMAC XL Tower</p>
                          <p className="text-gray-700">Business Bay, Dubai, UAE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <Link href="tel:+971557477855" className="text-blue-600 hover:underline">
                            +971 55 747 7855
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <Link href="tel:+9710523985587" className="text-blue-600 hover:underline">
                            +971 052 398 5587
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <Link href="mailto:info@board-man.com" className="text-blue-600 hover:underline">
                            info@board-man.com
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help your business achieve its financial goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/booking">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}