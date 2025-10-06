import { Metadata } from 'next'

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  noindex?: boolean
  nofollow?: boolean
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
}: SEOProps): Metadata {
  const siteName = 'THE BOARD MAN - Accounting & Auditors'
  const defaultTitle = 'THE BOARD MAN - Premier Accounting & Auditing Services in Dubai, UAE'
  const defaultDescription = 'Professional accounting, auditing, tax services, and business setup solutions in Dubai, UAE. Expert financial advisory services for businesses of all sizes.'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://board-man.com'
  
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle
  const fullDescription = description || defaultDescription
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  // Combine default keywords with page-specific keywords
  const defaultKeywords = [
    'accounting services Dubai',
    'auditing UAE',
    'business setup Dubai',
    'tax consultancy UAE',
    'VAT services Dubai',
    'corporate tax UAE',
    'financial advisory Dubai',
    'bookkeeping services',
    'THE BOARD MAN',
    'chartered accountants Dubai',
    'business consultation UAE',
    'financial planning Dubai'
  ]
  
  const allKeywords = [...defaultKeywords, ...keywords].join(', ')

  const robots = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    authors: author ? [{ name: author }] : [{ name: 'THE BOARD MAN Team' }],
    creator: 'THE BOARD MAN',
    publisher: 'THE BOARD MAN',
    robots,
    alternates: {
      canonical: fullCanonicalUrl,
    },
    
    // Open Graph
    openGraph: {
      type: ogType,
      siteName,
      title: fullTitle,
      description: fullDescription,
      url: fullCanonicalUrl,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@TheBoardManUAE',
      creator: '@TheBoardManUAE',
      title: fullTitle,
      description: fullDescription,
      images: [fullOgImage],
    },

    // Additional meta tags
    other: {
      'application-name': siteName,
      'apple-mobile-web-app-title': siteName,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-config': '/browserconfig.xml',
      'msapplication-TileColor': '#2563eb',
      'msapplication-tap-highlight': 'no',
      'theme-color': '#2563eb',
    },
  }

  return metadata
}

// Structured Data Generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: 'THE BOARD MAN ACCOUNTING & AUDITORS L.L.C',
    description: 'Professional accounting, auditing, tax services, and business setup solutions in Dubai, UAE.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://board-man.com',
    logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://board-man.com'}/images/logo.png`,
    image: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://board-man.com'}/images/og-default.jpg`,
    telephone: '+971557477855',
    email: 'info@board-man.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12A01, DAMAC XL Tower, Business Bay',
      addressLocality: 'Dubai',
      addressCountry: 'UAE',
      postalCode: '00000'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1895,
      longitude: 55.2707
    },
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 10:00-14:00'
    ],
    priceRange: '$$',
    servedCuisine: [],
    serviceArea: {
      '@type': 'Place',
      name: 'Dubai, UAE'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Accounting & Business Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Accounting Services',
            description: 'Comprehensive bookkeeping and financial management'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audit & Assurance',
            description: 'Professional auditing and assurance services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax Services',
            description: 'VAT, corporate tax, and tax planning services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Setup',
            description: 'Company formation and business registration'
          }
        }
      ]
    },
    sameAs: [
      'https://www.linkedin.com/company/the-board-man',
      'https://www.instagram.com/theboardmanuae',
      'https://www.facebook.com/theboardmanuae',
      'https://twitter.com/TheBoardManUAE'
    ]
  }
}

export function generateArticleSchema({
  title,
  description,
  author = 'THE BOARD MAN Team',
  publishedTime,
  modifiedTime,
  image,
  url,
  keywords = []
}: {
  title: string
  description: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  image?: string
  url?: string
  keywords?: string[]
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://board-man.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/images/og-default.jpg`,
    author: {
      '@type': 'Person',
      name: author,
      url: `${baseUrl}/about`
    },
    publisher: {
      '@type': 'Organization',
      name: 'THE BOARD MAN',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url ? `${baseUrl}${url}` : baseUrl
    },
    keywords: keywords.join(', ')
  }
}

export function generateBreadcrumbSchema(items: { name: string; url?: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://board-man.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${baseUrl}${item.url}` })
    }))
  }
}

export function generateServiceSchema({
  name,
  description,
  price,
  currency = 'AED'
}: {
  name: string
  description: string
  price?: string
  currency?: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://board-man.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'THE BOARD MAN',
      url: baseUrl
    },
    serviceType: 'Professional Services',
    serviceArea: {
      '@type': 'Place',
      name: 'Dubai, UAE'
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: currency,
        availability: 'https://schema.org/InStock'
      }
    })
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}