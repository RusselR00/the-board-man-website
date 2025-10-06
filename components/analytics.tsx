"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

interface AnalyticsProps {
  gaId?: string
}

export function Analytics({ gaId }: AnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!gaId) return

    // Track page views
    window.gtag('config', gaId, {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
    })
  }, [pathname, searchParams, gaId])

  if (!gaId) return null

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// Event tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackContactForm = (method: string) => {
  trackEvent('contact_form_submit', 'engagement', method)
}

export const trackBookingForm = (serviceType: string) => {
  trackEvent('booking_form_submit', 'conversion', serviceType)
}

export const trackPhoneClick = () => {
  trackEvent('phone_click', 'engagement', 'header_phone')
}

export const trackEmailClick = () => {
  trackEvent('email_click', 'engagement', 'header_email')
}

export const trackResourceDownload = (resourceName: string) => {
  trackEvent('resource_download', 'engagement', resourceName)
}

export const trackServiceInquiry = (serviceName: string) => {
  trackEvent('service_inquiry', 'engagement', serviceName)
}

export const trackBlogRead = (articleTitle: string) => {
  trackEvent('article_read', 'engagement', articleTitle)
}

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', 'engagement', platform)
}

// Advanced tracking for scroll depth
export const useScrollTracking = () => {
  useEffect(() => {
    const thresholds = [25, 50, 75, 90]
    const tracked = new Set<number>()

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold)
          trackEvent('scroll_depth', 'engagement', `${threshold}%`, threshold)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}