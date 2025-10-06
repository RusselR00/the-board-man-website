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
import { ChevronLeft, Shield, Mail, Phone, MapPin } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | THE BOARD MAN",
  description: "Learn how THE BOARD MAN protects your personal information and respects your privacy. Our comprehensive privacy policy explains data collection, usage, and protection practices.",
  keywords: ["privacy policy", "data protection", "GDPR", "personal information", "THE BOARD MAN"],
}

export default function PrivacyPolicyPage() {
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
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          At THE BOARD MAN, we are committed to protecting your privacy and ensuring the security of your personal information.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: October 7, 2025
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Introduction */}
        <Card>
          <CardHeader>
            <CardTitle>1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              THE BOARD MAN ACCOUNTING AND AUDITORS L.L.C (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
            <p>
              This policy applies to all visitors, users, and others who access or use our services, whether through our website, mobile applications, or any other means.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card>
          <CardHeader>
            <CardTitle>2. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">2.1 Personal Information</h3>
              <p>We may collect the following personal information when you:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Fill out contact forms or consultation requests</li>
                <li>Book appointments through our booking system</li>
                <li>Subscribe to our newsletter or blog updates</li>
                <li>Create an account or register for services</li>
                <li>Communicate with us via email, phone, or other channels</li>
              </ul>
              <p className="mt-2">
                This information may include your name, email address, phone number, company name, job title, and any other details you voluntarily provide.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">2.2 Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect certain information, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>IP address and browser information</li>
                <li>Device type, operating system, and browser type</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website and search terms used</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card>
          <CardHeader>
            <CardTitle>3. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and maintain our services</li>
              <li>To process appointment bookings and consultation requests</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send you newsletters, updates, and marketing communications (with your consent)</li>
              <li>To improve our website functionality and user experience</li>
              <li>To analyze website usage and trends</li>
              <li>To comply with legal obligations and protect our rights</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card>
          <CardHeader>
            <CardTitle>4. Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights, property, or safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
              <li><strong>Consent:</strong> We may share information with your explicit consent</li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card>
          <CardHeader>
            <CardTitle>5. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication requirements</li>
              <li>Staff training on data protection practices</li>
              <li>Secure hosting and backup systems</li>
            </ul>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card>
          <CardHeader>
            <CardTitle>6. Cookies and Tracking Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and recommendations</li>
              <li>Improve website functionality and performance</li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences. However, disabling cookies may affect certain website functionality.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle>7. Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Access:</strong> The right to request access to your personal data</li>
              <li><strong>Rectification:</strong> The right to request correction of inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> The right to request deletion of your personal data</li>
              <li><strong>Portability:</strong> The right to receive your data in a structured, machine-readable format</li>
              <li><strong>Restriction:</strong> The right to request restriction of processing</li>
              <li><strong>Objection:</strong> The right to object to certain types of processing</li>
              <li><strong>Withdraw Consent:</strong> The right to withdraw consent for data processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided below.
            </p>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle>8. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. The retention period depends on:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>The nature of the information collected</li>
              <li>The purpose for which it was collected</li>
              <li>Legal and regulatory requirements</li>
              <li>Our legitimate business interests</li>
            </ul>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>9. Children&apos;s Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.
            </p>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card>
          <CardHeader>
            <CardTitle>10. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Posting the updated policy on our website</li>
              <li>Updating the &quot;Last updated&quot; date</li>
              <li>Sending email notifications for significant changes (if applicable)</li>
            </ul>
            <p>
              We encourage you to review this privacy policy periodically to stay informed about how we protect your information.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>11. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:
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
                    <p className="text-sm text-muted-foreground">privacy@board-man.com</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="font-medium">Business Hours</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Footer Actions */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            For more information about our services, please visit our other pages:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/terms-of-service">Terms of Service</Link>
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