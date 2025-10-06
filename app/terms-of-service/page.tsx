import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, FileText, Mail, Phone, MapPin, AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Terms of Service | THE BOARD MAN",
  description: "Read the terms and conditions for using THE BOARD MAN services. Our comprehensive terms of service outline user rights, responsibilities, and service agreements.",
  keywords: ["terms of service", "terms and conditions", "user agreement", "service terms", "THE BOARD MAN"],
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          These terms govern your use of THE BOARD MAN services and website. Please read them carefully before using our services.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="outline">Last updated: October 7, 2025</Badge>
          <Badge variant="outline">Effective: October 7, 2025</Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Agreement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              1. Agreement to Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              By accessing and using the services provided by THE BOARD MAN ACCOUNTING AND AUDITORS L.L.C (&quot;THE BOARD MAN,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you accept and agree to be bound by these Terms of Service (&quot;Terms&quot;).
            </p>
            <p>
              If you do not agree to these Terms, you may not access or use our services. These Terms apply to all visitors, users, and others who access or use our services.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-medium text-yellow-800">
                <strong>Important:</strong> By using our services, you represent that you are at least 18 years old and have the legal capacity to enter into these Terms.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Service Description */}
        <Card>
          <CardHeader>
            <CardTitle>2. Description of Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              THE BOARD MAN provides professional accounting, auditing, taxation, and business advisory services, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Audit and assurance services</li>
              <li>Tax planning and compliance services</li>
              <li>Accounting and bookkeeping services</li>
              <li>Business setup and licensing assistance</li>
              <li>Financial advisory and consulting services</li>
              <li>Online appointment booking and consultation services</li>
              <li>Educational resources and industry insights</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.
            </p>
          </CardContent>
        </Card>

        {/* User Responsibilities */}
        <Card>
          <CardHeader>
            <CardTitle>3. User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">3.1 Account Information</h3>
              <p>You are responsible for:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Providing accurate, current, and complete information</li>
                <li>Maintaining the confidentiality of any account credentials</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Updating your information as necessary</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">3.2 Prohibited Uses</h3>
              <p>You agree not to use our services to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful, threatening, or offensive content</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services for any fraudulent or illegal purpose</li>
                <li>Impersonate any person or entity</li>
                <li>Collect or harvest information about other users</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Professional Services */}
        <Card>
          <CardHeader>
            <CardTitle>4. Professional Services Agreement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">4.1 Service Engagement</h3>
              <p>
                Professional services are provided under separate engagement letters or service agreements that will specify:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Scope of work and deliverables</li>
                <li>Timeline and milestones</li>
                <li>Fees and payment terms</li>
                <li>Specific terms and conditions</li>
                <li>Confidentiality requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">4.2 Professional Standards</h3>
              <p>
                Our services are provided in accordance with applicable professional standards, including those established by:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>UAE Federal Tax Authority (FTA)</li>
                <li>International Financial Reporting Standards (IFRS)</li>
                <li>International Standards on Auditing (ISA)</li>
                <li>Relevant UAE laws and regulations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Payment Terms */}
        <Card>
          <CardHeader>
            <CardTitle>5. Payment Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">5.1 Fees and Billing</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>All fees are quoted in UAE Dirhams (AED) unless otherwise specified</li>
                <li>Payment terms will be specified in individual service agreements</li>
                <li>We reserve the right to charge interest on overdue amounts</li>
                <li>All fees are exclusive of applicable taxes unless stated otherwise</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">5.2 Refund Policy</h3>
              <p>
                Refunds are handled on a case-by-case basis and depend on the nature of services provided. 
                For detailed information about refunds, please refer to your specific service agreement or contact us directly.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card>
          <CardHeader>
            <CardTitle>6. Intellectual Property Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">6.1 Our Content</h3>
              <p>
                All content on our website, including text, graphics, logos, images, software, and other materials, 
                is owned by THE BOARD MAN or our licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">6.2 Limited License</h3>
              <p>
                We grant you a limited, non-exclusive, non-transferable license to access and use our website 
                and services for their intended purpose. You may not:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Copy, modify, or create derivative works of our content</li>
                <li>Use our content for commercial purposes without permission</li>
                <li>Remove or alter any copyright or proprietary notices</li>
                <li>Use our trademarks or logos without written consent</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Privacy and Confidentiality */}
        <Card>
          <CardHeader>
            <CardTitle>7. Privacy and Confidentiality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, 
              which is incorporated into these Terms by reference.
            </p>
            <p>
              We maintain strict confidentiality regarding all client information and will not disclose confidential information 
              except as required by law or with your explicit consent.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                For detailed information about how we handle your personal data, please review our 
                <Link href="/privacy-policy" className="font-medium underline ml-1">Privacy Policy</Link>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card>
          <CardHeader>
            <CardTitle>8. Disclaimers and Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">8.1 Service Availability</h3>
              <p>
                We strive to provide reliable services but cannot guarantee uninterrupted access. 
                Services may be temporarily unavailable due to maintenance, technical issues, or other factors beyond our control.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">8.2 Professional Advice</h3>
              <p>
                General information provided on our website is for educational purposes only and should not be considered 
                as professional advice for your specific situation. Always consult with qualified professionals for 
                personalized advice regarding your circumstances.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">8.3 Third-Party Links</h3>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the content, 
                privacy practices, or terms of use of external websites.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card>
          <CardHeader>
            <CardTitle>9. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              To the maximum extent permitted by law, THE BOARD MAN shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising from your use of our services.
            </p>
            <p>
              Our total liability for any claims arising from or related to these Terms or our services 
              shall not exceed the amount you paid for the specific service giving rise to the claim.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-medium text-red-800">
                <strong>Important:</strong> Some jurisdictions do not allow the exclusion of certain warranties or 
                limitation of liability. In such cases, our liability will be limited to the fullest extent permitted by law.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card>
          <CardHeader>
            <CardTitle>10. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We reserve the right to terminate or suspend your access to our services at any time, 
              with or without cause, and with or without notice, for any reason including:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Violation of these Terms</li>
              <li>Suspected fraudulent or illegal activity</li>
              <li>Non-payment of fees</li>
              <li>At our sole discretion</li>
            </ul>
            <p>
              Upon termination, your right to use our services will cease immediately, 
              but provisions regarding confidentiality, intellectual property, and liability will survive.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card>
          <CardHeader>
            <CardTitle>11. Governing Law and Jurisdiction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              These Terms are governed by and construed in accordance with the laws of the United Arab Emirates. 
              Any disputes arising from or relating to these Terms or our services shall be subject to the 
              exclusive jurisdiction of the competent courts in Dubai, UAE.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card>
          <CardHeader>
            <CardTitle>12. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting 
              on our website. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Updating the &quot;Last updated&quot; date</li>
              <li>Sending email notifications (if applicable)</li>
              <li>Posting notices on our website</li>
            </ul>
            <p>
              Your continued use of our services after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>13. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              If you have any questions about these Terms or our services, please contact us:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      12A01, DAMAC XL Tower<br />
                      Business Bay, Dubai, UAE
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+971 55 747 7855</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">legal@board-man.com</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="font-medium">Business Registration</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>License No: 1486369</p>
                  <p>THE BOARD MAN ACCOUNTING AND AUDITORS L.L.C</p>
                  <p>Registered in Dubai, UAE</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Footer Actions */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            For more information about our services and policies:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild>
              <Link href="/booking">Book Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}