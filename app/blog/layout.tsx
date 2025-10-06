import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Insights & Expert Articles | THE BOARD MAN",
  description: "Stay informed with the latest insights, trends, and updates in accounting, taxation, and business management from THE BOARD MAN expert team.",
  keywords: ["business insights", "accounting articles", "tax updates UAE", "business advice Dubai", "financial planning", "corporate tax UAE", "VAT compliance", "ESG reporting"],
  openGraph: {
    title: "Business Insights & Expert Articles | THE BOARD MAN",
    description: "Stay informed with the latest insights, trends, and updates in accounting, taxation, and business management from THE BOARD MAN expert team.",
    type: "website",
    url: "https://theboardman.com/blog",
    images: [
      {
        url: "/images/blog-hero.jpg",
        width: 1200,
        height: 630,
        alt: "THE BOARD MAN Blog - Business Insights"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Insights & Expert Articles | THE BOARD MAN",
    description: "Stay informed with the latest insights, trends, and updates in accounting, taxation, and business management from THE BOARD MAN expert team.",
    images: ["/images/blog-hero.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://theboardman.com/blog"
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}