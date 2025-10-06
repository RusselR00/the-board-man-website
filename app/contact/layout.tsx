import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | THE BOARD MAN - Professional Business Services",
  description: "Get in touch with THE BOARD MAN for expert accounting, taxation, and business consulting services in Dubai, UAE. Schedule a consultation today.",
  keywords: ["contact THE BOARD MAN", "business consulting Dubai", "accounting services UAE", "tax consultation", "professional services contact"],
  openGraph: {
    title: "Contact Us | THE BOARD MAN - Professional Business Services",
    description: "Get in touch with THE BOARD MAN for expert accounting, taxation, and business consulting services in Dubai, UAE. Schedule a consultation today.",
    type: "website",
    url: "https://theboardman.com/contact",
    images: [
      {
        url: "/images/contact-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Contact THE BOARD MAN - Professional Business Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | THE BOARD MAN",
    description: "Get in touch with THE BOARD MAN for expert accounting, taxation, and business consulting services in Dubai, UAE.",
    images: ["/images/contact-hero.jpg"]
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
    canonical: "https://theboardman.com/contact"
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}