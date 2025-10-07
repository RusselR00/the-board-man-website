import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react'

const companyInfo = {
  name: 'THE BOARD MAN ACCOUNTING AND AUDITORS L.L.C',
  registration: '1486369',
  tagline: 'Empowering Growth, Beyond Borders.',
  address: '12A01, DAMAC XL Tower, Business Bay, Dubai',
  phones: ['+971557477855', '+9710523985587'],
  email: 'info@board-man.com',
  businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
}

const footerLinks = {
  services: [
    { name: 'Audit & Assurance', href: '/services/audit-assurance' },
    { name: 'Tax Services', href: '/services/tax' },
    { name: 'Accounting', href: '/services/accounting' },
    { name: 'Business Setup', href: '/services/business-setup' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Clients', href: '/clients' },
    { name: 'Resources', href: '/resources' },
    { name: 'Blog', href: '/blog' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Book Consultation', href: '/booking' },
    { name: 'Downloads', href: '/downloads' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

const socialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram, isLive: true },
  { name: 'Facebook', href: '#', icon: Facebook, isLive: false },
  { name: 'Twitter', href: '#', icon: Twitter, isLive: false },
  { name: 'YouTube', href: '#', icon: Youtube, isLive: false },
]

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-foreground mb-2">THE BOARD MAN</h3>
              <p className="text-sm text-muted-foreground mb-2">ACCOUNTING & AUDITORS L.L.C</p>
              <p className="text-sm text-muted-foreground italic">{companyInfo.tagline}</p>
            </div>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{companyInfo.address}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <div className="space-y-1">
                  {companyInfo.phones.map((phone) => (
                    <div key={phone}>
                      <Link href={`tel:${phone}`} className="hover:text-foreground transition-colors">
                        {phone}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <Link href={`mailto:${companyInfo.email}`} className="hover:text-foreground transition-colors">
                  {companyInfo.email}
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="sm"
                    asChild
                    className={`${social.isLive ? '' : 'opacity-50 cursor-not-allowed'}`}
                  >
                    <Link href={social.href} aria-label={social.name}>
                      <social.icon className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-foreground mb-2">Business Hours</h5>
              <p className="text-sm text-muted-foreground">{companyInfo.businessHours}</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <p className="mt-1">
              Registration No: {companyInfo.registration}
            </p>
          </div>
          
          <div className="flex space-x-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}