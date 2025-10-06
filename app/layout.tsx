import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Layout } from '@/components/layout/layout'
import { CookieConsent } from '@/components/cookie-consent'
import { generateSEOMetadata, generateOrganizationSchema } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = generateSEOMetadata({
  title: 'THE BOARD MAN - Premier Accounting & Auditing Services in Dubai, UAE',
  description: 'Professional accounting, auditing, tax services, and business setup solutions in Dubai, UAE. Expert financial advisory services for businesses of all sizes.',
  keywords: ['accounting services Dubai', 'auditing UAE', 'business setup Dubai', 'tax consultancy UAE'],
  canonicalUrl: '/',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData data={generateOrganizationSchema()} />
      </head>
      <body className={inter.className}>
        <Layout>{children}</Layout>
        <CookieConsent />
      </body>
    </html>
  )
}